import timezones from "../database/timezones.json"
import { Timezone } from "../models/timezone"

export class TimezoneController {
  findAll() {
    return Object.keys(timezones).map((id) => {
      return this.findById(id)
    })
  }
  findById(timezoneId: string) {
    const { city, country } = timezones[timezoneId]
    const timezone = new Timezone(timezoneId, country, city)
    return timezone
  }
}
