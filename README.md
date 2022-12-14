# RXJS Study

## Desc

- FP + Reactive Programming

## Observable (스트림 생성기) -> observable.ts

- of, from, range (1차원적인 스트림)
- interval, timer(시간에 의한 Stream)
- FromEvent (이벤트)
- Ajax
- Custom Observable
- Result
  - 결국, Observable 형태로 만들고 -> Subscribe를 하는 시점에 호출된다.

## Subscribe (구독) -> subscribe.ts

```ts
    // Observer
    _.subscribe({
        next : () ...
        error : () ...
        complete : () ... // 메모리 해제
    })

    const subscriber = _.subscribe({...})
    subscriber.unsubcribe() // 구독 해제
```

## Operator (연산자) -> operator.ts

- https://rxjs.dev/guide/operators
- Creation Operators (of, from, range, interval...)
- Pipeable Operators (filter, reduce...)

```ts
    const arr = [1,2,3,4,5]

    rx.from(arr)
    .pipe(
        rx.filter((item) => item > 3),
        rx.reduce((acc,cur) => acc+cur,0)
    )
    .subscribe({
        next : (data) => ...,
        error : (e) => ...,
        complete :() => ...
    })


    console.log(arr) // 1,2,3,4,5

    /*
        순수함수 이기때문에 기존의 원본은 건드리지 않는다
    */
```

## Subejct -> subject.ts

```
    Observable은 구독을 해야 발행 -> unicast
    Subject는 개발자가 원하는 때에 발행 -> multicast
```

## Refernece

- https://rxviz.com/
