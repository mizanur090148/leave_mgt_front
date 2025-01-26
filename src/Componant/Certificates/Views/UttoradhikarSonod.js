import React, { memo } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { Row, Col } from "react-bootstrap";
import { englishToBanglaNumber } from "../../utils/helpers";
import CertificateTitle from "./partials/CertificateTitle";

const UttoradhikarSonod = ({ certificate }) => {
  const relationRows =
    certificate?.details?.relatives?.length &&
    certificate?.details?.relatives.map((data, key) => {
      return (
        <tr key={key}>
          <td>{++key}</td>
          <td>{data.name}</td>
          <td>{data?.relationship}</td>
        </tr>
      );
    });

  return (
    <>
      <CertificateTitle type={certificate?.type} />
      <Row className="mt-3 mb-3 certificate-row">
        <Col>সনদ নং: {englishToBanglaNumber(certificate?.certificateNo)}</Col>
        <Col className="text-end issue-date">
          ইস্যু তারিখ:{" "}
          {englishToBanglaNumber(
            moment(certificate?.issueDate).format("DD-MM-YYYY")
          )}
        </Col>
      </Row>
      <Row className="certificate-note">
        <div className="col-sm-12">{parse(certificate?.certificateNote)}</div>
      </Row>
      <div className="row pb-2">
        <div className="col-sm-12">
          <table className="table my-0">
            <thead>
              <tr>
                <th>ক্রমিক নং</th>
                <th>নাম</th>
                <th>সম্পর্ক</th>
              </tr>
            </thead>
            <tbody>{relationRows}</tbody>
          </table>
        </div>
      </div>
      <div className="pb-3 row mb-2">
        <div className="col-sm-12 mt-3">
          আমি মরহুমের বিদেহী আত্মার মাগফিরাত কামনা করছি এবং তাঁর পরিবারের সকলের
          এই দুঃখজনক ক্ষতি ও শোক সহ্য করার জন্য, সর্বশক্তিমান আল্লাহর কাছে দোয়া
          করছি।
        </div>
      </div>
    </>
  );
};

export default memo(UttoradhikarSonod);
