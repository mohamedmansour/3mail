//github.com/textileio/js-examples/blob/master/user-mailbox-setup/src/App.tsx

import { Private, PrivateKey } from '@textile/crypto';
import { KeyInfo } from '@textile/security';
import Client from '@textile/threads-client';
import ThreadID from '@textile/threads-id';
import { MailboxEvent, UserMessage, Users } from '@textile/users';
import React, { useEffect, useState } from 'react';

import { DecryptedInbox } from './types';

const TextileApp = ({ identity }: { identity: PrivateKey }) => {
  const [textile, setTextile] = useState<Client>();
  const [textileUsers, setTextileUsers] = useState<Users>();
  const [threadId, setThreadId] = useState<ThreadID>();
  const [inbox, setInbox] = useState<DecryptedInbox[]>([]);

  /**
   * Decrypts a user's inbox messages using their PrivateKey
   */
  const messageDecoder = async (message: UserMessage): Promise<DecryptedInbox> => {
    const bytes = await identity.decrypt(message.body);
    const body = new TextDecoder().decode(bytes);
    const { from } = message;
    const { readAt } = message;
    const { createdAt } = message;
    const { id } = message;
    return { body, from, readAt, sent: createdAt, id };
  };

  /**
   * Handles a new inbox listen event
   */
  const handleNewMessage = async (reply?: MailboxEvent, err?: Error) => {
    if (err) return;
    if (!reply || !reply.message) return;
    const message = await messageDecoder(reply.message);
    setInbox([...inbox, message]);
  };

  useEffect(() => {
    const keyInfo: KeyInfo = {
      key: process.env.TEXTILE_KEY as string,
      secret: process.env.TEXTILE_SECRET as string,
    };

    (async () => {
      const client = await Client.withKeyInfo(keyInfo);
      const token = await client.getToken(identity);
      console.log(token);
      setTextile(client);

      const users = await Users.withKeyInfo(keyInfo);
      const uToken = await users.getToken(identity);
      console.log('uToken', uToken);
      setTextileUsers(users);
    })();
  }, []);

  useEffect(() => {
    if (!textile) return;

    async () => {
      const _threadID: ThreadID = await textile.newDB();
      const info = await textile.getDBInfo(_threadID);
      console.log(info);

      setThreadId(_threadID);
    };
  }, [textile]);

  useEffect(() => {
    if (!textileUsers) return;
    async () => {
      const mailboxId = await textileUsers.setupMailbox();
      textileUsers.watchInbox(mailboxId, handleNewMessage);

      const messages = await textileUsers.listInboxMessages();
      const _inbox: DecryptedInbox[] = [];
      for await (const message of messages) {
        inbox.push(await messageDecoder(message));
      }
      setInbox(_inbox);
    };
  }, [textileUsers]);

  const sendMessageToSelf = async () => {
    const newMessage = 'hello world';
    const encoded = new TextEncoder().encode(newMessage);
    await textileUsers!.sendMessage(identity, identity.public, encoded);
  };

  return (
    <div>
      {identity.pubKey.toString()}{' '}
      <button onClick={sendMessageToSelf}>send message to yourself</button> <h1>Inbox</h1>
      <ul>
        {inbox.map((msg, i) => (
          <li key={`msg-${i}`}>
            {msg.from} {msg.body}{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextileApp;
