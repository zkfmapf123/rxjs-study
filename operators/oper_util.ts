import * as rx from 'rxjs'
import { ajax } from 'rxjs/ajax'
import path from 'path'
import fs from 'fs'

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

// blood of AB // O
const [bloodOf_O_Ob, bloodOf_AB_Ob] = [
  ob$.pipe(rx.filter((item) => item.blood_type === 'O')),
  ob$.pipe(rx.filter((item) => item.blood_type === 'AB')),
]

// is Equlas
bloodOf_AB_Ob.pipe(rx.sequenceEqual(bloodOf_O_Ob)).subscribe({
  next: (v) => console.log(v),
})

// igrnoer overlap num
rx.of(1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 7, 8, 9, 9, 9, 10, 10, 10)
  .pipe(rx.distinct(), rx.toArray())
  .subscribe({
    next: (v) => console.log(v),
  })

// Group by -> all numbers divide of group (num)
rx.of(1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 7, 8, 9, 9, 9, 10, 10, 10)
  .pipe(
    rx.groupBy((x) => x % 10),
    rx.tap((x) => console.log(x)),
    rx.mergeMap((obj$) => obj$.pipe(rx.toArray())),
    rx.toArray()
  )
  .subscribe({
    next: (x) => console.log(x),
  })

// every
rx.of(1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 7, 8, 9, 9, 9, 10, 10, 10)
  .pipe(rx.every((x) => x > 11))
  .subscribe({
    next: (v) => console.log(v),
  })

// Retry Of Rxjs -> Pagination

// rx.range(1, 20)
//   .pipe(
//     rx.mergeMap((keyword) =>
//       ajax(`http://localhost:3000`).pipe(
//         rx.tap((item) => console.log(item))
//         rx.map((item) => {
//           return {
//             blood: item.blood_type,
//             name: rx.concat(item.first_name, item.last_name),
//           }
//         }),
//         rx.retry(3)
//       )
//     )
//   )
//   .subscribe(console.log)
