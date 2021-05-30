import {makeIpfs, makeOdb} from './lib/odb';

async function main() {
  const ipfs = await makeIpfs(3)
  const db = await makeOdb("cemail.mail.events.dev.1");
  db.events.on('replicate', (address: string) => console.debug("replicate", address))
  db.events.on('ready', (dbname: string) => console.log("ready", dbname))
  setInterval(async () => {
    const all = db.iterator({limit: 10}).collect().map((e: any)  => e.payload.value);
    console.log(all)
  },20000)

}

main()