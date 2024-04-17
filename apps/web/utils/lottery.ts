//@ts-nocheck
'use strict';

type RNG = { round: number; index: number; state: Uint8Array };
type WeightedPlayers = { [_: string]: number };

/**
 * Calculate the SHA-256 hash of the given message.
 *
 * @see {@link https://github.com/AndersLindman/SHA256/blob/master/js/sha256.js} for the adaptation source.
 * @param message - Message to hash.
 * @returns Hash result.
 */
function _sha256(message: Uint8Array): Uint8Array {
  let [h0, h1, h2, h3, h4, h5, h6, h7]: number[] = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];
  const k: number[] = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98,
    0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8,
    0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
    0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
    0xc67178f2,
  ];
  const length: number = message.length;
  const byteLength: number = ((length + 72) >> 6) << 6;
  const wordLength: number = byteLength >> 2;
  const bitLength: number = length << 3;
  const m: Uint8Array = new Uint8Array(byteLength);
  m.set(message);
  m[length] = 0x80;
  m[byteLength - 4] = bitLength >>> 24;
  m[byteLength - 3] = (bitLength >>> 16) & 0xff;
  m[byteLength - 2] = (bitLength >>> 8) & 0xff;
  m[byteLength - 1] = bitLength & 0xff;
  const words: Int32Array = new Int32Array(wordLength);
  for (let i: number = 0; i < words.length; i++) {
    const byteIndex: number = i << 2;
    words[i] = (m[byteIndex] << 24) | (m[byteIndex + 1] << 16) | (m[byteIndex + 2] << 8) | m[byteIndex + 3];
  }
  const w: Int32Array = new Int32Array(64);
  for (let j: number = 0; j < wordLength; j += 16) {
    for (let i: number = 0; i < 16; i++) {
      w[i] = words[j + i];
    }
    for (let i: number = 16; i < 64; i++) {
      const [v0, v1]: [number, number] = [w[i - 15], w[i - 2]];
      w[i] =
        (w[i - 16] +
          (((v0 >>> 7) | (v0 << 25)) ^ ((v0 >>> 18) | (v0 << 14)) ^ (v0 >>> 3)) +
          w[i - 7] +
          (((v1 >>> 17) | (v1 << 15)) ^ ((v1 >>> 19) | (v1 << 13)) ^ (v1 >>> 10))) &
        0xffffffff;
    }
    let [a0, a1, a2, a3, a4, a5, a6, a7]: number[] = [h0, h1, h2, h3, h4, h5, h6, h7];
    for (let i: number = 0; i < 64; i++) {
      const temp1: number =
        (a7 +
          (((a4 >>> 6) | (a4 << 26)) ^ ((a4 >>> 11) | (a4 << 21)) ^ ((a4 >>> 25) | (a4 << 7))) +
          ((a4 & a5) ^ (~a4 & a6)) +
          k[i] +
          w[i]) &
        0xffffffff;
      const temp2: number =
        ((((a0 >>> 2) | (a0 << 30)) ^ ((a0 >>> 13) | (a0 << 19)) ^ ((a0 >>> 22) | (a0 << 10))) +
          ((a0 & a1) ^ (a0 & a2) ^ (a1 & a2))) &
        0xffffffff;
      [a0, a1, a2, a3, a4, a5, a6, a7] = [
        (temp1 + temp2) & 0xffffffff,
        a0,
        a1,
        a2,
        (a3 + temp1) & 0xffffffff,
        a4,
        a5,
        a6,
      ];
    }
    h0 = (h0 + a0) & 0xffffffff;
    h1 = (h1 + a1) & 0xffffffff;
    h2 = (h2 + a2) & 0xffffffff;
    h3 = (h3 + a3) & 0xffffffff;
    h4 = (h4 + a4) & 0xffffffff;
    h5 = (h5 + a5) & 0xffffffff;
    h6 = (h6 + a6) & 0xffffffff;
    h7 = (h7 + a7) & 0xffffffff;
  }
  const hash: Uint8Array = new Uint8Array(32);
  for (let i: number = 0; i < 4; i++) {
    const displacement: number = 8 * (3 - i);
    hash[i] = (h0 >>> displacement) & 0xff;
    hash[i + 4] = (h1 >>> displacement) & 0xff;
    hash[i + 8] = (h2 >>> displacement) & 0xff;
    hash[i + 12] = (h3 >>> displacement) & 0xff;
    hash[i + 16] = (h4 >>> displacement) & 0xff;
    hash[i + 20] = (h5 >>> displacement) & 0xff;
    hash[i + 24] = (h6 >>> displacement) & 0xff;
    hash[i + 28] = (h7 >>> displacement) & 0xff;
  }
  return hash;
}

