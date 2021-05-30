import {SMTPServer, SMTPServerAddress, SMTPServerAuthentication, SMTPServerAuthenticationResponse, SMTPServerDataStream, SMTPServerSession} from 'smtp-server';
import { ethers } from "ethers";
import {simpleParser} from 'mailparser';

const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/531a59e4c31d4a34a713a6bb4c7caa52");

type ErrorCallback = (err?: Error | undefined) => void
type AuthResponseCallback = (
  err: Error | null | undefined, 
  response?: SMTPServerAuthenticationResponse | undefined) => void;

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
  //TODO send aMsg{} to OrbitalDB here
  console.log(parsed.text, parsed.subject, parsed.date);
  callback();
}

const onAuth = async (auth: SMTPServerAuthentication, session: SMTPServerSession, callback: AuthResponseCallback) => {
 
  //example of how to resolve ENS
  const resolver = await provider.getResolver("elmariachi.eth");
  const address = await resolver.getAddress();
  const did = await resolver.getText("did");
  const inbox = await resolver.getText("email");

  console.log("ens: ", address, did, inbox);
  

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