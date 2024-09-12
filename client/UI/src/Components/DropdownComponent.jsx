import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dd.css";

const DropdownComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [relatedValues, setRelatedValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // New state for the image

  const recommendations = {
    Database: {
      MongoDB: {
        name: "MongoDB Developer",
        image: "https://www.enterprisedb.com/sites/default/files/graphic-postgres-vs-mongo-pr.jpg", // Replace with actual URL
      },
      MySQL: {
        name: "MySQL Developer",
        image: "https://www.datasciencecentral.com/wp-content/uploads/2021/10/growth_mysql-1.png", // Replace with actual URL
      },
      PostgreSQL: {
        name: "PostgreSQL Developer",
        image: "https://th.bing.com/th/id/OIP.iY_zVt4JbBWgeqRLFyPycwHaGr?rs=1&pid=ImgDetMain", // Replace with actual URL
      },
    },
    "Programming Language": {
      Python: {
        name: "Python Developer",
        image: "https://www.peerbits.com/static/ec17a70c3a0f4812446f7db051fa4b17/8e089/factors-python-growth-industry.jpg", // Replace with actual URL
      },
      Java: {
        name: "Java Developer",
        image: "https://lh5.googleusercontent.com/VSyWGH4iZaMO1-Ngn-dXBGgqg-aNeQgI9pXghookF3jrNprsXc7zZRCdZDlcQnl11NyL2kTBzH02LwQmhU9nlmNK_Xqwpp2nnPRkcGk-DgZzhNWW_P9fe2IELXS7MiFH-jYnsZuH869LJWR8-YSmsA", // Replace with actual URL
      },
      C: {
        name: "C Developer",
        image: "https://www.uplers.com/wp-content/uploads/2022/05/most-in-demand-programming-languages-of-2022-403x500.png", // Replace with actual URL
      },
    },
    Framework: {
      React: {
        name: "React Developer",
        image: "https://miro.medium.com/max/1400/1*k1oSlO4Vnqk_nBlL35_k6Q.png", // Replace with actual URL
      },
      Angular: {
        name: "Angular Developer",
        image: "https://www.waybinary.com/wp-content/uploads/2022/02/ANGULAR.jpg", // Replace with actual URL
      },
      Vue: {
        name: "Vue Developer",
        image: "https://www.tatvasoft.com/outsourcing/wp-content/uploads/2021/10/companies-using-vue.jpg", // Replace with actual URL
      },
    },
    "Cloud Service": {
      AWS: {
        name: "AWS Solutions Architect",
        image: "https://insider.ssi-net.com/hubfs/Imported_Blog_Media/SSI-AWS-CloudBlog-1.jpg", // Replace with actual URL
      },
      Azure: {
        name: "Azure Solutions Architect",
        image: "https://abouttmc.com/wp-content/uploads/2021/07/TMC-Azure-Services-Wheel-Technology-Expertise-Business-Experience-1024x536.png", // Replace with actual URL
      },
      "Google Cloud": {
        name: "Google Cloud Architect",
        image: "https://www.futuriom.com/assets/finalgcp.png", // Replace with actual URL
      },
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
    setImageUrl(""); // Reset the image

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
      if (rec) {
        setRecommendation(rec.name);
        setImageUrl(rec.image); // Set the image URL
      } else {
        setRecommendation("No recommendation available for the selected value.");
        setImageUrl(""); // Clear the image if no recommendation
      }
    } else {
      setRecommendation("No recommendation available for the selected category.");
      setImageUrl(""); // Clear the image if no recommendation
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
      <select
        value={selectedValue}
        onChange={handleValueChange}
        disabled={!selectedCategory}
      >
        <option value="">Select Related Value</option>
        {relatedValues.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
      <button className="btn" onClick={handleSubmit}>Submit</button>
      <div>
        <h3>Recommendation:</h3>
        <p>{recommendation}</p>
        {imageUrl && <img src={imageUrl} alt={recommendation} className="recommendation-image" />} {/* Display the image */}
      </div>
    </div>
  );
};

export default DropdownComponent;
