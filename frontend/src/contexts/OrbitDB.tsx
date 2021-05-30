import OrbitDB from 'orbit-db';
import React, { useContext, useEffect, useState } from 'react';
import { useIpfs } from './IPFS';

type OrbitDbContextType = {
  odb?: any; //the orbitdb instance
  db?: any; //an eventlog instance
  setDbName: (s: string) => void
};
const OrbitDbContext = React.createContext<OrbitDbContextType>({
  odb: undefined,
  db: undefined,
  setDbName: () => {}
});

const useOrbitDb = () => useContext(OrbitDbContext);

const OrbitDbProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { ipfs, ipfsHttpNode } = useIpfs();
  const [odb, setOdb] = useState<any | undefined>();
  const [db, setDb] = useState<any | undefined>();
  const [dbName, setDbName] = useState<string | undefined>();

  useEffect(() => {
    if (!ipfsHttpNode) return;
    (async () => {
      const orbitDb = await OrbitDB.createInstance(ipfsHttpNode);
      console.log('ODB Identity', orbitDb.identity.toJSON());
      setOdb(orbitDb);
    })();
  }, [ipfs, ipfsHttpNode]);

  useEffect(() => {
    if (!odb || !dbName) return;

    (async () => {
      //https://github.com/orbitdb/orbit-db/blob/main/API.md#orbitdblognameaddress
      console.debug("starting odb", dbName);
      const db = await odb.eventlog(dbName, {
        accessController: {
          write: ['*'], // Give write access to everyone
        },
      });
      
      db.events.on('replicate', (address: string) =>
        console.debug('replicate', address)
      );
      db.events.on('replicated', (address: string) =>
        console.debug('replicated', address)
      );
      db.events.on('replicate.progress', (address: string) =>
        console.debug('replicate.progress', address)
      );
      db.events.on('load', (dbname: string) =>
        console.debug('start loading', dbname)
      );
      db.events.on('ready', (dbname: string) => console.log('ready', dbname));
      console.debug("start loading odb");
      await db.load();
      setDb(db);
    })();
  }, [odb, ipfs, dbName]);

  return (
    <OrbitDbContext.Provider
      value={{
        odb,
        db,
        setDbName
      }}
    >
      {children}
    </OrbitDbContext.Provider>
  );
};

export { useOrbitDb, OrbitDbProvider };
