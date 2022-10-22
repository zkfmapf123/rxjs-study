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

const [bloodOf_O_Ob, bloodOf_AB_Ob] = [
  ob$.pipe(rx.filter((item) => item.blood_type === 'O')),
  ob$.pipe(rx.filter((item) => item.blood_type === 'AB')),
]

bloodOf_O_Ob.pipe(rx.count()).subscribe({
  next: (v) => console.log('blood type O : ', v),
})

bloodOf_AB_Ob.pipe(rx.count()).subscribe({
  next: (v) => console.log('blood type AB : ', v),
})

// merge AB + O
rx.merge(bloodOf_AB_Ob, bloodOf_O_Ob)
  .pipe(rx.count())
  .subscribe({
    next: (v) => console.log('AB + O count : ', v),
  })
