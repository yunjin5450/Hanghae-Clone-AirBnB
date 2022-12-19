# DGBNB_BE
항해7주차 클론코딩 프로젝트


### 에어 비앤비
> 고객이 방을 빌리는 값을 주인에게 지불하고 이를 중개해준 에어비앤비는 수수료를 떼어가는 시스템으로 호스트가 에어베드 같은 잘 곳을 빌려 주고 같이 아침 식사도 하자는(Air Bed & Breakfast) 의미로 출발한 사이트이다.

<br/>

### 1) 팀원

| 포지션 | 이름 | 이메일 | 깃헙 주소 |
|:------:|:------:|:------:|:------:|
| Frontend, VL | 정은민 | - | https://github.com/Coswim |
| Frontend | 정재연 | - | https://github.com/JaeyeoneeJ |
| Backend | 박민규 | alsrb7018@gmail.com | https://github.com/Sky-Park |
| Backend | 백지영 | bazzy726@gmail.com | https://github.com/chamchimayo |
| Backend | 최윤진 | yunjin5450@gmail.com | https://github.com/yunjin5450 |

<br/>

### 2) 진행 기간: 2022년 10월 28일 ~ 11월 3일
- **10월 28일(프로젝트 시작일)**
    - 개발 기획
    - S,A 제출(API 명세서, 와이어 프레임, DB Schema 작성)
    - Github Repository 생성
    
- **10월 29일**
    - [BE] : members(회원가입, 로그인) API 구현
    
- **10월 30일(일요일)**
    - 즐거운 휴식 !
    
- **10월 31일**
    - [BE] : likes(찜하기), reviews(후기남기기) API 구현
    
- **11월 1일**
    - [BE] : users(비밀번호 암호화), likes(약국 좋아요 관련) 기능 구현 완료
    
- **11월 2일**
    - 프론트(서버)-백 연결 테스트
    - [BE] : accommodations(숙소호스팅), reservations(예약하기) API 구현
    
- **11월 3일(프로젝트 마감일)**
    - [BE] : 오류 수정
    - 발표

<br/>

### 3) 사용 기술
- FE: react, redux-toolkit, redux-thunk, react-router-dom, tailwind
- 와이어프레임 : 피그마
- 서버: javascript, express
- DB: mysql, sequelize
- 배포: AWS EC2, nginx

<br/>

### 4) ERD
![DGBNB_ERD](https://user-images.githubusercontent.com/98001726/199684870-0c1e7206-2c06-4f12-88ca-cea1c04b5c4a.png)

<br/>

### 5) 주요 기능 요약

(1) 회원 가입 (members)
- 아이디, 비밀번호가 정해진 조건에 맞지 않는 경우 error메세지를 response에 포함
- bcrypt를 사용해 데이터 베이스에 비밀번호 암호화 하여 저장

(2) 로그인 (members)
- 받은 비밀번호를 암호화하여 데이터 베이스에 있는 비밀번호와 비교
- 로그인시 jwt(json web token)을 발급

(3) 로그인 검사 (members)
- 로그인이 필요한 API를 호출한 경우 로그인 토큰을 전달한 경우만 정상 response를 전달받을 수 있도록 설정
- 로그인 토큰을 전달하지 않은 채로 로그인 API를 호출한 경우 "로그인이 필요합니다."라는 에러 메세지를 response에 포함
- 로그인 토큰을 전달한 채로 로그인 API 또는 회원가입 API를 호출한 경우 "이미 로그인이 되어있습니다"라는 에러 메세지를 response에 포함

(4) 회원 정보 조회 (members)
- 로그인한 회원은 자신의 정보 조회 가능
- 수정하기 버튼을 눌러 자신의 닉네임, 비밀번호, 핸드폰 번호, 성별, 프로필 사진 변경 가능
- 탈퇴하기 버튼을 눌러 회원 탈퇴 가능

(5) 메인 페이지 (accommodations)
- 호스트들이 호스팅한 숙소 전체 보기 가능

(6) 숙소 등록 기능(accommodations)
- 로그인한 호스트만 숙소 호스팅 가능
- 호스트는 본인이 호스팅한 숙소 목록 조회 가능
- 숙소 정보 수정, 삭제는 숙소 등록한 해당 호스트만 가능

(7) 예약 등록 하기 기능 (reservations)
- 로그인한 게스트는 예약 등록 작성 가능
- 게스트는 예약한 목록을 최신 순으로 조회 가능
- 예약 수정, 삭제는 예약 등록한 해당 게스트만 가능

(8) 숙소 찜하기 기능 (likes)
- 로그인한 게스트가 메인 페이지에서 숙소 찜하기 가능
- 게스트가 찜해 놓은 숙소를 최신 순으로 조회 가능
- 찜한 숙소 삭제는 해당 숙소를 찜한 게스트만 가능 

(9) 숙소 후기 작성 기능 (reviews) 
- 숙소를 이용한 게스트는 후기 상세 조회 페이지에서 숙소 후기 작성 가능
- 후기 작성은 숙소 이용한 게스트가 로그인 하여 작성 가능
- 후기 수정, 삭제는 후기 작성한 해당 게스트만 가능

<br/>

### 6) 트러블 슈팅
- ### DB에 한칼럼에 여러가지 정보를 저장할때의 문제  
카테고리 라던지, 편의시설, 숙소 이미지등을 받아서 DB에 저장할때 request를 배열로 받아오다보니 그 배열을 그대로 DB에 저장 할 수 있을줄 알았는데, 직접해보니 RDBMS의 1정규형에 위반되어서 한 칼럼에 여러 정보를 저장하는건 불가능했다.
따라서 어떻게 저장해야할지 고민했고, 저장해야할 값이 긴 이미지파일은 보기 좋게 테이블을 따로 구성해서 테이블간에 association을 만들어 줌으로써 해결했고, 편의시설 같은 경우 [ 드라이기, 에어컨, 선풍기 ] 등으로 들어오는 배열의 값 전체를 문자열로 전환해서 저장했다가 다시 내보낼때, 배열로 만들어서 내보내 주는 방식으로 해결하였다.

### 7) 기타

- [FE Github](https://github.com/JaeyeoneeJ/DGBNB-FE)

