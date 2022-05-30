const submitRider = document.getElementById('postRiderBtn')

function fetchOnUrl(url) {
  return fetch(url).then(res => res.json())
}

async function createNewRider() {

  const postRiderUrl = 'http://localhost:8080/api/rider/'
  let body = {
    riderName: document.getElementById('inputName').value,
    riderNumber: document.getElementById('inputRiderNumber').value,
    riderBirthDate: document.getElementById('inputBirthDate').value,
    riderCountry: document.getElementById('inputCountry').value,
    team: {
      teamId: document.getElementById('inputTeam').value
    }
  }

  console.log(body)

  const fetchOptions = {
    method: "Post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  }

  //calls backend and wait for return
  const response = await fetch(postRiderUrl, fetchOptions);

  console.log(response)

  if (!response.ok) {
    alert("something went wrong, please try again")
  }else {
    alert("Rider Created")
    location.href ="/"
  };
}

async function getCountriesForDropDown(){
  const selectInput = document.getElementById('inputCountry')
  const countryList = await fetchOnUrl('https://restcountries.com/v3.1/subregion/europe')

  if (countryList.length > 0){
    selectInput.innerHTML = "";
    for (let country of countryList){
      const option = document.createElement('option')
      option.value = country.name.common;
      option.innerText = country.name.common;
      selectInput.append(option)
    }
  }
}

async function getTeamsForDropDown(){
  const selectInput = document.getElementById('inputTeam')
  const teamList = await fetchOnUrl('http://localhost:8080/api/team/all-teams')

  if (teamList.length > 0){
    selectInput.innerHTML = "";
    for (let team of teamList){
      const option = document.createElement('option')
      option.value = team.teamId;
      option.innerText = team.teamName;
      selectInput.append(option)
    }
  }
}


getCountriesForDropDown()
getTeamsForDropDown()

submitRider.addEventListener('click',createNewRider)
