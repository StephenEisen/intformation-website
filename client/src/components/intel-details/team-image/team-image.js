import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { towerImagePost } from 'globals/api.js';
import { socket } from 'globals/socket';
import './team-image.css';

const TeamImage = (props) => {
  const imageBox = useRef(null);
  const inputFileRef = useRef(null);

  useEffect(() => {
    if (props.image) {
      const blob = new Blob([Int8Array.from(props.image.data)]);
      const url = URL.createObjectURL(blob);
      imageBox.current.src = url;
      imageBox.current.onload = () => URL.revokeObjectURL(url);
    }

    socket.on("imageUploadSuccess", handleImageBuffer);

    return () => {
      socket.off("imageUploadSuccess", handleImageBuffer);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageBuffer = ({ file, teamIndex }) => {
    if (teamIndex === props.teamIndex) {
      const blob = new Blob([file.buffer || file.data]);
      const url = URL.createObjectURL(blob);

      imageBox.current.src = url;
      imageBox.current.onload = () => {
        URL.revokeObjectURL(url);
      }
    }
  }

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

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

  const handleBtnClick = () => {
    inputFileRef.current.click();
  }

  return (
    <div onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDragEnter={dragEnterHandler} onDrop={dropHandler} draggable="true" className="">
      <img ref={imageBox} width="100%" alt=""></img>
      <span onClick={handleBtnClick}>
        <input className="mosuck-input"
          type="file"
          accept=".png,.jpeg,.jpg"
          ref={inputFileRef}
          onChange={onFileChange}
        />
        <FontAwesomeIcon icon={faPlusSquare} className="mo-sucks" />
      </span>
    </div>
  );
};

export default TeamImage;
