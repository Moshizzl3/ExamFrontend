const totalTimeArray = [];

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

async function createRiderTable(riderList) {
  const allTeams = await getTeams();
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
  text = "BirthDate"
  thCell.append(text)
  thCell = thRow.insertCell(3)
  text = "Country"
  thCell.append(text)
  thRow.append(thCell)

  thCell = thRow.insertCell(4)
  text = "Team"
  thCell.append(text)
  thRow.append(thCell)

  thCell = thRow.insertCell(5)
  text = "Sprint Points"
  thCell.append(text)
  thRow.append(thCell)

  thCell = thRow.insertCell(6)
  text = "Mountain Points"
  thCell.append(text)
  thRow.append(thCell)
  riderTable.append(tableHead)

  thCell = thRow.insertCell(7)
  text = "Total Time"
  thCell.append(text)
  thRow.append(thCell)
  riderTable.append(tableHead)


  for (let rider of riderList) {

    const trBody = tableBody.insertRow(-1);
    trBody.setAttribute('data-bs-toggle', 'collapse')
    trBody.setAttribute('data-bs-target', 'r' + rider.riderId)
    let trCell = trBody.insertCell(0);
    let trText = rider.riderName;
    trCell.setAttribute("id", "riderName" + rider.riderId)
    trCell.setAttribute("contenteditable", "true")
    trCell.append(trText);
    trCell = trBody.insertCell(1);
    trCell.setAttribute("id", "riderNumber" + rider.riderId)
    trCell.setAttribute("contenteditable", "true")
    trText = rider.riderNumber;
    trCell.append(trText);
    trCell = trBody.insertCell(2);
    trCell.setAttribute("id", "riderBirtDate" + rider.riderId)
    trCell.setAttribute("contenteditable", "true")
    trCell.setAttribute("type", "calendar")
    trText = rider.riderBirthDate;
    trCell.append(trText);
    trCell = trBody.insertCell(3);
    trCell.setAttribute("id", "riderCountry" + rider.riderId)
    trCell.setAttribute("contenteditable", "true")
    trText = rider.riderCountry;
    trCell.append(trText);
    trCell = trBody.insertCell(4);
    await getTeamsForDropDown(allTeams, trCell, "riderTeam" + rider.riderId, rider)
    trCell = trBody.insertCell(5);
    trText = getTotalSprintPoints(rider)
    trCell.append(trText);
    trCell = trBody.insertCell(6);
    trText = getTotalMountainPoints(rider)
    trCell.append(trText);
    trCell = trBody.insertCell(7);
    trText = addTimes(rider)
    trCell.append(trText);
    trCell = trBody.insertCell(8);
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute("type", "button")
    deleteButton.classList.add("btn", "btn-danger")
    deleteButton.innerText = "Delete"
    trCell.append(deleteButton);
    deleteButton.addEventListener('click', () => {
      deleteRider(rider).then(getAllRiders).then(table => {
        createRiderTable(table)
      })
    })

    let editButton = document.createElement('button');
    editButton.setAttribute("type", "button")
    editButton.classList.add("btn", "btn-info")
    editButton.innerText = "Edit"
    editButton.addEventListener('click', () => {
      editRider(rider).then(getAllRiders).then(table => {
        createRiderTable(table)
      });
    })
    trCell.append(editButton);

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
    trBody.setAttribute('data-bs-toggle', 'collapse')
    trBody.setAttribute('data-bs-target', 'r' + rider.riderId)
    let trCell = trBody.insertCell(0);
    let trText = rider.riderName;
    trCell.setAttribute("id", "riderName" + rider.riderId)
    trCell.setAttribute("contenteditable", "true")
    trCell.append(trText);
    trCell = trBody.insertCell(1);
    trCell.setAttribute("id", "riderNumber" + rider.riderId)
    trCell.setAttribute("contenteditable", "true")
    trText = rider.riderNumber;
    trCell.append(trText);
    trCell = trBody.insertCell(2);
    trCell.setAttribute("id", "riderCountry" + rider.riderId)
    trCell.setAttribute("contenteditable", "true")
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
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute("type", "button")
    deleteButton.classList.add("btn", "btn-danger")
    deleteButton.innerText = "Delete"
    trCell.append(deleteButton);
    deleteButton.addEventListener('click', () => {
      deleteRider(rider).then(getAllRiders).then(table => {
        createRiderTable(table)
      })
    })

    let editButton = document.createElement('button');
    editButton.setAttribute("type", "button")
    editButton.classList.add("btn", "btn-info")
    editButton.innerText = "Edit"
    editButton.addEventListener('click', () => {
      editRider(rider).then(getAllRiders).then(table => {
        createRiderTable(table)
      });
    })
    trCell.append(editButton);

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

async function getTeamsForDropDown(teams, td, id, rider) {

  const select = document.createElement('select')
  select.setAttribute('id', id)

  const defaultOption = document.createElement('option');
  defaultOption.selected = true;
  defaultOption.innerText = rider.team.teamName;
  select.append(defaultOption)


  for (let team of teams) {
    if (defaultOption.innerText != team.teamName) {
      const option = document.createElement('option');
      option.innerText = team.teamName;
      select.append(option);
    }
  }
  td.append(select)
}

function filterOnTeam() {
  const teamId = document.getElementById('teamSelection').value
  if (teamId != 0) {
    getAllRidersByTeam(teamId).then(table => {
      createRiderTable(table)
    });
  } else {
    getAllRiders().then(table => {
      createRiderTable(table)
    });

  }
}

function chooseTableBasedOnInput() {
  const stageId = document.getElementById('stageSelection').value;
  if (stageId == 0) {
    getAllRiders().then(table => {
      createRiderTable(table)
    });
  } else {
    getAllRidersByStage(stageId).then(table => {
      createRiderTableStage(table, stageId)
    });
  }
}

const stageSelector = document.getElementById('stageSelection');
stageSelector.addEventListener('change', chooseTableBasedOnInput)

const selector = document.getElementById('teamSelection')
selector.addEventListener('change', filterOnTeam)

chooseTableBasedOnInput();
