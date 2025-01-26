// Loader.tsx
import React from "react";
import { FadeLoader } from "react-spinners";
interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <FadeLoader
      color={"#000000"}
      loading={loading}
      cssOverride={{
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      }}
      height={10}
      width={5}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
