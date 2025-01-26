import React from "react";
import moment from "moment";
import { Row, Col } from "reactstrap";
import parse from "html-react-parser";
import { englishToBanglaNumber } from "../../../utils/helpers";

const ParentPermissionCertificate = ({ certificate }) => {
  console.log(certificate, "djfhfdjgjdf");

  return (
    <>
      <div className="character-sonod left-title">
        <Row className="mt-3 mb-4 certificate-row">
          <Col className="sonod-no">
            সনদ নং: {englishToBanglaNumber(certificate?.certificateNo)}
          </Col>
          <Col className="text-end issue-date">
            ইস্যু তারিখ:{" "}
            {englishToBanglaNumber(
              moment(certificate?.issueDate).format("DD-MM-YYYY")
            )}
          </Col>
        </Row>
      </div>
      <Row className="certificate-note">
        <Col>{parse(certificate?.certificateNote)}</Col>
      </Row>
    </>
  );
};

export default ParentPermissionCertificate;
