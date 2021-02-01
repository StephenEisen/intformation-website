
const fs = require('fs');
const artifactList = JSON.parse(fs.readFileSync('../client/src/data/artifact-info.json'));

for (let i = 0; i < artifactList.length; i++) {
  const artifact = artifactList[i];
  artifact.label = artifact.value;
}

const updatedArtifactList = JSON.stringify(artifactList);
fs.writeFileSync('../client/src/data/artifact-info.json', updatedArtifactList);
