import CeramicClient from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { Box } from '@chakra-ui/layout';
import { useCeramic } from 'contexts/Ceramic';
import { useIpfs } from 'contexts/IPFS';
import { useOrbitDb } from 'contexts/OrbitDB';
import { StoredMessage } from 'contexts/State';
import React, { useEffect, useState } from 'react';

const OrbitDbTest = ({addMessage}:
  {
    addMessage: (msg: StoredMessage) => void 
  }
) => {
  const { ipfs } = useIpfs();
  const { odb, db, setDbName } = useOrbitDb();
  const { ceramic } = useCeramic();

  const [messages, setMessages] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    //todo: set to app states' did     
    if (!ceramic)
      return;

      console.log("ceramic did", ceramic.did!.id)
      //did:key:z6MkvpyzVtYLETJFaYXs3My4vtXMdZs7SjmmQQEpL9nH7MmY
    setDbName(ceramic.did!.id)
    //@ts-ignore
  }, [ceramic]);

  const convertMessage = async (ceramic: CeramicClient, latest:string) => {
    console.debug("fetching", latest , ceramic);
    const doc = await TileDocument.load(ceramic, latest  );
    const content: {
      date: string;
      message: string;
      subject: string;
    } = doc.content as any;

    // console.log(doc);
    // console.log(doc.content);

    const latestMessage: StoredMessage = {
      id: "none",
      date: (new Date(content.date)).getTime(),
      content: content.message,
      sender: "some DID",
      subject: content.subject,
      status: 'loaded'
    }
    addMessage(latestMessage);
  }


  useEffect(() => {
    if (!db || !ceramic) return;
    console.log("listening");
    db.events.on('replicated', (address: string) => {
      const all = db
        .iterator({ limit: 10 })
        .collect()
        .reverse()
        .map((e: any) => { return e.payload.value.doc});
      
      const latest = all[0];
      convertMessage(ceramic, latest);
      
      // all.forEach((msg:any) => {
      //   convertMessage(ceramic, msg);
      // })
    });
    //@ts-ignore
  }, [db, ceramic]);

  return (
    <Box position="fixed" bottom="0">
      ODB
    </Box>
  );
};

export default OrbitDbTest;
