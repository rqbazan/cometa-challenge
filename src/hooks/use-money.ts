import * as React from 'react'
import constate from 'constate'
import { add, subtract } from 'dinero.js'
import { CurrencyCode, Money } from '~/entities'
import { MoneyFormatter } from '~/formatters'

interface MoneyProviderProps {
  currencyCode: CurrencyCode
}

function useMoneyContextValue({ currencyCode }: MoneyProviderProps) {
  const [value, setValue] = React.useState<Money>(() => new Money('0', currencyCode))

  const operations = React.useMemo(() => {
    return {
      add: (newValue: Money) => {
        setValue(current => {
          const a = MoneyFormatter.toDinero(current)
          const b = MoneyFormatter.toDinero(newValue)

          if (a && b) {
            return MoneyFormatter.fromDinero(add(a, b))
          } else {
            return current
          }
        })
      },
      substract: (newValue: Money) => {
        setValue(current => {
          const a = MoneyFormatter.toDinero(current)
          const b = MoneyFormatter.toDinero(newValue)

          if (a && b) {
            return MoneyFormatter.fromDinero(subtract(a, b))
          } else {
            return current
          }
        })
      },
    }
  }, [])

  return { value, operations }
}

export const [MoneyProvider, useMoney, useMoneyOperations] = constate(
  useMoneyContextValue,
  v => v.value,
  v => v.operations
)