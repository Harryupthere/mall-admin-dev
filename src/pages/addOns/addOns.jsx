import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { errorMsg, successMsg } from "../../utils/customFn";
import "./addOns.scss";

const AddOnsForm = () => {
   const navigate = useNavigate();
  const { fetchData } = useApiRequest();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    percentage: "",
    status: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) getCouponById();
  }, [id]);

  const getCouponById = async () => {
    try {
      const res = await fetchData(`${API_ENDPOINTS.getAddOns}?id=${id}`, navigate, "GET");
      if (res?.success) {
        const data = res.data[0];
        setFormData({
          name: data.name || "",
          icon: data.icon || "",
          percentage: data.percentage?.toString() || "",
          status: data.status || ""
        });
      }
    } catch (error) {
      console.error("Failed to fetch coupon:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const requiredFields = ["name", "icon", "percentage", ...(isEditMode ? ["status"] : [])];
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

    const payload = { ...formData };
    const endpoint = isEditMode
      ? `${API_ENDPOINTS.updateAddOns}/${id}`
      : API_ENDPOINTS.createAddOns;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetchData(endpoint, navigate, method, payload);
      if (res?.success) {
        successMsg(res.message);
        navigate(`${process.env.REACT_APP_BASE_URL}coupon-codes`);
      } else {
        errorMsg(res?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting coupon form:", error);
      errorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className="trade-form-container">
      <div className="trade-form-card">
        <h2>{isEditMode ? "Edit Add on" : "Add Add on"}</h2>
        <form onSubmit={handleSubmit} className="trade-form-grid">
          <div className="form-group">
            <label>Coupon Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Icon (Filename)</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className={errors.icon ? "input-error" : ""}
            />
            {errors.icon && <span className="error-text">{errors.icon}</span>}
          </div>

          <div className="form-group">
            <label> Percentage (%)</label>
            <input
              type="number"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              className={errors.percentage ? "input-error" : ""}
            />
            {errors.percentage && <span className="error-text">{errors.percentage}</span>}
          </div>

          {isEditMode && (
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={errors.status ? "input-error" : ""}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && <span className="error-text">{errors.status}</span>}
            </div>
          )}

          <div className="form-actions full-width">
            <button type="submit" className="submit-btn">
              {isEditMode ? "Update Coupon" : "Add Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOnsForm;
