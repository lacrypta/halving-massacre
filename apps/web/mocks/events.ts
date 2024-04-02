import type { Event, EventTemplate } from 'nostr-tools';

const players = {
  'agustin@lacrypta.ar': 1000000,
  'agustin@lawallet.ar': 2000000,
  'negr0@lawallet.ar': 3000000,
  'mpr@lawallet.ar': 1000000,
  'rapax@lawallet.ar': 2000000,
  'fer@lawallet.ar': 12000000,
  'jona@lawallet.com': 6000000,
  'nada@getalby.com': 3000000,
  'tuvieja@walletofsatoshi.com': 23000000,
  'en@hold.ar': 11000000,
  'tanga@iris.to': 2000000,
};

export const setupEvent: Event = {
  id: 'fe3cdbe68de72cba0e0278c9bc93156ee14848956186f4642b96f501be884f2c',
  pubkey: '9343bfa743a8f008ad26138cec571d6db452c2d846b4026359f7f72c861c2562',
  created_at: 1712026906,
  kind: 1112,
  tags: [
    ['p', '9343bfa743a8f008ad26138cec571d6db452c2d846b4026359f7f72c861c2562'],
    ['L', 'halving-massacre'],
    ['l', 'setup', 'halving-massacre'],
    ['block', '838000'],
  ],
  content: JSON.stringify({ initialPool: 'millisats', finalBlock: 840000, ticketPrice: 1000, minBet: 500 }),
  sig: '587c95d959c43f6d87c542a24b05b148715754f5d5389d3edad2bfc24d862624f3a53ca57a08ee86064103f907ab049b4663ea49e15a14585afca7cdf21ff877',
};

export const stateEvent: Event = {
  id: 'da6b0888da6ffc9fedd748acba7b253cee25cb262a24e075c773c635c3b3823e',
  pubkey: '9343bfa743a8f008ad26138cec571d6db452c2d846b4026359f7f72c861c2562',
  created_at: 1712028083,
  kind: 31111,
  tags: [
    ['e', setupEvent.id, 'wss://relay.lawallet.ar', 'setup'],
    ['e', '<id>', 'wss://relay.lawallet.ar', '<last_modified>'], // ???
    ['d', `state:${setupEvent.id}`],
    ['L', 'halving-massacre'],
    ['l', 'state', 'halving-massacre'],
    ['block', 'current_block'],
  ],
  content: JSON.stringify({
    currentBlock: 833822,
    players: players,
    nextFreeze: 833823,
    nextMassacre: 833826,
    status: 'SETUP', // | "INITIAL" | "NORMAL" | "FREEZE" | "FINAL"
    roundLength: 10,
    freezeDuration: 2,
  }),
  sig: 'ea2eee0e01376f3cf98b11376ea10e34d150eb5f811c30b9e4b4d8bcda76ea5c364b55ea4757b2b098432da1832a3f09cced2b5f8aad54bbfb1c608d2eec1122',
};

export const ticketEvent: Event = {
  id: 'e164c812ee7401c0a248a6d10bc0d0e21d4d305ae443f21e31c59a4e1dac3e76',
  pubkey: '9343bfa743a8f008ad26138cec571d6db452c2d846b4026359f7f72c861c2562',
  created_at: 1712028382,
  kind: 1112,
  tags: [
    ['e', 'zapEventIdReference'],
    ['L', 'halving-massacre'],
    ['l', 'ticket', 'halving-massacre'],
    ['l', setupEvent.id],
    ['i', 'agustin@lawallet.ar'],
    ['block', '0'],
  ],
  content: JSON.stringify({ player: 'agustin@lawallet.ar' }),
  sig: '183b92b9afb21bea2293baba7702711ec50957f26bc163954024b9d3c60d2664e040d470f284272e29307b6f14c9751ca7795e0aaad437bba364f99b6965df93',
};

export const powerReceiptEvent: Event = {
  id: '2d3c70865aad3e513c5091172c85131ff4d585cf0b398d69d0ef72d782f9e902',
  pubkey: '9343bfa743a8f008ad26138cec571d6db452c2d846b4026359f7f72c861c2562',
  created_at: 1712028651,
  kind: 1112,
  tags: [
    ['e', setupEvent.id, 'wss://relay.lawallet.ar', 'setup'],
    ['e', 'zapReceiptEventId', 'wss://relay.lawallet.ar', 'zap-receipt'],
    ['L', 'halving-massacre'],
    ['l', 'power-receipt', 'halving-massacre'],
    ['i', 'agustin@lawallet.ar'],
    ['amount', '1000000'],
    ['block', 'current_block'],
  ],
  content: JSON.stringify({ amount: 1000, player: 'agustin@lawallet.ar' }),
  sig: '17b3fea29ee3c31fb372c120711feb7bbd5ad9884d6946c13936cfd1f3c15a194cfd499eca2b1bad86059e59e9cec56785ab9a4f8f7c7a6142b171339a2c17a0',
};
