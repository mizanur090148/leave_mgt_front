import { useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { capitalizeFirst } from "../../../../utils/helpers";
import moment from "moment";

type HeadProps = {
  title?: string;
  itemName?: string;
};

const IncomeEntryTop = ({ title, itemName }: HeadProps) => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const incomeData = useSelector((state: any) => state?.pastReturn?.incomeEntryData);
  const assessmentIncomeYear = useSelector((state: any) => state?.pastReturn?.assessmentIncomeYear);

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
            <div className="val">{incomeData?.total}</div>
            <div className="title">Total Income</div>
          </Col>
          <Col md="3">
            <div className="val">{assessmentIncomeYear?.incomeYear}</div>
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
              {itemName ? incomeData[itemName] : ''}
            </div>
            <div className="title">{title}</div>
          </Col>
          <Col sm="6" md="3">
            <div className="val">Total Tax</div>
            <div className="title">Total Tax</div>
          </Col>
          <Col sm="6" md="3">
            <div className="val">{assessmentIncomeYear?.assessmentYear}</div>
            <div className="title">Assessment Year</div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default IncomeEntryTop;
