type Days =
  | "domingo"
  | "segunda-feira"
  | "terça-feira"
  | "quarta-feira"
  | "quinta-feira"
  | "sexta-feira"
  | "sábado"

export class DateTime {
  timezoneOffset: number
  days = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ]
  constructor(inputTimeZone: number, outputTimeZone: number) {
    this.timezoneOffset = outputTimeZone - inputTimeZone
  }
  convertDaysAndTimes(days: Days[], hours: number[]) {
    let daysOffset = 0
    const localHours = []
    for (const hour of hours) {
      let localHour = hour + this.timezoneOffset
      if (localHour > 23) {
        localHour -= 24
        daysOffset += 1
      } else if (localHour < 0) {
        localHour += 24
        daysOffset -= 1
      }
      localHours.push(localHour)
    }
    const localDays = []
    for (let day of days) {
      const i = this.days.indexOf(day)
      const index = i + daysOffset
      localDays.push(this.days[index] + " - " + this.days[i])
    }
    return [localDays, localHours]
  }
}

const date = new DateTime(-3, 1)

const [days, hours] = date.convertDaysAndTimes(
  ["segunda-feira", "quarta-feira"],
  [7, 23]
)

console.log(days, hours)
