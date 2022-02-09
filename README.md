## 🏋️‍ 근성장코드 닷컴(geunsungjang.com)
- Youtube 피트니스 분야의 크리에이터들이 올리는 프로모션 코드를 모아놓은 사이트입니다.
- 프로모션 코드의 종류로 닭가슴살(랭킹닭컴, 미트리), 단백질 보충제(마이프로틴, 더 프로틴 웍스)가 있습니다.
  <br>이 프로모션 코드들은 크리에이터마다 할인율과 같은 혜택에서 차이가 존재하기 때문에 한곳에 모아놓으면 사용자가 비교하기 쉬울 것이라고 생각하였습니다.
- 사용자가 여러 페이지를 돌아다니며 프로모션 코드를 확인할 것으로 예상되기 때문에 React JS를 이용하여 페이지 간 이동이 자연스러운 Single-Page Application으로 만들었습니다.

## 🏠 사이트
- https://healthcode-337114.du.r.appspot.com/

## 👥 사용자
- 닭가슴살, 단백질 보충제의 프로모션 코드가 필요한 유저
- 제품 구매 시 프로모션 코드끼리의 할인율을 비교하는 유저

## 🗓️ 프로젝트 제작 기간
- 2021.11 ~ 2022.01

## ⚙️ 기술 스택
- Front End : React JS
- Back End : Ndoe JS, MongoDB, GCP(Google Cloud Platform)

## 📚 프로젝트 제작 과정
- https://blog.naver.com/pliuhb/222527419988

## 📑 기능 설명
- MongoDB를 이용하여 데이터 관리
- Material-ui의 무료 template인 Paperbase 이용하여 전체적인 디자인 구성 (반응형 웹 자동적용)

## 🛠️ DB & API
- users
  - _id : MongoDB 고유 id 값
  - name : 회원가입 시 입력했던 닉네임
  - email : 회원가입 시 입력했던 이메일
  - password : 회원가입 시 입력했던 비밀번호
  - role : admin 계정 확인
  - token : 로그인 시 주어지는 token 값

- youtubers
  - _id : MongoDB 고유 id 값
  - youtuber : 크리에이터 채널 이름

- items
  - _id : MongoDB 고유 id 값
  - youtuber: 크리에이터 채널 이름
  - siteName : 프로모션 코드 사용처
  - code : 프로모션 코드

- sitenames
  - _id : MongoDB 고유 id 값
  - name : 사이트 이름
  - link : 사이트 링크

- comments
  - _id : MongoDB 고유 id 값
  - comment : 코멘트 내용
  - number : 코멘트 작성 순서
* * *

- users
  - 회원가입
    - POST api/users/register, (save)
  - 로그인
    - POST api/users/login, (fineOne, comparePassword, generateToken, cookie)
  - 로그아웃
    - GET api/users/logout, (findOneAndUpdate)
  - 이메일 중복 확인
    - POST api/users/smaeEmailCheck, (findOne)

- youtubers
  - 크리에이터 목록
    - GET api/youtubers, (find)
  - 크리에이터 생성
    - POST api/youtubers/create, (save)

- items
  - 프로모션 코드 목록
    - GET api/items/youtuber/:youtuber, (find)
  - 프로모션 코드 생성
    - POST api/items/create, (save)
  - 프로모션 코드 수정
    - PUT api/items/:items_id, (updateOne)
  - 프로모션 코드 삭제
    - DELETE api/items/:items_id, (deleteOne)

- sitenames
  - 사이트 목록
    - GET api/sitenames, (find)

## 📝 참고자료
- https://material-ui.com/store/items/paperbase/
