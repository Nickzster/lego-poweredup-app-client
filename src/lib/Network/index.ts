import Variable from "../env";

type METHOD = "POST" | "GET" | "PUT" | "DELETE";

class Fetch {
  private headers: any;
  private route: string;
  private hostname: string;
  private method: METHOD;
  private body: any;
  public constructor(url: string) {
    this.hostname = new Variable({
      test: "http://localhost:5000",
      dev: "http://localhost:5000",
      prod: "http://trains-api.nickzimm.me",
    }).url();
    this.route = url;
    this.headers = {};
    this.method = "GET";
    return this;
  }
  public setBody(body: any) {
    if (!this.body) this.body = {};
    this.body = JSON.stringify(body);
    return this;
  }
  public addHeader(k: string, v: any) {
    this.headers[k] = v;
    return this;
  }
  public setMethod(method: METHOD) {
    this.method = method;
    return this;
  }
  public async fetch() {
    return await (
      await fetch(`${this.hostname}/${this.route}`, {
        method: this.method,
        headers: this.headers,
        body: this.body,
      })
    ).json();
  }
  public makeManualRequestUsingFetch() {
    return fetch;
  }
}

export default Fetch;
