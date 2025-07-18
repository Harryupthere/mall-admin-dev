import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { errorMsg, successMsg } from "../../utils/customFn";
import "./permissions.scss";

const PermissionsForm = () => {
  const navigate = useNavigate();
  const { fetchData } = useApiRequest();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    module: "",
    status: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) getDetailsById();
  }, [id]);

  const getDetailsById = async () => {
    try {
      const res = await fetchData(`${API_ENDPOINTS.getPermissions}?id=${id}`, navigate, "GET");
      if (res?.success) {
        const data = res.data[0];
        setFormData({
          name: data.name || "",
          module: data.module || "",
          status: data.status || "",
        });
      }
    } catch (error) {
      console.log("Error fetching account type details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const requiredFields = isEditMode?["name", "module", "status"]:["name", "module"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      } 
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData
    };

    const endpoint = isEditMode
      ? `${API_ENDPOINTS.updatePermission}/${id}`
      : API_ENDPOINTS.createPermisson;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetchData(endpoint, navigate, method, payload);
      if (res?.success) {
        successMsg(res.message);
        navigate(`${process.env.REACT_APP_BASE_URL}permissions`);
      } else {
        errorMsg(res?.message || "Something went wrong.");
      }
    } catch (error) {
      console.log("Submission Error:", error);
      errorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className="trade-form-container">
      <div className="trade-form-card">
        <h2>{isEditMode ? "Edit Permission" : "Add Permission"}</h2>
        <form onSubmit={handleSubmit} className="trade-form-grid">
    {["name", "module", "status"].map((field) => (
  <div key={field} className="form-group">
    <label>{field.replace("_", " ").toUpperCase()}</label>
    
    {field === "status" ? (
      <select
        name={field}
        value={formData[field]}
        onChange={handleChange}
        className={errors[field] ? "input-error" : ""}
      >
        <option value="">Select Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    ) : (
      <input
        type="text"
        name={field}
        value={formData[field]}
        onChange={handleChange}
        className={errors[field] ? "input-error" : ""}
      />
    )}
    
    {errors[field] && <span className="error-text">{errors[field]}</span>}
  </div>
))}


          <div className="form-actions full-width">
            <button type="submit" className="submit-btn">
              {isEditMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionsForm;
