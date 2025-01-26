import { Card, CardBody, Col, Row } from "reactstrap";
import { ticketData } from "../../../../Data/SupportTicket/SupportTicket";
import { H3, Progressbar } from "../../../../AbstractElements";
import CountUp from "react-countup";
import ProfitAndLoss from "./ProfitAndLoss";

const TicketList = () => {
  return (
    <Row>
      {ticketData.map((item: any, index: number) => (
        <Col xl="4" md="6" className="box-col-4" key={index}>
          <Card className="ecommerce-widget">
            <CardBody className="support-ticket-font">
              <Row>
                <Col xs="5">
                  <span>{item.title}</span>
                  <H3 className="total-num counter">
                    <CountUp end={item.num} className="text-dark mb-1" />
                  </H3>
                </Col>
                <ProfitAndLoss />
              </Row>
              <div className="progress-showcase mt-3">
                <Progressbar
                  color={item.class}
                  value={70}
                  style={{ height: "8px" }}
                ></Progressbar>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TicketList;
