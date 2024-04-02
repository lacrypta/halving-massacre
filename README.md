# Halving Massacre

Halving Massacre monorepo. [Game Rules](./RULES.md)

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: another [Next.js](https://nextjs.org/) app
- `@halving-massacre/nomad`: Nomad react hooks
- `@halving-massacre/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@halving-massacre/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Install all dependencies

You'll need `pnpm`

```bash
pnpm install
```

### Setup .env for web

Copy the .env template

```bash
cp apps/web/.env.example apps/web/.env
```

Edit the proper values in the .env file

```ini
## Public
NEXT_PUBLIC_TICKET_PRICE="210" # In sats
NEXT_PUBLIC_TICKET_DESTINATION_PUBKEY="Ticket seller pubkey" # Who will receive the ticket payment
NEXT_PUBLIC_URLX_PUBKEY="e17feb5f2cf83546bcf7fd9c8237b05275be958bd521543c2285ffc6c2d654b3" # Nostr pubkey that emits the zapReceipt
NEXT_PUBLIC_MASSACRE_SETUP_ID="1" # EventID of the Massacre Game instance
NEXT_PUBLIC_PUBLISHER_PUBKEY="93163dd539d5ffca9020657b3021109a19cee08ce02b93d944422e3aeec76512" # Responsable of emitting game events


## Private
NOSTR_PRIVATE_KEY="MOCK_PRIVATE_KEY" # Responsable of emitting game events
```

### Build

To build all apps and packages, run the following command:

```
cd halving-massacre
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd halving-massacre
pnpm dev
```

## Made by with Eggs by:

- [La Crypta](https://lacrypta.ar)
- [LaWallet](https://lawallet.io)
