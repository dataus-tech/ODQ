<p align="center">
  <img width="400" alt="image" src="https://user-images.githubusercontent.com/63826654/158105778-c31f5d55-1e72-424d-9183-39add9ca25a0.png">
</p>

:electron: Open Data Quality - 공공데이터 품질 개선 도구

## Preview
<p align="center">
  <img width="1196" alt="image" src="https://user-images.githubusercontent.com/30119526/158326928-3baca84e-3ca4-431c-8d56-b0e2bf708ebf.png">
</p>
  
## 설명

OQD는 UTF8-BOM으로 인코딩된 공공데이터 csv파일의 품질 개선 도구입니다.

데스크탑 크로스 플랫폼 프레임워크인 [Electron](https://www.electronjs.org/)으로 구성되었으며

HTML, CSS, JavaScript로 작성된 SPA입니다.

[사용자 메뉴얼](https://github.com/dataus-tech/odq/wiki/ODQ-%EC%82%AC%EC%9A%A9%EC%9E%90-%EB%A9%94%EB%89%B4%EC%96%BC) | 
[다운로드](https://github.com/dataus-tech/ODQ/wiki)

## Docker Run
```bash
docker run -d -p 80:80 bchwang/tomcat_mariadb:nginx-odq1.0
```

## 패키지 의존성 모듈 설치

Node.js 16.9.1 version 이상 설치되어있어야 합니다.

```bash
# npm
cd electron
npm i

# yarn
cd electron
yarn
```

## 빌드

```bash
# npm
cd electron
npm run make

# yarn
cd electron
yarn make
```

## 기여

[PR](https://github.com/dataus-tech/odq/pulls)을 보내주시면 논의 후 프로젝트에 반영됩니다


## 이슈

각종 버그 및 이슈는 [이슈](https://github.com/dataus-tech/odq/issues)등록 해주시면 반영하겠습니다
