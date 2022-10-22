import * as rx from 'rxjs'

const tapper = (x: any) => console.log(`${x} IN`)
const observer = (x: any) => console.log(`${x} OUT`)

rx.of(4, 5, 6).pipe(rx.tap(tapper)).subscribe(observer) // 바로 실행
rx.of('D', 'E', 'F').pipe(rx.tap(tapper)).subscribe(observer) // 바로 실행
rx.of(1, 2, 3).pipe(rx.tap(tapper), rx.subscribeOn(rx.asyncScheduler)).subscribe(observer)
rx.of('A', 'B', 'C').pipe(rx.tap(tapper), rx.observeOn(rx.asyncScheduler)).subscribe(observer)
