import React from 'react';
import Chart from "chart.js";

class StatsChart extends React.Component {

  constructor(props){
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    var ctx = this.chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["artifact1", "artifact2", "artifact3", "artifact4"],
        datasets: [
          {
            yAxisID: "A",
            label: "HP",
            data: [10000, 8000, 5000, 3000],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
          },
          {
            yAxisID: "B",
            label: "Speed",
            data: [100, 200, 150, 300],
            backgroundColor: [
              'rgba(153, 102, 255, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
              'rgba(153, 102, 255, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
          },

        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxes: [
            {
              id: "A",
              type: "linear",
              positon: "left",
              ticks: {
                beginAtZero: true
              }
            },
            {
              id: "B",
              type: "linear",
              position: "right",
              ticks: {
                beginAtZero: true
              }
            },
          ],
        },
      },
    });
  };

  render() {
    return  <canvas width="100%" ref={this.chartRef}></canvas>
  }
}

export default StatsChart;
