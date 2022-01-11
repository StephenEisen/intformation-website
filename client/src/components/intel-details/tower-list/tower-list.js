import React from 'react';
import { withRouter } from 'react-router-dom';
import { socket } from 'globals/socket.js';
import { updateIntelPath } from 'globals/utils.js';
import { PathToTowerLocation, TowerLocations } from 'globals/constants.js';
import TowerData from '../tower-data/tower-data.js';
import TowerMap from '../tower-map/tower-map.js';
import './tower-list.css';

class TowerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      towerList: props.towerList,
      filteredTower: null,
      filteredTowerId: null,
      towerMapKey: 0,
      defaultTowerLocation: null
    };

    this.addTower = this.addTower.bind(this);
    this.setTowerList = this.setTowerList.bind(this);
    this.filterTower = this.filterTower.bind(this);
  }

  componentDidMount() {
    socket.on('towerListUpdateSuccess', this.setTowerList);
    socket.on('addTowerSuccess', this.addTower);
    socket.on('filterTowerSuccess', this.filterTower);

    // Load default tower and detect forward and back click on browser
    this.loadDefaultTower();
    window.onpopstate = (e) => { this.loadDefaultTower(); };
  }

  componentWillUnmount() {
    socket.off('towerListUpdateSuccess', this.setTowerList);
    socket.off('addTowerSuccess', this.addTower);
    socket.off('filterTowerSuccess', this.filterTower);
  }

  getDefaultTowerLocation() {
    const location = this.props.towerLocation ? this.props.towerLocation.toLowerCase() : null;
    return PathToTowerLocation[location];
  }

  getDefaultTowerIndex() {
    if (this.props.towerIndex != null) {
      const index = Number(this.props.towerIndex);
      const isInteger = Number.isInteger(index);

      return isInteger && index >= 1 && index <= 9 ? index - 1 : null;
    }

    return null;
  }

  loadDefaultTower() {
    const defaultTowerLocation = this.getDefaultTowerLocation();
    const defaultTowerIndex = this.getDefaultTowerIndex();

    if (TowerLocations.includes(defaultTowerLocation)) {
      const towers = this.state.towerList[defaultTowerLocation];

      if (!defaultTowerIndex && defaultTowerLocation === TowerLocations[0] && towers[0].name != null) {
        // Check if no index is given in the path and the location is stronghold.
        updateIntelPath(this.props.history, this.props.pageId, defaultTowerLocation);
        this.setState({ filteredTower: towers[0], defaultTowerLocation });
      } else if (defaultTowerIndex != null && towers[defaultTowerIndex] && towers[defaultTowerIndex].name != null) {
        // Check if there's an index in the path and that index is valid
        this.setState({ filteredTower: towers[defaultTowerIndex], defaultTowerLocation });
      } else {
        // When the index is invalid, remove index from the URL.
        updateIntelPath(this.props.history, this.props.pageId);
        this.setState({ filteredTower: null, defaultTowerLocation: 'All', towerMapKey: Math.random() });
      }
    } else {
      updateIntelPath(this.props.history, this.props.pageId);
      this.setState({ defaultTowerLocation: 'All', towerMapKey: Math.random() });
    }
  }

  setTowerList(towerList) {
    this.setState({ towerList });
  }

  addTower({ towerList, towerLocation, towerId }) {
    const newFilteredTower = towerList[towerLocation].find((tower) => tower._id === towerId);
    this.setState({ towerList: towerList, filteredTower: newFilteredTower, filteredTowerId: towerId });
  }

  filterTower({ towerList, towerLocation }) {
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
      socket.emit('filterTower', { pageId: this.props.pageId, towerLocation: towerLocation });
    });
  }

  render() {
    return (
      <section className="tower-list">
        {/* TOWER MAP */}
        <TowerMap
          key={this.state.towerMapKey}
          pageId={this.props.pageId}
          towerList={this.state.towerList}
          defaultLocation={this.state.defaultTowerLocation}
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

export default withRouter(TowerList);
