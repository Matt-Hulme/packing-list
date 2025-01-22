import { redirect } from '@remix-run/node'

export async function loader() {
  return redirect('/list')
}

export default function Index() {
  return null
}
