import { Card, CardBody, Col, Row } from "reactstrap";
import CommonCardHeader from "../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { H5, Image, LI, P, UL } from "../../../../AbstractElements";
import { upcomingData } from "../../../../Data/Dashboard/DefaultData";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import UpcomingDatePicker from "../../../Dashboard/Default/UpcomingAppointments/UpcomingDatePicker";
import { UpcomingAppointments } from "../../../../utils/Constant";

const UpcomingAppointment = () => {
  return (
    <Col xxl="6" xl="6" className="box-col-6 proorder-xl-7 proorder-md-8">
      <Card>
        <CommonCardHeader
          headClass="card-no-border pb-0"
          title={UpcomingAppointments}
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

export default UpcomingAppointment;
