//github.com/textileio/js-examples/blob/master/user-mailbox-setup/src/App.tsx

import { Private, PrivateKey } from '@textile/crypto';
import { createUserAuth, KeyInfo, UserAuth } from '@textile/security';
import Client from '@textile/threads-client';
import ThreadID from '@textile/threads-id';
import { MailboxEvent, UserMessage, Users } from '@textile/users';
import React, { useCallback, useEffect, useState } from 'react';

import { DecryptedInbox } from './types';

const TextileApp = ({ identity }: { identity: PrivateKey }) => {
  const [textile, setTextile] = useState<Client>();
  const [textileUsers, setTextileUsers] = useState<Users>();
  const [threadId, setThreadId] = useState<ThreadID>();
  const [inbox, setInbox] = useState<DecryptedInbox[]>([]);
  const [mailboxId, setMailboxId] = useState<string>();

  const [curMsgIdx, setCurMsgIdx] = useState<number>(1);

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
    if (err) {
      console.error(err);
      return;
    }
    if (!reply || !reply.message) {
      console.log('no reply ...');
    }

    const message = await messageDecoder(reply.message);
    setInbox((old) => [...old, message]);
  };

  useEffect(() => {
    const keyInfo: KeyInfo = {
      key: process.env.TEXTILE_KEY as string,
      secret: process.env.TEXTILE_SECRET as string,
    };
    (async () => {
      // const client = await Client.withKeyInfo(keyInfo);
      // const token = await client.getToken(identity);
      // console.log(token);
      // setTextile(client);

      //https://textileio.github.io/js-textile/docs/hub.createuserauth
      //const expiration = new Date(Date.now() + 120 * 1000);
      // const userAuth: UserAuth = await createUserAuth(
      //   keyInfo.key,
      //   keyInfo.secret ?? '',
      //   expiration,
      // );

      //const _users = await Users.withUserAuth(userAuth);
      const _users = await Users.withKeyInfo({
        key: keyInfo.key,
      });

      const uToken = await _users.getToken(identity);
      console.log('uToken', uToken);
      setTextileUsers(_users);
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
    let close: { close: () => void };
    (async () => {
      const mailboxId = await textileUsers.setupMailbox();
      console.log('mailboxId', mailboxId);
      setMailboxId(mailboxId);

      close = textileUsers.watchInbox(mailboxId, handleNewMessage);

      const messages = await textileUsers.listInboxMessages();
      const _inbox: DecryptedInbox[] = [];
      for await (const message of messages) {
        inbox.push(await messageDecoder(message));
      }
      setInbox(_inbox);
    })();
    return () => {
      if (close) close.close();
    };
  }, [textileUsers]);

  const sendMessageToSelf = async () => {
    const newMessage = `hello world ${curMsgIdx}`;
    const encoded = new TextEncoder().encode(newMessage);
    setCurMsgIdx((old) => old + 1);
    await textileUsers.sendMessage(identity, identity.public, encoded);
  };

  return (
    <div>
      {mailboxId ? (
        <>
          mailbox id: {mailboxId}
          <br />
          <button onClick={sendMessageToSelf}>send message to yourself</button>
        </>
      ) : (
        <div>Standby, were waiting for the mailbox to arrive</div>
      )}
      <h1>Inbox: </h1>
      <ul>
        {inbox.map((msg, i) => (
          <li key={`msg-${i}`}>
            id: {msg.id} <br /> from: {msg.from} <br /> body: {msg.body}{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextileApp;
