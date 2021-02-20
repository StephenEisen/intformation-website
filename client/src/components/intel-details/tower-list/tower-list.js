import React from "react";
import { socket } from "globals/socket.js";
import TowerData from "../tower-data/tower-data.js";
import TowerMap from "../tower-map/tower-map.js";
import "./tower-list.css";

class TowerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      towerList: props.towerList,
      filteredTower: null,
      filteredTowerId: null
    };
  }

  componentDidMount() {
    socket.on("addTowerSuccess", (newTowerData) => this.addTower(newTowerData));
    socket.on("updateCharacterSuccess", (towerData) => this.towerListUpdate(towerData));
    socket.on("filterTowerSuccess", (towerData) => this.towerListUpdate(towerData));
  }

  componentWillUnmount() {
    socket.off("addTowerSuccess", (newTowerData) => this.addTower(newTowerData));
    socket.off("updateCharacterSuccess", (towerData) => this.towerListUpdate(towerData));
    socket.off("filterTowerSuccess", (towerData) => this.towerListUpdate(towerData));
  }

  addTower({ towerList, towerLocation, towerId }) {
    const newFilteredTower = towerList[towerLocation].find((tower) => tower._id === towerId);
    this.setState({ towerList: towerList, filteredTower: newFilteredTower, filteredTowerId: towerId });
  }

  towerListUpdate({ towerList, towerLocation }) {
    if (towerLocation && towerLocation !== 'All') {
      const filteredTower = towerList[towerLocation].find((tower) => tower._id === this.state.filteredTowerId);
      this.setState({ filteredTower });
    } else {
      this.setState({ towerList, filteredTower: null });
    }
  }

  onTowerChange(towerLocation, towerId) {
    /**
     * Need to emit instead of filtering on client. If you filter by towerList on the UI then
     * any changes the user makes to a character will be lost when they change to a different
     * tower. This is because when a character update happens, we broadcast a socket event (We
     * need to broadcast so the client doesn't lose focus when switching to a different input).
     * Thus, the "towerListUpdate" is never called. This solution seems to work pretty well.
     */
    this.setState({ filteredTowerId: towerId }, () => {
      socket.emit("filterTower", { pageId: this.props.pageId, towerLocation: towerLocation });
    });
  }

  render() {
    return (
      <section className="tower-list">
        {/* TOWER MAP */}
        <TowerMap
          pageId={this.props.pageId}
          towerList={this.state.towerList}
          onTowerChange={(towerLocation, towerId) => this.onTowerChange(towerLocation, towerId)}
          onAddTower={(towerLocation, towerIndex) => this.onAddTower(towerLocation, towerIndex)}
        />

        {/* SHOW ALL TOWER INFO */}
        {this.state.filteredTower ? (
          <TowerData
            key={this.state.filteredTower._id}
            pageId={this.props.pageId}
            towerData={this.state.filteredTower}
          />
        ) : null}
      </section>
    );
  }
}

export default TowerList;
