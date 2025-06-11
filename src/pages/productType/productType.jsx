import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { errorMsg, successMsg } from "../../utils/customFn";
import "./productType.scss";

const ProductTypesForm = () => {

  const navigate = useNavigate();
  const { fetchData } = useApiRequest();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
   
    icon: "",

  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) getDetailsById();
  }, [id]);

  const getDetailsById = async () => {
    try {
      const res = await fetchData(`${API_ENDPOINTS.getProductTypes}?id=${id}`, navigate, "GET");
      if (res?.success) {
        const data = res.data[0];
        setFormData({
          name: data.name || "",
          description: data.description || "",
         
          icon: data.icon || "",
          
        });
      }
    } catch (error) {
      console.log("Error fetching payment type details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const requiredFields = isEditMode
      ? ["name", "description",  "icon"]
      : ["name", "description",  "icon"];
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
      ? `${API_ENDPOINTS.updateProductTypes}/${id}`
      : API_ENDPOINTS.createProductTypes;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetchData(endpoint, navigate, method, payload);
      if (res?.success) {
        successMsg(res.message);
        navigate(`${process.env.REACT_APP_BASE_URL}product-types`);
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
        <h2>{isEditMode ? "Edit Product Type" : "Add Product Type"}</h2>
        <form onSubmit={handleSubmit} className="trade-form-grid">
          {["name", "description",  "icon", isEditMode && "status"]
            .filter(Boolean)
            .map((field) => (
              <div key={field} className="form-group">
                <label>{field.replace(/_/g, " ").toUpperCase()}</label>

                {field === "status" ? (
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

export default ProductTypesForm;
