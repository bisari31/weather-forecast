# 날씨앱 (Weather Forecast)

<br/>
<div>
<img src="https://img.shields.io/badge/TypeScript-v4.4.2-blue"/>
<img src="https://img.shields.io/badge/React-v18.1.0-blue"/>
<img src="https://img.shields.io/badge/Recoil-v0.7.3 alpha 2-blue"/>
<img src="https://img.shields.io/badge/React Router Dom-v6-blue"/>
</div>
<br/>

<ul>
<li>좌표를 확인하여 내 지역의 날씨를 알 수 있다.</li>
<li>평균온도 강수량 그래프</li>
<li>로컬스토리지로 내 지역 저장</li>
<li>날씨별 아이콘 구현</li>
<li>반응형 웹 구현</li>
</ul> 
<br/>

## Depoly

https://weatherforecastappp.netlify.app/

<br/>

## Installation

```
yarn install
```

## Usage

```
yarn start
```

## Directory Structure

```

└─src
    ├─assets
    │  ├─img
    │  └─svgs
    │      └─weather
    ├─components
    ├─hooks
    │  └─worker
    ├─routes
    │  ├─location
    │  ├─main
    │  │  ├─chartList
    │  │  └─dayList
    │  └─_shared
    ├─services
    ├─states
    ├─styles
    │  ├─base
    │  ├─constants
    │  └─mixins
    ├─types
    └─utils

```


## Preview
<br/>
<img src="https://user-images.githubusercontent.com/98396758/172037695-266c95c9-e320-433a-95f7-3748b2e583c7.PNG"/ width="500"><br/>


![GIF 2022-06-05 오후 3-05-06](https://user-images.githubusercontent.com/98396758/172037723-d24bac33-f5e8-4baf-a98b-384918d4215e.gif)


초기 위치는 서울로 설정이 되어 있지만 버튼을 클릭하면 내 위치를 불러옵니다.  
하루 3시간 간격으로 날씨를 조회하며 총 5일 조회할 수 있습니다.  
평균온도와 강수량을 그래프로 확인할 수 있습니다.  
페이지는 반응형으로 구현되었습니다.



리코일을 이용하여 좌표를 전역으로 관리하여 다른 페이지 이동 시에도 상태 값을 유지할 수 있습니다.  
또한 로컬스토리지를 이용하여 페이지를 나가도 상태는 유지됩니다.

날씨별 아이콘을 설정하여 해당 날씨의 연관된 이미지를 불러옵니다.
