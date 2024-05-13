import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { GrUploadOption } from "react-icons/gr";
import { ImCross } from "react-icons/im";

const AddCandidate = () => {
  // State variables to manage file selection and success/error messages
  const [file, setFile] = useState(null); // Holds the selected file object
  const [showSuccess, setShowSuccess] = useState(false); // Flag for success message visibility
  const [errorMessage, setErrorMessage] = useState(""); // Holds the error message

  // Function to handle file selection changes
  const handleFileChange = (event) => {
    // Update state with the selected file from the event target
    setFile(event.target.files[0]);
  };

  const clickOnCross = () => {
    setShowSuccess(false); // Reset success flag
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const allowedFileTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    // If user tried to upload file other than excel then it show alert.
    if (!allowedFileTypes.includes(file.type)) {
      alert("Please upload a valid Excel file (.xlsx or .xls).");
      return;
    }

    try {
      // Create a new FormData object to hold the file data
      const formData = new FormData();
      formData.append("file", file); // Add the selected file to the form data

      // Make a POST request to the backend API endpoint with the form data
      const response = await axios.post(
        "http://127.0.0.1:5000/importdata",
        formData
      );

      // Log the response data for debugging
      // console.log(response.data);

      // Check if the response indicates success
      if (response.data.success) {
        // Update state to show the success message
        setShowSuccess(true);
        alert(
          `Total Rows: ${response.data.totalRows}\nRows Added: ${response.data.rowsAdded}\nRows Skipped (Duplicate): ${response.data.rowsSkipped}\nRows Not Processed (Model Mismatch or Required Field Missing): ${response.data.rowsNotProcessed}`
        );
      }
    } catch (error) {
      // Handle any errors during file upload
      // console.error("Error uploading file:", error.response.data.msg);
      // Set the error message received from the server
      setErrorMessage(error.response.data.msg);
      // Show the error message as an alert
      alert(error.response.data.msg);
    }
  };

  return (
    <>
      <Container>
        <Title>Add from Excel</Title>
        <Button0 onClick={clickOnCross}>
          <ImCross />
        </Button0>
      </Container>
      <Container1>
        <p>Add Candidates to Database</p>
        <Container2>
          {/* Conditionally render file upload and success/error message */}
          {!showSuccess && (
            <div>
              {/* Hidden file input for selecting the file */}
              <FileInput type="file" id="file" onChange={handleFileChange} />
              <label htmlFor="file">
                <FileUploadContainer>
                  {/* Upload icon */}
                  <FileUploadIcon role="img" aria-label="Upload">
                    <GrUploadOption />
                  </FileUploadIcon>
                  {/* Display the filename or a placeholder if no file selected */}
                  <FileName>
                    {file ? file.name : "Upload a .xlsx or .xls file"}
                  </FileName>
                  {/* Submit button enabled only when a file is selected */}
                  {file && <Button onClick={handleSubmit}>Submit</Button>}
                </FileUploadContainer>
              </label>
            </div>
          )}
          {showSuccess && (
            <SuccessMessage>
              <SuccessTY>Thank You!</SuccessTY>
              <p>✅ File Successfully Uploaded.</p>
              <p>Your records will be processed shortly.</p>
            </SuccessMessage>
          )}
        </Container2>
      </Container1>
    </>
  );
};

export default AddCandidate;

// Styled components...

const Container = styled.div`
  margin-bottom: 40px;
  padding: 0px 10px;
  background-color: #d0c474;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button0 = styled.button`
  background-color: #d0c474;
  font-size: 20px;
  border: none;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const Container1 = styled.div`
  padding: 0 10%;
`;

const Container2 = styled.div`
  align-items: center;
  padding: 10px 0;
  flex-direction: column;
  display: flex;
  border: 1px dotted gray;
  margin: 35px 0px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 9px 17px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileUploadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
`;

const FileUploadIcon = styled.span`
  font-size: 30px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const FileName = styled.span`
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuccessTY = styled.p`
  font-size: 20px;
  margin-bottom: 2px;
  color: green;
  font-weight: bold;
`;
