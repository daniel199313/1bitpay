import React from "react";
import { useLoading } from "./context";
import ClipLoader from "react-spinners/ClipLoader";

const FullScreenLoader: React.FC = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.05)] z-[999]">
          <ClipLoader
            color={"white"}
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
};

export default FullScreenLoader;
