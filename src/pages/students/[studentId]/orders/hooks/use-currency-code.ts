import * as React from 'react'
import { CurrencyCode, PaymentOrderData } from '~/entities'

// FIXME: the currencyCode shouldn't depend on orders array itself
export function useCurrencyCode(orders?: PaymentOrderData[]) {
  const defaultCurrencyCode: CurrencyCode = 'USD'

  return React.useMemo<CurrencyCode>(() => {
    if (!Array.isArray(orders)) {
      return defaultCurrencyCode
    }

    const order = orders.find(order => order.price_currency)

    return order?.price_currency ?? defaultCurrencyCode
  }, [orders])
}
