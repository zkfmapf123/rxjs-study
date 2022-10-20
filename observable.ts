import * as rx from 'rxjs'
import { ajax } from 'rxjs/ajax'

// 1. 1차원적인 Stream
{
  const obj1 = rx.of(1, 2, 3, 4, 5)
  const obj2 = rx.from([6, 7, 8, 9, 10])
  const obj3 = rx.range(1, 10)

  //   console.log(obj1.subscribe((ob) => console.log(ob)))
  //   console.log(obj2.subscribe((ob) => console.log(ob)))
  //   console.log(obj3.subscribe((ob) => console.log(ob)))
}

// 2. 시간의 의한 Stream
{
  const timeObj1 = rx.interval(500)
  const timeObj2 = rx.timer(3000)

  //   console.log(timeObj1.subscribe((ob) => console.log(ob))) // after every 3 -> 숫자가 점점 increment
  //   console.log(timeObj2.subscribe((ob) => console.log(ob))) // after 3
}

// 3. FromEvent -> use Client
{
  // rx.FromEvent
}

// 4. Ajax of Stream -> Issue
{
  const URL = 'http://localhost:3000'
  // not rxjs
  //   ;(async () => {
  //     const json = await axios.get(URL)
  //     const { data } = json
  //     console.log(data)

  //     const rxJson = ajax(URL)
  //     rxJson.subscribe((item) => console.log(item.response))
  //   })()
}

// 5. custom Observable
{
  const ob = new rx.Observable((sub) => {
    sub.next(1)
    sub.next('hello')
    sub.next('world')

    sub.complete()
  })

  ob.subscribe((item) => console.log(item))
}
