import CeramicClient from "@ceramicnetwork/http-client";
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { DID } from 'dids'
import { IDX } from "@ceramicstudio/idx";

const CERAMIC_URL = "https://ceramic-clay.3boxlabs.com";
const seed = "b90ba3803feb7f74019ccee3ef8c4a5b449eeaa151d72f86c863008b239de221";

const makeCeramic = async(): Promise<{
  ceramic: CeramicClient,
  idx: IDX,
  did: DID
}> => {

  const ceramic = new CeramicClient(CERAMIC_URL)
  const resolver = { 
    ...KeyDidResolver.getResolver(),
    ...ThreeIdResolver.getResolver(ceramic) 
  }
  
  const seedBuffer = Uint8Array.from(Buffer.from(seed, 'hex'));
  const provider = new Ed25519Provider(seedBuffer)
  const did = new DID({ provider, resolver })
  await ceramic.setDID(did)
  const res = await ceramic.did?.authenticate();
 
  //todo use config.json
  const aliases = {
    message: 'kjzl6cwe1jw148pa1sc5mwhk9f6bthfwhgfbwm021v3x7xj8rwe2efyfiay4qk7',
  }
  const idx = new IDX({ ceramic, aliases });
  
  return {ceramic, idx, did};
}

export {
  makeCeramic
}