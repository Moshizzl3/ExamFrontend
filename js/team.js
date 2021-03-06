let totalTimeArrayByTeam = [];

function fetchOnUrl(url) {
  return fetch(url).then(res => res.json())
}

async function getTeams() {

  const teamList = await fetchOnUrl('http://localhost:8080/api/team/all-teams');

  return teamList;

}

async function createTeamCard(teamList) {

  const teamContainer = document.querySelector('.team-row-div')

  for (const team of teamList) {

    const teamCard = document.createElement('div');
    teamCard.setAttribute('id', 'team-' + team.teamId)
    teamCard.classList.add('container', 'col-md-3', 'shadow', 'teamDivContainer');
    const namePTag = document.createElement('p');
    namePTag.innerText = 'Name: ' + team.teamName;
    teamCard.append(namePTag);

    const countryPTag = document.createElement('p');
    countryPTag.innerText = 'Country: ' + team.teamCountry;
    teamCard.append(countryPTag);

    const tableTeam = document.createElement('table');
    tableTeam.classList.add('table')
    const tableTeamHead = document.createElement('thead');
    const tableTeamBody = document.createElement('tbody');

    let tableTeamHeadTr = tableTeamHead.insertRow(-1);
    let thCell = tableTeamHeadTr.insertCell(0);
    let text = "Name";
    thCell.append(text);
    thCell = tableTeamHeadTr.insertCell(1)
    text = "Score"
    thCell.append(text)

    totalTimeArrayByTeam = [];
    await findFastestTime(team);

    totalTimeArrayByTeam.sort(function (a, b) {
      return a.riderTotalTime.localeCompare(b.riderTotalTime);
    });


    for (let rider of totalTimeArrayByTeam) {

      const trBody = tableTeamBody.insertRow(-1);
      let trCell = trBody.insertCell(0);
      let trText = rider.rider.riderName;
      trCell.append(trText);
      trCell = trBody.insertCell(1);
      trText = rider.riderTotalTime;
      trCell.append(trText);
    }

    tableTeam.append(tableTeamBody);
    tableTeam.append(tableTeamHead);
    teamCard.append(tableTeam)


    teamContainer.append(teamCard)
  }
}

async function findFastestTime(team) {

  let riderList = await fetchOnUrl('http://localhost:8080/api/rider/all-riders-by-team/' + team.teamId);

  for (let rider of riderList) {
    const riderResult = {
      rider: rider,
      riderTotalTime: addTimes(rider)
    }
    totalTimeArrayByTeam.push(riderResult)
  }

}

getTeams().then(async teamList => {
  await createTeamCard(teamList)
})
