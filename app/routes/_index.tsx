import { redirect } from '@remix-run/node'

export async function loader() {
  return redirect('/lists')
}

export default function Index() {
  return null
}
