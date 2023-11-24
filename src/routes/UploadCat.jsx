import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useCatApi from "../hooks/useCatApi";

const UploadCatContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  margin-bottom: 20px;
`;

const UploadButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: red;
`;

function UploadCat() {
  const navigate = useNavigate();
  const { error, uploadCat } = useCatApi();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }

    const uploadedCat = await uploadCat(file);

    if (!uploadedCat) {
      console.error("Error uploading cat image.");
      return;
    }

    console.log("Image uploaded successfully:", uploadedCat);

    // Redirect or perform other actions after successful upload
    navigate("/");
  };

  return (
    <UploadCatContainer>
      <Heading>Upload Cat Image</Heading>
      <FileInput type="file" onChange={handleFileChange} />
      <UploadButton onClick={handleUpload}>Upload</UploadButton>
      {error && <ErrorText>{error}</ErrorText>}
    </UploadCatContainer>
  );
}

export default UploadCat;
