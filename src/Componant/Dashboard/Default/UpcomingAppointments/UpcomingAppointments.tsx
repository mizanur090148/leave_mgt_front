import { Card, CardBody, Col, Row } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { UpcomingAppointment } from "../../../../utils/Constant";
import { H5, Image, LI, P, UL } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { upcomingData } from "../../../../Data/Dashboard/DefaultData";
import UpcomingDatePicker from "./UpcomingDatePicker";

const UpcomingAppointments = () => {
  return (
    <Col xxl="5" xl="6" className="box-col-6 proorder-xl-7 proorder-md-8">
      <Card>
        <CommonCardHeader
          headClass="card-no-border pb-0"
          title={UpcomingAppointment}
        />
        <CardBody className="appointments relative">
          <Row>
            <Col xs="5">
              <UL className="appointments-user simple-list">
                {upcomingData.map((data: any, i: number) => (
                  <LI className="d-flex align-items-center" key={i}>
                    <div className="flex-shrink-0">
                      <Image
                        src={dynamicImage(`dashboard/user/${data.img}`)}
                        alt="userImage"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <Link to={data.link}>
                        <H5>{data.name}</H5>
                      </Link>
                      <P>
                        {data.date}
                        <span>({data.time})</span>
                      </P>
                    </div>
                  </LI>
                ))}
              </UL>
            </Col>
            <UpcomingDatePicker />
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default UpcomingAppointments;
