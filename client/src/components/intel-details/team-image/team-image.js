import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { towerImagePost } from 'globals/api.js';
import { socket } from 'globals/socket';
import './team-image.css';

const TeamImage = (props) => {
  const imageBoxRef = useRef(null);
  const inputFileRef = useRef(null);
  const imageDialogRef = useRef(null);
  const fullImageRef = useRef(null);

  useEffect(() => {
    if (props.image) {
      const blob = new Blob([Int8Array.from(props.image.data)]);
      updateImageBox(blob);
    }

    socket.on("imageUploadSuccess", handleImageBuffer);

    return () => {
      socket.off("imageUploadSuccess", handleImageBuffer);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageBuffer = ({ file, teamIndex }) => {
    if (teamIndex === props.teamIndex) {
      const blob = new Blob([file.buffer]);
      updateImageBox(blob);
    }
  }

  const updateImageBox = (blob) => {
    const url = URL.createObjectURL(blob);

    imageBoxRef.current.src = url;
    imageBoxRef.current.style.display = 'block';
    imageBoxRef.current.onload = () => URL.revokeObjectURL(url);
  }

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const defaultEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleFile = (file) => {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      if (file.size > 10e6) {
        alert("Your image is too powerful! File size cannot exceed 10MB");
        return;
      }
      towerImagePost(file, props.pageId, props.towerIndex, props.teamIndex);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files.length === 1) {
      handleFile(e.target.files[0])
    }
  }

  const handleUploadClick = () => {
    inputFileRef.current.click();
  }

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    fullImageRef.current.src = imageBoxRef.current.src;
    fullImageRef.current.style.display = 'block';
    imageDialogRef.current.style.display = 'block';
  }

  const closeModal = () => {
    imageDialogRef.current.style.display = 'none';
  }

  return (
    <div className="team-image" draggable="true" onClick={handleUploadClick} onDrop={dropHandler} onDragOver={defaultEventHandler} onDragLeave={defaultEventHandler} onDragEnter={defaultEventHandler}>
      <FontAwesomeIcon icon={faUpload} />Drag or click to upload image

      <div className="uploaded-image">
        <img ref={imageBoxRef} alt="" onClick={handleImageClick}></img>
      </div>

      <div ref={imageDialogRef} className="image-modal" onClick={defaultEventHandler}>
        <span className="image-close" onClick={closeModal}>&times;</span>
        <div className="modal-image-container">
          <img ref={fullImageRef} className="modal-image" />
        </div>
      </div>

      <input
        type="file"
        accept=".png,.jpeg,.jpg"
        ref={inputFileRef}
        onChange={onFileChange}
      />
    </div>
  );
};

export default TeamImage;
