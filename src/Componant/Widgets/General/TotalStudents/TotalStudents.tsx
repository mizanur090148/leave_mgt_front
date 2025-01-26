import { Card, CardBody, Col, Row } from "reactstrap";
import { H2, Image, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { totalStudentData } from "../../../../Data/Widgets/GeneralData";

const TotalStudents = () => {
  return (
    <>
      <Col xl="6" md="12" className="proorder-md-1">
        <Row>
          {totalStudentData.map((data: any, i: number) => (
            <Col xl="6" sm="6" key={i}>
              <Card>
                <CardBody className={data.class}>
                  <div className="d-flex gap-2 align-items-end">
                    <div className="flex-grow-1">
                      <H2>{data.student}</H2>
                      <P className="mb-0 text-truncate"> {data.title}</P>
                      <div className="d-flex student-arrow text-truncate">
                        <P className={`mb-0 up-arrow bg-light-${data.color}`}>
                          <i
                            className={`icon-arrow-${data.icon} font-${data.color}`}
                          />
                        </P>
                        <span className={`f-w-500 font-${data.color}`}>
                          {data.percentage}
                        </span>
                        {data.detail}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Image
                        src={dynamicImage(`dashboard-4/icon/${data.image}`)}
                        alt="student"
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
};

export default TotalStudents;