/**
 * Create a new RNG structure from the given seed.
 *
 * @param seed - Seed value to use to initialize the RNG structure.
 * @returns The newly-created RNG structure.
 */
function _rngIni(seed: string): RNG {
  return {
    round: 0,
    index: 0,
    state: _sha256(new TextEncoder().encode(seed)),
  };
}

/**
 * Extract a single bit from the given RNG structure.
 *
 * @param rng - The RNG structure to use for bit-extraction.
 * @returns The extracted bit.
 */
function _rngGet(rng: RNG): 0 | 1 {
  if (256 === rng.index) {
    [rng.index, rng.state] = [0, _sha256(Uint8Array.from(Array.from(rng.state).concat(rng.round++)))];
  }
  const bit: boolean = !!(rng.state[rng.index >> 3] & (1 << rng.index % 8));
  rng.index++;
  return bit ? 1 : 0;
}

/**
 * Obtain a uniformly-random number up to, but excluding, the given limit.
 *
 * @see {@link https://arxiv.org/pdf/1304.1916} "Optimal Discrete Uniform Generation from Coin Flips, and Applications", J&#00e9;r&#00e9;mie Lumbroso (2013).
 * @param rng - The RNG structure to use for bit extraction.
 * @param max - The maximum (exclusive) value to return.
 * @returns A uniformly-random number between 0 (inclusive) and {@link max} (exclusive).
 */
function _fdr(rng: RNG, max: number): number {
  const bmax: bigint = BigInt(max);
  let [limit, value]: [bigint, bigint] = [1n, 0n];
  // eslint-disable-next-line
  while (true) {
    [limit, value] = [limit << 1n, (value << 1n) + BigInt(_rngGet(rng))];
    if (bmax <= limit) {
      if (value < bmax) {
        return Number(value);
      } else {
        [limit, value] = [limit - bmax, value - bmax];
      }
    }
  }
}

// --------------------------------------------------------------------------------------------------------------------

/**
 * Sort a copy of the given array.
 *
 * @param data - Array to sort.
 * @returns The sorted array.
 */
function _srt<T>(data: T[]): T[] {
  const elements: T[] = Array.from(data);
  elements.sort((a, b) => (a < b ? -1 : b < a ? 1 : 0));
  return elements;
}

/**
 * Copy the contents of the given object into a new object and return it.
 *
 * @param data - Object to copy.
 * @returns The copied object.
 */
function _cpy<T>(data: { [_: string]: T }): { [_: string]: T } {
  return Object.fromEntries(Object.entries(data));
}

// --------------------------------------------------------------------------------------------------------------------

/**
 * Select a single player from the weighted ones given, using the given {@link RNG} instance.
 *
 * @param rng - {@link RNG} to use.
 * @param players - Players and their mapped weights.
 * @returns The selected player.
 */
function _sel(rng: RNG, players: WeightedPlayers): string {
  const selected: number = _fdr(
    rng,
    Object.values(players).reduce((prev: number, curr: number): number => prev + curr, 0),
  );
  let current: number = 0;
  return _srt(Object.keys(players))
    .map((player: string): string | null => {
      current += players[player];
      return current - players[player] <= selected && selected < current ? player : null;
    })
    .filter((player: string | null): boolean => player !== null)[0]!;
}

/**
 * Perform a weighted permutation of the given players and their weights.
 *
 * @param rng - {@link RNG} to use.
 * @param players - Players and their mapped weights.
 * @param limit - Number of elements to return
 * @returns The ordered player names.
 */
function _ord(rng: RNG, players: WeightedPlayers, limit: number | null = null): string[] {
  limit ??= Object.keys(players).length;
  const pending: WeightedPlayers = _cpy(players);
  const result: string[] = [];
  for (let i: number = 0; i < limit; i++) {
    const player: string = _sel(rng, pending);
    result.push(player);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete pending[player];
  }
  return result;
}

// --------------------------------------------------------------------------------------------------------------------

