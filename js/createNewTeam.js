const submitRider = document.getElementById('postTeamBtn')

function fetchOnUrl(url) {
  return fetch(url).then(res => res.json())
}

async function createNewTeam() {

  const postTeamUrl = 'http://localhost:8080/api/team/'
  let body = {
    teamName: document.getElementById('inputName').value,
    teamCountry: document.getElementById('inputCountry').value,
  }

  console.log(body)


  const fetchOptions = {
    method: "Post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  }
  const response = await fetch(postTeamUrl, fetchOptions);

  if (!response.ok) {
    alert("something went wrong, please try again")
  }else {
    alert("Team Created")
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

getCountriesForDropDown();

submitRider.addEventListener('click',createNewTeam)
