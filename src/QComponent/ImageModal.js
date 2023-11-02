import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './ImageModal.css';
import ssurveyLogo from '../ImsiLogo.svg';

function ImageModal(props) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageUpload, setImageUpload] = useState(true);

  const handleFileChange = (event) => {
    // 파일 선택 시 호출되는 이벤트 핸들러
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // const handleUpload = () => {
  //   if (selectedFile) {
  //    -파일 업로드 로직
  //    -서버로 파일을 업로드하고 처리하는 로직 구현
  //    -서버로 파일을 업로드하기 위해 fetch나 axios와 같은 라이브러리를 사용할 수 있음
  //     console.log('Selected file:', selectedFile);
  //    -선택한 파일을 서버로 업로드 및 처리하는 로직 추가
  //   }
  // };


  const handleToggleButtonText = () => {
    // 이미지 업로드 버튼 텍스트를 변경
    setImageUpload(!isImageUpload);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        // 파일 업로드를 수행하고 서버로 전송
        const formData = new FormData();
        formData.append('image', selectedFile);

        // 실제로는 서버 URL을 설정하고 해당 엔드포인트에 POST 요청을 보내야 합니다.
        const response = await fetch('/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // 업로드 성공
          console.log('이미지 업로드 성공');
          setSelectedFile(null); // 선택한 파일 초기화
        } else {
          console.error('이미지 업로드 실패');
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    }
  };


  return (
    <Modal 
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='ModalClose'>
      <div className='ImageBtn'>
          <button
            id="ImageUploadTab"
            className={`ImageUploadTab ${isImageUpload ? '' : 'hidden'}`}
          >
            업로드
          </button>
          <button
            id="ImageSearchTab"
            className={`ImageSearchTab ${isImageUpload ? 'hidden' : ''}`}
            onClick={handleToggleButtonText}
          >
            이미지 검색
          </button>
        </div>
      </Modal.Header>
      <Modal.Body className='ModalBody'>      
      <img className='UploadMLogo' src={ssurveyLogo}/>
      {isImageUpload ? (
          <button type="text" className="UploadBtn">이미지 업로드</button>
        ) : (
          <button type="text" className="SearchBtn">이미지 검색</button>
        )}
      </Modal.Body>

    </Modal>
  );
}



export default ImageModal;