export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <h2>{property.name}</h2>
      <p>{property.description}</p>
      <p>Price: ${property.price}</p>
      <p>Location: {property.location}</p>
      <button className="btn btn-primary">View Details</button>
    </div>
  );
}
