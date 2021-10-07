/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toJSON().slice(0, 10);

//The URL to get weather information from his API (country USA)
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API Key for OpenWeatherMap API
const api = ",&appid=ac404ebb97a4276c02ccd8aa727a8799&units=metric";

// the URL of the server to post data
const serverUrl = "http://127.0.0.2:3000";

// generateAllData //
const generateAllData = function () {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // getWeather return promise
  getWeather(zip).then(function (serverData) {
    if (serverData) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = serverData;

      const information = {
        newDate,
        city,
        temp: Math.round(temp),
        description,
        feelings,
      };
      postAllData(serverUrl + "/add", information);
      updateUi();
      document.getElementById("entry");
    }
  });
};

/* Function to GET Web API Data*/
const getWeather = async function (zipCode) {
  try {
    const res = await fetch(url + zipCode + api);
    const serverData = await res.json();

    return serverData;
  } catch (error) {
    console.log("error", error);
  }
};


/* Function to POST data */
const postAllData = async function (url = "", information = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(information),
  });

  try {
    const allNewData = await res.json();
    console.log(allNewData);
    return allNewData;
  } catch (error) {
    console.log("error", error);
  }
};
/* Function to GET Project Data */
const updateUi = async function () {
  const res = await fetch(serverUrl + "/all");
  try {
    const reservedData = await res.json();

    document.getElementById("date").innerHTML = reservedData.newDate;
    document.getElementById("temp").innerHTML = reservedData.temp + "&degC";
    document.getElementById("city").innerHTML = reservedData.city;
    document.getElementById("content").innerHTML = reservedData.feelings;
    document.getElementById("description").innerHTML = reservedData.description;
  } catch (error) {
    console.log("error", error);
  }
};
// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
document.getElementById("generate").addEventListener("click", generateAllData);