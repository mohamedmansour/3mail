import { ChakraProvider, CSSReset, Flex } from "@chakra-ui/react";
import Header from "./components/molecules/Header";

import customTheme from "./theme";
import Content from "./components/molecules/Content"

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <Flex direction="column" minHeight="100vh">
        <Header />
        <Content />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
