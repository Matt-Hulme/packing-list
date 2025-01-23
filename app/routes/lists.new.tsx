import { type ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Container, VStack, Heading, Input, Button } from '@chakra-ui/react'
import { Form, useNavigation } from '@remix-run/react'
import { createList } from '~/utils/store.server'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get('name')?.toString()

  if (!name) {
    throw new Response('List name is required', { status: 400 })
  }

  const list = createList(name)
  return redirect(`/lists/${list.id}`)
}

export async function loader() {
  return new Response(JSON.stringify({}), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export default function NewList() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Container maxW="container.md" className="bg-greyDark" py={8}>
      <VStack spaceY={6} align="stretch">
        <Heading size="lg">Create New Packing List</Heading>
        <Form method="post">
          <VStack spaceY={4}>
            <Input
              name="name"
              placeholder="List name (e.g., Camping Trip)"
              required
              bg="white"
            />
            <Button
              type="submit"
              colorScheme="blue"
              disabled={isSubmitting}
              _loading={{ opacity: 0.8 }}
              alignSelf="flex-start"
            >
              Create List
            </Button>
          </VStack>
        </Form>
      </VStack>
    </Container>
  )
}
