import React, { memo } from "react";
import QRCode from "react-qr-code";

const CertificateVerify = ({ certificate }) => {
  return (
    <div className="pb-4 row certificate-verify">
      <div className="col-sm-4" style={{ marginTop: "160px" }}>
        <div>সনদ যাচাই:</div>
        {/* <div>ক) 01XXX-XXXXXX, 01XXX-XXXXXX নাম্বারে মেসেজ পাঠান।</div> */}
        <div>ক) ভিজিট করুন: http://54.175.135.201/verify</div>
        <div>খ) কোড স্ক্যান করুন</div>
      </div>
      <div
        className="col-sm-3 text-end"
        style={{ marginTop: "160px", position: "relative" }}
      >
        <div
          style={{
            paddingTop: "30px",
            height: "auto",
            margin: "0 auto",
            maxWidth: 64,
            width: "100%",
            textAlign: "center",
          }}
          className="qr-code"
        >
          <QRCode
            size={256}
            style={{
              height: "auto",
              maxWidth: "100%",
              width: "100%",
              textAlign: "center",
            }}
            value={certificate?.certificateNo}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
      <div className="col-sm-5 text-end chairman-area">
        <div className="chairman-info">
          <div className="mb-3">_______________________________</div>
          <div style={{ fontSize: "16px", fontWeight: "bolder" }}>
            {certificate?.union?.chairman}
          </div>
          <div>
            <strong>চেয়ারম্যান</strong>
          </div>
          <div>{certificate?.union?.name}</div>
          <div>
            {certificate?.union?.thana}, {certificate?.union?.zilla}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CertificateVerify);
