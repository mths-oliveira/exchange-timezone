const date = new Date()

export class Timezone {
  offset: number
  name: string
  constructor(public id: string, public country: string, public city: string) {
    const timeString = date.toLocaleTimeString("pt-BR", {
      timeZone: id,
      hour: "2-digit",
      minute: "2-digit",
    })
    this.offset = this.getTimezoneOffsetByTimeString(timeString)
    this.name = this.getTimezoneNameByOffset()
  }
  private getTimezoneOffsetByTimeString(timeString: string) {
    const [hoursString] = timeString.split(":")
    const localHours = Number(hoursString)
    const UTCHours = date.getUTCHours()
    let timeZoneOffset = localHours - UTCHours
    const firstTimezone = -11
    const lastTimezone = 12
    if (timeZoneOffset < firstTimezone) timeZoneOffset += 24
    if (timeZoneOffset > lastTimezone) timeZoneOffset -= 24
    return timeZoneOffset
  }
  private getTimezoneNameByOffset() {
    const timeZoneName = "GMT"
    return this.offset
      .toString()
      .replace(/^(\d{1,2})/, "+$1")
      .replace(/([+-])(\d)$/, "$10$2")
      .padStart(6, timeZoneName)
      .padEnd(9, ":00")
  }
}
