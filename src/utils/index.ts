export const isLoading = (...args: { isLoading: boolean }[]) => args.some(arg => arg.isLoading)

export const isError = (...args: { isError: boolean }[]) => args.some(arg => arg.isError)

export const fill = <T>(arr: unknown[], value: T) =>
  Array.from({ length: arr.length }).fill(value) as T[]
