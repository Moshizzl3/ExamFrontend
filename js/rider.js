function fetchOnUrl(url) {
  return fetch(url).then(res => res.json())
}

async function getAllRiders() {

  const ridersList = await fetchOnUrl('http://localhost:8080/api/rider/all-riders');

  return ridersList;

}

function createRiderTable(riderList) {

  const tableContainer = document.querySelector('.tableContentContainer');
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
  }

  riderTable.append(tableBody);
  tableContainer.append(riderTable)
}


getAllRiders().then(table => {
  createRiderTable(table)
});
