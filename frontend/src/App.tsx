import { ChakraProvider, CSSReset, Flex } from '@chakra-ui/react';

import customTheme from './theme';
import Content from './components/molecules/Content';
import { IPFSProvider } from 'contexts/IPFS';
import { OrbitDbProvider } from 'contexts/OrbitDB';
import OrbitDbTest from 'components/organisms/OrbitDbTest';
import { CeramicProvider } from 'contexts/Ceramic';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <IPFSProvider remoteNodeUrl={process.env.REACT_APP_LOCAL_IPFS}>
        <OrbitDbProvider dbName="/orbitdb/zdpuB1eaxvCYJYsn551bkesWL2xnEeN1T3TqZqWqF2MWg31dp/cemail.mail.events.dev.1">
          <CeramicProvider>
            <CSSReset />
            <Flex direction="column" height="100vh">
              <Content />
            </Flex>
          </CeramicProvider>
          <OrbitDbTest />
        </OrbitDbProvider>
      </IPFSProvider>
    </ChakraProvider>
  );
}

export default App;
