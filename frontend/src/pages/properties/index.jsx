import { useProperties } from "../../hooks/useProperties";
import PropertyCard from "../../features/PropertyCard";

export default function PropertiesPage() {
  const { properties, loading, error } = useProperties();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="properties-page">
      <h1>Properties</h1>
      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
