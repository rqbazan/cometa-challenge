export interface IndexedObj {
  [x: string]: {
    id: string
    prevId: string | null
    nextId: string | null
  }
}

export function createIndexedObj(sources: Array<{ id: string }>): IndexedObj {
  return sources
    .map(item => item.id)
    .map((id, index) => ({
      id,
      prevId: index === 0 ? null : sources[index - 1].id,
      nextId: index === sources.length - 1 ? null : sources[index + 1].id,
    }))
    .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
}
