import {SMTPServer, SMTPServerAddress, SMTPServerAuthentication, SMTPServerAuthenticationResponse, SMTPServerDataStream, SMTPServerSession} from 'smtp-server';

type ErrorCallback = (err?: Error | undefined) => void
type AuthResponseCallback = (
  err: Error | null | undefined, 
  response?: SMTPServerAuthenticationResponse | undefined) => void;

const onConnect = (session: SMTPServerSession, callback:ErrorCallback) => {
  console.log(session);
  callback();
}

const onMailFrom = (address: SMTPServerAddress, session: SMTPServerSession, callback: ErrorCallback) => {

  console.log(session, address);
  callback();
}

const onData = (stream: SMTPServerDataStream, session: SMTPServerSession, callback: ErrorCallback) => {

  stream.pipe(process.stdout); // print message to console
  stream.on("end", callback);

}

const onAuth = (auth: SMTPServerAuthentication, session: SMTPServerSession, callback: AuthResponseCallback) => {
  console.log("auth")
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
  onData
});

server.listen(25000);