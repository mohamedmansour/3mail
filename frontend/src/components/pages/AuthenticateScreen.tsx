import React, { useState } from 'react';
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
  Alert,
  AlertIcon,
  CloseButton,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { randomBytes } from '@stablelib/random';
import { AuthState } from 'contexts/State';
import { CgLock } from 'react-icons/cg';
import { LogoIcon } from 'components/branding/Logo';
import Welcome from 'components/branding/Welcome';
import { ConnectWallet } from 'components/molecules/ConnectWallet';
import { useCeramic } from 'contexts/Ceramic';

type AuthenticateProps = {
  startAuth: () => void;
  authSuccess: () => void;
  state: AuthState;
};

function AuthenticateScreen(props: AuthenticateProps) {
  const [nav, setNav] =
    useState<'default' | 'login' | 'create' | 'connect'>('default');
  const [seed, setSeed] = useState<string>();
  const [error, setError] = useState<string>();
  const { loginWithSeed } = useCeramic();

  const { state, startAuth, authSuccess } = props;
  const isLoading = state.status === 'loading';

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

  const handleLogin = async () => {
    if (seed) {
      try {
        startAuth();
        await loginWithSeed(seed);
        authSuccess();
      } catch (e) {
        setError('Seed should be base16-encoded string of 32 bytes length.');
      }
    }
  };

  return (
    <Box>
      <Flex
        align="center"
        justify="space-between"
        padding="0.5rem"
        bg="whiteAlpha.100"
        color="black"
        boxShadow="md"
      >
        <HStack cursor="pointer" onClick={() => setNav('default')}>
          <LogoIcon fontSize={24} color="#8E54A2" />
          <Text fontSize={20}>3mail</Text>
        </HStack>
        <Spacer />
        <Button
          disabled={seed === '' || isLoading}
          onClick={() => setNav('connect')}
          variant="contained"
        >
          Connect
        </Button>
        <Button
          disabled={seed === '' || isLoading}
          onClick={() => setNav('login')}
          variant="contained"
        >
          Login
        </Button>
        <Button
          disabled={isLoading}
          colorScheme="gray"
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </Flex>
      <Flex
        padding={4}
        align="center"
        textAlign="center"
        justifyContent="center"
      >
        {nav === 'default' && <Welcome />}
        {nav === 'connect' && (
          <ConnectWallet connected={authSuccess} />
        )}
        {nav === 'login' && (
          <VStack align="flex-start" gridGap={4} minW={500}>
            <Heading size="md">
              <Flex align="center">
                <CgLock />
                Account Login
              </Flex>
            </Heading>
            {error && (
              <Alert status="error" marginBottom={4}>
                <AlertIcon />
                <AlertTitle mr={2}>Invalid Seed!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                <CloseButton
                  position="absolute"
                  right="8px"
                  top="8px"
                  onClick={() => setError(undefined)}
                />
              </Alert>
            )}
            <Text>
              You need to your private seed to get access to your mailbox!
            </Text>
            <Input
              autoFocus
              disabled={isLoading}
              isInvalid={!!error}
              errorBorderColor="crimson"
              id="seed"
              label="Seed"
              onChange={handleSeedChange}
              placeholder="base16-encoded string of 32 bytes length"
              type="text"
              value={seed}
            />
            <HStack>
              <Button colorScheme="purple" onClick={handleLogin}>
                Enter
              </Button>
            </HStack>
          </VStack>
        )}
        {nav === 'create' && (
          <VStack align="flex-start" gridGap={4} minW={500}>
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
              <Button colorScheme="purple" onClick={handleLogin}>
                Create
              </Button>
              <Button variant="contained" onClick={handleCopySeed}>
                Copy Seed
              </Button>
            </HStack>
          </VStack>
        )}
      </Flex>
    </Box>
  );
}

export default AuthenticateScreen;
