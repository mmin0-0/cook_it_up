# Cook it up🍴
![Image](https://github.com/user-attachments/assets/e8021def-620d-4e4e-afe4-958d91a1dbec)

- 배포URL: [https://cookitup-theta.vercel.app/](https://cookitup-theta.vercel.app)

<br />

## 📌 프로젝트 소개
- “오늘 뭐 먹지?” 라는 고민, 이제 끝! <br />
  냉장고 속 재료만으로 만들 수 있는 다양한 요리와 영양 정보를 알려주는 모바일 전용 사이트입니다.
- 사용한 API - [조리식품의 레시피DB](https://www.foodsafetykorea.go.kr/api/openApiInfo.do?menu_grp=MENU_GRP31&menu_no=661&show_cnt=10&start_idx=1&svc_no=COOKRCP01)
- 데이터 정규식을 통해 문자를 균일화 하여 변수로 담아 프로젝트 전역에서 사용하였습니다.
  * 요리종류, 조리재료, 조리방법 등
  * 해당내용 기반으로 사용자가 검색한 재료에 해당되는 요리레시피 노출
- SessionStorage를 사용하여 마음에 드는 레시피를 저장할 수 있습니다.

## 🔧 사용 기술 스택
|Tech Stack|기술|
|---|---|
|front|Vue3(CLI), TypeScript, vuex|
|markUp|Sass|
|디자인|Figma| 
|배포|Vercel|

## 🖥️ 화면구성
#### 1. 메인
|메인화면|검색 결과|
|---|---|
|![Image](https://github.com/user-attachments/assets/62d0cb7e-64ad-4c59-8250-2a78184f97af)|![Image](https://github.com/user-attachments/assets/3bfa1261-96ae-4af3-a4e4-80ac9af6a460)|
- 메인 화면에 메뉴추천, 클릭 시 해당 상세 페이지로 이동됩니다.
- 사용자가 검색한 재료와 레시피의 재료가 일치 시 카테고리 별 요리레시피가 노출됩니다.

#### 2. 상세페이지
|상세페이지|찜목록|
|---|---|
|![Image](https://github.com/user-attachments/assets/a24f7c3f-4aa2-47ea-9e92-b9c092961521)|![Image](https://github.com/user-attachments/assets/5d329895-a053-46f9-b863-095477c2e17c)|
- 상세페이지 상단의 찜버튼을 통하여 해당 레시피를 찜목록에 저장할 수 있습니다.
