import React, { memo } from "react";
import { sonodTitle } from "../../../utils/helpers";

const CertificateTitle = ({ type }) => {
  return <div className="sonod-title mt-1">{sonodTitle(type)}</div>;
};

export default memo(CertificateTitle);
