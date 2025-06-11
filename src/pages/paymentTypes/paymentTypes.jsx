import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { errorMsg, successMsg } from "../../utils/customFn";
import "./paymentTypes.scss";

const PaymentTypesForm = () => {

  const navigate = useNavigate();
  const { fetchData } = useApiRequest();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    symbol: "",
    icon: "",
    image: "",
    primary_color: "",
    secondary_color: "",
    status: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) getDetailsById();
  }, [id]);

  const getDetailsById = async () => {
    try {
      const res = await fetchData(`${API_ENDPOINTS.getPaymentType}?id=${id}`, navigate, "GET");
      if (res?.success) {
        const data = res.data[0];
        setFormData({
          name: data.name || "",
          description: data.description || "",
          symbol: data.symbol || "",
          icon: data.icon || "",
          image: data.image || "",
          primary_color: data.primary_color || "",
          secondary_color: data.secondary_color || "",
          status: data.status || ""
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
      ? ["name", "description", "symbol", "icon", "image", "primary_color", "secondary_color", "status"]
      : ["name", "description", "symbol", "icon", "image", "primary_color", "secondary_color"];
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
      ? `${API_ENDPOINTS.updatePaymentType}/${id}`
      : API_ENDPOINTS.createPaymentType;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetchData(endpoint, navigate, method, payload);
      if (res?.success) {
        successMsg(res.message);
        navigate(`${process.env.REACT_APP_BASE_URL}payment-types`);
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
        <h2>{isEditMode ? "Edit Payment Type" : "Add Payment Type"}</h2>
        <form onSubmit={handleSubmit} className="trade-form-grid">
          {["name", "description", "symbol", "icon", "image", "primary_color", "secondary_color", isEditMode && "status"]
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

export default PaymentTypesForm;
