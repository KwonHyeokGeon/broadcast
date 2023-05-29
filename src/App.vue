<template>
    <div class="w-full h-max bg-fixed overflow-hidden" :style="{ backgroundImage: 'url(' + require(`@/assets/images/${weatherIcon}.jpg`) + ')' }">
        <div class="sm:max-w-7xl sm:mx-auto">
            <div class="flex flex-wrap justify-between items-center">
                <h2 v-if="showWeather" class="text-8xl sm:text-9xl font-black pt-2 mb-3 md:mb-10 relative "
                    style="font-family: 'Vidaloka'">
                    {{ city.name }}
                </h2>
                <div class="flex flex-col w-full md:flex-row items-center">
                    <input type="text"
                        class="text-2xl  text-center sm:text-5xl bg-transparent placeholder:text-2xl md:placeholder:text-5xl placeholder:text-gray-700 backdrop-blur-lg"
                        placeholder="도시명을 영어로 입력해주세요" v-model="cityName" @keydown.enter="getWeather" />
                    <button class="w-12 border-gray-400 p-2 rounded-md" @click="getWeather"><img src="@/assets/check.png" alt="확인"></button>
                </div>
            </div>
            <ul class="flex sm:justify-around flex-col sm:flex-row backdrop-blur-lg mt-2">
                <li class="md:text-3xl text-xl text-white font-medium inline-block">온도 : {{ Math.round(tempItem.temp - 273.15)
                }}&#8451;</li>
                <li class="md:text-3xl text-xl text-white font-medium inline-block">풍속 : {{ windItem.speed }}m/s</li>
                <li class="md:text-3xl text-xl text-white font-medium inline-block">일출 : {{ sunRise }}</li>
                <li class="md:text-3xl text-xl text-white font-medium inline-block">일몰 : {{ sunSet }}</li>
            </ul>
        </div>
        <div
            class="flex flex-wrap md:max-w-7xl md:mx-auto md:justify-start border-2 border-white rounded-2xl bg-slate-200 bg-opacity-50 justify-center h-[50vh] md:h-[65vh] overflow-y-scroll broadcast scroll-m-10">
            <p class="font-extrabold  text-2xl md:text-4xl mt-2 sm:mt-5 sm:max-w-7xl sm:mx-auto text-center md:basis-full">5일간 일기예보</p>
            <div v-for="el in localTime" :key="el" class="m-1 basis-full md:basis-48 flex items-center">
                <img :src="`https://openweathermap.org/img/w/${el.icon}.png`" alt="날씨아이콘" class="" />
                <p class="font-semibold">
                    {{ el.date }}
                    <span class="text-red-600 font-extrabold">온도 : {{ Math.round(el.temp - 273.15) }}&#8451;</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import 'animate.css';
export default {
    name: "App",
    data() {
        return {
            city: [],
            tempItem: [],
            windItem: [],
            sunRise: [],
            sunSet: [],
            showWeather: true,
            localTime: [],
            bgColor: "",
            weatherIcon: [],
        };
    },
    methods: {
        getIcon() {
            axios.get(`https://openweathermap.org/img/w/${this.icon}.png`);
        },
        getWeather() {
            axios
                .all([
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=de8eb0ea9a85eb221cf3b9adc4f790cd`),
                    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=de8eb0ea9a85eb221cf3b9adc4f790cd`),
                ])
                .then(
                    axios.spread((res1, res2) => {
                        // 현재기온
                        this.city = res1.data;
                        this.tempItem = res1.data.main;
                        this.windItem = res1.data.wind;
                        this.showWeather = true;
                        this.weatherIcon = res1.data.weather[0].main


                        const sunriseTime = new Date(res1.data.sys.sunrise * 1000);
                        const sunsetTime = new Date(res1.data.sys.sunset * 1000);
                        this.sunRise = sunriseTime.toLocaleTimeString();
                        this.sunSet = sunsetTime.toLocaleTimeString();
                        // 일기예보

                        // 시간 로컬로 변환환
                        this.localTime = res2.data.list.map((el) => {
                            return { date: new Date(el.dt * 1000).toLocaleString().replace(" GMT+0900", ""), temp: el.main.temp, icon: el.weather[0].icon };
                        });
                    })
                )
                .catch((error) => {
                    alert(error.message +"\n\n도시명을 확인해주세요")
                });
        },
    },
    created() {
        axios
            .all([
                axios.get("https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=de8eb0ea9a85eb221cf3b9adc4f790cd"),
                axios.get("https://api.openweathermap.org/data/2.5/forecast?q=seoul&appid=de8eb0ea9a85eb221cf3b9adc4f790cd"),
            ])
            .then(
                axios.spread((res1, res2) => {
                    // 현재기온
                    this.city = res1.data;
                    this.tempItem = res1.data.main;
                    this.windItem = res1.data.wind;
                    this.showWeather = true;
                    this.weatherIcon = res1.data.weather[0].main

                    const sunriseTime = new Date(res1.data.sys.sunrise * 1000);
                    const sunsetTime = new Date(res1.data.sys.sunset * 1000);
                    this.sunRise = sunriseTime.toLocaleTimeString();
                    this.sunSet = sunsetTime.toLocaleTimeString();


                    // 시간 로컬로 변환환
                    this.localTime = res2.data.list.map((el) => {
                        return { date: new Date(el.dt * 1000).toLocaleString().replace(" GMT+0900", ""), temp: el.main.temp, icon: el.weather[0].icon };
                    });
                })
            )
            .catch((error) => {
                alert(error.message + "\n\n도시명을 확인해주세요")
            });
    },
    
};
</script>

<style>
body {
    font-family: 'Pretendard-Regular';
}
.broadcast::-webkit-scrollbar{
    width: 8px;
}
.broadcast::-webkit-scrollbar-thumb{
    background: #217af4;
    border-radius: 10px;
}

</style>
