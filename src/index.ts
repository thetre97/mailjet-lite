import fetch from 'node-fetch';

import {
  ClientOptions,
  Message,
  MessageResponse,
  PayloadResponse,
} from './types';

export async function createClient(options: ClientOptions) {
  const { publicKey, privateKey, version = '3.1' } = options;

  const endpoint = `https://api.mailjet.com/${version}/send`;
  const authorization = Buffer.from(
    `${publicKey.trim()}:${privateKey.trim()}`
  ).toString('base64');

  const send = async (
    messages: Message | Message[]
  ): Promise<MessageResponse | MessageResponse[]> => {
    const payload = Array.isArray(messages) ? messages : [messages];

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authorization}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok)
      throw new Error(
        (await response.text()) ||
          'There was an error whilst sending this request.'
      );

    const { Messages }: PayloadResponse = await response.json();
    if (Array.isArray(messages)) return Messages;
    return Messages[0];
  };

  return { send };
}
