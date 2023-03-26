import React from "react";
import { useLoading } from "./context";
import "./loading.css";

const FullScreenLoader: React.FC = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && (
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      )}
    </>
  );
};

export default FullScreenLoader;
