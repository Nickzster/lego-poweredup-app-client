export enum COMMANDS {
  INCREASE_POWER = "INCREASE_POWER",
  DECREASE_POWER = "DECREASE_POWER",
  STOP = "STOP",
  CHANGE_MOTOR_DIRECTION = "CHANGE_MOTOR_DIRECTION",
}

class PUClient {
  private socket;

  public constructor() {
    this.socket = new WebSocket("ws://localhost:8080");
    return this;
  }

  public increasePower(id: string, delta: number) {
    this.socket.send(
      JSON.stringify({
        type: "EXECUTE_MOTOR_COMMAND",
        id,
        payload: {
          name: COMMANDS.INCREASE_POWER,
          args: {
            delta,
          },
        },
      })
    );
  }

  public decreasePower(id: string, delta: number) {
    this.socket.send(
      JSON.stringify({
        type: "EXECUTE_MOTOR_COMMAND",
        id,
        payload: {
          name: COMMANDS.DECREASE_POWER,
          args: {
            delta,
          },
        },
      })
    );
  }

  public brake(id: string) {
    this.socket.send(
      JSON.stringify({
        type: "EXECUTE_MOTOR_COMMAND",
        id,
        payload: {
          name: COMMANDS.STOP,
        },
      })
    );
  }

  public changeDirection(id: string) {
    this.socket.send(
      JSON.stringify({
        type: "EXECUTE_MOTOR_COMMAND",
        id,
        payload: {
          name: COMMANDS.CHANGE_MOTOR_DIRECTION,
        },
      })
    );
  }

  public subscribe(callback: (message: any) => void) {
    this.socket.onmessage = ({ data }) => {
      const decoded = JSON.parse(data);
      callback(decoded);
    };
  }

  public close() {
    this.socket.close();
  }
}

export default PUClient;
