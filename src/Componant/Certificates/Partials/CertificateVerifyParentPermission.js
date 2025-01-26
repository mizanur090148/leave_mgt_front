import React, { memo } from "react";
import QRCode from "react-qr-code";

const CertificateVerifyParentPermission = ({ certificate }) => {
  return (
    <>
      <div className="row chairman">
        <div className="col-sm-6" style={{ textAlign: "center" }}>
          <div className="mb-2" style={{ paddingLeft: "30px" }}>
            ________________________________________
          </div>
          অভিভাবকের স্বাক্ষর
        </div>
        <div className="col-sm-6 text-end chairman-area">
          <div className="chairman-info">
            <div className="mb-2">________________________________________</div>
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
      <div className="mb-2 row certificate-verify">
        <div className="col-sm-4">
          <div>সনদ যাচাই:</div>
          <div>ক) ভিজিট করুন: http://3.89.202.132/verify</div>
          <div>খ) কোড স্ক্যান করুন</div>
        </div>
        <div className="col-sm-4">
          <div
            style={{
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
      </div>
    </>
  );
};

export default memo(CertificateVerifyParentPermission);
