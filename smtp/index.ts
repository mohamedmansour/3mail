import {SMTPServer, SMTPServerAddress, SMTPServerAuthentication, SMTPServerAuthenticationResponse, SMTPServerDataStream, SMTPServerSession} from 'smtp-server';
import { ethers } from "ethers";
import {simpleParser} from 'mailparser';

import {makeCeramic} from './lib/ceramic';
import {makeIpfs, makeOdb} from './lib/odb';

import CeramicClient from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile';

const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/531a59e4c31d4a34a713a6bb4c7caa52");

type ErrorCallback = (err?: Error | undefined) => void
type AuthResponseCallback = (
  err: Error | null | undefined, 
  response?: SMTPServerAuthenticationResponse | undefined) => void;

(async () => {

    const ipfs = await makeIpfs(4);
    
    let {ceramic, idx, did} = await makeCeramic();

    const dbs: Record<string, any> = {}

    const onConnect = (session: SMTPServerSession, callback:ErrorCallback) => {
      console.log("session: " + session);
      callback();
    }
    
    const onMailFrom = (address: SMTPServerAddress, session: SMTPServerSession, callback: ErrorCallback) => {
    
      console.debug("from:  "+ session, address);
      //could resolve the senders address, but don't have to. It's configured on our side.
      //aMsg["From"] = address.address.toString(); 
      callback();
    }
    
    const onRcptTo = (address: SMTPServerAddress, session: SMTPServerSession, callback: ErrorCallback) => {
    
      console.debug("to: "+ session, address);
      //aMsg["To"] = address.address.toString(); 
      callback();
    }
    
    const onData = async (stream: SMTPServerDataStream, session: SMTPServerSession, callback: ErrorCallback) => {
            
      const parsed = await simpleParser(stream);
      //console.debug(parsed);
      
      //@ts-ignore
      const recvMailAddress = parsed.to.value[0].address as string;
      const ensDomain = recvMailAddress.split("@")[1];
      const resolver = await provider.getResolver(ensDomain);
      const ethAddress = await resolver.getAddress();
      const recvDid = await resolver.getText("did");
      const inbox = await resolver.getText("email");
      console.log(recvDid, ethAddress)
      //console.log(recvDid, parsed.text, parsed.subject, parsed.date);

      const doc = await TileDocument.create(ceramic, {
        date: parsed.date?.toISOString(),
        subject: parsed.subject,
        message: parsed.text
      }, {
        controllers: [did.id],
        schema: "ceramic://k3y52l7qbv1fry43o9tqwkz0uy2h2hfa7j4dypk32imnk5iuo5tjshu3tnanx4ruo"
      })

      console.log("ceramic doc", doc.id.toUrl())

      let db;
      if (Object.keys(dbs).includes(recvDid))
        db = dbs[recvDid]
      else {
        db = await makeOdb(ipfs, recvDid);
        db.events.on('replicate', (address: string) => console.debug("replicated", address))
        db.events.on('ready', (dbname: string) => console.log("ready", dbname))
        dbs[recvDid] = db
      }

      const payload = {
        "time": (new Date).toISOString(),
        "from": did.id,
        "doc": doc.id.toString()
      };

      await db.add(payload)
      console.debug("added", payload);

      callback();
    }
    
    const onAuth = async (auth: SMTPServerAuthentication, session: SMTPServerSession, callback: AuthResponseCallback) => {

      // const resolver = await provider.getResolver("elmariachi.eth");
      // const address = await resolver.getAddress();
      // const recvDid = await resolver.getText("did");
      // const inbox = await resolver.getText("email");
      

      //console.log("ens from: ", address, recvDid, inbox);

      // const profile = await idx.get("basicProfile", did.id);
      // console.log("sender profile", profile);

      const resp: SMTPServerAuthenticationResponse = {
        user: "a user"
      }
      callback(null, resp);
    }
    
    const server = new SMTPServer({
      secure: false,
      hideSTARTTLS: true,
      authOptional: true,
      disableReverseLookup: false,
      allowInsecureAuth: true,
      name: "W3W mailer",
      logger: true,
      onConnect,
      onAuth,
      onMailFrom,
      onData,
      onRcptTo
    });

    server.listen(25000);
  }
)();