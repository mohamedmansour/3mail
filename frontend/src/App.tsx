import { ChakraProvider, CSSReset, Flex } from '@chakra-ui/react';
import { CeramicProvider } from 'contexts/Ceramic';
import { IPFSProvider } from 'contexts/IPFS';
import { OrbitDbProvider } from 'contexts/OrbitDB';
import Content from './components/molecules/Content';
import customTheme from './theme';


function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <IPFSProvider remoteNodeUrl={process.env.REACT_APP_LOCAL_IPFS}>
        <OrbitDbProvider>
          <CeramicProvider>
            <CSSReset />
            <Flex direction="column" height="100vh">
              <Content />
            </Flex>
          </CeramicProvider>
        </OrbitDbProvider>
      </IPFSProvider>
    </ChakraProvider>
  );
}

export default App;
