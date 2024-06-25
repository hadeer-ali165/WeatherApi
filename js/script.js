// async function getWether(){
//     let data = await fetch("https://api.weatherapi.com/v1/forecast.json?key=92edc083a36b430199894427242306&q=cairo&days=3");
//     let getData = await data.json();
//     console.log(getData)
// }
// getWether();


//form event
let inputs = document.querySelector(".forms input");
inputs.addEventListener("input",function(){
    let valSearch = inputs.value;
    getWeather(this.value);
    console.log(this.value)
})



//getDay
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let day = weekday[d.getDay()];
let day2 = weekday[d.getDay()+1];
let day3 = weekday[d.getDay()+2];
//console.log(day)

//get Date Month
let dayOfMonth = d.getDate();
const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const m = new Date();
let name = month[m.getMonth()];

//start display 
async function getWeather(city){
    try {
        let getData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=92edc083a36b430199894427242306&q=${city}&days=3`);
        let newData = await getData.json();
        displayData(newData);
        //console.log(newData);
    } catch (error) {
        console.log("error")
    }

}

function displayData(newData){
    let firstCarton = ``;
        firstCarton += `
                        <div class="topBox text-light px-3 d-flex justify-content-between align-items-center">
                            <p>${day}</p>
                            <p>${dayOfMonth}${name}</p>
                        </div>
                        <div class="bodyBox text-light">
                            <p style="font-size: 17px;">${newData.location.name}</p>
                            <div class="textImage">
                                <h2>${newData.current.temp_c}<sup>o </sup>C</h2>
                                <img src="${newData.current.condition.icon}" alt="weather Image" style="margin-left: 16px; margin-bottom:20px;margin-top:20px;width:110px">
                            </div>
                            <p style="color: #009ad8;">${newData.current.condition.text}</p>
                            <div class="iconsBox d-flex">
                                <div class="icon1">
                                    <img src="./images/icon-umberella.png" class="img-fluid" alt="">
                                    <p>${newData.current.feelslike_c}%</p>
                                </div>
                                <div class="icon1">
                                    <img src="./images/icon-wind.png" alt="">
                                    <p>${newData.current.wind_kph}km/h</p>
                                </div>
                                <div class="icon1">
                                    <img src="./images/icon-compass.png" alt="">
                                    <p>${newData.current.wind_dir}</p>
                                </div>
                            </div>
                        </div>
        `
        document.querySelector(".card1").innerHTML = firstCarton;

        //card2

        let secodeCarton = ``;
        secodeCarton += 
        `
            <div class="topBox text-light text-center">
                <p>${day2}</p>
            </div>
            <div class="bodyBox text-center">
                <div class="infoBoxtext">
                    <img src="${newData.forecast.forecastday[1].day.condition.icon}" alt="">
                    <h3>${newData.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h3>
                    <p>${newData.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
                    <p style="color: #009ad8;">${newData.forecast.forecastday[1].day.condition.text}</p>
                </div>
            </div>
        `
        document.querySelector(".card2").innerHTML = secodeCarton;

        //card 3
        
        let thirdCard = ``;
        thirdCard +=
        `
        <div class="topBox text-light text-center">
            <p>${day3}</p>
        </div>
        <div class="bodyBox text-center">
            <div class="infoBoxtext">
                <img src="${newData.forecast.forecastday[2].day.condition.icon}" alt="">
                <h3>${newData.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h3>
                <p>${newData.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
                <p style="color: #009ad8;">${newData.forecast.forecastday[2].day.condition.text}</p>
            </div>
        </div>
        `
        document.querySelector(".card3").innerHTML = thirdCard
}

//getWeather("cairo");

(function locations(){
    if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(async function(position){
            try {
                const { latitude, longitude } = position.coords;
                let newGetData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=92edc083a36b430199894427242306&days=3&q=${latitude},${longitude}`);
                let newDataJs = await newGetData.json();
                displayData(newDataJs)
            } 
            catch (error) {
                console.log(error)
            }
                console.log(position)
            }),
            function(error){
                getWeather("cairo");
            }
        }
        else
        {

        }
}());



let menuBtn = document.querySelector(".iconMenu");
let lists = document.querySelector("ul.lists");
menuBtn.addEventListener("click",function(){
    lists.classList.toggle("action")
})









