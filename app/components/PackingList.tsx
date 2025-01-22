import {
  Button,
  Container,
  HStack,
  Input,
  List,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Form, useLoaderData, useNavigation } from '@remix-run/react'
import { Checkbox } from '~/components/ui/checkbox'
import { loader } from '~/routes/list.$listId'

interface PackingListProps {
  listName: string
}

export const PackingList = ({ listName }: PackingListProps) => {
  const { items } = useLoaderData<typeof loader>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Container maxW="container.md" py={8}>
      <VStack spaceY={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          {listName}
        </Text>
        <Form method="post">
          <HStack>
            <Input
              name="item"
              placeholder="Add an item..."
              required
              bg="white"
              flex={1}
            />
            <Button
              type="submit"
              colorScheme="blue"
              _loading={{ opacity: 0.8 }}
              disabled={isSubmitting}
            >
              Add Item
            </Button>
          </HStack>
        </Form>
        <List.Root spaceY={3}>
          {items.length === 0 ? (
            <List.Item p={4} bg="gray.50" rounded="md">
              No items yet. Add your first item above!
            </List.Item>
          ) : (
            items.map((item) => (
              <List.Item
                key={item.id}
                p={4}
                bg="white"
                rounded="md"
                shadow="sm"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack>
                  <Form method="post">
                    <input type="hidden" name="itemId" value={item.id} />
                    <input
                      type="hidden"
                      name="_action"
                      value="toggleComplete"
                    />
                    <Checkbox
                      checked={item.isComplete}
                      onChange={(e: React.FormEvent<HTMLLabelElement>) =>
                        (e.target as HTMLInputElement).form?.submit()
                      }
                    />
                  </Form>
                  <Text
                    textDecoration={item.isComplete ? 'line-through' : 'none'}
                    color={item.isComplete ? 'gray.500' : 'black'}
                  >
                    {item.name}
                  </Text>
                </HStack>

                <Form method="post">
                  <input type="hidden" name="itemId" value={item.id} />
                  <input type="hidden" name="_action" value="deleteItem" />
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    type="submit"
                  >
                    Delete
                  </Button>
                </Form>
              </List.Item>
            ))
          )}
        </List.Root>
      </VStack>
    </Container>
  )
}
