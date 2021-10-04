/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

//The URL to get weather information from his API (country USA)
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API Key for OpenWeatherMap API
//=metric to added to give us temperature in Celsius
const apiKey=",&appid=ac404ebb97a4276c02ccd8aa727a8799&units=metric";

// the URL of the server to post data
const server = "http://127.0.0.1:3000";

/* Function to GET Web API Data*/
const getWeather =  async function (zip)  {
  try {
    const res = await fetch(baseURL + zip + apiKey);
    const serverData = await res.json();

    if (serverData.cod != 200) {
      // display the error message on Ui
      error.innerHTML = serverData.message;
      setTimeout(()=> error.innerHTML = '', 3000)
      throw `${serverData.message}`;
    }

    return serverData;
  } catch (error) {
    console.log("error", error);
  }
};
/**
 * // generateData //
 * function to get input values
 * call getWeather to fetch the data from API
 * create object from API object by using destructuring
 * post the data in the server
 * get the data to update Ui
 */
const generateData =function() { 
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // getWeather return promise
  getWeather(zip).then((serverData) => {
    //making sure from the received data to execute rest of the steps
    if (serverData) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = serverData;

      const info = {
        newDate,
        city,
        temp: Math.round(temp), // to get integer number
        description,
        feelings,
      };

      postData(server + "/add", info);

      updateUi();
      document.getElementById('entry').style.opacity = 1;
    }
  });
};

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
document.getElementById("generate").addEventListener("click", generateData);

/* Function to POST data */
const postData = async function (url = "", info = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(info),
  });

  try {
    const allNewData = await res.json();
    console.log(`You saved`, allNewData);
    return allNewData;
  } catch (error) {
    console.log("error", error);
  }
};
/* Function to GET Project Data */
const updateUi =  async function () {
  const res = await fetch(server + "/all");
  try {
    const reservedData = await res.json();

    document.getElementById("date").innerHTML = reservedData.newDate;
    document.getElementById("temp").innerHTML = reservedData.temp + '&degC';
    document.getElementById("city").innerHTML = reservedData.city;
    document.getElementById("content").innerHTML = reservedData.feelings;
    document.getElementById("description").innerHTML = reservedData.description;

  } catch (error) {
    console.log("error", error);
  }
};
// showing the error to the user
const error = document.getElementById("error");