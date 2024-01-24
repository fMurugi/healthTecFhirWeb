
import React from 'react';
import { Anchor, Container, Box, Text } from '@mantine/core';
import Link from 'next/link';

export default function LeftMenu() {
  return (
<nav>
<Container style={{ backgroundColor: 'grey', height: '100vh' }}>
      <Box p="md">
        <Text  size="lg">
          Menu
        </Text>
        <ul>
          <li>
            <Link href="/page1">
              <Anchor color="blue">Page 1</Anchor>
            </Link>
          </li>
          <li>
            <Link href="/page2">
              <Anchor color="blue">Page 2</Anchor>
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </Box>
    </Container>
</nav>
  );
}
