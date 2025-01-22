import type {
  TypedResponse,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
  getList,
  addItemToList,
  toggleItem,
  deleteItem,
  type PackingItemType,
  type PackingListType,
} from '~/utils/store.server'
import { PackingList } from '../components/PackingList'

// TODO: Will be replaced by Phoenix API call to GET /api/lists/:id
export async function loader({
  params,
}: LoaderFunctionArgs): Promise<
  TypedResponse<{ items: PackingItemType[]; listName: string }>
> {
  const list = getList(params.listId!)
  if (!list) {
    throw new Response('List not found', { status: 404 })
  }
  return new Response(
    JSON.stringify({ items: list.items, listName: list.name }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

// TODO: Will be replaced by Phoenix API calls to respective endpoints
export async function action({
  request,
  params,
}: ActionFunctionArgs): Promise<
  TypedResponse<{ success: boolean; list?: PackingListType; error?: string }>
> {
  const formData = await request.formData()
  const action = formData.get('_action')
  const listId = params.listId!

  switch (action) {
    case 'toggleComplete': {
      const itemId = formData.get('itemId')?.toString()
      if (!itemId) {
        return new Response(
          JSON.stringify({ success: false, error: 'Item ID required' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      }
      return new Response(
        JSON.stringify({ success: true, list: toggleItem(listId, itemId) }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    case 'deleteItem': {
      const itemId = formData.get('itemId')?.toString()
      if (!itemId) {
        return new Response(
          JSON.stringify({ success: false, error: 'Item ID required' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      }
      return new Response(
        JSON.stringify({ success: true, list: deleteItem(listId, itemId) }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    default: {
      const item = formData.get('item')?.toString()
      if (!item) {
        return new Response(
          JSON.stringify({ success: false, error: 'Item name required' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      }
      return new Response(
        JSON.stringify({ success: true, list: addItemToList(listId, item) }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  }
}

export default function ListRoute() {
  const { listName } = useLoaderData<typeof loader>()

  return (
    <main className="min-h-screen bg-gray-50">
      <PackingList listName={listName} />
    </main>
  )
}
