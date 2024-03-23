import { EventEmitter } from "events";
import { Nomad } from "./Nomad";

export class WrappedEventEmitter extends EventEmitter {
  private _parent: EventEmitter;
  constructor(parent: EventEmitter) {
    super();
    this._parent = parent;
  }

  emit(event: string | symbol, ...args: any[]): boolean {
    this._parent.emit(`runtime:${String(event)}`, ...args);
    return super.emit(event, ...args);
  }
}

export class NomadRuntime {
  runtime: Function | { [key: string]: Function } | undefined;
  code: string;
  dependencies: { [name: string]: Nomad };
  parentEventEmitter: EventEmitter;
  args: any[];

  public eventEmitter: WrappedEventEmitter;

  constructor(
    code: string,
    dependencies: { [name: string]: Nomad },
    parentEventEmitter: EventEmitter,
    args: any[]
  ) {
    this.eventEmitter = new WrappedEventEmitter(parentEventEmitter);
    this.code = code;
    this.dependencies = dependencies;
    this.parentEventEmitter = parentEventEmitter;
    this.args = args;
  }

  async init() {
    const _runtime = await (async () => {
      // TODO: Should be wrapped with webworker
      return new Function(
        ...Object.keys(this.dependencies),
        "args",
        "events",
        this.code
      )(...Object.values(this.dependencies), this.args, this.eventEmitter);
    })();

    console.info("_runtime:");
    console.dir(_runtime);
    // Validate result
    if (typeof _runtime !== "object" && typeof _runtime !== "function") {
      throw new Error("Invalid runtime type. Must be Object or Function");
    }
    this.runtime = _runtime;
  }

  async call(name: string, ...args: any[]) {
    if (this.runtime === undefined) {
      throw new Error(
        "Nomad Runtime not yet initialized. Please call init() first"
      );
    }

    if (typeof this.runtime === "object") {
      return this.runtime[name]!(...args);
    }
    return this.runtime(...args);
  }

  getRuntimeInterface<T>(): T {
    return this.runtime as T;
  }
}
