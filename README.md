# w3c cemail - Decentralized Email

Uses [Ceramic](https://ceramic.network/), which is a decentralized, censorship-resistant network for managing mutable information without any databases or servers!

Read our research paper: [research/cemail.md](research/cemail.md)

Ceramic combines [IPFS](https://ipfs.io/), [Ethereum](https://ethereum.org), [p2p networking](https://libp2p.io), and [DIDs](https://www.w3.org/TR/did-core/).

## Pre-requisites

- Install nodejs: https://nodejs.org/en/download/
- Install yarn: `npm install -g yarn`
- Install previious gyp: `npm install -g node-pre-gyp`


## Frontend project build

- Enter `cd frontend`
- Install dependencies: `npm install`
- Run frontend `npm run start`

## Bootstrap project build

- Generate your seed `yarn seed`
- Add ceramic endpoint `CERAMIC_URL=https://ceramic-clay.3boxlabs.com/` to your `.env.local`
- Deloy schema definations: `yarn bootstrap`


![image](https://user-images.githubusercontent.com/1344649/120116936-fe3d2600-c18a-11eb-9ea1-0237b7bbdf30.png)

![image](https://user-images.githubusercontent.com/1344649/120116947-101ec900-c18b-11eb-90a7-2c7059bc8269.png)

![image](https://user-images.githubusercontent.com/1344649/120117004-52480a80-c18b-11eb-9625-51e26104647f.png)

![image](https://user-images.githubusercontent.com/1344649/120117024-6855cb00-c18b-11eb-9815-4994477906ea.png)
