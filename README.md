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

- Creation Operators (of, from, range, interval...)
- Pipeable Operators (filter, reduce...)

## Refernece

- https://rxviz.com/
