import { useState } from "react";

function AddPropertyForm() {
  const [propertyName, setPropertyName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Property added", { propertyName, location, price });
  };
  return (
    <div>
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Property Name:
          <input
            type="text"
            name="propertyName"
            onChange={(e) => setPropertyName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}
export default AddPropertyForm;
