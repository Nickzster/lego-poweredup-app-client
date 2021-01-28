type METHOD = "POST" | "GET" | "PUT" | "DELETE";

class Fetch {
  private headers: any;
  private route: string;
  private method: METHOD;
  private body: any;
  public constructor(route: string) {
    this.headers = {};
    this.body = {};
    this.route = route;
    this.method = "GET";
    return this;
  }
  public setBody(body: any) {
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
    await (
      await fetch(this.route, {
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
