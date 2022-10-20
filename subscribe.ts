import * as rx from 'rxjs'
import { DkObservable } from './core'

const arr$ = rx.range(1, 100)
const arr2$ = rx.of([1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15])

{
  // basic observable
  //   const observer: DkObservable<number, void> = {
  //     next: (num) => console.log(`next :`, num),
  //     error: (e) => console.error(e),
  //     complete: (msg?: string) => console.log(`complete : `, msg),
  //   }
  //   arr$.subscribe(observer)
}

{
  // map observable
  const dkMap = <A, B>(arr: A[], fn: (arr: A) => B) => arr.map(fn)

  const observer: DkObservable<number[], void> = {
    next: (nums) => dkMap(nums, (num) => console.log(num + 100)),
    error: (e) => console.error(e),
    complete: (msg?: string) => console.log(`complete : `, msg),
  }

  let total = 0
  arr2$.subscribe(observer)

  console.log('total : ', total)
}

{
  // Error
  const ob = new rx.Observable((sub) => {
    sub.next(1)
    sub.next(2)
    sub.next(3)
    throw new Error('nono')
    sub.complete() // memory 회수
  })

  ob.subscribe({
    next: (obs) => console.log(obs),
    error: (e) => console.error(e),
    complete: () => console.log('---- complete ----'),
  })
}

{
  // Complete
  const ob = new rx.Observable((sub) => {
    sub.next(1)
    sub.next(2)
    sub.next(3)
    sub.complete() // memory 회수
  })

  ob.subscribe({
    next: (obs) => console.log(obs),
    complete: () => console.log('---- complete ----'),
  })
}

{
  // 구독해제
  const intervalObj = rx.interval(1000)

  const subscription = intervalObj.subscribe({
    next: (data) => console.log(data),
  })

  setTimeout(() => {
    subscription.unsubscribe()
  }, 5000)
}
