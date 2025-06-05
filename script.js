//Api link


const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time-location p");
const dateandTimeField = document.querySelector(".time-location span");
const conditionField = document.querySelector(".condition p");
const iconField = document.querySelector(".condition img");
const searchField = document.querySelector(".search-area");
const form = document.querySelector('form')

form.addEventListener('submit' , searchForLocation)

let target = 'Mumbai'

const fetchresults = async (targetLocation) => {
  let url = 'https://api.weatherstack.com/current?access_key=deadfc1b9683e67a346b36f440a78668&query=' + targetLocation
  const res = await fetch(url)

  const data = await res.json()

  console.log(data)

  let locationName = data.location.name
  let time = data.location.localtime
  let temp = data.current.temperature

  let condition = data.current.weather_descriptions[0]
  let icon = data.current.weather_icons[0]

  updateDetails(temp , locationName , time , condition, icon)
}

function updateDetails(temp , locationName , time , condition, icon){

  let splitDate = time.split(' ')[0]
  let splitTime = time.split(' ')[1]

  let currentDay = getDayName(new Date(splitDate).getDay())

  temperatureField.innerText = temp
  locationField.innerText = locationName
  dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
  conditionField.innerText = condition
  iconField.src = icon
}

function searchForLocation(e){
  e.preventDefault()

  target = searchField.value
  fetchresults(target)
}

fetchresults(target)

function getDayName(number){
  switch (number){
    case 0: 
    return 'Sunday'
    case 1: 
    return 'Monday'
    case 2: 
    return 'Tuesday'
    case 3: 
    return 'Wednesday'
    case 4: 
    return 'Thursday'
    case 5: 
    return 'Friday'
    case 6: 
    return 'Saturday'
  }
}