import React, { useContext, useEffect, useState } from "react";
import {useIpfs} from './IPFS';
import OrbitDB from 'orbit-db';

type OrbitDbContextType = {
  odb?: any, //the orbitdb instance
  db?: any //an eventlog instance
}
const OrbitDbContext = React.createContext<OrbitDbContextType>({
  odb: undefined,
  db: undefined
})

const useOrbitDb = () => useContext(OrbitDbContext);

const OrbitDbProvider = ({ dbName, children }: {
  dbName: string,
  children: React.ReactNode
}) => {
  const {ipfs} = useIpfs();
  const [odb, setOdb] = useState<any|undefined>();
  const [db, setDb] = useState<any|undefined>();

  useEffect(() => {
    if (!ipfs) return;
    (async () => {
      const orbitDb = await OrbitDB.createInstance(ipfs);
      console.log("ODB Identity", orbitDb.identity.toJSON());
      setOdb(orbitDb);
    })();
  }, [ipfs]);

  useEffect(() => {
    if (!odb) return;
    
    (async() => {
      //https://github.com/orbitdb/orbit-db/blob/main/API.md#orbitdblognameaddress
      const db = await odb.eventlog(dbName, {
        accessController: {
          write: ['*'] // Give write access to everyone
        }
      })
      
      db.events.on('replicate', (address: string) => console.debug("replicate", address))
      db.events.on('replicated', (address: string) => console.log("replicated", address))
      db.events.on('replicate.progress', (address: string) => console.debug("replicate.progress", address))
      db.events.on('load', (dbname: string) => console.debug("start loading", dbname))
      db.events.on('ready', (dbname: string) => console.log("ready", dbname))
      
      await db.load();

      setDb(db);
    })();
  }, [odb, ipfs, dbName])

  return (
    <OrbitDbContext.Provider value={{
      odb,
      db
    }}>
      {db ? children : <div>loading odb</div>}
    </OrbitDbContext.Provider>
  );
  
}

export {useOrbitDb, OrbitDbProvider};