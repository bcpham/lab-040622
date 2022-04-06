'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  // use fetch()

  fetch('/fortune')
    .then(response => response.text())
    .then(responseData => {
      document.querySelector('#fortune-text').innerText = responseData;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;

  const url = `/weather.json?zipcode=${zipcode}`;

  // TODO: request weather with that URL and show the forecast in #weather-info

  fetch(url)
    .then(response => response.json())
    .then(responseData => {
      document.querySelector('#weather-info').innerHTML = responseData.forecast;
    });

};

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  // Use POST request 
  // file is jsonified
  // use fetch()
  
  const formInputs = {
    melon: document.querySelector('#melon-type-field').value,
    amount: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json', {
    method : 'POST',
    body : JSON.stringify(formInputs),
    headers : {
      'Content-Type' : 'application/json',
    },
  })
    .then((response) => response.json())
    .then(responseJson => {
      
      if (responseJson.code === 'ERROR') {
        document.querySelector('#order-status').classList.add('order-error');
        document.querySelector('#order-status').innerHTML = `<p><b>${responseJson.msg}</b></p>`;
      } else {
        document.querySelector('#order-status').classList.remove('order-error');
        document.querySelector('#order-status').innerHTML = `<p>${responseJson.msg}</p>`;
      }
      })

};
document.querySelector('#order-form').addEventListener('submit', orderMelons);
