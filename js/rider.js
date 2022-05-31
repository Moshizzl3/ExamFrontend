let totalTimeArray = [];
let totalMountainArray = [];
let totalSprintArray = []
let totalTimeArrayBelow26 = []


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

async function createRiderTable() {
  const tableContainer = document.querySelector('.tableContentContainer');
  tableContainer.innerHTML = "";
  const tableDiv = document.createElement('div');
  tableDiv.classList.add('table-responsive')
  const riderTable = document.createElement('table')
  riderTable.classList.add('table', 'accordion')
  const tableHead = document.createElement('thead');
  const tableBody =
    document.createElement('tbody')

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

  totalTimeArray = [];
  await findFastestTime1();
  totalTimeArray.sort(function (a, b) {
    return a.riderTotalTime.localeCompare(b.riderTotalTime);
  });


  findHighestPointsMountain().then(() => {
    totalMountainArray.sort(function (a, b) {
      return b.riderTotalPoints - a.riderTotalPoints;
    });

  })

  findHighestPointsSprint().then(() => {
    totalSprintArray.sort(function (a, b) {
      return b.riderTotalPoints - a.riderTotalPoints;
    });

  })

  findFastestTimeBelow26().then(() => {
    totalTimeArrayBelow26.sort(function (a, b) {
      return a.riderTotalTime.localeCompare(b.riderTotalTime);
    });
  })

  const riderWinnerYellow = totalTimeArray[0].rider.riderId;
  const riderWinnerMountain = totalMountainArray[0].rider.riderId;
  const riderWinnerSprint = totalSprintArray[0].rider.riderId;
  const riderWinnerWhite = totalSprintArray[0].rider.riderId;

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
    if (rider.rider.riderId == riderWinnerYellow) {
      trCell = trBody.insertCell(7);
      const img = document.createElement('img')
      img.classList.add('img-shirts')
      img.src = "../img/yellowShirt.png"
      trCell.append(img);
    }
    if (rider.rider.riderId == riderWinnerMountain) {
      trCell = trBody.insertCell(7);
      const img = document.createElement('img')
      img.classList.add('img-shirts')
      img.src = "../img/bjergShirt.png"
      trCell.append(img);
    }
    if (rider.rider.riderId == riderWinnerSprint) {
      trCell = trBody.insertCell(7);
      const img = document.createElement('img')
      img.classList.add('img-shirts')
      img.src = "../img/greenShirt.png"
      trCell.append(img);
    }

    if (rider.rider.riderId == riderWinnerWhite) {
      trCell = trBody.insertCell(7);
      const img = document.createElement('img')
      img.classList.add('img-shirts')
      img.src = "../img/whiteShirt.png"
      trCell.append(img);
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

async function findFastestTime1() {

  let riderList = await getAllRiders();

  for (let rider of riderList) {
    const riderResult = {
      rider: rider,
      riderTotalTime: addTimes(rider)
    }
    totalTimeArray.push(riderResult)
  }

}

async function findFastestTimeBelow26() {

  let riderList = await getAllRiders();

  for (let rider of riderList) {
    if (checkAge(rider.riderBirthDate)) {
      const riderResult = {
        rider: rider,
        riderTotalTime: addTimes(rider)
      }
      totalTimeArrayBelow26.push(riderResult)
    }
  }

}


function checkAge(birthdate) {
  const ageInMilliseconds = new Date() - new Date(birthdate);
  const age = Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
  return age < 26;
}


async function findHighestPointsMountain() {

  let riderList = await getAllRiders();

  for (let rider of riderList) {
    const riderResult = {
      rider: rider,
      riderTotalPoints: getTotalMountainPoints(rider)
    }
    totalMountainArray.push(riderResult)
  }

}

async function findHighestPointsSprint() {

  let riderList = await getAllRiders();

  for (let rider of riderList) {
    const riderResult = {
      rider: rider,
      riderTotalPoints: getTotalSprintPoints(rider)
    }
    totalSprintArray.push(riderResult)
  }

}


findFastestTime1().then(() => {
  totalTimeArray.sort(function (a, b) {
    return a.riderTotalTime.localeCompare(b.riderTotalTime);
  });

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

async function chooseTableBasedOnInput() {
  const stageId = document.getElementById('stageSelection').value;
  if (stageId == 0) {
    await createRiderTable()
  } else {
    getAllRidersByStage(stageId).then(table => {
      createRiderTableStage(table, stageId)
    });
  }
}

const stageSelector = document.getElementById('stageSelection');
stageSelector.addEventListener('change', async () => await chooseTableBasedOnInput())


chooseTableBasedOnInput();
