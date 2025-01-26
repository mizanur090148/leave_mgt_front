import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";

const PastReturnLeft = ({
  setActiveMenu,
  activeMenu,
}: {
  setActiveMenu: (type: string) => void;
  activeMenu: string;
}) => {
  return (
    <Col xl="3">
      <Card className="settings-left">
        <CardHeaderCommon
          title={"Tax Return Summary"}
          tagClass="card-title mb-0"
        />
        <CardBody>
          <Row
            className={`${activeMenu === "vehicle" && "active"}`}
            onClick={() => setActiveMenu("vehicle")}
          >
            <div className="title">Vehicle Types</div>
          </Row>
          <Row
            className={`${activeMenu === "capacity" && "active"}`}
            onClick={() => setActiveMenu("capacity")}
          >
            <div className="title">Capacities</div>
          </Row>
          <Row
            className={`${
              activeMenu === "non-agriculture-property" && "active"
            }`}
            onClick={() => setActiveMenu("non-agriculture-property")}
          >
            <div className="title">Non Agricultural Properties</div>
          </Row>
          <Row
            className={`${activeMenu === "agriculture-property" && "active"}`}
            onClick={() => setActiveMenu("agriculture-property")}
          >
            <div className="title">Agricultural Properties</div>
          </Row>
          <Row
            className={`${activeMenu === "furniture" && "active"}`}
            onClick={() => setActiveMenu("furniture")}
          >
            <div className="title">Furniture Types</div>
          </Row>
          <Row
            className={`${activeMenu === "jewellery" && "active"}`}
            onClick={() => setActiveMenu("jewellery")}
          >
            <div className="title">Jewellery Types</div>
          </Row>
          <Row
            className={`${activeMenu === "location" && "active"}`}
            onClick={() => setActiveMenu("location")}
          >
            <div className="title">Locations</div>
          </Row>
          <Row
            className={`${activeMenu === "location" && "active"}`}
            onClick={() => setActiveMenu("tax-payer-location")}
          >
            <div className="title">Tax Payer Location</div>
          </Row>
          <Row
            className={`${activeMenu === "circle" && "active"}`}
            onClick={() => setActiveMenu("circle")}
          >
            <div className="title">Circles</div>
          </Row>
          <Row
            className={`${activeMenu === "region" && "active"}`}
            onClick={() => setActiveMenu("region")}
          >
            <div className="title">Regions</div>
          </Row>
          <Row
            className={`${activeMenu === "zone" && "active"}`}
            onClick={() => setActiveMenu("zone")}
          >
            <div className="title">Zones</div>
          </Row>
          <Row
            className={`${activeMenu === "income-year" && "active"}`}
            onClick={() => setActiveMenu("income-year")}
          >
            <div className="title">Income Years</div>
          </Row>
          <Row
            className={`${activeMenu === "assessment-year" && "active"}`}
            onClick={() => setActiveMenu("assessment-year")}
          >
            <div className="title">Assessment Years</div>
          </Row>
          <Row
            className={`${activeMenu === "country" && "active"}`}
            onClick={() => setActiveMenu("country")}
          >
            <div className="title">Countries</div>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PastReturnLeft;
