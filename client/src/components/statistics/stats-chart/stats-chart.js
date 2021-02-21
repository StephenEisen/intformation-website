import React from "react";
import Chart from "chart.js";

class StatsChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = { artifacts: [] };
  }

  componentDidMount() {
    const sortedArtifacts = this.getSortedArtifacts();
    this.setState({ artifacts: sortedArtifacts }, this.createChart);
  }

  createChart() {
    var ctx = this.chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.getArtifactLabels(),
        datasets: [
          {
            yAxisID: "A",
            label: "HP",
            data: this.getAverages("hpAverage"),
            backgroundColor: this.getColors("rgba(255, 99, 132, 0.2)"),
            borderColor: this.getColors("rgba(255, 99, 132, 1)"),
            borderWidth: 1,
          },
          {
            yAxisID: "B",
            label: "Speed",
            data: this.getAverages("speedAverage"),
            backgroundColor: this.getColors("rgba(153, 102, 255, 0.2)"),
            borderColor: this.getColors("rgba(153, 102, 255, 1)"),
            borderWidth: 1,
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
                beginAtZero: true,
              },
            },
            {
              id: "B",
              type: "linear",
              position: "right",
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  getSortedArtifacts() {
    const sortedArtifacts = [];

    for (const key in this.props.artifactData) {
      const label = key;
      const data = this.props.artifactData[key];
      sortedArtifacts.push({ label, data });
    }

    return sortedArtifacts.sort((a, b) => b.data.artifactCounter - a.data.artifactCounter);
  }

  getArtifactLabels() {
    return this.state.artifacts.map((a) => a.label);
  }

  getAverages(averageKey) {
    return this.state.artifacts.map((a) => a.data[averageKey]);
  }

  getColors(color) {
    const numArtifacts = Object.keys(this.state.artifacts).length;
    return Array(numArtifacts).fill(color);
  }

  render() {
    return <canvas width="100%" height="300px" ref={this.chartRef}></canvas>;
  }
}

export default StatsChart;
