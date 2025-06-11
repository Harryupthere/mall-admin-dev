import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { errorMsg, successMsg } from "../../utils/customFn";
import "./roles.scss";

const RolesForm = () => {
    const { fetchData } = useApiRequest()

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
    status: "active",
  });

  const [allPermissions, setAllPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPermissions();
    if (isEditMode) {
      getDetailsById();
    }
  }, [id]);

  const fetchPermissions = async () => {
    try {
      const res = await fetchData(API_ENDPOINTS.getPermissions, navigate, "GET");
      if (res?.success) {
        setAllPermissions(res.data);
      }
    } catch (error) {
      console.log("Error fetching permissions:", error);
    }
  };

  const getDetailsById = async () => {
    try {
      const res = await fetchData(`${API_ENDPOINTS.getRoles}?id=${id}`, navigate, "GET");
      console.log(res.data)
      if (res?.success) {
        setFormData({
          name: res.data[0].name,
          description: res.data[0].description,
          permissions: res.data[0].permissions || [],
          status: res.data[0].status || "active",
        });
      }
    } catch (error) {
      console.log("Error fetching role details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPermission = (perm) => {
    setFormData((prev) => ({
      ...prev,
      permissions: [...prev.permissions, perm],
    }));
  };

  const removePermission = (permId) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.filter((p) => p.id !== permId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      description: formData.description,
      permissionIds: formData.permissions.map((p) => p.id),
    };

    if (isEditMode) {
      payload.status = formData.status;
    }

    const apiEndpoint = isEditMode ? `${API_ENDPOINTS.updateRole}/${id}` : API_ENDPOINTS.createRole;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetchData(apiEndpoint, navigate, method, payload);
      if (res?.success) {
        successMsg(`Role ${isEditMode ? "updated" : "created"} successfully`);
           navigate(`${process.env.REACT_APP_BASE_URL}roles`);
      } else {
        errorMsg(res?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedPermissionIds = formData.permissions.map((p) => p.id);
  const availablePermissions = allPermissions.filter(
    (perm) => !selectedPermissionIds.includes(perm.id)
  );

return (
    <div className="trade-form-container">
          <div className="trade-form-card">

      <h2>{isEditMode ? "Edit Role" : "Create Role"}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Role Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter role name"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={3}
          />
        </div>

        {isEditMode && (
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        )}

        <div className="permission-boxes">
          <div className="permissions-column">
            <h4>Selected Permissions</h4>
            {formData.permissions.length > 0 ? (
              formData.permissions.map((perm) => (
                <div key={perm.id} className="permission-item">
                  <span>{perm.name} ({perm.module})</span>
                  <button type="button" onClick={() => removePermission(perm.id)}>Remove</button>
                </div>
              ))
            ) : (
              <p>No permissions selected</p>
            )}
          </div>

          <div className="permissions-column">
            <h4>Available Permissions</h4>
            {availablePermissions.length > 0 ? (
              availablePermissions.map((perm) => (
                <div key={perm.id} className="permission-item">
                  <span>{perm.name} ({perm.module})</span>
                  <button type="button" onClick={() => addPermission(perm)}>Add</button>
                </div>
              ))
            ) : (
              <p>All permissions selected</p>
            )}
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Role" : "Create Role")}
        </button>
      </form>
    </div>
    </div>

  );
};

export default RolesForm;
