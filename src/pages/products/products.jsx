import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { errorMsg, successMsg } from "../../utils/customFn";
import "./products.scss";

const ProductsForm = () => {

  const navigate = useNavigate();
  const { fetchData } = useApiRequest();
  const { id } = useParams();
  const isEditMode = !!id;

  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [types, setTypes] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    overview: "",
    category_id: "",
    type_id: "",
    level: "",
    price: "",
    descount_percentage: "",
    show_language: "",
    preview_image: "",
    main_image: "",
    link: "",
    preview_link: "",
    instructor_type: "",
    format: "",
    primary_color: "",
    secondary_color: "",
    plan_included: "",
    keywords: "",
    includes: "",
    languages: "",
    instructor: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    callApi()
    if (isEditMode) getDetailsById();
  }, [id]);

  const getDetailsById = async () => {
    try {
      const res = await fetchData(`${API_ENDPOINTS.getProduct}?id=${id}`, navigate, "GET");
      if (res?.success) {
        const data = res.data[0];
        setFormData({
          name: data.name || "",
          description: data.description || "",
          overview: data.overview || "",
          category_id: data.category_id || "",
          type_id: data.type_id || "",
          level: data.level || "",
          price: data.price || "",
          descount_percentage: data.descount_percentage || "",
          show_language: data.show_language || "",
          preview_image: data.preview_image || "",
          main_image: data.main_image || "",
          link: data.link || "",
          preview_link: data.preview_link || "",
          instructor_type: data.instructor_type || "",
          format: data.format || "",
          primary_color: data.primary_color || "",
          secondary_color: data.secondary_color || "",
          plan_included: data.plan_included || "",
          keywords: data.keywords || "",
          includes: data.includes || "",
          languages: data.languages || "",
          instructor: data.instructor || ""
        });
      }


    } catch (error) {
      console.log("Error fetching products details:", error);
    }
  };

  const callApi = async () => {
    try {
      const resCategories = await fetchData(API_ENDPOINTS.getProductCategory, navigate, "GET");
      const resLevels = await fetchData(API_ENDPOINTS.getProductLevel, navigate, "GET");
      const resTypes = await fetchData(API_ENDPOINTS.getProductTypes, navigate, "GET");

      if (resCategories.success) setCategories(resCategories.data);
      if (resLevels.success) setLevels(resLevels.data);
      if (resTypes.success) setTypes(resTypes.data);

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const requiredFields = isEditMode
      ? ["name", "description", "overview",
 "category_id",
 "type_id",
 "level",
 "price",
 "descount_percentage",
 "show_language",
 "preview_image",
 "main_image",
 "link",
 "preview_link",
 "instructor_type",
 "format",
 "primary_color",
 "secondary_color",
 "plan_included",
 "keywords",
 "includes",
 "languages",
,"instructor"]
      : ["name", "description", "overview",
 "category_id",
 "type_id",
 "level",
 "price",
 "descount_percentage",
 "show_language",
 "preview_image",
 "main_image",
 "link",
 "preview_link",
 "instructor_type",
 "format",
 "primary_color",
 "secondary_color",
 "plan_included",
 "keywords",
 "includes",
 "languages",
,"instructor","status"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });
console.log(newErrors)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(validate())
    if (!validate()) return;

    const payload = { ...formData };


    const endpoint = isEditMode
      ? `${API_ENDPOINTS.updateProduct}/${id}`
      : API_ENDPOINTS.createProduct;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetchData(endpoint, navigate, method, payload);
      if (res?.success) {
        successMsg(res.message);
        navigate(`${process.env.REACT_APP_BASE_URL}products`);
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
        <h2>{isEditMode ? "Edit Products" : "Add Products"}</h2>
        <form onSubmit={handleSubmit} className="trade-form-grid">
          {["name", "description", "overview",
            "category_id",
            "type_id",
            "level",
            "price",
            "descount_percentage",
            "show_language",
            "preview_image",
            "main_image",
            "link",
            "preview_link",
            "instructor_type",
            "format",
            "primary_color",
            "secondary_color",
            "plan_included",
            "keywords",
            "includes",
            "languages","instructor", isEditMode && "status"]
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
                ) :
                  field === "category_id" ? (
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                      className={errors.category_id ? "input-error" : ""}
                    >
                      <option value="">Select Category</option>
                      {categories.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  )
                    :
                    field === "type_id" ? (
                      <select
                        name="type_id"
                        value={formData.type_id}
                        onChange={handleChange}
                        className={errors.type_id ? "input-error" : ""}
                      >
                        <option value="">Select type</option>
                        {types.map((type) => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    ) :
                      field === "level" ? (
                        <select
                          name="level"
                          value={formData.level}
                          onChange={handleChange}
                          className={errors.level ? "input-error" : ""}
                        >
                          <option value="">Select level</option>
                          {levels.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                          ))}
                        </select>
                      )
                        :
                        (
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

export default ProductsForm;
