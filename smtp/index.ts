import {SMTPServer, SMTPServerAddress, SMTPServerAuthentication, SMTPServerAuthenticationResponse, SMTPServerDataStream, SMTPServerSession} from 'smtp-server';
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/531a59e4c31d4a34a713a6bb4c7caa52");

const aMsg = {
  From: "",
  To: "",
  Data: ""
};

type ErrorCallback = (err?: Error | undefined) => void
type AuthResponseCallback = (
  err: Error | null | undefined, 
  response?: SMTPServerAuthenticationResponse | undefined) => void;

const onConnect = (session: SMTPServerSession, callback:ErrorCallback) => {
  console.log("session: " + session);
  callback();
}

const onMailFrom = (address: SMTPServerAddress, session: SMTPServerSession, callback: ErrorCallback) => {

  console.log("from:  "+ session, address);
  aMsg["From"] = address.address.toString(); 
  callback();
}

const onRcptTo = (address: SMTPServerAddress, session: SMTPServerSession, callback: ErrorCallback) => {

  console.log("to: "+ session, address);
  aMsg["To"] = address.address.toString(); 
  callback();
}

const onData = (stream: SMTPServerDataStream, session: SMTPServerSession, callback: ErrorCallback) => {
  
  const chunks = [];
  stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
  stream.on('end', () => aMsg.Data = Buffer.concat(chunks).toString('utf8'));

  //TODO send aMsg{} to OrbitalDB here
  
  stream.on("close", callback); 

}

const onAuth = async (auth: SMTPServerAuthentication, session: SMTPServerSession, callback: AuthResponseCallback) => {
 
  //example of how to resolve ENS
  const resolver = await provider.getResolver("cemail.eth");
  const email = resolver.getText("email");

  email.then(function(result) {
    //async
    console.log(aMsg.To); 
 })
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
