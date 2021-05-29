import { Button } from '@chakra-ui/button';
import { useIpfs } from 'contexts/IPFS';
import { useOrbitDb } from 'contexts/OrbitDB'
import { multiaddr } from 'ipfs-core/src';
import React, { useEffect } from 'react'

const OrbitDbTest = () => {
  const {ipfs} = useIpfs();
  const { odb, db } = useOrbitDb();

  useEffect(() => {
    if (!db) return;
    db.events.on('replicate', (address: string) => console.debug("replicate", address))
    db.events.on('replicated', (address: string) => console.log("replicated", address))
    db.events.on('replicate.progress', (address: string) => console.debug("replicate.progress", address))
    db.events.on('load', (dbname: string) => console.debug("start loading", dbname))
    db.events.on('ready', (dbname: string) => console.log("ready", dbname))
    const all = db.iterator({limit: 10}).collect().map((e: any)  => e.payload);
    console.log(all)

  },[db])

  const addSth = async () => {
    await ipfs!.swarm.connect(multiaddr("/dns4/ipfs.depa.digital/tcp/4002/wss/p2p/QmXAghnP7DqmAEE7Zx4SxMo3UcUVSn8f1xDCT6x1ysYMSj"));

    db.add({
      "some":"key",
      "with":"value",
    })
  }

  return(<div>
    ODB Test.foo
    <Button colorScheme="teal"  onClick={() => addSth()}>add sth</Button>
  </div>)
}

export default OrbitDbTest;