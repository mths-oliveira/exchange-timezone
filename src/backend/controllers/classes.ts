import data from "../database/classes.json"

const date = new Date("2022/08/01")
export class ClassesController {
  private defaultTimezoneOffset = -3
  findAllByTimezone(timezoneOffset: number) {
    const diffOffSet = timezoneOffset - this.defaultTimezoneOffset
    return data.classes.map((classes) => {
      date.setHours(classes.firstClass + diffOffSet)
      const firstClass = date.toTimeString().substring(0, 5)
      date.setHours(classes.lastClass + diffOffSet)
      const lastClass = date.toTimeString().substring(0, 5)
      return {
        classes: [firstClass, lastClass],
        weekdays: classes.weekdays,
      }
    })
  }
}
