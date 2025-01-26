import React, { memo } from "react";
import Barcode from "react-barcode";
import monogramImg from "../../../images/general/bdMonogram.png";
import mujibImg from "../../../images/general/mujib.jpg";
import { useSelector } from "react-redux";

const CertificateHeader = ({ certificate }) => {
  const userInfo = useSelector((state: any) => state.auth.data);

  return (
    <div className="pb-3 row header-row">
      <div className="col-sm-3">
        <Barcode
          value={certificate?.certificateNo}
          width="2"
          height="40"
          format="CODE128"
          displayValue="false"
          fontOptions=""
          font="monospace"
          textAlign="center"
          textPosition="bottom"
          textMargin="2"
          fontSize="20"
          background="#ffffff"
          lineColor="#000000"
          margin="10"
          marginTop="undefined"
          marginBottom="undefined"
          marginLeft="undefined"
          marginRight="undefined"
        />
      </div>
      <div
        className="col-sm-6 union-info"
        style={{ paddingLeft: 0, paddingRight: 0, lineHeight: "1.08rem" }}
      >
        <img src={monogramImg} height="80" width="80" />
        <div className="mt-1">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</div>
        <div>{certificate?.union?.name}</div>
        <div className="font-weight-bold">
          {certificate?.union?.thana}, {certificate?.union?.zilla}
        </div>
        <div>ই-মেইল: {certificate?.union?.email}</div>
        {/* <div>মোবাইল: {certificate?.union?.mobileNo}</div> */}
      </div>
      <div className="col-sm-3 text-end">
        <img src={mujibImg} height="80" width="80" />
      </div>
    </div>
  );
};

export default memo(CertificateHeader);
