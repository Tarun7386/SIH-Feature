import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dd.css"
const DropdownComponent = () => {
  const [keys, setKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    // Fetch keys from the backend
    axios
      .get("http://localhost:5000/dd/keys")
      .then((response) => {
        setKeys(response.data);
      })
      .catch((error) => console.error("Error fetching keys:", error));
  }, []);

  const handleChange = (event) => {
    const key = event.target.value;
    setSelectedKey(key);

    
    axios
      .get(`http://localhost:5000/dd/value/${key}`)
      .then((response) => {
        setValue(response.data.value);
      })
      .catch((error) => console.error("Error fetching value:", error));
  };

  return (
    <div className="main">
      <select value={selectedKey} onChange={handleChange}>
        <option value="">Select a key</option>
        {keys.map((item) => (
          <option key={item.key} value={item.key}>
            {item.key}
          </option>
        ))}
      </select>
      <div>
        <h3>Value:</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default DropdownComponent;
