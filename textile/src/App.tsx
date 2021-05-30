import { PrivateKey } from '@textile/hub';
import React, { useState } from 'react';

import { generatePrivateKey } from './Login';
import TextileApp from './TextileApp';

const App = (props) => {
  const [identity, setIdentity] = useState<PrivateKey>();

  async function createNewIdentity() {
    /** Random new identity */
    //const _identity = await PrivateKey.fromRandom();

    const _identity = await generatePrivateKey();
    //console.log(_identity);
    setIdentity(_identity);
  }

  async function sign() {
    const challenge = Buffer.from('Sign this string');
    const signed = identity.sign(challenge);
    //console.log(signed);
  }

  return (
    <div>
      {!identity && <button onClick={createNewIdentity}>login</button>}
      {identity && <TextileApp identity={identity} />}
    </div>
  );
};

export default App;
