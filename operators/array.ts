import * as rx from 'rxjs'
import fs from 'fs'
import axios from 'axios'

const obArr = rx.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100)

const observable = {
  next: (x: any) => console.log(x),
}

/**
 * @desc get length
 * @output 10
 */
obArr.pipe(rx.count()).subscribe(observable)

/**
 * @desc get max value
 * @output 100
 */
obArr.pipe(rx.max()).subscribe(observable)

/**
 * @desc get min value
 * @output 1
 */
obArr.pipe(rx.min()).subscribe(observable)

/**
 * @desc equlas array.reduce
 * @output 155
 */
obArr.pipe(rx.reduce((acc, cur) => acc + cur, 0)).subscribe(observable)

/**
 * @desc get first value
 * @output 1
 */
obArr.pipe(rx.first()).subscribe(observable)

/**
 * @desc get last value
 * @output 100
 */
obArr.pipe(rx.last()).subscribe(observable)

/**
 * @desc get elementAt use index
 * @output
 */
obArr.pipe(rx.elementAt(5)).subscribe(observable)
// obArr.pipe(rx.elementAt(100)).subscribe(observable) // Error

/**
 * @desc get distinct value
 * @output
 */
const overlapArr = rx.of(1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5)
overlapArr.pipe(rx.count()).subscribe(observable)
// overlapArr.pipe(rx.distinct()).subscribe(observable)
overlapArr.pipe(rx.distinct(), rx.count()).subscribe(observable)

/**
 * @example
 */

{
  interface Person {
    id: number
    first_name: string
    last_name: string
    sex: string
    blood_type: string
    serve_years: number
    role: string
    team: number
    from: string
  }

  ;(async () => {
    const json = await axios.get('http://localhost:3000')
    const data: Person[] = json.data
    const ob = rx.from(data)

    ob.pipe(
      rx.filter((person) => person.role === 'developer'),
      rx.tap((person) => console.log(person.first_name)),
      rx.count()
    ).subscribe(observable)
  })()
}
