# DDM 적정주가 산출 도구

배당할인모형(DDM) 기반으로 주식의 적정주가를 산출하고,
민감도 분석을 통해 가정 변화에 따른 가치 변동을 시각화하는 웹 앱.

## 주요 기능
- Gordon Growth Model, 2-Stage DDM, 3-Stage DDM
- CAPM 기반 할인율 자동 계산 (Rf + β × ERP)
- 민감도 테이블 (g vs r, 배당성향 vs g)
- 괴리율 계산 및 색상 표시

## 기술 스택
- React (Vite)
- CSS

## 실행 방법
npm install
npm run dev
