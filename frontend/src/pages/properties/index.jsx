//import { useProperties } from "../../hooks/useProperties";
//import PropertyCard from "../../features/PropertyCard";
import LogoutButton from "../../components/auth/LogoutButton";

import { Link } from "react-router-dom";

export default function PropertiesPage() {
  //const { properties, loading, error } = useProperties();

  //if (loading) return <div>Loading...</div>;
  //if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="properties-page">
      <h1>Properties</h1>
      {/* <div className="property-list">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div> */}
      <LogoutButton /* Logout button to clear session */ />{" "}
    </div>
  );
}
