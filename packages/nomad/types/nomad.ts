import { Event } from "nostr-tools";

export interface NomadRepoManifest {
  name: string;
  description: string;
  versions: { [key: string]: string };
  event: Event;
}

export enum NomadStatus {
  HANDLE_RESOLVE = "handle_resolve",
  REPO_MANIFEST = "repo_manifest",
  CODE_EVENT = "code_event",
  IDLE = "idle",
  BOOTING = "booting",
  RUNNING = "running",
  ERROR = "error",
}
