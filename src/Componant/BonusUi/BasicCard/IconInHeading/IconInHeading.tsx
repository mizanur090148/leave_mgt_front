import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { IconInHeadings } from "../../../../utils/Constant";
import { Image, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { iconInHeadingData } from "../../../../Data/BonusUi/BasicCard/BasicCard";

const IconInHeading = () => {
  const LibraryIcon = () => {
    return <i className="icofont icofont-library me-2"></i>;
  };

  return (
    <Col sm="12" xl="6">
      <Card>
        <CardHeaderCommon title={IconInHeadings} span={iconInHeadingData} icon={<LibraryIcon />} />
        <CardBody>
          <div className="flex-space flex-wrap align-items-center">
            <Image className="tab-img" src={dynamicImage(`blog/img.png`)} alt="profile"/>
            <P>
              <strong>Visit Us: </strong> 2600 Hollywood Blvd,Florida, United
              States- 33020
              <br />
              <strong>Mail Us:</strong>contact@us@gmail.com
              <br />
              <strong>Contact Number: </strong>(954) 357-7760
            </P>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default IconInHeading;
