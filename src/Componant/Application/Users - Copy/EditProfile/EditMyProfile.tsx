import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Btn, H4, H6, Image, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import {
  Bio,
  Emailaddress,
  MyProfile,
  Password,
  Save,
  Website,
} from "../../../../utils/Constant";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const EditMyProfile = () => {
  return (
    <Col xl="3">
      <Card className="profile-left">
        <CardHeaderCommon title={"Profiles"} tagClass="card-title mb-0" />
        <CardBody>
          <Row className="active">
            <div className="title">Personal Profile</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row>
            <div className="title">Contact Profile</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row>
            <div className="title">ETIN Profile</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row>
            <div className="title">Family Profile</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
          <Row>
            <div className="title">Employment Profile</div>
            <div className="sub-title">Modify your profile data</div>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default EditMyProfile;
