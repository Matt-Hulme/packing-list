import type { TypedResponse } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import {
  Container,
  VStack,
  Heading,
  List,
  Button,
  Text,
} from '@chakra-ui/react'
import { getAllLists, type PackingListType } from '~/utils/store.server'

export async function loader(): Promise<
  TypedResponse<{ lists: PackingListType[] }>
> {
  const lists = getAllLists()
  return new Response(JSON.stringify({ lists }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export default function ListIndexRoute() {
  const { lists } = useLoaderData<typeof loader>()

  return (
    <main className="min-h-screen bg-gray-50">
      <Container maxW="container.md" py={8}>
        <VStack spaceY={6} align="stretch">
          <Heading size="lg">My Packing Lists</Heading>

          <Link to="/list/new">
            <Button colorScheme="blue">Create New List</Button>
          </Link>

          <List.Root spaceY={3}>
            {lists.length === 0 ? (
              <List.Item p={4} bg="white" rounded="md">
                <Text>No lists yet. Create your first list above!</Text>
              </List.Item>
            ) : (
              lists.map((list) => (
                <List.Item
                  key={list.id}
                  p={4}
                  bg="white"
                  rounded="md"
                  shadow="sm"
                >
                  <Link to={`/list/${list.id}`}>
                    <Text fontSize="lg" fontWeight="medium">
                      {list.name}
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      {list.items.length} items
                    </Text>
                  </Link>
                </List.Item>
              ))
            )}
          </List.Root>
        </VStack>
      </Container>
    </main>
  )
}
