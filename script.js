const apiKey = "5683133c365242a3b4fd257ac2ada61a"; // Replace with your actual API key
const select = document.getElementById("competition-select");
const standingsBody = document.getElementById("standings-body");

document.getElementById("mode-toggle").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
});


// Using a free CORS proxy to bypass CORS issues
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const link = document.getElementById("CORS");
const div = document.getElementsByClassName("CORS");
const apiUrl = "https://api.football-data.org/v4/competitions/";


// Fetch standings data from the API
async function fetchStandings(competitionCode) {
  standingsBody.innerHTML = "<tr><td colspan='7'>Loading...</td></tr>";

  try {
    const response = await fetch(`${proxyUrl}${apiUrl}${competitionCode}/standings`, {
      headers: {
        "X-Auth-Token": apiKey
      }
    });

    const data = await response.json();
    const standings = data.standings[0].table;

    standingsBody.innerHTML = standings.map(team => `
      <tr>
        <td>${team.position}</td>
        <td>${team.team.name}</td>
        <td>${team.playedGames}</td>
        <td>${team.won}</td>
        <td>${team.draw}</td>
        <td>${team.lost}</td>
        <td>${team.points}</td>
      </tr>
    `).join('');
  } catch (error) {
    standingsBody.innerHTML = "<tr><td colspan='7'>Failed to load standings</td></tr>";
    console.error("Error:", error);
    div[0].style.display = "inline-block";
    link.addEventListener("click", () => {
      window.open("https://cors-anywhere.herokuapp.com/", '_blank');
    });
  }
}

// Event listener for when the competition is selected
select.addEventListener("change", () => {
  fetchStandings(select.value);
});

// Initial load of standings for the first competition
fetchStandings(select.value);
