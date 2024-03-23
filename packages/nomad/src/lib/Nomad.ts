import { EventEmitter } from "events";

// Types
import type { Event, Relay } from "nostr-tools";
import { type NomadRepoManifest, NomadStatus } from "../types/nomad";
import { NomadKinds } from "../types/kinds";
import { NomadRuntime } from "./NomadRuntime";

export class Nomad {
  authorPubkey: string;
  codeEvent: Event;
  repoManifest?: NomadRepoManifest;
  nomadRuntime: NomadRuntime | undefined;

  // Not yet implemented
  dependencies: { [name: string]: Nomad } = {};

  public eventEmitter;
  public eventId: string;
  public status: NomadStatus;

  constructor(
    codeEvent: Event,
    repoManifest?: NomadRepoManifest,
    eventEmitter?: EventEmitter
  ) {
    this.codeEvent = codeEvent;
    this.authorPubkey = codeEvent.pubkey;
    this.repoManifest = repoManifest;
    this.eventId = codeEvent.id;
    this.eventEmitter = eventEmitter || new EventEmitter();
    this.status = NomadStatus.IDLE;
  }

  setStatus(status: NomadStatus) {
    this.eventEmitter.emit("status", status);
    this.status = status;
  }

  async init<T>(...args: any[]): Promise<T> {
    this.setStatus(NomadStatus.BOOTING);

    this.nomadRuntime = new NomadRuntime(
      this.codeEvent.content,
      this.dependencies,
      this.eventEmitter,
      args
    );

    try {
      await this.nomadRuntime.init();
    } catch (e) {
      this.setStatus(NomadStatus.ERROR);
      console.error(e);
      throw new Error("Error initializing Nomad Runtime");
    }

    this.setStatus(NomadStatus.RUNNING);
    this.eventEmitter.emit("nomad:init", args);

    return this.nomadRuntime.getRuntimeInterface<T>();
  }

  async call<T>(name: string, ...args: any[]): Promise<T> {
    this.eventEmitter.emit("nomad:call", [name, ...args]);

    if (this.nomadRuntime === undefined) {
      throw new Error(
        "Nomad Runtime not yet initialized. Please call init() first"
      );
    }

    return await this.nomadRuntime.call(name, ...args);
  }

  static async fromPubkey(
    pubkey: string,
    repoPath: string,
    relay: Relay,
    eventEmitter?: EventEmitter
  ) {
    try {
      eventEmitter?.emit("status", NomadStatus.REPO_MANIFEST);

      const [repoName, requestedVersion = "latest"] = repoPath.split("@");
      const repoManifest = await getRepoManifest(pubkey, repoName!, relay);

      eventEmitter?.emit("repoManifest", repoManifest);

      // TODO: Proper sorting
      const versions = Object.keys(repoManifest.versions).sort();
      const latestVersion = versions[versions.length - 1];

      const selectedVersion =
        versions.find((v) => v === requestedVersion) ||
        latestVersion ||
        "latest";
      const eventId = repoManifest.versions[selectedVersion];

      if (!eventId) {
        throw new Error(`Version ${selectedVersion} not found`);
      }

      eventEmitter?.emit("status", NomadStatus.CODE_EVENT);
      const codeEvent = await getCodeEvent(eventId, relay);

      return new Nomad(codeEvent, repoManifest, eventEmitter);
    } catch (e) {
      eventEmitter?.emit("status", NomadStatus.ERROR);
      throw e;
    }
  }

  static async fromEventId(
    eventId: string,
    relay: Relay,
    eventEmitter?: EventEmitter
  ) {
    eventEmitter?.emit("status", NomadStatus.CODE_EVENT);

    const codeEvent = await getCodeEvent(eventId, relay);

    eventEmitter?.emit("codeEvent", codeEvent);
    return new Nomad(codeEvent, undefined, eventEmitter);
  }

  static async fromHandleOrEventId(
    handleOrEventId: string,
    relay: Relay,
    eventEmitter?: EventEmitter
  ) {
    const [nip05OrPubkey, repoPath] = handleOrEventId.split("/");

    if (!repoPath) {
      // Must be eventId
      return this.fromEventId(handleOrEventId, relay, eventEmitter);
    }

    let pubkey;
    // Is NIP05 handle
    if (nip05OrPubkey!.includes("@")) {
      pubkey = await resolveNip05(nip05OrPubkey!);
    } else {
      pubkey = nip05OrPubkey;
    }

    if (!pubkey) {
      throw new Error("Invalid pubkey");
    }

    return this.fromPubkey(pubkey, repoPath, relay, eventEmitter);
  }
}

export async function resolveNip05(handle: string): Promise<string> {
  const [username, domain] = handle.split("@");
  const res = await fetch(
    `https://${domain}/.well-known/nostr.json?name=${username}`
  );
  const data = await res.json();

  return data.names[username!] as string;
}

export async function getRepoManifest(
  authorPubkey: string,
  repoName: string,
  relay: Relay
): Promise<NomadRepoManifest> {
  const filter = {
    authors: [authorPubkey],
    "#d": [`repo:${repoName}`],
    kinds: [NomadKinds.REPO_MANIFEST],
  };

  const event = await relay.get(filter);

  if (!event) {
    throw new Error("Repo manifest not found");
  }

  const versions: { [key: string]: string } = {};
  event.tags
    .filter((tag) => tag[0]!.startsWith("version:"))
    ?.forEach((tag) => {
      const version = tag[0]!.split(":")[1] as string;
      const eventId = tag[1];
      versions[version] = eventId!;
    });

  return {
    name: repoName,
    description: event.tags.find((tag) => tag[0] === "description")?.[1] || "",
    versions: versions,
    event: event,
  };
}

export async function getCodeEvent(
  eventId: string,
  relay: Relay
): Promise<Event> {
  const event = await relay.get({
    ids: [eventId],
  });

  if (!event) {
    throw new Error(`Code Event (${eventId}) not found`);
  }

  if (event.kind !== NomadKinds.NOMAD_CODE) {
    throw new Error(
      `Invalid event kind. Expecting ${NomadKinds.NOMAD_CODE} but got ${event.kind}`
    );
  }

  return event;
}
