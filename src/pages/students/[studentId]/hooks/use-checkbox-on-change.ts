import { Money } from '~/entities'
import { useMoneyOperations } from '~/hooks'

export function useCheckboxOnChange() {
  const operations = useMoneyOperations()

  return (value: Money) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      operations.add(value)
    } else {
      operations.substract(value)
    }
  }
}
