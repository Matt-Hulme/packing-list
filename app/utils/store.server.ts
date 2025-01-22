// TODO: These types will be replaced by types from the Phoenix API
type PackingItemType = {
  id: string
  name: string
  isComplete: boolean
}

type PackingListType = {
  id: string
  name: string
  items: PackingItemType[]
}

// TODO: This in-memory store will be replaced by Phoenix API calls
const lists: Record<string, PackingListType> = {}

// TODO: Will be replaced by GET /api/lists
function getAllLists() {
  return Object.values(lists)
}

// TODO: Will be replaced by GET /api/lists/:id
function getList(id: string) {
  return lists[id]
}

// TODO: Will be replaced by POST /api/lists
function createList(name: string) {
  const id = Date.now().toString()
  lists[id] = { id, name, items: [] }
  return lists[id]
}

// TODO: Will be replaced by POST /api/lists/:id/items
function addItemToList(listId: string, itemName: string) {
  const list = lists[listId]
  if (!list) return null

  const newItem = {
    id: Date.now().toString(),
    name: itemName,
    isComplete: false,
  }

  list.items.push(newItem)
  return list
}

// TODO: Will be replaced by PATCH /api/lists/:id/items/:itemId
function toggleItem(listId: string, itemId: string) {
  const list = lists[listId]
  if (!list) return null

  const item = list.items.find((i) => i.id === itemId)
  if (item) {
    item.isComplete = !item.isComplete
  }

  return list
}

// TODO: Will be replaced by DELETE /api/lists/:id/items/:itemId
function deleteItem(listId: string, itemId: string) {
  const list = lists[listId]
  if (!list) return null

  list.items = list.items.filter((i) => i.id !== itemId)
  return list
}

// This will replace store.server.ts when Phoenix backend is ready
// const API_URL = process.env.API_URL || 'http://localhost:4000/api'

// export async function getAllLists() {
//   const response = await fetch(`${API_URL}/lists`)
//   if (!response.ok) throw new Error('Failed to fetch lists')
//   return response.json()
// }

// ... other API functions

export {
  getAllLists,
  getList,
  createList,
  addItemToList,
  toggleItem,
  deleteItem,
}
export type { PackingItemType, PackingListType }
