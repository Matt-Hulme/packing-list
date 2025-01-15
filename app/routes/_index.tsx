import { json } from '@remix-run/node'
import { Form, useLoaderData, useNavigation } from '@remix-run/react'
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import {
  Button,
  Input,
  VStack,
  HStack,
  Text,
  List,
  Container,
} from '@chakra-ui/react'

interface PackingItem {
  id: string
  name: string
  isComplete: boolean
}

// Server-side: Temporary data store (will be replaced with DB later)
const items: PackingItem[] = []

// Server-side: Loader function
// @todo type this when we have data to fetch
// eslint-disable-next-line
export async function loader({}: LoaderFunctionArgs) {
  return json({ items })
}

// Server-side: Action function
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get('item')?.toString()

  if (!name) {
    return JSON.parse('Item name is required'), { status: 400 }
  }

  const newItem: PackingItem = {
    id: Date.now().toString(),
    name,
    isComplete: false,
  }

  items.push(newItem)
  return json({ success: true })
}

// Client-side: Component
export default function Index() {
  const { items } = useLoaderData<typeof loader>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <main className="bg-blue-500 min-h-screen">
      <Container className="mx-auto">
        <VStack className="w-full" spaceY={6} align="stretch">
          <Text className="text-white" fontSize="2xl" fontWeight="bold">
            Packing List Builder
          </Text>

          <Form method="post">
            <HStack className="w-full">
              <Input
                name="item"
                placeholder="Add an item..."
                required
                className="bg-white"
              />
              <Button
                type="submit"
                colorScheme="blue"
                disabled={isSubmitting}
                className="bg-white hover:bg-gray-100"
                _loading={{
                  opacity: 0.8,
                  cursor: 'not-allowed',
                }}
              >
                {isSubmitting ? 'Adding...' : 'Add Item'}
              </Button>
            </HStack>
          </Form>

          <List.Root className="space-y-2">
            {items.map((item) => (
              <List.Item
                key={item.id}
                className="p-3 border rounded-md bg-white"
              >
                {item.name}
              </List.Item>
            ))}
          </List.Root>
        </VStack>
      </Container>
    </main>
  )
}
