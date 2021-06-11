import fetch from 'node-fetch';

import { ClientOptions, Mailjet, Message, PayloadResponse } from './types';

export * from './types';

export function createClient(options: ClientOptions): Mailjet {
  const { publicKey, privateKey, version = '3.1' } = options;

  const endpoint = `https://api.mailjet.com/v${version}/send`;
  const authorization = Buffer.from(
    `${publicKey.trim()}:${privateKey.trim()}`
  ).toString('base64');

  const send = async (messages: Message | Message[]) => {
    const payload = Array.isArray(messages) ? messages : [messages];

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authorization}`,
      },
      body: JSON.stringify({ Messages: payload }),
    });

    if (!response.ok)
      throw new Error(
        (await response.text()) ||
          'There was an error whilst sending this request.'
      );

    const { Messages }: PayloadResponse = await response.json();
    return Messages;
  };

  return { send };
}
