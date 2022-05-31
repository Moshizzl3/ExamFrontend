let totalTimeArray = [];

function fetchOnUrl(url) {
  return fetch(url).then(res => res.json())
}

async function getAllRiders() {

  const ridersList = await fetchOnUrl('http://localhost:8080/api/rider/all-riders');

  return ridersList;

}


async function getAllRidersByStage(id) {

  const ridersList = await fetchOnUrl('http://localhost:8080/api/rider/all-riders-by-stage/' + id);
  return ridersList;
}

async function getAllRidersByTeam(id) {

  const ridersList = await fetchOnUrl('http://localhost:8080/api/rider/all-riders-by-team/' + id);

  return ridersList;

}

async function createRiderTable() {
  const tableContainer = document.querySelector('.tableContentContainer');
  tableContainer.innerHTML = "";
  const tableDiv = document.createElement('div');
  tableDiv.classList.add('table-responsive')
  const riderTable = document.createElement('table')
  riderTable.classList.add('table', 'accordion')
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody')

  const thRow = tableHead.insertRow(-1);
  let thCell = thRow.insertCell(0);
  let text = "Name";
  thCell.append(text);
  thCell = thRow.insertCell(1)
  text = "Rider Number"
  thCell.append(text)
  thCell = thRow.insertCell(2)
  text = "Country"
  thCell.append(text)
  thRow.append(thCell)

  thCell = thRow.insertCell(3)
  text = "Team"
  thCell.append(text)
  thRow.append(thCell)

  thCell = thRow.insertCell(4)
  text = "Sprint Points"
  thCell.append(text)
  thRow.append(thCell)

  thCell = thRow.insertCell(5)
  text = "Mountain Points"
  thCell.append(text)
  thRow.append(thCell)
  riderTable.append(tableHead)

  thCell = thRow.insertCell(6)
  text = "Total Time"
  thCell.append(text)
  thRow.append(thCell)
  riderTable.append(tableHead)


  findFastestTime().then(() => {
    totalTimeArray.sort(function (a, b) {
      return a.riderTotalTime.localeCompare(b.riderTotalTime);
    });
    console.log(totalTimeArray)
  })

  const riderWinnerYellow = totalTimeArray[0].rider.riderId;

  console.log(riderWinnerYellow)
  for (let rider of totalTimeArray) {

    const trBody = tableBody.insertRow(-1);
    let trCell = trBody.insertCell(0);
    let trText = rider.rider.riderName;
    trCell.append(trText);
    trCell = trBody.insertCell(1);
    trText = rider.rider.riderNumber;
    trCell.append(trText);
    trCell = trBody.insertCell(2);
    trText = rider.rider.riderCountry;
    trCell.append(trText);
    trCell = trBody.insertCell(3);
    trText = rider.rider.team.teamName;
    trCell.append(trText);
    trCell = trBody.insertCell(4);
    trText = getTotalSprintPoints(rider.rider)
    trCell.append(trText);
    trCell = trBody.insertCell(5);
    trText = getTotalMountainPoints(rider.rider)
    trCell.append(trText);
    trCell = trBody.insertCell(6);
    trText = rider.riderTotalTime;
    trCell.append(trText);
    if (rider.rider.riderId == riderWinnerYellow){
      trCell = trBody.insertCell(7);
      trText = "winner yellow"
      trCell.append(trText);
    }
    if (rider.rider.riderId == riderWinnerYellow){
      trCell = trBody.insertCell(7);
      trText = "winner yellow"
      trCell.append(trText);
    }
    if (rider.rider.riderId == riderWinnerYellow){
      trCell = trBody.insertCell(7);
      trText = "winner yellow"
      trCell.append(trText);
    }


  }

  riderTable.append(tableBody);
  tableContainer.append(riderTable)
}

async function createRiderTableStage(riderList, stageId) {
  const tableContainer = document.querySelector('.tableContentContainer');
  tableContainer.innerHTML = "";
  const tableDiv = document.createElement('div');
  tableDiv.classList.add('table-responsive')
  const riderTable = document.createElement('table')
  riderTable.classList.add('table', 'accordion')
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody')

  const thRow = tableHead.insertRow(-1);
  let thCell = thRow.insertCell(0);
  let text = "Name";
  thCell.append(text);
  thCell = thRow.insertCell(1)
  text = "Rider Number"
  thCell.append(text)
  thCell = thRow.insertCell(2)
  text = "Country"
  thCell.append(text)
  thRow.append(thCell)

  thCell = thRow.insertCell(3)
  text = "Team"
  thCell.append(text)
  thRow.append(thCell)

  thCell = thRow.insertCell(4)
  text = "Sprint Points"
  thCell.append(text)
  thRow.append(thCell)

  thCell = thRow.insertCell(5)
  text = "Mountain Points"
  thCell.append(text)
  thRow.append(thCell)
  riderTable.append(tableHead)

  thCell = thRow.insertCell(6)
  text = "Time"
  thCell.append(text)
  thRow.append(thCell)

  riderTable.append(tableHead)


  for (let rider of riderList) {

    const trBody = tableBody.insertRow(-1);
    let trCell = trBody.insertCell(0);
    let trText = rider.riderName;
    trCell.append(trText);
    trCell = trBody.insertCell(1);
    trText = rider.riderNumber;
    trCell.append(trText);
    trCell = trBody.insertCell(2);
    trText = rider.riderCountry;
    trCell.append(trText);
    trCell = trBody.insertCell(3);
    trText = rider.team.teamName;
    trCell.append(trText);
    trCell = trBody.insertCell(4);
    trText = rider.resultList[stageId - 1].sprintPoint
    trCell.append(trText);
    trCell = trBody.insertCell(5);
    trText = rider.resultList[stageId - 1].mountainPoint
    trCell.append(trText);
    trCell = trBody.insertCell(6);
    trText = rider.resultList[stageId - 1].time
    trCell.append(trText);
    trCell = trBody.insertCell(7);

  }

  riderTable.append(tableBody);
  tableContainer.append(riderTable)
}

