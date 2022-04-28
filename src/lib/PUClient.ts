export enum COMMANDS {
  INCREASE_POWER = "INCREASE_POWER",
  DECREASE_POWER = "DECREASE_POWER",
  STOP = "STOP",
  CHANGE_MOTOR_DIRECTION = "CHANGE_MOTOR_DIRECTION",
}

type ClientEvents =
  | "EXECUTE_MOTOR_COMMAND"
  | "GET_ALL_ACTIVE_REMOTES"
  | "ASSIGN_MOTOR_TO_REMOTE";

type Error = "ERROR";

export interface IMessageForServer {
  type: ClientEvents | Error;
  remoteID?: string;
  motorID?: string;
  payload: any;
}

class PUClient {
  private socket;

  private send(message: IMessageForServer) {
    try {
      this.socket.send(JSON.stringify(message));
    } catch (err) {
      console.error(err);
    }
  }

  public constructor() {
    this.socket = new WebSocket("ws://localhost:8080");
    return this;
  }

  public subscribe(callback: (message: any) => void) {
    this.socket.addEventListener("message", ({ data }) => {
      const decoded = JSON.parse(data);
      if (!decoded.error) {
        return callback(decoded);
      }
      console.log(decoded.error.message);
    });

    this.socket.addEventListener("open", () => {
      this.getAllRemotes();
    });
  }

  public close() {
    this.socket.close();
  }

  public increasePower(remoteID: string, delta: number) {
    this.send({
      type: "EXECUTE_MOTOR_COMMAND",
      remoteID,
      payload: {
        name: COMMANDS.INCREASE_POWER,
        args: {
          delta,
        },
      },
    });
  }

  public decreasePower(remoteID: string, delta: number) {
    this.send({
      type: "EXECUTE_MOTOR_COMMAND",
      remoteID,
      payload: {
        name: COMMANDS.DECREASE_POWER,
        args: {
          delta,
        },
      },
    });
  }

  public brake(remoteID: string) {
    this.send({
      type: "EXECUTE_MOTOR_COMMAND",
      remoteID,
      payload: {
        name: COMMANDS.STOP,
      },
    });
  }

  public changeDirection(remoteID: string) {
    this.send({
      type: "EXECUTE_MOTOR_COMMAND",
      remoteID,
      payload: {
        name: COMMANDS.INCREASE_POWER,
      },
    });
  }

  public getAllRemotes() {
    this.send({ type: "GET_ALL_ACTIVE_REMOTES", payload: {} });
  }
}

export default PUClient;
