import { useIpfs } from 'contexts/IPFS';
import { useOrbitDb } from 'contexts/OrbitDB';
import React, { useEffect, useState } from 'react';

const OrbitDbTest = () => {
  // eslint-disable-next-line
  const { ipfs } = useIpfs();
  // eslint-disable-next-line
  const { odb, db } = useOrbitDb();

  const [messages, setMessages] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (!db) return;
    db.events.on('replicated', (address: string) => {
      const all = db
        .iterator({ limit: 10 })
        .collect()
        .reverse()
        .map((e: any) => e.payload.value);
      setMessages(all);
    });
  }, [db]);

  return (
    <div>
      ODB
      <ul>
        {messages.map((m, i) => (
          <li key={`m-${i}`}>
            {m['the time']} | {m.doc} | {m.to}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrbitDbTest;