function getTotalSprintPoints(rider) {
  let riderList = rider.resultList

  if (riderList.length > 0) {
    let sum = 0;
    for (let result of riderList) {
      sum += result.sprintPoint;
    }
    return sum;
  } else {
    return 0;
  }
}

function addTimes(rider) {

  const z = (n) => (n < 10 ? '0' : '') + n;

  let hour = 0
  let minute = 0
  let second = 0
  for (const result of rider.resultList) {
    const time = result.time
    const splited = time.split(':');
    hour += parseInt(splited[0]);
    minute += parseInt(splited[1])
    second += parseInt(splited[2])
  }
  const seconds = second % 60
  const minutes = parseInt(minute % 60) + parseInt(second / 60)
  const hours = hour + parseInt(minute / 60)

  return z(hours) + ':' + z(minutes) + ':' + z(seconds)
}

async function findFastestTime() {

  let riderList = await getAllRiders();

  for (let rider of riderList) {
    const riderResult = {
      rider: rider,
      riderTotalTime: addTimes(rider)
    }
    totalTimeArray.push(riderResult)
  }

}

findFastestTime().then(() => {
  totalTimeArray.sort(function (a, b) {
    return a.riderTotalTime.localeCompare(b.riderTotalTime);
  });
  console.log(totalTimeArray)
})


function getTotalMountainPoints(rider) {
  let riderList = rider.resultList

  if (riderList.length > 0) {
    let sum = 0;
    for (let result of riderList) {
      sum += result.mountainPoint;
    }
    return sum;
  } else {
    return 0;
  }
}

function checkYellowShirt(rider){
  if (rider){

  }
}


async function deleteRider(rider) {
  const urlDelete = 'http://localhost:8080/api/rider/' + rider.riderId;

  const fetchOption = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    },
    body: ""
  }

  const jsonString = JSON.stringify(rider);
  fetchOption.body = jsonString;

  const response = await fetch(urlDelete, fetchOption);
  if (!response.ok) {
  }
  return response;
}

async function updateRider(rider) {
  const urlUpdate = 'http://localhost:8080/api/rider/' + rider.riderId;

  const fetchOption = {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: ""
  }

  const jsonString = JSON.stringify(rider);
  fetchOption.body = jsonString;

  //call backend and wait for response
  const response = await fetch(urlUpdate, fetchOption);
  if (!response.ok) {
  }
  return response;
}

async function editRider(rider) {

  const riderName = document.getElementById("riderName" + rider.riderId).innerText;
  const riderNumber = document.getElementById("riderNumber" + rider.riderId).innerText;
  const riderBirthDate = document.getElementById("riderBirtDate" + rider.riderId).innerText;
  const riderCountry = document.getElementById("riderCountry" + rider.riderId).innerText;
  const riderTeam = document.getElementById("riderTeam" + rider.riderId);
  const value = riderTeam.options[riderTeam.selectedIndex].value;
  console.log(value)

  const team = await getTeams();

  rider = {
    riderId: rider.riderId,
    riderName: riderName,
    riderNumber: riderNumber,
    riderBirthDate: riderBirthDate,
    riderCountry: riderCountry,
    team: team.find(t => t.teamName == value),
    resultList: [{
      stage: rider.resultList.stage,
      resultId: 1,
      mountainPoint: 1,
      sprintPoint: 2
    }]
  }
  console.log(rider)
  await updateRider(rider)
}

function filterOnTeam() {
  const teamId = document.getElementById('teamSelection').value
  console.log(teamId)
  if (teamId != 0) {
    getAllRidersByTeam(teamId).then(table => {
       createRiderTable(table)
    });
  } else {
    getAllRiders().then( table => {
       createRiderTable(table)
    });

  }
}

function chooseTableBasedOnInput() {
  const stageId = document.getElementById('stageSelection').value;
  if (stageId == 0) {
    getAllRiders().then(async table => {
      await createRiderTable(table)
    });
  } else {
    getAllRidersByStage(stageId).then(async table => {
      await createRiderTableStage(table, stageId)
    });
  }
}

const stageSelector = document.getElementById('stageSelection');
stageSelector.addEventListener('change', chooseTableBasedOnInput)

const selector = document.getElementById('teamSelection')
selector.addEventListener('change', ()=>{
  filterOnTeam();
})

chooseTableBasedOnInput();
