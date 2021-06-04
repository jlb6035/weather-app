/* Global Variables */
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = "";

const generateButton = document.querySelector("#generate");


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

const getWeather = async (baseUrl, zipcode, key)=>{
    const response = await fetch(baseUrl+zipcode+"&appid="+key);
    try{
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error){
        console.log(error);
    }
}


const postData = async (url, data)=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        console.log(response.status);
    } catch(error){
        console.log(error);
    }
}

const updateUI = async ()=>{
    const request = await fetch("/getData");
    try{
        const data = await request.json();
        document.querySelector("#temp").innerHTML = data.temp;
        document.querySelector("#date").innerHTML = data.date;
        document.querySelector("#content").innerHTML = data.message;

    } catch(error){
        console.log(error);
    }
}


generateButton.addEventListener("click", ()=>{
    const zipcode = document.querySelector("#zip").value;
    const feelings = document.querySelector("#feelings").value;
    
    getWeather(baseUrl, zipcode, key)
    .then(function(data){
        postData("/addData", {"temp": data.main.temp, "date": newDate, "message": feelings});
    }).then(()=>updateUI());


});
