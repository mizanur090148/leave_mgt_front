import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Design3D, Href, SquareDashboard, TaskCompleted, UXDesign, WebsiteDesigns } from "../../../../utils/Constant";
import { Btn, H5, Image, P, Progressbar } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import WebsiteRatting from "./WebsiteRatting";

const WebsiteDesign = () => {
  return (
    <Col xxl="3" xl="4" sm="6">
      <Card>
        <CommonCardHeader headClass="card-no-border pb-0" title={WebsiteDesigns} mainTitle={true} firstItem="Weekly" secondItem="Monthly" thirdItem="Yearly"/>
        <CardBody className="designer-card">
          <div>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <Image src={dynamicImage(`dashboard-2/user/16.png`)} alt="user" />
              </div>
              <div className="flex-grow-1">
                <Link to={Href}>
                  <H5>{SquareDashboard}</H5>
                </Link>
                <P>{"karson123@gmail.com"}</P>
              </div>
            </div>
            <div className="design-button">
              <Btn className="bg-light-primary font-primary f-w-500 me-1" color="">
                {UXDesign}
              </Btn>
              <Btn className="bg-light-secondary font-secondary f-w-500" color="">
                {Design3D}
              </Btn>
            </div>
            <WebsiteRatting />
            <H5 className="f-w-500 pb-2">{TaskCompleted}: 6/10</H5>
            <Progressbar striped animated className="progress-striped-primary" value={50} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default WebsiteDesign;
