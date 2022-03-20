export const isLoading = (...args: { isLoading: boolean }[]) => args.some(arg => arg.isLoading)

export const isError = (...args: { isError: boolean }[]) => args.some(arg => arg.isError)
