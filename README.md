

# 프로젝트 이름

<p align="center">
  <br>
  BroadCast

![Broadcast Thumbnail](./public/broadcast.png)  
  <br>
</p>


## 프로젝트 소개

<p align="justify">
프로젝트 개요/동기
<br>
openweather API를 사용하여 기상정보 & 일기예보 구현 

</p>

<br>

## STACK

Vue
<br>
TailwindCSs
<br>
Axios

## 구현 기능

### 기능 1
기본 위치를 서울로 설정, 기상예보를 원하는 도시의 도시명을 입력하여 기상정보 전환, 5일 간의 기상정보를 요청합니다.
이를 위해 2개의 BaseUrl을 요청해야하여 다음과 같이 구현했습니다.  
<br>
axios.all([<br>
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=de8eb0ea9a85eb221cf3b9adc4f****`),
                    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=de8eb0ea9a85eb221cf3b9adc4f****`),
                    <br>
                ])
### 기능 2
현재 기상정보에 맞추어 Background-image를 변경하려 sun, cloud와 같은 기상정보를 weatherIcon에 담아 이미지명을 일치시켰습니다. 
<br>
:style="{ backgroundImage: 'url(' + require(`@/assets/images/${weatherIcon}.jpg`) + ')' }"
### 기능 3
모바일화면에서 일기예보영역을 overflow-scroll처리하여 반응형을 구현했습니다.
### 기능 4

<br>


<p align="justify">

</p>

<br>

