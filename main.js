const loginForm = document.querySelector(".login-container");
const loginInput = document.querySelector(".login-container input");
const greeting = document.querySelector(".greeting-banner");
const menu = document.querySelector(".menu-container");
const menuItems = document.querySelectorAll('.menu-item');
const toDoButton = document.querySelector(".todo-list");
const weatherButton = document.querySelector(".weather-location");
const countdownButton = document.querySelector(".countdown");
const leftSquare = document.querySelector(".left-square");
const rightSquare = document.querySelector(".right-square");
const weatherContainer = document.createElement('div');
const cityContainer = document.createElement('div');
const dateContainer = document.createElement('div');
const timeContainer = document.createElement('div');



const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event)
{
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    printGreeting(username);
}

function printGreeting(username)
{
    const welcomeText = document.querySelector(".greeting-banner h1:first-child");
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    welcomeText.innerText = `Welcome, ${username} the time is: ${hours}:${minutes}:${seconds}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
    menu.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null)
    {
        loginForm.classList.remove(HIDDEN_CLASSNAME);
        loginForm.addEventListener("submit", onLoginSubmit);
    } else
    {
        loginForm.classList.add(HIDDEN_CLASSNAME);
        setInterval(function() 
        {
            printGreeting(savedUsername);
        }, 1000);
        
       printGreeting(savedUsername);
      //  setInterval(printGreeting, 1000);
    }
function showToDoList()
{
    leftSquare.classList.remove(HIDDEN_CLASSNAME);
    toDoForm.classList.remove(HIDDEN_CLASSNAME);
    rightSquare.classList.remove(HIDDEN_CLASSNAME); 
    weatherContainer.classList.add(HIDDEN_CLASSNAME);
    cityContainer.classList.add(HIDDEN_CLASSNAME);
    timeContainer.classList.add(HIDDEN_CLASSNAME);
    dateContainer.classList.add(HIDDEN_CLASSNAME);
    
}

function showWeatherAndLocation() 
{
   // const toDoForm = document.querySelector('#todo-form');
  //  const doneList = document.querySelector('#done-list');
    toDoForm.classList.add(HIDDEN_CLASSNAME);
    doneList.classList.add(HIDDEN_CLASSNAME);
    toDoList.classList.add(HIDDEN_CLASSNAME);
    didIt.classList.add(HIDDEN_CLASSNAME);
    leftSquare.classList.remove(HIDDEN_CLASSNAME);
    rightSquare.classList.remove(HIDDEN_CLASSNAME);
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    
}


toDoButton.addEventListener("click", showToDoList);
weatherButton.addEventListener("click", showWeatherAndLocation);


