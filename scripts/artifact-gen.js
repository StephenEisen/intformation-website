
const fs = require('fs');
const artifactList = JSON.parse(fs.readFileSync('../client/src/constants/artifact-info.json'));

for (let i = 0; i < artifactList.length; i++) {
  const artifact = artifactList[i];
  artifact.label = artifact.value;
}

const updatedArtifactList = JSON.stringify(artifactList);
fs.writeFileSync('../client/src/constants/artifact-info.json', updatedArtifactList);
