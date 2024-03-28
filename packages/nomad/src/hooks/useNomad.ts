import { EventEmitter } from "events";
import { useEffect, useState } from "react";
import { Nomad } from "../lib/Nomad";
import { relayInit } from "nostr-tools";
import { NomadStatus } from "../types/nomad";

interface UseNomadReturn {
  isLoading: boolean;
  isLoaded: boolean;
  eventEmitter: EventEmitter;
  status: NomadStatus;
  nomad?: Nomad;
  error?: string;
}

interface UseNomadOptions {}

export const useNomad = <T>(
  idOrHandle: string,
  options?: UseNomadOptions,
): UseNomadReturn & T => {
  const [nomad, setNomad] = useState<Nomad>();
  const [eventEmitter] = useState<EventEmitter>(new EventEmitter());
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<NomadStatus>(NomadStatus.HANDLE_RESOLVE);

  const loadNomad = async (idOrHandle: string) => {
    if (isLoaded || isLoading) {
      console.warn("Nomad already loaded or isLoading");
      return;
    }
    setIsLoading(true);
    const relay = relayInit("wss://nos.lol/");
    await relay.connect();
    try {
      const nomad = await Nomad.fromHandleOrEventId(
        idOrHandle,
        relay,
        eventEmitter,
      );
      nomad.init();
      setIsLoaded(true);
      setNomad(nomad);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNomad(idOrHandle);

    eventEmitter.on("status", (status: NomadStatus) => {
      setStatus(status);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idOrHandle]);

  return {
    nomad,
    isLoaded,
    error,
    isLoading,
    status,
    eventEmitter,
    ...(nomad?.nomadRuntime?.getRuntimeInterface<T>() as T),
  };
};
