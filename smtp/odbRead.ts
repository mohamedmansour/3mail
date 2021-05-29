import {makeIpfs, makeOdb} from './lib/odb';

async function main() {
  const ipfs = await makeIpfs(".ipfs1")
  const db = await makeOdb("some.foo.log.db");
  //db.events.on('replicate', (address: string) => console.debug("replicate", address))
  //db.events.on('ready', (dbname: string) => console.log("ready", dbname))
  setTimeout(async () => {
    const all = db.iterator({limit: 10}).collect().map((e: any)  => e.payload.value);
    console.log(all)
  },5000)

}

main()