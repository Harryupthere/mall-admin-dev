import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import "./TradeForm.scss";
import { errorMsg, successMsg } from "../../utils/customFn";

const TradeForm = () => {
  const navigate = useNavigate();
  const { fetchData } = useApiRequest();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    symbol: "",
    lot_size: "",
    stop_loss: "",
    take_profit: "",
    pips: "",
    trade_date: "",
    trading_account_type: "",
  });

  const [accountTypes, setAccountTypes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) getTradeDetails();
    getAccountTypes(); // fetch dropdown options
  }, [id]);

  const getAccountTypes = async () => {
    try {
      const res = await fetchData(API_ENDPOINTS.getTradingAccountTypes, navigate, "GET");
      if (res?.success) {
        setAccountTypes(res.data); // assuming res.data is an array of { id, name }
      }
    } catch (error) {
      console.log("Error fetching account types:", error);
    }
  };

  const getTradeDetails = async () => {
    try {
      const res = await fetchData(`${API_ENDPOINTS.getTrades}?id=${id}`, navigate, "GET");
      if (res?.success) {
        const data = res.data[0];

        setFormData({
          symbol: data.symbol,
          lot_size: data.lot_size,
          stop_loss: data.stop_loss,
          take_profit: data.take_profit,
          pips: data.pips,
          trade_date: data.trade_date?.slice(0, 16),
          trading_account_type: data.trading_account_type,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "trading_account_type" ? parseInt(value) : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "symbol", "lot_size", "stop_loss", "take_profit", "pips", "trade_date", "trading_account_type"
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (isNaN(formData.lot_size)) newErrors.lot_size = "Must be a number";
    if (isNaN(formData.stop_loss)) newErrors.stop_loss = "Must be a number";
    if (isNaN(formData.take_profit)) newErrors.take_profit = "Must be a number";
    if (isNaN(formData.pips)) newErrors.pips = "Must be a number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      lot_size: parseFloat(formData.lot_size),
      stop_loss: parseFloat(formData.stop_loss),
      take_profit: parseFloat(formData.take_profit),
      pips: parseInt(formData.pips),
      trading_account_type: parseInt(formData.trading_account_type),
    };

    const endpoint = isEditMode ? `${API_ENDPOINTS.updateTrade}/${id}` : API_ENDPOINTS.createTrade;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetchData(endpoint, navigate, method, payload);
      if (res?.success) {
        successMsg(isEditMode ? "Trade updated successfully!" : "Trade created successfully!");
        navigate(`${process.env.REACT_APP_BASE_URL}trade-list`);
      }else{
        errorMsg(res?.message)
      }
    } catch (error) {
      console.log(error);
        errorMsg(error)

    }
  };

  return (
    <div className="trade-form-container">
      <div className="trade-form-card">
        <h2>{isEditMode ? "Edit Trade" : "Add Trade"}</h2>
        <form onSubmit={handleSubmit} className="trade-form-grid">
          {["symbol", "lot_size", "stop_loss", "take_profit", "pips"].map((field) => (
            <div key={field} className="form-group">
              <label>{field.replace("_", " ").toUpperCase()}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={errors[field] ? "input-error" : ""}
              />
              {errors[field] && <span className="error-text">{errors[field]}</span>}
            </div>
          ))}

          <div className="form-group">
            <label>TRADING ACCOUNT TYPE</label>
            <select
              name="trading_account_type"
              value={formData.trading_account_type}
              onChange={handleChange}
              className={errors.trading_account_type ? "input-error" : ""}
            >
              <option value="">Select Account Type</option>
              {accountTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.trading_account_type && (
              <span className="error-text">{errors.trading_account_type}</span>
            )}
          </div>

          <div className="form-group full-width">
            <label>Trade Date</label>
            <input
              type="datetime-local"
              name="trade_date"
              value={formData.trade_date}
              onChange={handleChange}
              className={errors.trade_date ? "input-error" : ""}
            />
            {errors.trade_date && <span className="error-text">{errors.trade_date}</span>}
          </div>

          <div className="form-actions full-width">
            <button type="submit" className="submit-btn">
              {isEditMode ? "Update Trade" : "Add Trade"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradeForm;
