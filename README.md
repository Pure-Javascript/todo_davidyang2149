# 순수 자바스크립트로 TODO 개발하기 - davidyang2149

## 요구사항

1. 새로운 Todo(제목, 내용)를 작성할 수 있다.
2. Todo 항목의 제목과 내용을 수정할 수 있다.
3. Todo 항목을 삭제할 수 있다.
4. 선택에 의해 Todo에 마감기한을 넣을 수 있다.
5. 마감기한이 지난 Todo에 대해 알림을 노출할 수 있다.
6. Todo 항목의 우선순위를 설정 및 조절할 수 있다.
7. Todo 항목에 대한 완료처리를 할 수 있다.
8. Todo 항목은 하위에 Todo 항목들을 가질 수 있다(Single Layer).

	> 장보기 
	> 	- 계란사기
	> 	- 우유사기
	> 		- 서울우유 사기
9. Todo 목록을 볼 수 있다.
10. Todo 목록은 새로고침을 해도 유지되어야 한다.

## 진행상황

- [x] 새로운 Todo(제목, 내용)를 작성할 수 있다.
- [x] Todo 항목의 제목과 내용을 수정할 수 있다.
- [x] Todo 항목을 삭제할 수 있다.
- [x] 선택에 의해 Todo에 마감기한을 넣을 수 있다.
- [x] 마감기한이 지난 Todo에 대해 알림을 노출할 수 있다.
- [x] Todo 항목의 우선순위를 설정 및 조절할 수 있다.
- [x] Todo 항목에 대한 완료처리를 할 수 있다.
- [ ] Todo 항목은 하위에 Todo 항목들을 가질 수 있다(Single Layer).
- [x] Todo 목록을 볼 수 있다.
- [x] Todo 목록은 새로고침을 해도 유지되어야 한다.

## 스터디 기간

- 2020.12.20(일) ~ 2021.01.10(일)
- 1st MeetUp 2020.12.27(일) 오후 3시(Meet up)
- 2nd MeetUp 2021.01.03(일) 오후 3시(1st Code Review)
- 3ed MeetUp 2021.01.10(일) 오후 3시(2nd Code Review)
- MeetUp 참여가 어려울 경우 주석을 달아서 Git에 배포 or MD에 본인의 코드 리뷰 달기

## 정보
GitPage: 업데이트 예정

## Install dependencies

```bash
npm install
```

## Run Todo Page

```bash
npm start
```
## Run tests

```bash
# Run tests
npm test
```

## 스터디 기록

#### 1차 스터디

##### 동적인 문제? - completeTodo
- 다이나믹으로 돔을 다루기 떄문에 생기는 문제로 보임

##### 프록시 패턴, 옵저버 패턴 
- 알아보기

##### 리랜더링 - 리페인팅, 리플로우의 개념에 대해
- https://tuhbm.github.io/2018/02/22/reflowAndRepaint

##### createDocumentFragment - 무엇인가?
- https://boycoding.tistory.com/65

##### setAttribute는 언제 사용해야 하는가?


##### 로컬스토리지, fetchapi의 경우 데이터를 보낼 때 string으로 변환해야한다. 이유가 무엇일까? 규정인가? 규약인가?

##### 사파리에서 class를 순수하게 받지 않는 이유?

##### classList 에서 contains를 사용하여 크래스를 쉽게 제거 추가 

##### keyCode는 Deprecated가 되었다! (정보)

##### insertBefore가 무엇인가?
- https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore

##### DOM을 핸들링할 때 null이나 undefined에 대한 고려를 해야 함

##### CSS 네이밍 : BEM

##### removeEventListener 에 대해... 
- 메모리 낭비를 없게 하기 위해 처리

#### 2차 스터디

##### Drag event
- https://developer.mozilla.org/ko/docs/Web/API/Document/drag_event
- 이벤트 만들어보기

##### addEventListener
- 값이 많아질 경우 addEventListener를 계속 갱신할 수 있을까?
- 가장 상위에 addEventListener를 적용하면 예를 들어 ul에만 적용하면 하위 값이 변경되어도 addEventListener를 새롭게 생성할 필요가 없다.