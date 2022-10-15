type ObserverFn<T = any> = (value: T) => void

class Observer<T = any> {
  private observers: ObserverFn<T>[] = []
  subscribe(fn: ObserverFn) {
    this.observers.push(fn)
  }
  protected notifyAll(data: T) {
    for (const observerFn of this.observers) {
      observerFn(data)
    }
  }
}

export class Currency extends Observer<Currency> {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly symbol: string,
    private _value: number
  ) {
    super()
  }
  get value() {
    return this._value
  }
  set value(value: number) {
    this._value = value
    this.notifyAll(this)
  }
}
