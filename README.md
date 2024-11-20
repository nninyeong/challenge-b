# DreamCard

## [💌 드림카드 바로가기](https://www.dream-card.co.kr/)

드림카드는 모바일 청첩장 제작 서비스입니다. 예비 부부가 직접 청첩장을 꾸미고 제작하며, 이를 공유할 수 있도록 돕는 플랫폼입니다. 하객들은 드림카드를 통해 방명록을 남기고, 참석 여부를 전달할 수 있습니다. 또한 하객 명단 다운로드, 임시 저장 기능 등 편리한 기능을 제공하며, 더 나은 사용자 경험을 위해 고민하고 도전한 프로젝트입니다.

<br/>


## 목차
1. [팀원 소개](#팀원-소개)
2. [주요 기능 소개](#주요-기능-소개)
3. [기술 스택](#기술-스택)
4. [아키텍처](#아키텍처)
5. [우리 팀이 고민한 내용들](#우리-팀이-고민한-내용들)
6. [트러블슈팅](#트러블슈팅)
7. [회고](#회고)

<br/>


## 팀원 소개

| 이름 (Github)      | 역할 및 기여                                                                                              |
|-----------|----------------------------------------------------------------------------------------------------------|
| [김민영](https://github.com/nninyeong)    | 팀장, 청첩장 제작 기능 (스티커, 예식 장소/시간, 렌더링 순서 변경), 배포된 청첩장 렌더링 및 오픈그래프 설정, Sentry 및 Github 설정, 회원가입 및 소셜로그인 |
| [이기성](https://github.com/Leekee0905)    | 부팀장, 후기 작성/상세 페이지, 청첩장 제작 기능(스크롤 이벤트, 계좌 정보 입력, 배경 색상, 온보딩)              |
| [한수빈](https://github.com/hansub1n)    | 메인페이지 캐러셀/슬라이드, 청첩장 제작 기능(무드 프리셋, 개인정보 입력, 제출/수정/임시저장), 청첩장 PDF 다운로드      |
| [정소현](https://github.com/sHyunis)    | 후기 조회(무한 스크롤), 후기 좋아요, 청첩장 제작(폰트 선택, 갤러리, 대표 사진 등록, 인사말 입력), 진척률 표시, Google Analytics 설정 
| [김진형](https://github.com/lukby2457)    | 청첩장 제작 기능(방명록, 참석 여부, 카카오페이 등록, 교통수단 입력, 딥링크), 방문객 명단 CSV 다운로드            |
| 이준서    | 디자이너, 모바일/웹 디자인, 아이콘, 브로슈어 및 에셋 디자인                                                |

<br/>

## 주요 기능 소개

<details>
<summary>메인 화면</summary>
<div markdown="1">
<div align="center">
  <img src="https://github.com/user-attachments/assets/e28d3ce0-17b2-4416-9f53-6d6f9e2a9328" alt="메인페이지" />
</div>
</div>
</details>

<details>
<summary>로그인/회원가입</summary>
<div markdown="1">
<div align="center">
  <img src="https://github.com/user-attachments/assets/ed0ba3de-7146-445a-9410-6d0a3fcfe460" alt="로그인/회원가입" />
</div>
</div>
</details>

<details>
<summary>청첩장 제작하기</summary>
<div markdown="1">
<div align="center">
  <img src="https://github.com/user-attachments/assets/5ed33101-d92e-4f95-b8b8-da7ff8655aec" alt="청첩장 제작하기" />
</div>
</div>
</details>

<details>
<summary>마이 페이지</summary>
<div markdown="1">
<div align="center">
  <img src="https://github.com/user-attachments/assets/03b287c4-2135-4ec7-bd9b-e229af5cbe1b" alt="마이 페이지" />
</div>
</div>
</details>

<details>
<summary>후기 페이지</summary>
<div markdown="1">
<div align="center">
  <img src="#" alt="후기 페이지" />
</div>
</div>
</details>

<br/>

## 기술 스택

**패키지 매니저**
  
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white">


**프레임워크 및 라이브러리**

  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=React-Hook-Form&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white"> <img src="https://img.shields.io/badge/Framer-0055FF?style=for-the-badge&logo=Framer&logoColor=white"> <img src="https://img.shields.io/badge/sharp-99CC00?style=for-the-badge&logo=sharp&logoColor=white">

**상태 관리**

  <img src="https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white"> <img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white">

**데이터베이스, 인증**

  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=Supabase&logoColor=white">

**모니터링**

  <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=Sentry&logoColor=white">


<br/>

## 아키텍처

<details>
<summary>청첩장 제작</summary>
<div markdown="1">
<div align="center">
  <img src="https://github.com/user-attachments/assets/7e74bed6-45c7-45a6-b8f7-51733886d2d4" alt="청첩장 제작 아키텍처" />
</div>
</div>
</details>

<details>
<summary>청첩장 배포</summary>
<div markdown="1">
<div align="center">
  <img src="https://github.com/user-attachments/assets/c89cd8cf-0e3b-4107-8b65-67d018259f4e" alt="청첩장 배포 아키텍처" />
</div>
</div>
</details>

<details>
<summary>마이페이지</summary>
<div markdown="1">
<div align="center">
  <img src="https://github.com/user-attachments/assets/8fc1849f-04ac-41c8-95c4-f3e0a17f9f49" alt="마이페이지 아키텍처" />
</div>
</div>
</details>

<details>
<summary>리뷰 페이지</summary>
<div markdown="1">
<div align="center">
  <img src="https://github.com/user-attachments/assets/7f2709ad-1359-4135-b463-beeaaf869ebb" alt="리뷰 아키텍처" />
</div>
</div>
</details>

<br/>

## 우리 팀이 고민한 내용들

### 김민영
1. [제목](#)
2. [제목](#)

### 이기성
1. [스크롤 이벤트 개선하기](https://velog.io/@leekee0905/TIL-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0)
2. [프로젝트에서 react-hook-form을 사용한 이유](https://velog.io/@leekee0905/TIL-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-react-hook-form%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%9D%B4%EC%9C%A0)
3. [z-index가 왜 안될까?](https://velog.io/@leekee0905/z-index%EA%B0%80-%EC%99%9C-%EC%95%88%EB%90%A0%EA%B9%8C)

### 한수빈
1. [Carousel](https://onetwothreechachacha.tistory.com/152)
2. [비회원과 회원 사용자의 폼 데이터 매끄럽고 안전하게 저장하는 방법 - 세션스토리지와 Supabase 활용](https://onetwothreechachacha.tistory.com/154)

### 정소현
1. [제목](#)
2. [제목](#)

### 김진형
1. [지도 연동 네비게이션 버튼 개발 스토리](https://velog.io/@lukby2457/117-%EC%9D%B4%EC%A0%84-%EA%B0%9C%EB%B0%9C-%EC%A0%95%EB%A6%AC)
2. [청첩장 방명록에 페이지네이션 적용하기](https://velog.io/@lukby2457/1117-%EA%B0%9C%EB%B0%9C-%EB%82%B4%EC%9A%A9-%EC%9A%94%EC%95%BD-%EC%A0%95%EB%A6%AC)


<br/>

## 트러블슈팅

### 서버/클라이언트 환경 차이로 인한 프리패치 에러 해결
**✔ 문제 상황**

- 청첩장 제작에 사용할 에셋의 로딩 속도가 느려 prefetchQuery를 적용함
- 별도의 에러는 확인되지 않고 프리패치가 적용되지 않아 로딩 속도가 개선되지 않음

**✔ 시도**

- 문제가 되는 부분을 파악하고자 받아온 데이터를 콘솔에 출력했고, 실제로 데이터를 미리 받아오지 못한 것을 확인
- 에러를 확인할 수 있는 fetchQuery를 활용해 데이터 fetch 과정에서 발생하는 에러 확인
- queryFn에서 이미지 처리에 브라우저 API를 사용해 서버 환경에서는 에러가 발생하는 것을 확인

**✔ 해결**

- 서버 환경에서의 이미지 처리를 sharp를 활용한 별도의 함수로 분리해 해결

<br/>

### 스크롤 이벤트 개선
**✔ 문제 상황**

- 버튼을 통해 현재 Step에 맞는 div로 scroll 하여 이동을 하는 과정에서 한번에 scroll되지 않고 여러번 클릭하거나 매끄럽지 않게 스크롤이 진행이됨

**✔ 시도**

- 버튼을 통한 스크롤 뿐만 아니라 스크롤을 통해 해당 단계에 맞는 input으로 전환이 되어야 했음
- Intersection Observer API를 통해 Step의 증가를 시키고 있었기 때문에 감지 범위의 문제라 생각하여 threshold를 조절하였지만 아니였음

**✔ 해결**

- Next버튼을 통해 Scroll이 발생하면서 Intersection Observer API도 동시에 감지되어 동작을 하다보니 현재 Step을 변경하는 과정이 충돌하는 것이었음
- isNavigating이라는 버튼을 통한 스크롤이 동작 중 임을 판별하는 ref를 선언하여 버튼을 누르고 스크롤이 완료 되었을 때 Observer가 실행되도록 수정


<br/>

### 소셜 로그인 후 데이터 저장 누락 문제 해결
**✔ 문제 상황**

- 소셜 로그인을 통해 인증을 완료한 후, 세션 스토리지에 저장된 데이터를 Supabase에 저장하는 로직을 실행해야하는데 이 과정에서 데이터 저장이 누락 됨

**✔ 시도**

- 소셜 로그인 후 데이터 저장 요청이 완료될 때까지 비동기 처리를 통한 대기를 고려했으나, 기대한 대로 작동하지 않음
- 데이터 저장 요청이 완료되기 전에 페이지가 전환되며, 사용자의 데이터가 Supabase에 저장되지 않는 문제 확인

**✔ 해결** 

- 사용자가 로그인을 완료한 후, 데이터를 저장하기 위한 별도의 페이지로 리다이렉트해 데이터 저장 로직 처리 -> 데이터 저장 완료 후 기존 페이지로 전환

  
<br/>

### 중복 쿼리 키로 인한 데이터 유효성 문제 해결
**✔ 문제 상황**

- 리뷰 데이터를 사용하는 캐러셀과 리뷰 페이지 간 이동이 생길 때 데이터가 유효하지 않다는 에러 발생했으나 각 페이지 접속시 문제가 없음

**✔ 시도**

- 리뷰 데이터를 배열로 관리하고있어 페이지 이동 시 빈 배열이 문제인가 추측 `memoization` 시도
- 캐러셀과 리뷰 페이지에서 fetch를위해 사용하는 useQuery를 확인했고, 같은 쿼리키를 사용하는 것을 발견

**✔ 해결** 

- 캐러셀과 리뷰 페이지에서 서로 다른 쿼리 키를 사용하도록 수정하고 실수 방지를 위해 공통 파일에서 함수로 반환해 사용할 수 있도록 함

<br/>

### 청첩장 제작 진척률 깊은 비교 오류 해결
**✔ 문제 상황**

- 청첩장 제작 진척률을 기본데이터 값과 데이터베이스 저장 값을 비교해 두 값이 같지 않다면 해당 필드는 진행한 것으로 판단하여 진척도를 갱신하나 진행하지 않은 부분도 진행한 것으로 판단됨

**✔ 시도**

- JSON.stringify 를 사용하여 기본데이터 값과 데이터베이스 값을 JSON문자열로 변환 후 비교
- 큰 객체 안에 여러개의 필드객체 & 배열들을 받고 있었기 때문에 깊은 비교 lodash의 isEqual을 사용하여 비교

**✔ 해결** 

- 큰 객체 안의 여러개의 필드를 for문으로 돌면서 해당 필드가 객체인지 배열인지 판단하여 깊은 정렬을 한 후 lodash의 isEqual 을 사용하여 깊은 비교를 진행

<br/>

### 방명록 preFetch 적용
**✔ 문제 상황**

- 방명록의 page에 맞춰서 다음 page의 게시글을 prefetch를 적용하는 과정에서 prefetch가 요청이 되지 않는 문제가 발생

**✔ 시도**

- 최상위 layout에 작성되어 있는 providers에 선언되어 있는 defaultOptions의 staleTime이 1시간으로 설정되어 있는 것을 확인
- 이 설정으로 인하여 staleTime을 명시하지 않으면 기본값인 0이 아닌 1시간으로 자동으로 설정됨에 따라 1시간동안 fetch가 진행되지 않음

**✔ 해결** 

- prefetchQuery의 staleTime을 0으로 명시하여 prefetch를 진행할 수 있게 변경


<br/>

## 회고

### 김민영
> 팀원들 모두가 도전적인 기능과 스코프를 담당하고 완성하여 많이 배울 수 있었던 기회였습니다.
또한 구현 방식, 사용성, 협업 등 여러 방면에서 더 나은 방법을 함께 고민하고 실천할 수 있어 더 의미있는 프로젝트가 된 것 같습니다. 고생하셨습니다!!

### 이기성
> 복잡한 비즈니스 로직을 구현하면서 설계에 대한 중요성을 더 깨닳게 되는 프로젝트 였던 것 같습니다. 또한 한 페이지에서 여러명이 작업하게 되어 협업을 어떻게 하면 더 잘 할 수 있을지 계속 고민하고 노력했던 것 같습니다. 다들 도전적인 기능과 넓은 스코프를 구현하느라 힘들고 어려웠을텐데 고생 많으셨습니다!

### 한수빈
> UX를 고려하는 과정, 문제 해결을 통해 개발자로서 한층 더 성장할 수 있었습니다.
열정적인 사람들과 함께하며 저도 더 열정을 쏟아부을 수 있었고, 덕분에 프로젝트를 더 즐겁게 진행할 수 있었습니다.

### 정소현
> 커스텀이라는 서비스를 제공하기 위해 무엇보다 사용자경험이 중요했고 더 나은 UI/UX를 제공하기 위한 여러 고민들을 하며 다양한 라이브러리들과 기술들을 사용했습니다. UX에 대하여 팀원들과 함께 이야기하며 소통하는 방법을 익힐 수 있었습니다.  팀원 모두가 빠짐없이 몰두하여 완성시킨 서비스라 너무 만족스럽고 많이 배우고 성장할 수 있었던 시간이었습니다.

### 김진형
> 사용자에게 더 좋은 경험을 제공하기 위한 UX/UI를 고민하게 되었고 이를 적용하기 위하여 여러 고민들과 다양한 해결 방법에 대하여 많은 경험을 가지고 가는 좋은 시간이었습니다.

### 이준서
> 모바일 청첩장을 주제로 프로젝트를 진행하며, 넓은 스코프로 인해 여러 도전 과제에 직면했습니다. 특히, 청첩장 꾸미기 기능과 다양한 정보 입력 항목을 사용자 친화적으로 설계하는 방법에 대해 많은 고민을 했습니다. 이를 해결하기 위해, 드림카드만의 미리보기 기능과 통합된 정보 입력 폼을 새롭게 도입하며 문제를 풀어나갔습니다. 디자인과 개발 간의 경계를 넘나들며 협력하는 방법을 배우고, 사용자 경험을 중심으로 문제를 정의하고 해결하는 사고력을 키울 수 있었습니다.
