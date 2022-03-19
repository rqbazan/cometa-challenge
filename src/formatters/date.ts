import format from 'date-fns/format'
import esLocale from 'date-fns/locale/es'

export class DateFormatter {
  static toShortString(date: Date) {
    return format(date, "dd 'de' LLL", { locale: esLocale })
  }
}
