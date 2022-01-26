## 🏋️‍ 근성장코드 닷컴(geunsungjang.com)
- Youtube 피트니스 분야의 크리에이터들이 올리는 프로모션 코드를 모아놓은 사이트


- 프로모션 코드의 종류로 닭가슴살(랭킹닭컴, 미트리), 단백질 보충제(마이프로틴, 더 프로틴 웍스)가 있음

이 프로모션 코드들은 크리에이터마다 할인율이 다르기 때문에 한 곳에 모아놓으면 사용자가 비교하기 쉬울 것이라고 생각하였음)

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
- MongoDB로 데이터 관리
- Material-ui의 무료 template인 Paperbase 이용하여 전체적인 디자인 구성

## 🛠️ API
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
  - 유튜버 목록
    - GET api/youtubers, (find)
  - 유튜버 생성
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
    - GET api/sitenames, ()

## 📝 참고자료
- https://material-ui.com/store/items/paperbase/
