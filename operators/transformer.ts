import * as rx from 'rxjs'
import fs from 'fs'
import path from 'path'

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

const data: Person[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), '../', '/db/people.json'), 'utf-8'))
const ob$ = rx.from(data)

/**
 * @desc equals array.map
 */

ob$
  .pipe(
    rx.map((item) => {
      return item.sex
    }),
    rx.reduce((acc, cur) => {
      const sexCount = acc.get(cur)

      if (!sexCount) {
        acc.set(cur, 1)
      } else {
        acc.set(cur, sexCount + 1)
      }

      return acc
    }, new Map())
  )
  .subscribe({
    next: (m: Map<string, number>) => {
      for (const [k, v] of m) console.log(`sex ${k} count : ${v}`)
    },
  })

/**
 * @desc wrapping array to value
 * @output [46,47 ... 50]
 */
rx.range(1, 50)
  .pipe(
    rx.filter((item) => item > 45),
    rx.toArray()
  )
  .subscribe({
    next: (x) => console.log(x),
  })

/**
 * @desc return all process
 * @output ...
 */

rx.range(10, 30)
  .pipe(
    rx.filter((item) => item > 20),
    rx.scan((acc, cur) => acc + cur, 0),
    rx.toArray()
  )
  .subscribe({
    next: (v) => console.log(v),
  })
