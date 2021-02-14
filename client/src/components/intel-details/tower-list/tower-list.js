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
      filteredTowerId: null,
      isScrollAtBottom: false
    };
  }

  componentDidMount() {
    this.updateScrollAtBottom();
    window.addEventListener("scroll", () => this.updateScrollAtBottom);

    socket.on("addTowerSuccess", (newTowerData) => this.addTower(newTowerData));
    socket.on("updateCharacterSuccess", (towerList) => this.towerListUpdate(towerList));
    socket.on("filterTowerSuccess", (towerList) => this.towerListUpdate(towerList));
  }

  componentWillUnmount() {
    socket.off("addTowerSuccess", (newTowerData) => this.addTower(newTowerData));
    socket.off("updateCharacterSuccess", (towerList) => this.towerListUpdate(towerList));
    socket.off("filterTowerSuccess", (towerList) => this.towerListUpdate(towerList));
    window.removeEventListener("scroll", () => this.updateScrollAtBottom);
  }

  updateScrollAtBottom() {
    const isAtBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
    this.setState({ isScrollAtBottom: isAtBottom });
  }

  addTower({ towerList, towerId }) {
    const newFilteredTower = towerList.find((tower) => tower._id === towerId);
    this.setState({ towerList: towerList, filteredTower: newFilteredTower, filteredTowerId: towerId });
  }

  async towerListUpdate(updatedTowerList) {
    const newFilteredTower = updatedTowerList.find((tower) => tower._id === this.state.filteredTowerId);
    this.setState({ towerList: updatedTowerList, filteredTower: newFilteredTower });
  }

  onTowerChange(towerId) {
    /**
     * Need to emit instead of filtering on client. If you filter by towerList on the UI then
     * any changes the user makes to a character will be lost when they change to a different
     * tower. This is because when a character update happens, we broadcast a socket event (We
     * need to broadcast so the client doesn't lose focus when switching to a different input).
     * Thus, the "towerListUpdate" is never called. This solution seems to work pretty well.
     */
    this.setState({ filteredTowerId: towerId }, () => socket.emit("filterTower", this.props.pageId));
  }

  render() {
    return (
      <section className="tower-list">
        {/* TOWER MAP */}
        <TowerMap
          pageId={this.props.pageId}
          towerList={this.state.towerList}
          onTowerChange={(towerId) => this.onTowerChange(towerId)}
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
