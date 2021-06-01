import React from 'react';
import styled from 'styled-components';

const Filebox = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%;
height:100%;
.input-file-button{
  width:100%;
  height:40%;
  display:flex;
  justify-content:center;
  align-items:center;
  /* padding:0.5rem 40%; */
  font-size:0.75rem;
  border-radius: 5px;
  border:1.5px solid #DEDEDF;
  cursor: pointer;
  
}
`;
export default function FileUploader({ fileChangeHandler, fileName }) {
  console.log();
  return (
    <Filebox>
      <label className="input-file-button" htmlFor="input-file">
        {fileName === `` ? "(아이콘)사업자 등록증 사진 추가" : `이미지: ${fileName.name}`}
      </label>
      <input type="file" id="input-file" style={{ display: "none" }} onChange={fileChangeHandler} />
    </Filebox>


  );
}
FileUploader.defaultProps = {
  fileName: ``
};
