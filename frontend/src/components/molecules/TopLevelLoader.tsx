import { Center } from '@chakra-ui/react';
import React from 'react';

interface TopLevelLoaderProps {
  children: React.ReactNode;
}

export function TopLevelLoader(props: TopLevelLoaderProps) {
  return (
    <Center h="100vh" color="black">
      {props.children}
    </Center>
  );
}
