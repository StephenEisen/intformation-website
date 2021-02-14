import React from "react";
import { socket } from "globals/socket.js";
import AddTowerDialog from "../add-tower-dialog/add-tower-dialog.js";
import TowerData from "../tower-data/tower-data.js";
import addButton from "assets/icons/add.png";
import TowerMap from "../tower-map/tower-map.js";
import "./tower-list.css";

class TowerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      towerList: props.towerList,
      filteredTower: null,
      filteredTowerId: null,
      addTowerDialogVisible: false,
      isScrollAtBottom: false
    };
  }

  componentDidMount() {
    this.updateScrollAtBottom();
    window.addEventListener("scroll", () => this.updateScrollAtBottom);

    socket.on("addTowerSuccess", (towerList) => this.addTowerUpdate(towerList));
    socket.on("updateCharacterSuccess", (towerList) =>
      this.towerListUpdate(towerList)
    );
    socket.on("filterTowerSuccess", (towerList) =>
      this.towerListUpdate(towerList)
    );
  }

  componentWillUnmount() {
    socket.off("addTowerSuccess", this.addTowerUpdate);
    socket.off("updateCharacterSuccess", this.towerListUpdate);
    socket.off("filterTowerSuccess", this.towerListUpdate);
    window.removeEventListener("scroll", this.updateScrollAtBottom);
  }

  updateScrollAtBottom() {
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
    this.setState({ isScrollAtBottom: isAtBottom });
  }

  toggleAddTowerDialog(isVisible) {
    this.setState({ addTowerDialogVisible: isVisible });
  }

  addTowerUpdate(updatedTowerList) {
    this.setState({ addTowerDialogVisible: false }, () =>
      this.towerListUpdate(updatedTowerList)
    );
  }

  async towerListUpdate(updatedTowerList) {
    const newFilteredTower = updatedTowerList.find((tower) => {
      return tower._id === this.state.filteredTowerId;
    });

    this.setState({
      towerList: updatedTowerList,
      filteredTower: newFilteredTower,
    });
  }

  onTowerChange(towerId) {
    /**
     * Need to emit instead of filtering on client. If you filter by towerList on the UI then
     * any changes the user makes to a character will be lost when they change to a different
     * tower. This is because when a character update happens, we broadcast a socket event (We
     * need to broadcast so the client doesn't lose focus when switching to a different input).
     * Thus, the "towerListUpdate" is never called. This solution seems to work pretty well.
     */
    this.setState({ filteredTowerId: towerId }, () =>
      socket.emit("filterTower", this.props.pageId)
    );
  }

  render() {
    return (
      <section className="tower-list">
        {/* ADD NEW TOWER */}
        <AddTowerDialog
          visible={this.state.addTowerDialogVisible}
          pageId={this.props.pageId}
          onClose={() => this.toggleAddTowerDialog(false)}
        />

        <img
          src={addButton}
          className={`add-tower-btn ${
            this.state.isScrollAtBottom ? "fixed-bottom-btn" : ""
          }`}
          title="Add Tower"
          alt="Add Tower"
          onClick={() => this.toggleAddTowerDialog(true)}
        />

        {/* TOWER MAP */}
        <TowerMap
          pageId={this.props.pageId}
          towerList={this.state.towerList}
          onTowerChange={(towerId) => this.onTowerChange(towerId)}
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
