import { create as createIPFS, IPFS } from "ipfs-core";
import OrbitDB from 'orbit-db';


let _ipfsNode: IPFS;

//an odb eventlog instance
let _db: any;

const makeIpfs = async (offset: number = 1): Promise<IPFS> => {
  if (_ipfsNode) return _ipfsNode;
  const ipfsNode = await createIPFS ({
    repo: `.ipfs${offset}`,
    relay: {
      enabled: true, hop: { enabled: true, active: true }
    },

    config: {
      API: {
        HTTPHeaders: {
          "Access-Control-Allow-Origin": [
            '*'
          ]
        }
      },
      Discovery: {
        MDNS: {
          Enabled: true,
        },
        webRTCStar: {
          Enabled: true,
        },
      },
      Addresses: {
        Swarm: [
          `/ip4/0.0.0.0/tcp/${4000 + offset}`,
          `/ip4/127.0.0.1/tcp/${4001 + offset}/ws`
        ]
      },
    }
  })
  _ipfsNode = ipfsNode;
  const ipfsId = await ipfsNode.id();
  await ipfsNode.swarm.connect("/dns4/ipfs.depa.digital/tcp/4002/wss/p2p/QmXAghnP7DqmAEE7Zx4SxMo3UcUVSn8f1xDCT6x1ysYMSj");
  console.log('ipfs node (v%s) is running [id: %s]', ipfsId.agentVersion, ipfsId.id);
  return ipfsNode;
}

const makeOdb = async (ipfs: IPFS, dbName: string): Promise<any> => {
  
  const odb = await OrbitDB.createInstance(ipfs);

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
};

