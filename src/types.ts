export interface ClientOptions {
  privateKey: string;
  publicKey: string;
  version?: '3.1' | '3';
}

export interface MessageRecipient {
  Email: string;
  Name?: string;
}

export interface MessageAttachment {
  Base64Content: string;
  ContentID?: string;
  ContentType: string;
  Filename: string;
}

export interface Message {
  Attachments?: MessageAttachment[];
  Bcc?: MessageRecipient[];
  Cc?: MessageRecipient[];
  CustomID?: string;
  EventPayload?: string;
  From?: MessageRecipient;
  HTMLPart?: string;
  Headers?: Record<string, string>;
  InlinedAttachments?: MessageAttachment[];
  SandboxMode?: boolean;
  Subject?: string;
  TemplateID?: number;
  TemplateLanguage?: boolean;
  TextPart?: string;
  To: MessageRecipient[];
  URLTags?: string;
  Variables?: Record<string, unknown>;
}

export interface MessageRecipientResponse extends MessageRecipient {
  MessageHref: string;
  MessageID: string;
  MessageUUID: string;
}

export interface MessageError {
  ErrorCode: string;
  ErrorIdentifier: string;
  ErrorMessage: string;
  ErrorRelatedTo: string[];
  StatusCode: number;
}

export interface MessageResponse {
  Bcc?: MessageRecipientResponse[];
  Cc?: MessageRecipientResponse[];
  CustomID?: string;
  Errors?: MessageError[];
  Status: 'success' | 'error';
  To: MessageRecipientResponse[];
}

export interface PayloadResponse {
  Messages: MessageResponse[];
}

export interface Mailjet {
  send(messages: Message | Message[]): Promise<MessageResponse[]>
}
