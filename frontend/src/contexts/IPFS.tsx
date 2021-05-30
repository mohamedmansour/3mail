import { TopLevelLoader } from 'components/molecules/TopLevelLoader';
import { IPFS, create, multiaddr } from 'ipfs-core';
import { create as ipfsHttpCreate } from 'ipfs-http-client';

import React, { useContext, useEffect, useState } from 'react';

type IPFSContextType = {
  ipfs?: IPFS;
  ipfsHttpNode?: IPFS;
};
const IPFSContext = React.createContext<IPFSContextType>({
  ipfs: undefined,
  ipfsHttpNode: undefined,
});

const useIpfs = () => useContext(IPFSContext);

const IPFSProvider = ({
  children,
  remoteNodeUrl,
}: {
  children: React.ReactNode;
  remoteNodeUrl?: string | undefined;
}) => {
  const [ipfsNode, setIpfsNode] = useState<IPFS | undefined>();
  const [ipfsHttpNode, setIpfsHttpNode] = useState<IPFS | undefined>();

  useEffect(() => {
    if (!remoteNodeUrl) return;

    const remoteNode = ipfsHttpCreate({
      url: remoteNodeUrl,
    });
    setIpfsHttpNode(remoteNode as unknown as IPFS);

    (async () => {
      const ipfsId = await remoteNode.id();
      console.log(
        'ipfs http node (v%s) connected [id: %s]',
        ipfsId.agentVersion,
        ipfsId.id
      );
      if (process.env.REACT_APP_SENDING_PEER) {
        console.debug("connecting to smtp ipfs ", process.env.REACT_APP_SENDING_PEER);

        await remoteNode.swarm.connect(
          process.env.REACT_APP_SENDING_PEER as string
        );
      }
    })();
  }, [remoteNodeUrl]);

  // useEffect(() => {
  //   (async () => {
  //     const ipfs = await create({
  //       relay: {
  //         enabled: true,
  //         hop: { enabled: true, active: true },
  //       },
  //       config: {
  //         Discovery: {
  //           MDNS: {
  //             Enabled: true,
  //           },
  //           webRTCStar: {
  //             Enabled: true,
  //           },
  //         },
  //         Addresses: {
  //           Swarm: ['/dns4/ipfs.depa.digital/tcp/9091/wss/p2p-webrtc-star'],
  //         },
  //       },
  //     });
  //     const ipfsId = await ipfs.id();
  //     await ipfs.swarm.connect(
  //       multiaddr(
  //         '/dns4/ipfs.depa.digital/tcp/4002/wss/p2p/QmXAghnP7DqmAEE7Zx4SxMo3UcUVSn8f1xDCT6x1ysYMSj'
  //       )
  //     );
  //     //await ipfs.swarm.connect(multiaddr('/ip4/127.0.0.1/tcp/4003/ws/p2p/QmX9BQjCTFqF26P6wo4QGd1TBqQEBBzken4rLNEiv6X9vt'));

  //     console.log(
  //       'ipfs node (v%s) is running [id: %s]',
  //       ipfsId.agentVersion,
  //       ipfsId.id
  //     );
  //     setIpfsNode(ipfs);
  //   })();
  // }, []);

  return (
    <IPFSContext.Provider
      value={{
        ipfs: ipfsNode,
        ipfsHttpNode,
      }}
    >
      {ipfsHttpNode ? children : <TopLevelLoader>starting ipfs</TopLevelLoader>}
    </IPFSContext.Provider>
  );
};

export { useIpfs, IPFSProvider };
