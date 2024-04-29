import dayjs from 'dayjs'

export function format(dateValue: number | string | Date, format?: string) {
  return dayjs(dateValue).format(format)
}
