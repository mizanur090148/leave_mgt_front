import React from "react";
import moment from "moment";
import { Row, Col } from "reactstrap";
import parse from "html-react-parser";
import { englishToBanglaNumber } from "../../../utils/helpers";

const MarrigeWithoutDowryCertificate = ({ certificate }) => {
  const { details } = certificate || {};

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
        <h3>নাগরিক তথ্য:</h3>
        <Row>
          <Col sm={3}>নাম</Col>
          <Col sm={8}>
            : <span>{details?.applicantName}</span>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>পিতার নাম</Col>
          <Col sm={8}>
            : <span>{details?.fathersName}</span>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>মাতার নাম</Col>
          <Col sm={8}>
            : <span>{details?.mothersName}</span>
          </Col>
        </Row>
        {details?.birthDate && (
          <Row>
            <Col sm={3}>জন্ম তারিখ</Col>
            <Col sm={8}>
              :{" "}
              <span>
                {englishToBanglaNumber(
                  moment(details?.birthDate).format("DD-MM-YYYY")
                )}
              </span>
            </Col>
          </Row>
        )}
        {details?.birthCertificateNo && (
          <Row>
            <Col sm={3}>জন্ম নিবন্ধন নম্বর</Col>
            <Col sm={8}>
              : <span>{details?.birthCertificateNo}</span>
            </Col>
          </Row>
        )}
        {details?.nid && (
          <Row>
            <Col sm={3}>জাতীয় পরিচয় পত্র নম্বর</Col>
            <Col sm={8}>
              : <span>{details?.nid}</span>
            </Col>
          </Row>
        )}
        {details?.holdingNo && (
          <Row>
            <Col sm={3}>হোল্ডিং</Col>
            <Col sm={8}>
              : <span>{details?.holdingNo}</span>
            </Col>
          </Row>
        )}
        <Row>
          <Col sm={3}>স্থায়ী ঠিকানা</Col>
          <Col sm={8}>
            : <span>{details?.applicantAddress}</span>
          </Col>
        </Row>
      </div>
      <Row className="certificate-note">
        <Col>{parse(certificate?.certificateNote)}</Col>
      </Row>
    </>
  );
};

export default MarrigeWithoutDowryCertificate;
