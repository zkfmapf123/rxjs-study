import * as rx from 'rxjs'

// Observable -> 각각 unicast
{
  const ob = new rx.Observable((sub) => {
    let x = 0
    setInterval(() => {
      sub.next(++x)
    }, 500)
  })
  ob.subscribe({
    next: (x) => console.log(x),
  })
  setTimeout(() => {
    ob.subscribe({
      next: (x) => console.log(`after 1 : ${x}`),
    })
  }, 1000)
  setTimeout(() => {
    ob.subscribe({
      next: (x) => console.log(`after 2 : ${x}`),
    })
  }, 2000)
}

// Subject -> 동일하게 전달 (multicast)
{
  const sub = new rx.Subject()
  let x = 0
  setInterval(() => {
    sub.next(++x)
  }, 500)

  sub.subscribe({
    next: (x) => console.log(x),
  })

  setTimeout(() => {
    sub.subscribe({
      next: (x) => console.log(`after 1 : ${x}`),
    })
  }, 1000)

  setTimeout(() => {
    sub.subscribe({
      next: (x) => console.log(`after 2 : ${x}`),
    })
  }, 2000)
}
