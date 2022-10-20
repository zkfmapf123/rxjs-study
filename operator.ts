import * as rx from 'rxjs'

const arrList$ = rx.from([1, 2, 3, 4, 5])
const arr1$ = rx.of([1, 2, 3, 4, 5], ['a', 'b', 'c', 'd', 'e'], [100, 200, 300, 400, 500])
const arrRange$ = rx.range(1, 100)

// Filter
{
  arrRange$.pipe(rx.filter((item) => item % 2 === 0)).subscribe({
    next: (item) => console.log(item),
    complete: () => console.log('----- filter complete -----'),
  })
}

// Reduce && Filter
{
  arr1$
    .pipe(
      rx.reduce((acc, cur) => {
        acc += cur.join()
        return acc
      }, ''),
      rx.filter((item: string) => item.includes('200'))
    )
    .subscribe({
      next: (data) => console.log(data),
      complete: () => console.log('------ reduce && filter complete -----'),
    })
}

{
  arrList$.pipe(rx.tap(console.log)).subscribe({
    next: (data) => console.log('data'),
  })
}
