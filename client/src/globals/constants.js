export const Routes = {
  Intel: "/intel",
  IntelDetails: "/intel/:pageId/:towerLocation?/:towerIndex?",
  Statistics: "/statistics",
  About: "/about"
};

export const TowerLocations = [
  'Stronghold',
  'Bronze Fortress',
  'Silver Fortress',
  'Dalberg Fortress'
];

export const PathToTowerLocation = {
  stronghold: 'Stronghold',
  bronze: 'Bronze Fortress',
  silver: 'Silver Fortress',
  dalberg: 'Dalberg Fortress'
};

export const TowerLocationToPath = {
  'Stronghold': 'stronghold',
  'Bronze Fortress': 'bronze',
  'Silver Fortress': 'silver',
  'Dalberg Fortress': 'dalberg'
};
