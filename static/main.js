document.addEventListener("DOMContentLoaded", function () {
    const chartDiv = document.getElementById("chart");
    const serverData = JSON.parse(chartDiv.dataset.server);
    console.log("Received data:", serverData);
    createLineChart(serverData);
    createCalendarHeatmap(serverData);
  });

  // Calculate the start date as one year ago
let today = new Date();
let oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

  
  
  function createCalendarHeatmap(data) {
    let calendarData = data.result.data.reduce((acc, entry) => {
      let date = new Date(entry.date);
      acc[date.getTime() / 1000] = entry.puell_multiple;
      return acc;
    }, {});
  
    let cal = new CalHeatMap();
    cal.init({
      itemSelector: "#calendar-heatmap",
      data: calendarData,
      start: oneYearAgo,
      domain: "month",
      subDomain: "day",
      cellSize: 15,
      range: 6,
      legend: [1, 2, 3, 4, 5],
      tooltip: true,
      displayLegend: false,
    });
  }
  
  function createLineChart(data) {
    let dates = data.result.data.map((entry) => entry.date);
    let puell_multiple_values = data.result.data.map((entry) => entry.puell_multiple);
  
    let trace = {
      x: dates,
      y: puell_multiple_values,
      mode: "lines",
      name: "Puell Multiple",
      line: { shape: "spline" },
    };
  
    let layout = {
      title: "Puell Multiple",
      xaxis: {
        title: "Date",
        type: "date",
      },
      yaxis: {
        title: "Puell Multiple",
      },
    };
  
    let config = {
      responsive: true,
    };
  
    Plotly.newPlot("chart", [trace], layout, config);
  }
  