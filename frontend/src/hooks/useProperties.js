import { useEffect, useState } from "react";
import { getProperties } from "../services/propertyService";

export function useProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
}
