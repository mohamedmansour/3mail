import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
  Button,
  CloseButton,
  Heading,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { Ethereumish } from 'ethereum';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CgLock } from 'react-icons/cg';
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect';
import { useCeramic } from 'contexts/Ceramic';

declare global {
  interface Window {
    ethereum: Ethereumish;
  }
}

export function ConnectWallet() {
  const [selectedAddress, setSelectedAddress] = useState<string>();
  const [did, setDid] = useState<string>();
  const [networkError, setNetworkError] = useState<string>();
  const { setSelectedAddress: updateSelectedAddress } = useCeramic();

  if (window.ethereum === undefined) {
    // No Wallet
    return (
      <Box>
        <Alert status="error" marginBottom={4}>
          <AlertIcon />
          <AlertTitle mr={2}>No wallet found!</AlertTitle>
          <AlertDescription>
            Please install a web3 wallet like MetaMask!
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  if (!selectedAddress) {
    // Connect wallet
    return (
      <VStack align="flex-start" gridGap={4} minW={500}>
        <>
          {networkError && (
            <Alert status="error" marginBottom={4}>
              <AlertIcon />
              <AlertTitle mr={2}>Invalid Seed!</AlertTitle>
              <AlertDescription>{networkError}</AlertDescription>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setNetworkError(undefined)}
              />
            </Alert>
          )}
        </>
        <Heading size="md">
          <Flex align="center">
            <CgLock />
            Connect Web3
          </Flex>
        </Heading>
        <Text>Please connect to your wallet.</Text>
        <Button colorScheme="purple" onClick={() => connectWallet()}>
          Connect Wallet
        </Button>
      </VStack>
    );
  }

  async function connectWallet() {
    const [selectedAddress] = await window.ethereum.enable();

    initialize(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on('accountsChanged', ([newAddress]) => {
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state
      if (newAddress === undefined) {
        return resetState();
      }

      initialize(newAddress);
    });

    // We reset the dapp state if the network is changed
    window.ethereum.on('chainChanged', (e) => resetState());
  }

  function resetState() {
    setSelectedAddress(undefined);
    setNetworkError(undefined);
  }

  async function initialize(userAddress: string) {
    setSelectedAddress(userAddress);
    updateSelectedAddress(userAddress);
  }

  // Connected
  return (
    <VStack align="flex-start" gridGap={4} minW={500}>
      <Heading size="md">
        <Flex align="center">
          <CgLock />
          Connected
        </Flex>
      </Heading>
      <Text>Address: {selectedAddress}</Text>
      <Text>DID: {did}</Text>
    </VStack>
  );
}
