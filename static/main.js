document.addEventListener("DOMContentLoaded", function () {
  const chartPuell = document.getElementById("chart-puell");
  const serverDataPuell = JSON.parse(chartPuell.dataset.server);
  createPuellMultipleChart(serverDataPuell);

  const chartMvrv = document.getElementById("chart-mvrv");
  const serverDataMvrv = JSON.parse(chartMvrv.dataset.server);
  createMvrvChart(serverDataMvrv);

  const chartNupl = document.getElementById("chart-nupl");
  const serverDataNupl = JSON.parse(chartNupl.dataset.server);
  createNuplChart(serverDataNupl);

  document.getElementById("puell-multiple").addEventListener("click", function () {
    // Show the Puell Multiple chart and hide the others
    document.getElementById("chart-puell").style.display = "block";
    document.getElementById("chart-nupl").style.display = "none";
    document.getElementById("chart-mvrv").style.display = "none";
    document.getElementById("chart-timeline").style.display = "none";
  });

  document.getElementById("nupl").addEventListener("click", function () {
    // Show the NUPL chart and hide the others
    document.getElementById("chart-puell").style.display = "none";
    document.getElementById("chart-nupl").style.display = "block";
    document.getElementById("chart-mvrv").style.display = "none";
    document.getElementById("chart-timeline").style.display = "none";
  });

  document.getElementById("mvrv").addEventListener("click", function () {
    // Show the MVRV chart and hide the others
    document.getElementById("chart-puell").style.display = "none";
    document.getElementById("chart-nupl").style.display = "none";
    document.getElementById("chart-mvrv").style.display = "block";
    document.getElementById("chart-timeline").style.display = "none";
  });

  document.getElementById("new-chart").addEventListener("click", function () {
    // Show the new chart and hide the others
    document.getElementById("chart-puell").style.display = "none";
    document.getElementById("chart-nupl").style.display = "none";
    document.getElementById("chart-mvrv").style.display = "none";
    document.getElementById("chart-timeline").style.display = "block";

    // Call the function to create the new chart
    createNewChart();
  });

  function createPuellMultipleChart(data) {
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

    Plotly.newPlot("chart-puell", [trace], layout, config);
  }
  function createMvrvChart(data) {
    let dates = data.result.data.map((entry) => entry.date);
    let mvrv_values = data.result.data.map((entry) => entry.mvrv);

    let trace = {
      x: dates,
      y: mvrv_values,
      mode: "lines",
      name: "MVRV",
      line: { shape: "spline" },
    };

    let layout = {
      title: "MVRV Ratio",
      xaxis: {
        title: "Date",
        type: "date",
      },
      yaxis: {
        title: "MVRV Ratio",
      },
    };

    let config = {
      responsive: true,
    };

    Plotly.newPlot("chart-mvrv", [trace], layout, config);
  }

  function createNuplChart(data) {
    let dates = data.result.data.map((entry) => entry.date);
    let nupl_values = data.result.data.map((entry) => entry.nupl);

    let trace = {
      x: dates,
      y: nupl_values,
      mode: "lines",
      name: "NUPL",
      line: { shape: "spline" },
    };

    let layout = {
      title: "Net Unrealized Profit/Loss",
      xaxis: {
        title: "Date",
        type: "date",
      },
      yaxis: {
        title: "NUPL",
      },
    };

    let config = {
      responsive: true,
    };

    Plotly.newPlot("chart-nupl", [trace], layout, config);
  }

  function createNewChart() {
    // Example data for the new chart
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [30, 200, 100, 400, 150, 250, 50, 100, 200, 300, 400, 500]
      ]
    };

    const options = {
      chart: {
        type: 'line',
        height: 350
      },
      series: [{
        name: 'Example',
        data: data.series[0]
      }],
      xaxis: {
        categories: data.labels
      }
    };

    const chartTimeline = new ApexCharts(document.getElementById("chart-timeline"), options);
    chartTimeline.render();
  }
});