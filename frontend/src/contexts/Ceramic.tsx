import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import Ceramic from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { IDX } from '@ceramicstudio/idx';
import type { ResolverRegistry } from 'did-resolver';
import { DID, DIDProvider } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import KeyDidResolver from 'key-did-resolver';
import React, { useContext, useEffect, useState } from 'react';
import { definitions } from '../config.json';

import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';
import { fromString } from 'uint8arrays';

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
  did?: DID,
  logout: () => void;
  loginWithSeed: (seed: string) => void;
  loginWith3Id: (selectedAddress: string) => void;
};
const CeramicContext = React.createContext<CeramicContextType>({
  ceramic: undefined,
  idx: undefined,
  inbox: undefined,
  did: undefined,
  logout: () => {},
  loginWithSeed: (seed: string) => {},
  loginWith3Id: (selectedAddress: string) => {}
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
  
  const createCeramic = async (provider: DIDProvider) => {
    const _ceramic = new Ceramic(process.env.REACT_APP_CERAMIC_URL as string);

    const resolverRegistry: ResolverRegistry = {
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(_ceramic),
    };
    const did = new DID({
      provider,
      resolver: resolverRegistry,
    });

    did.setProvider(provider);

    await did.authenticate();
    await _ceramic.setDID(did);
    setCeramic(_ceramic);
    setDID(did);
    console.log(did.id);
  }

  const loginWithSeed = async(seed: string) => {
    await createCeramic(new Ed25519Provider(fromString(seed, 'base16')));
  };

  const loginWith3Id = async (selectedAddress: string) => {

      const threeIdConnect = new ThreeIdConnect();
      const authProvider = new EthereumAuthProvider(
        window.ethereum,
        selectedAddress
      );
      await threeIdConnect.connect(authProvider);
      const provider = threeIdConnect.getDidProvider();

      await createCeramic(provider);

  }

  useEffect(() => {
    if (!ceramic) return;
    setIDX(new IDX({ ceramic, aliases: definitions }));

    console.debug('idx is loaded');
    // (async () => {
    //   const document = await TileDocument.create(ceramic, {});
    //   console.log(document.id)
    //   document.subscribe((state) => {
    //     const container = state.content;
    //     const value = state.next?.content;
    //     console.log(`Event from "${container}" with "${value}"`)
    //   })
    // })();
  }, [ceramic]);

  const logout = () => {
    setIDX(undefined);
    setCeramic(undefined);
    setDID(undefined);
    setInbox(undefined);
  }
  return (
    <CeramicContext.Provider
      value={{
        ceramic,
        idx,
        did,
        inbox,
        loginWithSeed,
        loginWith3Id,
        logout
      }}
    >
      {children}
    </CeramicContext.Provider>
  );
};

export { useCeramic, CeramicProvider };
