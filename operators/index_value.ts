import * as rx from 'rxjs'
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

// only man
const onlyManOb$ = ob$.pipe(
  rx.map((item) => {
    return { sex: item.sex, blood: item.blood_type }
  }),
  rx.filter((item) => item.sex === 'male'),
  rx.map((item) => item.blood)
)

// Take -> 0 ~ N || Skip
onlyManOb$.pipe(rx.take(5)).subscribe({
  next: (v) => console.log(v),
})

// TakeLast -> n ~ n.length || SkipLast
onlyManOb$.pipe(rx.takeLast(5)).subscribe({
  next: (v) => console.log(v),
})

// TakeWhile
