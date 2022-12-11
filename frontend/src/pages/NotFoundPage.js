import React from "react";
import { TfiFaceSad } from "react-icons/tfi";

export function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-text">
        Error (404) Not Found <TfiFaceSad />
      </h1>
    </div>
  );
}
