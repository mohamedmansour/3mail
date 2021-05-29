import {IPFS, create, multiaddr} from "ipfs-core";
import React, { useContext, useEffect, useState } from "react";

type IPFSContextType = {
  ipfs?: IPFS
}
const IPFSContext = React.createContext<IPFSContextType>({
  ipfs: undefined
})

const useIpfs = () => useContext(IPFSContext);

const IPFSProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [ipfsNode, setIpfsNode] = useState<IPFS|undefined>();

  useEffect(() => {
    
    (async () => {
      const ipfs = await create({
        relay: {
          enabled: true, hop: { enabled: true, active: true }
        },
        config: {
          Discovery: {
            MDNS: {
              Enabled: false,
            },
            webRTCStar: {
              Enabled: true,
            },
          },
          Addresses: {
            Swarm: ['/dns4/ipfs.depa.digital/tcp/9091/wss/p2p-webrtc-star'],
          },
        }
      });
      const ipfsId = await ipfs.id();
      await ipfs.swarm.connect(multiaddr("/dns4/ipfs.depa.digital/tcp/4002/wss/p2p/QmXAghnP7DqmAEE7Zx4SxMo3UcUVSn8f1xDCT6x1ysYMSj"));
      //await ipfs.swarm.connect(multiaddr('/ip4/127.0.0.1/tcp/4003/ws/p2p/QmX9BQjCTFqF26P6wo4QGd1TBqQEBBzken4rLNEiv6X9vt'));

      console.log('ipfs node (v%s) is running [id: %s]', ipfsId.agentVersion, ipfsId.id);
      setIpfsNode(ipfs);
    })();
  }, [])

  return (
    <IPFSContext.Provider value={{
      ipfs: ipfsNode
    }}>
      {ipfsNode ? children : <div>starting ipfs</div>}
    </IPFSContext.Provider>
  );
  
}

export {useIpfs, IPFSProvider};