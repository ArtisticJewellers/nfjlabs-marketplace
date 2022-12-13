import React, { useState } from "react";
import { LoadingContext } from "../context/LoadingContext";
import Loading from "../components/Loading/Loading";
export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading: loading,
        showLoading: () => setLoading(true),
        hideLoading: () => setLoading(false),
      }}
    >
      {loading ? <Loading /> : children}
    </LoadingContext.Provider>
  );
}
export default LoadingProvider;
