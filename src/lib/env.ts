interface IEnvironments {
  test: string;
  dev: string;
  prod: string;
}

class Variable {
  private link: string;
  public constructor(envs: IEnvironments) {
    switch (process.env.NODE_ENV) {
      case "production":
        this.link = envs.prod;
        break;
      case "test":
        this.link = envs.test;
        break;
      case "development":
        this.link = envs.dev;
        break;
      default:
        this.link = envs.dev;
    }
    return this;
  }
  public url() {
    return this.link;
  }
}

export default Variable;
