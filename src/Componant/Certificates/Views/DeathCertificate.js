import moment from "moment";
import parse from "html-react-parser";
import { Row, Col } from "reactstrap";
import { englishToBanglaNumber } from "../../../utils/helpers";

const DeathCertificate = ({ certificate }) => {
  const { details } = certificate || {};

  return (
    <>
      <div className="character-sonod left-title mb-4">
        <Row className="mt-3 mb-4 certificate-row">
          <Col className="sonod-no">সনদ নং: {certificate?.certificateNo}</Col>
          <Col className="text-end issue-date">
            ইস্যু তারিখ:{" "}
            {englishToBanglaNumber(
              moment(certificate?.issueDate).format("DD-MM-YYYY")
            )}
          </Col>
        </Row>
        <h4 className="pb-2">মৃত্যু বরণকারীর তথ্য:</h4>
        {details?.applicantName && (
          <Row>
            <Col sm={3}>নাম</Col>
            <Col sm={8}>
              : <span>{details?.applicantName}</span>
            </Col>
          </Row>
        )}
        {details?.fathersName && (
          <Row>
            <Col sm={3}>পিতার নাম</Col>
            <Col sm={8}>
              : <span>{details.fathersName}</span>
            </Col>
          </Row>
        )}
        {details?.husbandName && (
          <Row>
            <Col sm={3}>স্বামীর নাম</Col>
            <Col sm={8}>
              : <span>{details.husbandName}</span>
            </Col>
          </Row>
        )}
        {details?.mothersName && (
          <Row>
            <Col sm={3}>মাতার নাম</Col>
            <Col sm={8}>
              : <span>{details.mothersName}</span>
            </Col>
          </Row>
        )}
        {details?.birthCertificateNo && (
          <Row>
            <Col sm={3}>জন্ম নিবন্ধন নম্বর</Col>
            <Col sm={8}>
              : <span>{details.birthCertificateNo}</span>
            </Col>
          </Row>
        )}
        {details?.nid && (
          <Row>
            <Col sm={3}>জাতীয় পরিচয় পত্র নম্বর</Col>
            <Col sm={8}>
              : <span>{details.nid}</span>
            </Col>
          </Row>
        )}
        {details?.applicantAddress && (
          <Row>
            <Col sm={3}>স্থায়ী ঠিকানা</Col>
            <Col sm={8}>
              : <span>{details.applicantAddress}</span>
            </Col>
          </Row>
        )}
      </div>
      <Row className="certificate-note">
        <Col>{parse(certificate?.certificateNote)}</Col>
      </Row>
    </>
  );
};

export default DeathCertificate;
