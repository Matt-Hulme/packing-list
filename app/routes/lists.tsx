import { Outlet } from '@remix-run/react'
import { Container } from '@chakra-ui/react'

export default function ListsLayout() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Container maxW="container.md" py={8}>
        <Outlet />
      </Container>
    </main>
  )
}
