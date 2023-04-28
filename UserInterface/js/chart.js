// const { Chart } = require("chart.js");
// import Chart from "/dist/chart.umd.min.js";
import { GreenhouseProxy } from "../api/api.js";

const proxy = new GreenhouseProxy();

const roomID = sessionStorage.getItem('roomID');

const updateChartButton = document.getElementById('update-chart');
updateChartButton.addEventListener('click', renderMeasurements);

// Aquire measurement data and store in object

async function renderMeasurements() {
  console.log("Rendering measurements...");
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');
  let isDateNull = false;
  let measurements = []

  const dateObj = {
    "end_date": `${endDate.value}`,
    "start_date": `${startDate.value}`
  }

  // Need to ensure that the dates aren't null
  for (const date in dateObj) {
    // console.log(dateObj[date]);
    if (dateObj[date] == "") {
      isDateNull = true;
    }
  }

  console.log(isDateNull);
  // Get measurements for roomID stored in session storage
  if (!isDateNull) {
    const measurementsObj = await proxy.getMeasurementByRoom(1, dateObj);
    measurements = measurementsObj['data'];
    console.log(measurements);
    let labels = [];

    measurements.forEach(measurement => {
      // labels.push(measurement[''])
      var date = new Date(measurement['timestamp']);
      console.log(date);
    });

    const ctx = document.getElementById('myChart');

    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Temp',
          data: [75, 78, 81, 84, 81, 73],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          }
        }
      }
    });
  }
  
  // Need to get timeframe and convert to proper value. e.x.: '2023-04-27'

  // Create object
  // return obj
}

renderMeasurements();

// const obj = {
//   "experiments": [
//     {
//       "room_id": 0,
//       "id": 0,
//       "name": "string"
//     }
//   ],
//   "name": "string",
//   "greenhouse_id": 0,
//   "messages": [
//     {
//       "room_id": 0,
//       "timestamp": "2023-04-27T19:51:44.677Z",
//       "id": 0,
//       "body": "string",
//       "user_id": 0
//     }
//   ],
//   "id": 0,
//   "measurements": [
//     {
//       "room_id": 0,
//       "timestamp": "2023-04-27T19:51:44.677Z",
//       "pressure": 0,
//       "temperature": 0,
//       "light": 0,
//       "humidity": 0
//     }
//   ]
// }