# A Little Box of Goodies

A complete Next.js App Router / TypeScript / Tailwind CSS / Framer Motion app with SQLite persistence through Prisma.

## Run

Requires Node.js 22.12+ and npm. Copy `.env.example` to `.env`, then:

```sh
npm install
npm run db:setup
npm run dev
```

Open http://localhost:3000. An example box is available at `/p/a-little-demo`.

## Production

```sh
npm run db:setup
npm run build
npm start
```

Set `NEXT_PUBLIC_APP_URL` to the actual HTTPS origin **before building** so Open Graph URLs point to the public host. Set `DATABASE_URL` to a persistent SQLite file (for example `file:/data/goodies.db`) on a Node.js host with a durable disk. Back up this file. A single-instance deployment is appropriate for this SQLite setup. Ephemeral/serverless disks, including a standard Vercel deployment, will not preserve data. The supplied Sites host runs Cloudflare Workers and cannot directly run this Node.js/Prisma SQLite configuration; no fake static deployment is supplied.

## Flows

- `/`: pack a box, apply one of four additive templates, customize ten goodie types, upload image/audio files up to 1 MB, draw a doodle, add notes, adjust quantities, choose anonymity.
- Drafts save immediately to localStorage and after a short delay to the backend. A server-generated private token grants access to each draft.
- `/send/[id]#token`: generate the public link, share or copy, preview, copy the private sender link, and view opened time / recipient reply. Status refreshes every 12 seconds while the page is open.
- `/preview/[id]#token`: uses the same unboxing component without sending opened events or reactions.
- `/p/[id]`: public recipient link. Only published packages are visible. Merely loading the page or fetching its social image does not mark it opened; tapping the box does.
- `/edit/[id]#token`: edits are allowed until the first recipient opening; after opening the sender can fork a new draft.
- `/p/[id]/og`: a dynamic 1200×630 Next.js ImageResponse shipping-label preview, using the package’s actual recipient / visible sender.

## Privacy and limits

Sender tokens are 256-bit random secrets, stored hashed in the database. They travel in URL fragments and request headers, never in the recipient link. Anyone with the private sender link can manage that package; keep it private. Recipient IDs are unguessable bearer links, not account authentication. Anonymous packages omit the actual sender name from recipient HTML and metadata. Reaction permission belongs to the first opener’s browser via an HttpOnly cookie; subsequent viewers can read the package but cannot overwrite that reply. Clearing cookies loses reaction permission. There is no email or push notification integration: the delivery diary updates on the private sender page.

Media is embedded into the SQLite record to work without storage service credentials (1 MB per file; 6 MB aggregate request limit). Spotify links use embeds; other HTTPS music links open externally. Third-party playback depends on provider availability. Audio is uploaded, not recorded inside the app. Doodles support pointer/touch; the personal note provides a text alternative. Reduced-motion preferences are respected. No account signup or production abuse/rate-limiting service is configured.

## Validation

`npm run build` checks production compilation and TypeScript. With a local server running, `npm test` exercises draft privacy, publishing, anonymous metadata, opened events, private access, reaction ownership, and edit locking. Tests delete only the records they create.
