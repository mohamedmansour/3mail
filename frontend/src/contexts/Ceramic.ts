import Ceramic from "@ceramicnetwork/http-client";
import { IDX } from "@ceramicstudio/idx";
import { Ed25519Provider } from "key-did-provider-ed25519";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import KeyDidResolver from "key-did-resolver";
import type { ResolverRegistry } from "did-resolver";
import { DID } from "dids";
import { TileDocument } from '@ceramicnetwork/stream-tile'

import { definitions } from "../config.json";

export type MessageItem = {
  id: string,
  subject: string,
  content: string
}

export type MessageList = { messages: Array<MessageItem> }

export type IDXInit = MessageList & {
  ceramic: Ceramic
  idx: IDX
}

export async function getIDX(seed: Uint8Array): Promise<IDXInit> {
  // Create the Ceramic instance and inject provider
  const ceramic = new Ceramic(process.env.REACT_APP_CERAMIC_URL as string)

  const resolverRegistry: ResolverRegistry = {
    ...KeyDidResolver.getResolver(),
    ...ThreeIdResolver.getResolver(ceramic),
  }
  const did = new DID({
    provider: new Ed25519Provider(seed),
    resolver: resolverRegistry,
  })
  await did.authenticate()
  await ceramic.setDID(did)

  // Create the IDX instance with the definitions aliases from the config
  const idx = new IDX({ ceramic, aliases: definitions })

  // Load the existing notes
  const relayId = `relay-${did.id}`
  console.log('RelayID', relayId)

  TileDocument.create(ceramic, {}).then(document => {
    console.log(document.id)
    document.subscribe((state) => {
      const container = state.content;
      const value = state.next?.content;
      console.log(`Event from "${container}" with "${value}"`)
    })
  })
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
  return { ceramic, idx, messages: [] }
}