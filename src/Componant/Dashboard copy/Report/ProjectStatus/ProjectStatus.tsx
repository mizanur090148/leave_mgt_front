import { Card, CardBody, Col, Row } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { ProjectStatusHeading } from "../../../../utils/Constant";
import { H6, Image, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { projectStatusData } from "../../../../Data/Dashboard/ProjectData";

const ProjectStatus = () => {
  return (
    <Col xl="3" md="6" className="col-xl-40 proorder-md-1">
      <Card>
        <CommonCardHeader
          headClass="card-no-border pb-0"
          title={ProjectStatusHeading}
          mainTitle={true}
          firstItem="Weekly"
          secondItem="Monthly"
          thirdItem="Yearly"
        />
        <CardBody className="project-status-col">
          <Row>
            {projectStatusData.map((data: any, i: number) => (
              <Col xs="6" key={i}>
                <div className={`btn-light1-${data.color} b-r-10`}>
                  <div className={`upcoming-box ${data.class}`}>
                    <div className={`upcoming-icon bg-${data.color}`}>
                      <Image
                        src={dynamicImage(`dashboard-2/svg-icon/${data.img}`)}
                        alt="icons"
                      />
                    </div>
                    <H6>{data.title}</H6>
                    <P>{data.detail}</P>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProjectStatus;
