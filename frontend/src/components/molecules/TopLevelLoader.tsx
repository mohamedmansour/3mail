import { Center, Text, VStack } from '@chakra-ui/react';
import { LogoIcon } from 'components/branding/Logo';
import React from 'react';

interface TopLevelLoaderProps {
  children: React.ReactNode;
}

export function TopLevelLoader(props: TopLevelLoaderProps) {
  return (
    <Center h="100vh" color="black">
      <VStack>
        <LogoIcon fontSize="128px" color="#8E54A2" />
        <Text>{props.children}</Text>
      </VStack>
    </Center>
  );
}
