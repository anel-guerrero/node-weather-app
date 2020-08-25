console.log("js file is loaded!");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');

const fetchWeather = (address) => {
  fetch('/weather?address=' + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecastData;
      }
  
    })
  })

}



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  msgOne.textContent = 'loading...';
  msgTwo.textContent = '';

  fetchWeather(location);
})