function filterData() {
  event.preventDefault();
  var startdate = new Date(document.getElementById("startdate").value);
  var enddate = new Date(document.getElementById("enddate").value);
  
  var rows = document.querySelectorAll(".blue tbody tr");

  rows.forEach(row => {
      var dateCell = row.querySelector("td:nth-child(2)").textContent;
      var rowDate = new Date(dateCell);
      
      if (rowDate >= startdate && rowDate <= enddate) {
          row.style.display = "";
      } else {
          row.style.display = "none";
      }
  });
}


async function fetchPitchData() {
  try {
      const response = await fetch('https://compute.samford.edu/zohauth/clients/datajson/1');
      const data = await response.json();

      const tableBody = document.getElementById('pitch-data');
      
      data.forEach(pitch => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td><a href="details.html?id=${pitch.PitchNo}">Pitch ${pitch.PitchNo}</a></td>
              <td>${pitch.Date}</td>
              <td>${pitch.Time}</td>
              <td>${pitch.Batter}</td>
              <td>${pitch.Balls}</td>
              <td>${pitch.Strikes}</td>
              <td>${pitch.Outs}</td>
              <td>${pitch.PitchCall}</td>
              <td>${pitch.KorBB || ''}</td>
              <td>${pitch.RelSpeed || ''}</td>
              <td>${pitch.SpinRate || ''}</td>
              <td>${pitch.SpinAxis || ''}</td>
          `;
          tableBody.appendChild(row);
      });
  } catch (error) {
      console.error('Error fetching pitch data:', error);
  }
}

// Fetch data on page load
fetchPitchData();