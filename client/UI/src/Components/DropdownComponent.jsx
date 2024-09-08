import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dd.css";

const DropdownComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [relatedValues, setRelatedValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const recommendations = {
    "Database": {
      "MongoDB": "MongoDB Developer",
      "MySQL": "MySQL Developer",
      "PostgreSQL": "PostgreSQL Developer",
    },
    "Programming Language": {
      "Python": "Python Developer",
      "Java": "Java Developer",
      "C": "C Developer",
    },
    "Framework": {
      "React": "React Developer",
      "Angular": "Angular Developer",
      "Vue": "Vue Developer",
    },
    "Cloud Service": {
      "AWS": "AWS Solutions Architect",
      "Azure": "Azure Solutions Architect",
      "Google Cloud": "Google Cloud Architect",
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/dd/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedValue(""); 
    setRecommendation(""); 

    if (category) {
      axios
        .get(`http://localhost:5000/dd/values/${category}`)
        .then((response) => {
          setRelatedValues(response.data);
        })
        .catch((error) => console.error("Error fetching values:", error));
    } else {
      setRelatedValues([]);
    }
  };

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    const categoryRecommendations = recommendations[selectedCategory];
    if (categoryRecommendations) {
      const rec = categoryRecommendations[selectedValue];
      setRecommendation(rec || "No recommendation available for the selected value.");
    } else {
      setRecommendation("No recommendation available for the selected category.");
    }
  };

  return (
    <div className="main">
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Choose Field of Interest</option>
        {categories.map((category) => (
          <option key={category.key} value={category.key}>
            {category.key}
          </option>
        ))}
      </select>
      <select value={selectedValue} onChange={handleValueChange} disabled={!selectedCategory}>
        <option value="">Select Related Value</option>
        {relatedValues.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h3>Recommendation:</h3>
        <p>{recommendation}</p>
      </div>
    </div>
  );
};

export default DropdownComponent;
