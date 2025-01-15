import { json } from '@remix-run/node'
import { Form, useLoaderData, useNavigation } from '@remix-run/react'
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Button, Input, VStack, HStack, Text, List } from '@chakra-ui/react'

// Types
interface PackingItem {
  id: string
  name: string
  isComplete: boolean
}

// Server-side: Temporary data store (will be replaced with DB later)
const items: PackingItem[] = []

// Server-side: Loader function
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
    <div className="container mx-auto p-6 max-w-2xl">
      <VStack spaceY={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Packing List Builder
        </Text>

        <Form method="post">
          <HStack>
            <Input name="item" placeholder="Add an item..." required />
            <Button
              type="submit"
              colorScheme="blue"
              disabled={isSubmitting}
              _loading={{
                opacity: 0.8,
                cursor: 'not-allowed',
              }}
            >
              {isSubmitting ? 'Adding...' : 'Add Item'}
            </Button>
          </HStack>
        </Form>

        <List.Root>
          {items.map((item) => (
            <List.Item key={item.id} p={3} borderWidth="1px" borderRadius="md">
              {item.name}
            </List.Item>
          ))}
        </List.Root>
      </VStack>
    </div>
  )
}