/**
 * Perform a halving round, returning:
 *
 * - the order in which the players were selected,
 * - a mapping from winners to their new weights,
 * - a list of losers, in the order they were selected, and
 * - a delta, representing the proportional weight extracted from losers to winners.
 *
 * @param seed - The seed to use for {@link RNG} initialization.
 * @param players - Players and their mapped weights.
 * @returns A mapping from `order`, `winners`, `losers`, and `delta` to the corresponding halving results.
 */
function halve(
  seed: string,
  players: WeightedPlayers,
): {
  order: string[];
  winners: WeightedPlayers;
  losers: string[];
  delta: number;
} {
  const rng: RNG = _rngIni(seed);
  const order: string[] = _ord(rng, players);
  const winners: WeightedPlayers = {};
  const losers: string[] = [];
  const limit: number = order.length >> 1;
  let accumulated: number = 0;
  for (let i: number = 0; i < order.length; i++) {
    if (i < limit) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      winners[order[i]] = players[order[i]];
    } else {
      losers.push(order[i]);
      accumulated += players[order[i]];
    }
  }
  const delta: number = Math.floor(accumulated / limit);
  for (const key in winners) {
    winners[key] += delta;
  }
  return { order, winners, losers, delta };
}

/**
 * Return the number of having rounds required to completely determine a single winner.
 *
 * @param players - The players and their mapped weights.
 * @returns The number of halving rounds required.
 */
function rounds(players: WeightedPlayers): number {
  return Math.max(0, Object.keys(players).length.toString(2).length - 1);
}

/**
 * Simulate the given weighted players so as to determine their chances of passing a single halving round.
 *
 * @param {string} seed - Seed to use for simulation.
 * @param {WeightedPlayers} players - The players and their mapped weights.
 * @param {number} samplings - Number of simulations to execute.
 * @returns {WeightedPlayers} A mapping from player name to survival probability.
 */
function simulate(seed: string, players: WeightedPlayers, samplings: number): WeightedPlayers {
  const names: string[] = Object.keys(players);
  const counts: WeightedPlayers = Object.fromEntries(names.map((name) => [name, 0]));
  const rng: RNG = _rngIni(seed);
  for (let i: number = 0; i < samplings; i++) {
    _ord(rng, players, names.length >> 1).forEach((name) => {
      counts[name]++;
    });
  }
  return Object.fromEntries(Object.entries(counts).map(([player, count]) => [player, count / samplings]));
}

/**
 * Distribute the total power in buckets.
 *
 * This function will sort the given players' power, and group them in buckets of roughly equal
 * number of players.
 * For each bucket, this function will calculate its endpoints and add them to the resulting array in order.
 *
 * @param players - The players and their mapped weights.
 * @param buckets - The number of buckets to distribute on.
 * @returns A list of the buckets.
 */
function bucketize(players: WeightedPlayers, buckets: number = 20): { min: number; max: number }[] {
  const powers: number[] = Object.values(players);
  powers.sort((left: number, right: number): number => right - left);

  const delta: number = powers.length / buckets;

  const result: { min: number; max: number }[] = [];
  let start: number = powers[0];

  let members: number = 0;
  for (let i: number = 0; i < powers.length - 1; i++) {
    members++;
    if (delta <= members) {
      result.push({ max: start, min: powers[i] });
      start = powers[i];
      members -= delta;
    }
  }

  return result;
}

/**
 * Estimate the chances of survival given a bucketization and a power input.
 *
 * @param buckets - A list of the buckets.
 * @param power - The power input to estimate for.
 * @returns The estimated probability (mostly in line with simulations).
 */
function estimate(buckets: { min: number; max: number }[], power: number): number {
  if (buckets[0].max < power) {
    return 1;
  } else if (power <= buckets[buckets.length - 1].min) {
    return 0;
  }
  const { max, min, idx }: { max: number; min: number; idx: number } = buckets
    .map(({ max, min }: { max: number; min: number }, idx: number): { max: number; min: number; idx: number } | null =>
      min < power && power <= max ? { max, min, idx } : null,
    )
    .filter(
      (x: { max: number; min: number; idx: number } | null): x is { max: number; min: number; idx: number } =>
        null !== x,
    )[0];

  return (buckets.length - idx + (power - min) / (max - min) - 1) / buckets.length;
}

// --------------------------------------------------------------------------------------------------------------------

export type { WeightedPlayers };
export { halve, rounds, simulate, bucketize, estimate };
