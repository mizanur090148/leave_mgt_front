import { useSelector } from "react-redux";
import { Card, CardBody, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { capitalizeFirst } from "../../../utils/helpers";
import moment from "moment";

type HeadProps = {
  title?: string;
  totalHeadIncome?: any;
};

const UserDetailsInformation = ({ title, totalHeadIncome }: HeadProps) => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const rawAssessmentYear = sessionStorage.getItem("assessmentYear");
  const assessmentYear = rawAssessmentYear ? JSON.parse(rawAssessmentYear) : null;
  return (
    <Card className="profile-right">
      <CardBody className="top-summary">
        <Row>
          <Col md="3">
            <div className="val">{userInfo?.user_detail?.full_name}</div>
            <div className="title">Name</div>
          </Col>
          <Col md="3">
            <div className="val">{userInfo?.user_detail?.etin_number}</div>
            <div className="title">ETIN</div>
          </Col>
          <Col md="3">
            <div className="val">Total Income</div>
            <div className="title">Total Income</div>
          </Col>
          {/*<Col md="3">
            <div className="val">{`${moment()
              .subtract(1, "year")
              .format("YYYY")}-${moment().format("YY")}`}</div>
            <div className="title">Income Year</div>
          </Col>*/}
          <Col md="3">
            <div className="val">{assessmentYear?.name}</div>
            <div className="title">Income Year</div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm="6" md="3">
            <div className="val">
              {capitalizeFirst(userInfo?.user_detail?.profession)}
            </div>
            <div className="title">Profession</div>
          </Col>
          <Col sm="6" md="3">
            <div className="val">
              {totalHeadIncome !== 0 ? totalHeadIncome : ""}
            </div>
            <div className="title">{title}</div>
          </Col>
          <Col sm="6" md="3">
            <div className="val">Total Tax</div>
            <div className="title">Total Tax</div>
          </Col>
          <Col sm="6" md="3">
            <div className="val">{assessmentYear?.name}</div>
            <div className="title">Assessment Year</div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserDetailsInformation;
