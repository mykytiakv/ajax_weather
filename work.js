var key = '1d4bfcfec723c73ab5b7df1b2df6f84a';
var latitude = 50.450100;
var longitude = 30.523400;
var dateToday = new Date();
var currentDay =  dateToday;
var cors = 'https://cors-anywhere.herokuapp.com/';
var url = 'https://api.darksky.net/forecast/' + key + '/' + latitude + ',' + longitude + ',';

//Кнопка Next Day
$('#nextDay').on('click', function(){
  currentDay = dateNext(currentDay);
  var newD = parseInt(currentDay / 1000);
  response(cors, url, newD);
});

//Кнопка Previous Day
$('#previousDay').on('click', function(){
  currentDay = datePrevious(currentDay);
  var newD = parseInt(currentDay / 1000);
  response(cors, url, newD);
});

//Визначення попереднього дня
function datePrevious(date) {
  var newDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() - 1, currentDay.getHours());
  $('#nextDay').removeClass('disabled');
  return newDate;
};

//Визначення наступного дня
function dateNext(date) {
  var newDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1, currentDay.getHours());
  if (currentDay.getDate() + 1 == dateToday.getDate()) {
    $('#nextDay').addClass('disabled');
  }
  return newDate;
};

//Запит
function response(cors, url, date) {
  fetch(cors + url + date)
  .then(function(response) {
    return response.json();
  })
  .then(function(res) {
    console.log(res);
    var temperature = tempToCel(res.currently.temperature);
    var location = res.timezone;
    var summary = res.currently.summary;
    var pressure = res.currently.pressure;

    $('#currentTemp').html('Temperature: ' + temperature + ' &deg;С');
    $('#location').text(location);
    $('#currentDay').text(currentDay.getDate() + '.' + (currentDay.getMonth() + 1) + '.' + currentDay.getFullYear());
    $('#currentSummary').text(summary);
    $('#icon').removeClass();
    $('#currentPressure').html('Pressure: ' + pressure + 'hPa <i class="wi wi-barometer" >' );
    setIcon(summary);
  })
  .catch(function(err) {
    console.log('Error!', err);
  })
}

function tempToCel(temp) {
  return (5 / 9 * (temp - 32)).toFixed(1);
}

function init() {
  console.log(parseInt(dateToday.getTime()/1000));
  response(cors, url, parseInt(dateToday.getTime()/1000));
}

function setIcon(summary) {
  switch (summary) {
    case 'Clear':
      $('#icon').addClass('wi wi-wu-clear');
      break;
    case 'Mostly Cloudy':
      $('#icon').addClass('wi wi-wu-mostlycloudy');
      break;
    case 'Partly Cloudy':
      $('#icon').addClass('wi wi-forecast-io-partly-cloudy-night');
      break;
    case 'Overcast':
      $('#icon').addClass('wi wi-cloudy');
      break;
    case 'Foggy' :
      $('#icon').addClass('wi wi-fog');
      break;
    case 'Light Rain' :
      $('#icon').addClass('wi wi-rain');
    break;
    case 'Rain' :
      $('#icon').addClass('wi wi-rain');
    break;
    default:
      $('#icon').addClass('wi wi-wu-mostlycloudy');
      break;
  }
}

init();