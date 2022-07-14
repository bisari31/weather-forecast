# 날씨앱 (Weather Forecast)

<br/>
<div>
<img src="https://img.shields.io/badge/TypeScript-v4.4.2-blue"/>
<img src="https://img.shields.io/badge/React-v18.1.0-blue"/>
<img src="https://img.shields.io/badge/Recoil-v0.7.3 alpha 2-blue"/>
</div>
<br/>

<ul>
<li>지역을 검색하여 해당 지역의 날씨를 알 수 있습니다.</li>
<li>그래프를 이용해 평균 온도와 강수확률을 알 수 있습니다.</li>
<li>현지 시간을 계산하여 실시간 현지 시간이 반영됩니다.</li>
<li>날씨별 아이콘을 구현하였습니다.</li>
<li>반응형 웹을 구현하여 모바일에서도 화면이 잘리지 않습니다.</li>
<li>해당 지역 일몰 일출을 체크하여 다크모드 기능을 구현하였습니다.</li>
<li>드래그 슬라이드 기능 구현하여 영역 밖 데이터도 쉽게 확인이 됩니다.</li>
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
    │  ├─chartList
    │  ├─dayList
    │  └─location
    │      └─modal
    ├─hooks
    ├─services
    ├─states
    ├─styles
    │  ├─base
    │  └─constants
    └─types

```


## Preview
<br/>
<img src="https://user-images.githubusercontent.com/98396758/178940065-215a2957-b4a5-4bda-8369-f33c45de8cba.PNG" width="500" />
데스크탑 화면
<br/>
<br/>
<img src="https://user-images.githubusercontent.com/98396758/178940392-c8a47f0e-4454-433f-bfe7-10cd1f8e300e.gif" width="300" />
시간별 날씨를 확인할 수 있으며 드래그 기능을 추가하였습니다.<br/>
총 3일간의 날씨를 확인할 수 있으며 시간별로 체크가 가능합니다.
<br/>
<br/>
<img src="https://user-images.githubusercontent.com/98396758/178940456-a36e75a5-fa02-439e-b42e-2ff4c4e4569b.gif" width="300" />
초기 위치는 서울로 설정이 되어 있지만, 지역 텍스트를 클릭하여 변경할 수 있습니다.<br/>
변경된 데이터는 실시간 반영됩니다.<br/>
일몰과 일출 시간을 체크하여 일몰 시 다크모드를 적용하였습니다.
<br/>
<br/>
<img src="https://user-images.githubusercontent.com/98396758/178940580-d3966f78-f921-4aa7-b898-241ca2aa3bf8.gif" width="300" />
지역을 추가 / 삭제하여 여러 지역 날씨를 확인할 수 있습니다.