import React, { useState } from "react";
import { submitProperty } from "../services/propertyService";

const SubmitProperty = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    location: "",
    images: null,
    image_2: null,
    image_3: null,
    image_4: null,
    image_5: null,
    image_6: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const result = await submitProperty(formData);
      console.log("Upload successful:", result);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "300px",
      }}
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
      ></textarea>
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
      />
      <input type="file" name="images" onChange={handleChange} />
      <input type="file" name="image_2" onChange={handleChange} />
      <input type="file" name="image_3" onChange={handleChange} />
      <input type="file" name="image_4" onChange={handleChange} />
      <input type="file" name="image_5" onChange={handleChange} />
      <input type="file" name="image_6" onChange={handleChange} />
      <button type="submit">Submit Property</button>
    </form>
  );
};

export default SubmitProperty;
