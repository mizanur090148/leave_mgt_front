import { Card, CardBody, CardHeader, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { LiveMeetings } from "../../../../utils/Constant";
import LiveMeetingBody from "./LiveMeetingBody";
import { H4, H5, LI, UL } from "../../../../AbstractElements";
import { Link } from "react-router-dom";
import CardHeaderDropDown from "../../../../CommonElements/CommonCardHeader/CardHeaderDropDown";

const LiveMeeting = () => {
  return (
    <Col xl="4" md="6" className="proorder-md-5">
      <Card>
        <CardHeader className="card-no-border pb-0">
          <div className="header-top">
            <H4>{LiveMeetings}</H4>
            <CardHeaderDropDown mainTitle={false} firstItem="Address Selection" secondItem="Geo-Menu" thirdItem="Place Picker" menuTitle={"1pm-2pm"} />
          </div>
        </CardHeader>
        <CardBody className="live-meet">
          <LiveMeetingBody />
          <UL className="simple-list">
            <LI>
              <H5 className="text-truncate">
                <span>Class: </span>Technique of Drawing in One Line
              </H5>
            </LI>
            <LI>
              <H5 className="text-truncate">
                <span>Batch: </span>GDM (2/3)
              </H5>
            </LI>
            <LI>
              <Link to="https://support.pixelstrap.com/ " target="_blank">
                <H5 className="font-primary text-truncate">
                  <span>Class Link: </span>https://support.pixelstrap.com/
                </H5>
              </Link>
            </LI>
          </UL>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LiveMeeting;
