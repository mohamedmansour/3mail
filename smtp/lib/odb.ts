import {IPFS, create as createIPFS} from "ipfs-core";
import OrbitDB from 'orbit-db';

let _ipfsNode: IPFS;

//an odb eventlog instance
let _db: any;

const makeIpfs = async (repo: string = ".ipfs"): Promise<IPFS> => {
  if (_ipfsNode) return _ipfsNode;
  const ipfsNode = await createIPFS ({
    repo,
    relay: {
      enabled: true, hop: { enabled: true, active: true }
    },
    config: {
      Discovery: {
        MDNS: {
          Enabled: true,
        },
        webRTCStar: {
          Enabled: true,
        },
      }
    }
  })
  _ipfsNode = ipfsNode;
  const ipfsId = await ipfsNode.id();
  await ipfsNode.swarm.connect("/dns4/ipfs.depa.digital/tcp/4002/wss/p2p/QmXAghnP7DqmAEE7Zx4SxMo3UcUVSn8f1xDCT6x1ysYMSj");
  console.log('ipfs node (v%s) is running [id: %s]', ipfsId.agentVersion, ipfsId.id);
  return ipfsNode;
}

const makeOdb = async (dbName: string): Promise<any> => {
  if (_db) return _db;
  const odb = await OrbitDB.createInstance(await makeIpfs());

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
  _db = db;
  return db;
}

export {
  makeIpfs,
  makeOdb
}
