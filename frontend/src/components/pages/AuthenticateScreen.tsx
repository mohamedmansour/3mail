import React, { useEffect, useState } from 'react';
import { fromString, toString } from 'uint8arrays';
import {
  Box,
  Button,
  Text,
  Input,
  Heading,
  HStack,
  Flex,
  Spacer,
  Code,
  VStack,
} from '@chakra-ui/react';
import { randomBytes } from '@stablelib/random';
import { AuthState } from 'contexts/State';
import { CgCopy, CgLock, CgMail } from 'react-icons/cg';

type AuthenticateProps = {
  authenticate: (seed: Uint8Array) => void;
  state: AuthState;
};

function AuthenticateScreen(props: AuthenticateProps) {
  const [nav, setNav] = useState<'default' | 'login' | 'create'>('default');
  const [seed, setSeed] = useState<string>();
  const { authenticate, state } = props;
  const isLoading = state.status === 'loading';

  // useEffect(() => {
  //   if (seed) {
  //     authenticate(fromString(seed, 'base16'));
  //   }
  // }, [authenticate, seed]);

  if (state.status === 'done') {
    return (
      <Box>
        <Text>Authenticated with ID {state.status}</Text>
        <Button onClick={() => {}}>Log out</Button>
      </Box>
    );
  }

  const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(e.target.value);
  };

  const handleCreateAccount = () => {
    setSeed(toString(randomBytes(32), 'base16'));
    setNav('create');
  };

  const handleCopySeed = async () => {
    await navigator.clipboard.writeText(seed || '');
  };

  const handleLogin = () => {
    if (seed) {
      authenticate(fromString(seed, 'base16'));
    }
  };

  return (
    <Box>
      <Flex
        align="center"
        justify="space-between"
        padding="0.5rem"
        bg="gray.700"
        color="white"
      >
        <HStack cursor="pointer" onClick={() => setNav('default')}>
          <CgMail size={24} />
          <Text fontSize={20}>cemail</Text>
        </HStack>
        <Spacer />
        <Button
          disabled={seed === '' || isLoading}
          onClick={() => setNav('login')}
          variant="contained"
        >
          Login
        </Button>
        <Button
          disabled={isLoading}
          colorScheme="blackAlpha"
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </Flex>
      <Box padding={4}>
        {nav == 'default' && (
          <Text>Welcome to the first ever Decentralized Email Service!</Text>
        )}
        {nav == 'login' && (
          <VStack align="flex-start" gridGap={4}>
            <Heading size="md">
              <Flex align="center">
                <CgLock />
                Account Login
              </Flex>
            </Heading>
            <Text>
              You need to your private seed to get access to your mailbox!
            </Text>
            <Input
              autoFocus
              disabled={isLoading}
              id="seed"
              label="Seed"
              onChange={handleSeedChange}
              placeholder="base16-encoded string of 32 bytes length"
              type="text"
              value={seed}
            />
            <HStack>
              <Button colorScheme="blue" onClick={handleLogin}>
                Enter
              </Button>
            </HStack>
          </VStack>
        )}
        {nav == 'create' && (
          <VStack align="flex-start" gridGap={4}>
            <Heading size="md">
              <Flex align="center">
                <CgLock />
                Account Creation
              </Flex>
            </Heading>
            <Text>Keep this private key secure, you need this to login!</Text>
            <Box marginTop={4} marginBottom={4}>
              <Code padding={4}>{seed}</Code>
            </Box>
            <HStack>
              <Button colorScheme="blue" onClick={handleLogin}>
                Create
              </Button>
              <Button variant="contained" onClick={handleCopySeed}>
                Copy Seed
              </Button>
            </HStack>
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default AuthenticateScreen;
