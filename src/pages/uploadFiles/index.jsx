import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { errorMsg, successMsg } from "../../utils/customFn";
import "./uploadFiles.scss";

const UploadFiles = () => {
  const navigate = useNavigate();
  const { fetchData } = useApiRequest();

  const [file, setFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      errorMsg("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetchData(API_ENDPOINTS.uploadFile, navigate, "POST", formData, true);

      if (res?.success) {
        successMsg(res.message || "File uploaded successfully.");
        setUploadedFileUrl(res?.data || "");
      } else {
        errorMsg(res?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      errorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className="trade-form-container">
      <div className="trade-form-card">
        <h2>{"Upload Files"}</h2>
        <form onSubmit={handleSubmit} className="trade-form-grid">
          <div className="form-group">
            <label>File</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-actions full-width">
            <button type="submit" className="submit-btn">
              {"Add"}
            </button>
          </div>
        </form>

        {uploadedFileUrl && (
          <div className="uploaded-file-url">
            <p>Uploaded File URL:</p>
            <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">{uploadedFileUrl}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFiles;
