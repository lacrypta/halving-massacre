'use server';

import { NextResponse } from 'next/server';
import { finishEvent, getPublicKey, nip19, type EventTemplate } from 'nostr-tools';
import { buildZapRequestEvent, nowInSeconds } from '@lawallet/utils';
import { requestInvoice } from '@lawallet/utils/actions';
// import { normalizeWalias, validateEmail } from '../../../lib/utils';
import crypto from 'crypto';

// Load environment variables
const NOSTR_PRIVATE_KEY = process.env.NOSTR_PRIVATE_KEY!;
const NOSTR_PUBLIC_KEY = getPublicKey(NOSTR_PRIVATE_KEY);
const DESTINATION_PUBKEY = process.env.NEXT_PUBLIC_TICKET_DESTINATION_PUBKEY!;
const TICKET_PRICE = parseInt(process.env.NEXT_PUBLIC_TICKET_PRICE!);

// Response interfaces
export interface SuccessResponse {
  success: true;
  walias: string;
  invoice: string;
  eventIdReference: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export async function POST(request: Request): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // Get walias from request body
    const { walias: _walias } = await request.json();

    // console.info('await request.json()');
    // console.dir(await request.json());

    // Validate walias
    // if (!validateEmail(_walias)) {
    //   return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
    // }

    const walias = _walias;
    // const walias = normalizeWalias(_walias);

    // TODO: Check if walias has valid LUD16

    console.info(`Creating ticket for ${walias}...`);

    // ZapRequest Parameters
    const senderPubkey = NOSTR_PUBLIC_KEY;
    const receiverPubkey = DESTINATION_PUBKEY;
    const amount = TICKET_PRICE * 1000;

    // Create eventIdReference
    const eventIdReference = crypto.randomBytes(32).toString('hex');

    // Ticket Event for claiming
    const ticketEvent: EventTemplate = {
      content: 'Ticket del Halving Massacre',
      created_at: nowInSeconds(),
      kind: 1112,
      tags: [['e', eventIdReference]],
    };

    // Build ZapRequest Event
    const unsignedZapRequestEvent = buildZapRequestEvent(senderPubkey, receiverPubkey, amount) as EventTemplate;
    unsignedZapRequestEvent.tags.push(['e', eventIdReference]);
    unsignedZapRequestEvent.tags.push(['commitment', JSON.stringify(ticketEvent)]);
    unsignedZapRequestEvent.tags.push(['claimUrl', 'https://halving.lacrypta.ar/claim']);

    // Sign ZapRequest Event
    const zapRequestEvent = finishEvent(unsignedZapRequestEvent, NOSTR_PRIVATE_KEY);

    // URIEncode ZapRequest Event
    const zapRequestURI: string = encodeURI(JSON.stringify(zapRequestEvent));

    // Request invoice
    const bolt11: string = await requestInvoice(
      `https://api.lawallet.ar/lnurlp/${nip19.npubEncode(receiverPubkey)}/callback?amount=${amount}&nostr=${zapRequestURI}`,
    );

    // Check if invoice was created
    if (bolt11 == '') {
      return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
    }

    // Return success response
    return NextResponse.json({ success: true, walias, invoice: bolt11, eventIdReference });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
