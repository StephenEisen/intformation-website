import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { towerImagePost } from 'globals/api.js';
import { socket } from 'globals/socket';
import './team-image.css';

class TeamImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { imageUploaded: false };

    this.imageBoxRef = React.createRef(null);
    this.inputFileRef = React.createRef(null);
    this.imageDialogRef = React.createRef(null);
    this.fullImageRef = React.createRef(null);
  }

  componentDidMount() {
    socket.on("imageUploadSuccess", (response) => this.updateImage(response));
  }

  componentWillUnmount() {
    socket.off("imageUploadSuccess", (response) => this.updateImage(response));
  }

  updateImage({ imagePath, towerId, teamIndex }) {
    if (towerId === this.props.towerId && teamIndex === this.props.teamIndex) {
      this.imageBoxRef.current.src = imagePath;
      this.imageBoxRef.current.style.display = 'block';
      this.setState({ imageUploaded: true });
    }
  }

  stopEvents(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  dropHandler(e) {
    this.stopEvents(e);

    if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
      this.handleFile(e.dataTransfer.files[0]);
    }
  };

  handleFile(file) {
    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/heic') {
      if (file.size > 10e6) {
        alert("Your image is too powerful! File size cannot exceed 10MB");
        return;
      }
      towerImagePost(file, this.props.pageId, this.props.towerId, this.props.teamIndex);
    }
  };

  onFileChange(e) {
    if (e.target.files.length === 1) {
      this.handleFile(e.target.files[0])
    }
  }

  handleUploadClick() {
    this.inputFileRef.current.click();
  }

  handleImageClick(e) {
    this.stopEvents(e);

    this.fullImageRef.current.src = this.imageBoxRef.current.src;
    this.fullImageRef.current.style.display = 'block';
    this.imageDialogRef.current.style.display = 'block';
  }

  closeModal() {
    this.imageDialogRef.current.style.display = 'none';
  }

  render() {
     return (
      <div
        className="team-image"
        draggable="true"
        onClick={() => this.handleUploadClick()}
        onDrop={(e) => this.dropHandler(e)}
        onDragOver={this.stopEvents}
        onDragLeave={this.stopEvents}
        onDragEnter={this.stopEvents}
      >
        {
          !this.state.imageUploaded
            ? <span><FontAwesomeIcon icon={faUpload} />Drag or click to upload image</span>
            : null
        }

        <div className="uploaded-image">
          <img ref={this.imageBoxRef} alt="" onClick={(e) => this.handleImageClick(e)}></img>
        </div>

        <div ref={this.imageDialogRef} className="image-modal" onClick={this.stopEvents}>
          <span className="image-close" onClick={() => this.closeModal()}>&times;</span>
          <div className="modal-image-container">
            <img ref={this.fullImageRef} className="modal-image" alt="" />
          </div>
        </div>

        <input
          type="file"
          accept=".png,.jpeg,.jpg,.heic"
          ref={this.inputFileRef}
          onChange={(e) => this.onFileChange(e)}
        />
      </div>
    );
  }
}

export default TeamImage;
