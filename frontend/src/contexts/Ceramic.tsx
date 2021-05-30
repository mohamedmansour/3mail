import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import Ceramic from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { IDX } from '@ceramicstudio/idx';
import type { ResolverRegistry } from 'did-resolver';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import KeyDidResolver from 'key-did-resolver';
import React, { useContext, useEffect, useState } from 'react';
import { definitions } from '../config.json';

import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';

export type MessageItem = {
  id: string;
  subject: string;
  content: string;
};

export type MessageList = { messages: Array<MessageItem> };

export type IDXInit = MessageList & {
  ceramic: Ceramic;
  idx: IDX;
};

type CeramicContextType = {
  ceramic?: Ceramic;
  idx?: IDX;
  inbox?: TileDocument;
  setSeed: (s: Uint8Array) => void;
  setSelectedAddress: (s: string) => void;
  getDidId: () => string;
};
const CeramicContext = React.createContext<CeramicContextType>({
  ceramic: undefined,
  idx: undefined,
  inbox: undefined,
  setSeed: () => {},
  setSelectedAddress: () => {},
  getDidId: () => '',
});

const useCeramic = () => useContext(CeramicContext);

/*
  // const messageList = await idx.get<{ messages: Array<MessageItem> }>('messages')
  // messageList?.messages.forEach(message => {
  //   TileDocument.load<Record<string, unknown>>(ceramic, message.id).then(stream => {
  //     console.log(`Subscribing to message ${message.id}`)
  //     stream.subscribe((state) => {
  //       const container = state.content.text;
  //       const value = state.next?.content.text;
  //       console.log(`Event from "${container}" with "${value}"`)
  //     })
  //   })
  // })
  */

const CeramicProvider = ({ children }: { children: React.ReactNode }) => {
  const [ceramic, setCeramic] = useState<Ceramic>();
  const [idx, setIDX] = useState<IDX>();
  const [inbox, setInbox] = useState<TileDocument>();
  const [did, setDID] = useState<DID>();
  const [seed, setSeed] = useState<Uint8Array>();
  const [selectedAddress, setSelectedAddress] = useState<string>();

  function getDidId() {
    if (!did) {
      return '';
    }

    return did.id;
  }

  useEffect(() => {
    if (!seed) return;

    (async () => {
      // Create the Ceramic instance and inject provider
      const _ceramic = new Ceramic(process.env.REACT_APP_CERAMIC_URL as string);

      const resolverRegistry: ResolverRegistry = {
        ...KeyDidResolver.getResolver(),
        ...ThreeIdResolver.getResolver(_ceramic),
      };
      const did = new DID({
        provider: new Ed25519Provider(seed),
        resolver: resolverRegistry,
      });

      await did.authenticate();
      await _ceramic.setDID(did);
      setCeramic(_ceramic);
      setDID(did);

      // Create the IDX instance with the definitions aliases from the config
      setIDX(new IDX({ ceramic: _ceramic, aliases: definitions }));

      // Load the existing notes
      const relayId = `relay-${did.id}`;
      console.log('RelayID', relayId);
    })();
  }, [seed]);

  useEffect(() => {
    if (!selectedAddress) return;

    (async () => {
      // Create the Ceramic instance and inject provider
      const _ceramic = new Ceramic(process.env.REACT_APP_CERAMIC_URL as string);

      const threeIdConnect = new ThreeIdConnect();
      const authProvider = new EthereumAuthProvider(
        window.ethereum,
        selectedAddress
      );
      await threeIdConnect.connect(authProvider);

      const provider = threeIdConnect.getDidProvider();
      const did = _ceramic.did;
      if (!did) {
        return;
      }

      did.setProvider(provider);

      await did.authenticate();
      await _ceramic.setDID(did);
      setCeramic(_ceramic);
      setDID(did);

      // Create the IDX instance with the definitions aliases from the config
      setIDX(new IDX({ ceramic: _ceramic, aliases: definitions }));

      // Load the existing notes
      const relayId = `relay-${did.id}`;
      console.log('RelayID', relayId);
    })();
  }, [selectedAddress]);

  useEffect(() => {
    if (!idx) return;

    console.log('idx is loaded');
    // (async () => {
    //   const document = await TileDocument.create(ceramic, {});
    //   console.log(document.id)
    //   document.subscribe((state) => {
    //     const container = state.content;
    //     const value = state.next?.content;
    //     console.log(`Event from "${container}" with "${value}"`)
    //   })
    // })();
  }, [idx]);

  return (
    <CeramicContext.Provider
      value={{
        ceramic,
        idx,
        inbox,
        getDidId,
        setSeed,
        setSelectedAddress,
      }}
    >
      {children}
    </CeramicContext.Provider>
  );
};

export { useCeramic, CeramicProvider };
