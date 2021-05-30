import { VStack } from '@chakra-ui/react';
import MailboxItem from 'components/molecules/MailboxItem';
import OrbitDbTest from 'components/organisms/OrbitDbTest';
import { useOrbitDb } from 'contexts/OrbitDB';
import { State, StoredMessage } from 'contexts/State';
import { useEffect } from 'react';

type MailboxScreenProps = {
  state: State;
  openMessage: (id: string) => void;
  addMessage: (msg: StoredMessage) => void
};

function MailboxScreen(props: MailboxScreenProps) {
  const {state, addMessage} = props;
  
  // const { odb, db, setDbName } = useOrbitDb();

  // useEffect(() => {
  //   //todo: set to app states' did
  //   setDbName('did:key:z6MkvpyzVtYLETJFaYXs3My4vtXMdZs7SjmmQQEpL9nH7MmY')
  // },[setDbName]);

  // useEffect(() => {
  //   if (!db) return;
  //   db.events.on('replicated', (address: string) => {
  //     const all = db
  //       .iterator({ limit: 10 })
  //       .collect()
  //       .reverse()
  //       .map((e: any) => e.payload.value);
  //     const latest = all[0]; //<-- a really bad hack.
  //     // const newMsg = {
  //     //   id: ;
  //     //   date: number;
  //     //   sender: string;
  //     //   status: MessageSavingStatus;
  //     //   subject: string;
  //     //   content: string;
  //     // }
  //   });
  // }, [db]);

  return (
    <VStack align="stretch" spacing={0} width="inherit">
      {props.state.messages.map((message, idx) => (
        <MailboxItem
          key={idx}
          message={message}
          onClick={() => props.openMessage(message.id)}
        />
      ))}
      <OrbitDbTest addMessage={addMessage}/>
    </VStack>
  );
}

export default MailboxScreen;
