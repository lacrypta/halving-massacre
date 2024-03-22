"use strict";

// Lotter v3

/**
 * Calculate the SHA-256 hash of the given message.
 *
 * @see {@link https://github.com/AndersLindman/SHA256/blob/master/js/sha256.js} for the adaptation source.
 * @param {Uint8Array} message - Message to hash.
 * @returns {Uint8Array} Hash result.
 */
function _sha256(message) {
  let [h0, h1, h2, h3, h4, h5, h6, h7] = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
    0x1f83d9ab, 0x5be0cd19,
  ];
  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];
  const length = message.length;
  const byteLength = ((length + 72) >> 6) << 6;
  const wordLength = byteLength >> 2;
  const bitLength = length << 3;
  const m = new Uint8Array(byteLength);
  m.set(message);
  m[length] = 0x80;
  m[byteLength - 4] = bitLength >>> 24;
  m[byteLength - 3] = (bitLength >>> 16) & 0xff;
  m[byteLength - 2] = (bitLength >>> 8) & 0xff;
  m[byteLength - 1] = bitLength & 0xff;
  const words = new Int32Array(wordLength);
  for (let i = 0; i < words.length; i++) {
    const byteIndex = i << 2;
    words[i] =
      (m[byteIndex] << 24) |
      (m[byteIndex + 1] << 16) |
      (m[byteIndex + 2] << 8) |
      m[byteIndex + 3];
  }
  const w = new Int32Array(64);
  for (let j = 0; j < wordLength; j += 16) {
    for (let i = 0; i < 16; i++) {
      w[i] = words[j + i];
    }
    for (let i = 16; i < 64; i++) {
      const [v0, v1] = [w[i - 15], w[i - 2]];
      w[i] =
        (w[i - 16] +
          (((v0 >>> 7) | (v0 << 25)) ^
            ((v0 >>> 18) | (v0 << 14)) ^
            (v0 >>> 3)) +
          w[i - 7] +
          (((v1 >>> 17) | (v1 << 15)) ^
            ((v1 >>> 19) | (v1 << 13)) ^
            (v1 >>> 10))) &
        0xffffffff;
    }
    let [a0, a1, a2, a3, a4, a5, a6, a7] = [h0, h1, h2, h3, h4, h5, h6, h7];
    for (let i = 0; i < 64; i++) {
      const temp1 =
        (a7 +
          (((a4 >>> 6) | (a4 << 26)) ^
            ((a4 >>> 11) | (a4 << 21)) ^
            ((a4 >>> 25) | (a4 << 7))) +
          ((a4 & a5) ^ (~a4 & a6)) +
          k[i] +
          w[i]) &
        0xffffffff;
      const temp2 =
        ((((a0 >>> 2) | (a0 << 30)) ^
          ((a0 >>> 13) | (a0 << 19)) ^
          ((a0 >>> 22) | (a0 << 10))) +
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
  const hash = new Uint8Array(32);
  for (let i = 0; i < 4; i++) {
    const disp = 8 * (3 - i);
    hash[i] = (h0 >>> disp) & 0xff;
    hash[i + 4] = (h1 >>> disp) & 0xff;
    hash[i + 8] = (h2 >>> disp) & 0xff;
    hash[i + 12] = (h3 >>> disp) & 0xff;
    hash[i + 16] = (h4 >>> disp) & 0xff;
    hash[i + 20] = (h5 >>> disp) & 0xff;
    hash[i + 24] = (h6 >>> disp) & 0xff;
    hash[i + 28] = (h7 >>> disp) & 0xff;
  }
  return hash;
}

/**
 * The type of an RNG structure.
 *
 * @typedef {{ round: Number, index: Number, state: Uint8Array }} RNG
 */

/**
 * Create a new RNG structure from the given seed.
 *
 * @param {string} seed - Seed value to use to initialize the RNG structure.
 * @returns {RNG} The newly-created RNG structure.
 */
function _rngIni(seed) {
  return {
    round: 0,
    index: 0,
    state: _sha256(new TextEncoder().encode(seed)),
  };
}

/**
 * Extract a single bit from the given RNG structure.
 *
 * @param {RNG} rng - The RNG structure to use for bit-extraction.
 * @returns {0 | 1} The extracted bit.
 */
function _rngGet(rng) {
  if (256 === rng.index) {
    [rng.index, rng.state] = [
      0,
      _sha256(Uint8Array.from(Array.from(rng.state).concat(rng.round++))),
    ];
  }
  const bit = !!(rng.state[rng.index >> 3] & (1 << rng.index % 8));
  rng.index++;
  return bit ? 1 : 0;
}

/**
 * Obtain a uniformly-random number up to, but excluding, the given limit.
 *
 * @see {@link https://arxiv.org/pdf/1304.1916} "Optimal Discrete Uniform Generation from Coin Flips, and Applications", J&#00e9;r&#00e9;mie Lumbroso (2013).
 * @param {RNG} rng - The RNG structure to use for bit extraction.
 * @param {Number} max - The maximum (exclusive) value to return.
 * @returns {Number} A uniformly-random number between 0 (inclusive) and {@link max} (exclusive).
 */
function _fdr(rng, max) {
  let [limit, value] = [1, 0];
  while (true) {
    [limit, value] = [limit << 1, (value << 1) + _rngGet(rng)];
    if (max <= limit) {
      if (value < max) {
        return value;
      } else {
        [limit, value] = [limit - max, value - max];
      }
    }
  }
}

/**
 * Obtain a uniformly-random sample from the set of number up to a given size, of a limited cardinality.
 *
 * @see {@link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle} Fisher--Yates Shuffle Algorithm.
 * @param {RNG} rng - The RNG structure to use for position generation.
 * @param {Number} size - The number of elements to draw from.
 * @param {Number} limit - The number of elements to actually draw.
 * @returns {Number[]} An array of the selected numbers.
 */
function _fys(rng, size, limit) {
  const values = [];
  for (let i = 0; i < size; i++) {
    values[i] = i;
  }
  const elements = [];
  for (let i = 0; i < limit; i++) {
    const j = i + _fdr(rng, size - i);
    [elements[i], values[j]] = [values[j], values[i]];
  }
  return elements;
}

/**
 * Build a Vose's "Alias Method" sampling table from the given odds.
 *
 * This function implements Vose's "Alias Method" table building using odds instead of probabilities in order to minimize floating point errors.
 * That is to say: an input of the form "[1, 2, 3]" represents three possible outcomes: "2" is three times as likely as "0" and "1" is twice as likely as "0"; in other words: outcomes "0", "1", and "2", have "1 to 2 to 3" odds.
 * Another way of looking at this is that the input specifies the proportionality constants the outcomes adhere to.
 *
 * As an additional example, consider an input of the form "[0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]": this represents the weighted totals obtained by rolling two 6-sided dice (nb. "0" and "1" have 0 odds); contrast that with "[0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 3, 2, 1]": the weighted totals obtained by rolling an 8-sided and a 4-sided die.
 *
 * This variation on Vose's "Alias Method" starts off by scaling all proportionalities by the number of outcomes (note how this does not change the proportions themselves), and using the sum of the original proportionality values as the cutoff point; contrast this to Vose's method, which scales the probabilities by the average probability and uses "1" as the cutoff.
 * Other than that, this function is a straightforward implementation of the algorithm presented in the reference below (note that the enhancements proposed therein regarding numerical stability are not needed nor implemented here, since we deal with integer operations only).
 *
 *
 * @see {@link https://www.keithschwarz.com/darts-dice-coins} Darts, Dice, and Coins: Sampling from a Discrete Distribution --- Keith Schwarz (2011)
 * @param {Number[]} odds - An array with the odds for each position.
 * @returns {[Number[], Number[]]} - Two arrays with as many elements as the input array, the first one represent's Vose's "limits" array, the second one the "aliases" array for corresponding position in the input array.
 */
function _voseBuildTable(odds) {
  const total = odds.reduce((prev, curr) => prev + curr, 0);

  const smalls = [];
  const larges = [];
  const scaledOdds = odds.map((odd) => odds.length * odd);
  scaledOdds.forEach((scaledOdd, i) =>
    (scaledOdd < total ? smalls : larges).push(i)
  );

  const limits = new Array(odds.length).fill(0);
  const aliases = new Array(odds.length).fill(0);
  while (smalls.length) {
    const [small, large] = [smalls.pop(), larges.pop()];
    [limits[small], aliases[small]] = [scaledOdds[small], large];
    scaledOdds[large] -= total - scaledOdds[small];
    (scaledOdds[large] < total ? smalls : larges).push(large);
  }
  larges.forEach((large) => {
    [limits[large], aliases[large]] = [total, large];
  });

  return [limits, aliases];
}

/**
 * Sample from an already-constructed alias table (generated via Vose's "Alias Method").
 *
 * @see {@link https://www.keithschwarz.com/darts-dice-coins} Darts, Dice, and Coins: Sampling from a Discrete Distribution --- Keith Schwarz (2011)
 * @param {RNG} rng - The RNG structure to use for coordinates generation.
 * @param {Number[]} limits - The "limits" array generated via Vose's "Alias Method".
 * @param {Number[]} aliases - The "aliases" array generated via Vose's "Alias Method".
 * @returns {Number} - The sampled position according to the input odds.
 */
function _voseSample(rng, limits, aliases) {
  const i = _fdr(rng, limits.length);
  const j = _fdr(
    rng,
    limits.reduce((prev, curr) => Math.max(prev, curr))
  );
  return j < limits[i] ? i : aliases[i];
}

/**
 * Build Vose's "Alias Method" sampling tables and perform an actual sample with it.
 *
 * @see {@link https://www.keithschwarz.com/darts-dice-coins} Darts, Dice, and Coins: Sampling from a Discrete Distribution --- Keith Schwarz (2011)
 * @param {RNG} rng - The RNG structure to use for coordinates generation.
 * @param {Number[]} odds - An array with the odds for each position.
 * @returns {Number} - The sampled position according to the input odds.
 */
function _voseBuildTableAndSample(rng, odds) {
  return _voseSample(rng, ..._voseBuildTable(odds));
}

/**
 * Iterate Vose's "Alias Method" the given number of times to simulate non-uniform sampling without replacement.
 *
 * @param {RNG} rng - The RNG structure to use for coordinates generation.
 * @param {Number[]} odds - An array with the odds for each position.
 * @param {Number} iterations - The number of iterations to perform.
 * @returns {Number} - The sampled positions according to the input odds.
 */
function _voseIterated(rng, odds, iterations) {
  const participants = Array.from(Array(odds.length).keys());
  const currentOdds = Array.from(odds);
  const result = [];
  for (let i = 0; i < iterations; i++) {
    const winner = _voseBuildTableAndSample(rng, currentOdds);
    result.push(participants[winner]);
    participants.splice(winner, 1);
    currentOdds.splice(winner, 1);
  }
  return result;
}

// --------------------------------------------------------------------------------------------------------------------

/**
 * Run a uniformly-random lottery amongst the given players, with the given seed, resulting in the given number of winners.
 *
 * @param {string} seed - Seed to use.
 * @param {Number} winners - Number of winners to select.
 * @param {any[]} players - Players in the lottery.
 * @returns {any[]} The selected players.
 */
function lottery(seed, winners, players) {
  return _fys(_rngIni(seed), players.length, winners).map((i) => players[i]);
}

/**
 * Perform a "Halve and Distribute" operation on the given players and weights.
 *
 * The "Halve and Distribute" operation entails the following steps:
 *
 * 1. Calculate the highest power of two less than or equal to half of the players, call it K.
 * 2. Using the input odds, sample without replacement to obtain K winners.
 * 3. For every "losing" player, totalize their weights, and divide that number by K, call it L.
 * 4. Build a new odds dictionary with the winners as keys and their original weight plus L as their new weight.
 *
 * @param {string} seed - Seed to use.
 * @param {Object.<string, number>} weightedPlayers - A dictionary mapping player names to odds.
 * @returns {Object.<string, number>} - The resulting dictionary mapping player names to odds.
 */
function halve(seed, weightedPlayers) {
  const selected = _voseIterated(
    _rngIni(seed),
    Object.values(weightedPlayers),
    Object.keys(weightedPlayers).length >> 1
  ).map((i) => Object.keys(weightedPlayers)[i]);
  const toDistributeEach =
    Object.entries(weightedPlayers)
      .map(([player, weight]) => (selected.includes(player) ? 0 : weight))
      .reduce((prev, curr) => prev + curr, 0) / selected.length;
  return Object.fromEntries(
    selected.map((player) => [
      player,
      weightedPlayers[player] + toDistributeEach,
    ])
  );
}

/**
 * Return the number of rounds required to eliminate all but one winner.
 *
 * @param {Object.<string, number>} weightedPlayers - A dictionary mapping player names to odds.
 * @returns {Number} - The number of rounds required.
 */
function numberOfRounds(weightedPlayers) {
  let n = 0;
  let l = Object.keys(weightedPlayers).length;
  while (l) {
    l >>= 1;
    n++;
  }
  return Math.max(n - 1, 0);
}

// --------------------------------------------------------------------------------------------------------------------

// console.log(
//   lottery("some seed", 5, [
//     "Alice",
//     "Bob",
//     "Charlie",
//     "Dave",
//     "Eve",
//     "Frank",
//     "Grace",
//     "Heidi",
//     "Ivan",
//     "Judy",
//     "Mallory",
//     "Nina",
//     "Oscar",
//     "Peggy",
//     "Rupert",
//     "Sybil",
//     "Ted",
//     "Victor",
//     "Walter",
//   ])
// );

// const participants = {
//   Alice: 1,
//   Bob: 2,
//   Charlie: 3,
//   Dave: 4,
//   Eve: 5,
//   Frank: 6,
//   Grace: 7,
//   Heidi: 8,
//   Ivan: 9,
//   Judy: 10,
//   Mallory: 11,
//   Nina: 12,
//   Oscar: 13,
//   Peggy: 14,
//   Rupert: 15,
//   Sybil: 16,
//   Ted: 17,
//   Victor: 18,
//   Walter: 19,
// };

// const participants2 = halve("some seed", participants);
// const participants3 = halve("some other seed", participants2);
// const participants4 = halve("yet another seed", participants3);
// const participants5 = halve("there can be only one", participants4);

// console.log(participants);
// console.log(participants2);
// console.log(participants3);
// console.log(participants4);
// console.log(participants5);

export { halve, lottery, numberOfRounds };

// console.log(numberOfRounds(participants));
