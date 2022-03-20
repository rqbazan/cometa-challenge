export const isLoading = (...args: { isLoading: boolean }[]) => args.some(arg => arg.isLoading)

export const isError = (...args: { isError: boolean }[]) => args.some(arg => arg.isError)

export const reduceIdentifiables = <T extends { id: string }, R>(
  sources: T[],
  mapper: (item: T) => R
) => sources.reduce((obj, item) => ({ ...obj, [item.id]: mapper(item) }), {}) as Record<string, R>

export * from './indexed-obj'
