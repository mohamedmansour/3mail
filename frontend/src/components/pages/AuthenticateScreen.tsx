import { useEffect, useState } from "react";
import { fromString, toString } from "uint8arrays";
import { Box, Button, Text, Input } from "@chakra-ui/react";
import { randomBytes } from '@stablelib/random'
import { AuthState } from "contexts/State";

type AuthenticateProps = {
  authenticate: (seed: Uint8Array) => void
  state: AuthState
}

function AuthenticateScreen(props: AuthenticateProps) {
  const [seed, setSeed] = useState<string>();
  const { authenticate, state } = props;
  const isLoading = state.status === 'loading'

  useEffect(() => {
    if (seed) {
      authenticate(fromString(seed, 'base16'));
    }
  }, [authenticate, seed])

  
  if (state.status === 'done') {
    return (
      <Box>
        <Text>Authenticated with ID {state.status}</Text>
        <Button onClick={() => {}}>Log out</Button>
      </Box>
    )
  }

  return (
    <>
    <Text>
      You need to authenticate to load your existing notes and create new
      ones.
    </Text>
      <Input
        autoFocus
        disabled={isLoading}
        id="seed"
        label="Seed"
        onChange={(event) => setSeed(event.target.value)}
        placeholder="base16-encoded string of 32 bytes length"
        type="text"
        value={seed}
      />
    <Button
      color="primary"
      disabled={seed === '' || isLoading}
      onClick={() => authenticate(fromString(seed!, 'base16'))}
      variant="contained">
      Authenticate
    </Button>
    <Button
      color="primary"
      disabled={isLoading}
      onClick={() => setSeed(toString(randomBytes(32), 'base16'))}>
      Generate random seed
    </Button>
  </>
  )
}


export default AuthenticateScreen;
