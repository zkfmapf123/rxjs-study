import { Observable, Observer } from 'rxjs'

// Utils
export const oEntries: typeof Object.entries = <T>(obj: T) => Object.entries(obj)
export const oKeys: typeof Object.keys = <T>(obj: T) => Object.keys(obj)
export const oValues: typeof Object.values = <T>(obj: T) => Object.values(obj)

export interface DkObservable<T, K> extends Observer<T> {
  next: (data: T) => K // override
}
