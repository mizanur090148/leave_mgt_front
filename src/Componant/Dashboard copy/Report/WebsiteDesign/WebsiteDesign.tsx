import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { websiteDesignData } from "../../../../Data/Dashboard/ProjectData";
import { Btn, H5, Image, P, Progressbar } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { TaskCompleted } from "../../../../utils/Constant";
import WebsiteDesignRatting from "./WebsiteDesignRatting";

const WebsiteDesign = () => {
  return (
    <>
      {websiteDesignData.map((data: any, i: number) => (
        <Col xl="3" md="6" className={`col-xl-50 ${data.class}`} key={i}>
          <Card>
            <CommonCardHeader
              headClass="card-no-border pb-0"
              title={data.title}
              mainTitle={true}
              firstItem="Weekly"
              secondItem="Monthly"
              thirdItem="Yearly"
            />
            <CardBody className="designer-card">
              <div>
                <div className="d-flex align-items-center gap-2">
                  <div className="flex-shrink-0">
                    <Image
                      src={dynamicImage(`dashboard-2/user/${data.img}`)}
                      alt="user"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <Link to={data.link}>
                      <H5>{data.header}</H5>
                    </Link>
                    <P>{data.email}</P>
                  </div>
                </div>
                <div className="design-button">
                  {data.btn.map((item: any, i: number) => (
                    <Btn
                      className={`bg-light-${item.color} font-${item.color} f-w-500 me-1`}
                      key={i}
                      color=""
                    >
                      {" "}
                      {item.btnName}{" "}
                    </Btn>
                  ))}
                </div>
                <WebsiteDesignRatting data={data} />
                <H5 className="f-w-500 pb-2">
                  {TaskCompleted}: {data.task}/10
                </H5>
                <Progressbar
                  striped
                  animated
                  className={`progress-striped-${data.color} b-r-2`}
                  value={data.value}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default WebsiteDesign;
