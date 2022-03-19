export function formatPriceAmount(priceAmount: string) {
  const isZero = Number.isNaN(+priceAmount) || +priceAmount === 0
  return isZero ? '---' : priceAmount
}
