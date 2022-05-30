function fetchOnUrl(url) {
  return fetch(url).then(res => res.json())
}

async function getAllRiders() {

  const ridersList = await fetchOnUrl('http://localhost:8080/api/rider/all-riders');

  return ridersList;

}

function createRiderTable(riderList) {

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
  text = "Age"
  thCell.append(text)
  thCell = thRow.insertCell(3)
  text = "Country"
  thCell.append(text)
  thRow.append(thCell)
  thCell = thRow.insertCell(4)
  text = "Points"
  thCell.append(text)
  thRow.append(thCell)

  riderTable.append(tableHead)


  for (let rider of riderList) {

    const trBody = tableBody.insertRow(-1);
    trBody.setAttribute('data-bs-toggle', 'collapse')
    trBody.setAttribute('data-bs-target', 'r' + rider.riderId)
    let trCell = trBody.insertCell(0);
    let trText = rider.riderName;
    trCell.append(trText);
    trCell = trBody.insertCell(1);
    trText = rider.riderNumber;
    trCell.append(trText);
    trCell = trBody.insertCell(2);
    trText = rider.riderBirthDate;
    trCell.append(trText);
    trCell = trBody.insertCell(3);
    trText = rider.riderCountry;
    trCell.append(trText);
    trCell = trBody.insertCell(4);
    trText = getTotalScore(rider)
    trCell.append(trText);
    trCell = trBody.insertCell(5);
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute("type", "button")
    deleteButton.classList.add("btn", "btn-danger")
    deleteButton.innerText = "Delete"
    trCell.append(deleteButton);
    deleteButton.addEventListener('click', ()=>{
      deleteRider(rider).then(getAllRiders).then( table =>{
        createRiderTable(table)
      })
    })

    let editButton = document.createElement('button');
    editButton.setAttribute("type", "button")
    editButton.classList.add("btn", "btn-info")
    editButton.innerText = "Edit"
    trCell.append(editButton);
  }

  riderTable.append(tableBody);
  tableContainer.append(riderTable)
}

function getTotalScore(rider) {
  let riderList = rider.resultList

  if (riderList.length > 0) {
    let sum = 0;
    for (let result of riderList) {
      sum += result.point;
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

getAllRiders().then(table => {
  createRiderTable(table)
});
