import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { propertyTypes } from "../../../utils/helpers";

type PropertyProps = {
  serial: number;
  property: any;
  properties: any;
  setProperties: any;
  deleteAction: any;
};

const NonAgricultureLandForm = ({
  serial,
  property,
  properties,
  setProperties,
  deleteAction,
}: PropertyProps) => {
  const handleInput = (key: any, fieldName: string, value: any) => {
    properties[key][fieldName] = value;
    setProperties([...properties]);
  };

  return (
    <>
      {serial > 0 && <div className="dashed-hr"></div>}
      <Row className="fw-bold">
        <Col>
          <b>Property: 01 (Type, Location, Value)</b>
        </Col>
        <Col className="text-end">
          {serial > 0 && (
            <i
              style={{ fontSize: "17px" }}
              className="fa fa-times-circle text-danger del-custom"
              onClick={() => deleteAction(serial)}
            ></i>
          )}
        </Col>
      </Row>
      <Row>
        <Col sm="6" md="4">
          <FormGroup>
            <Label>Type Of Property</Label>
            <Input
              style={{ padding: "6px 10px" }}
              type="select"
              bsSize="sm"
              className="form-select select-custom"
              onChange={(e) =>
                handleInput(serial, "property_type", e.target.value)
              }
            >
              <option value="">Select One</option>
              {propertyTypes().map((data: any, index) => (
                <option key={index} value={data.id}>
                  {data.name}
                </option>
              ))}
            </Input>
            {/* {errors.type && (
                    <span className="error-msg">This field is required</span>
                  )} */}
          </FormGroup>
        </Col>
        <Col sm="6" md="4">
          <FormGroup>
            <Label>Location of Property</Label>
            <Input type="text" placeholder=" Location of Property" />
          </FormGroup>
        </Col>
        <Col sm="6" md="4">
          <FormGroup>
            <Label>Date of Purchase</Label>
            <Input
              type="date"
              placeholder="Date of Purchase"
              onChange={(e) =>
                handleInput(serial, "date_of_purchase", e.target.value)
              }
            />
          </FormGroup>
        </Col>
        <Col sm="6" md="4">
          <FormGroup>
            <Label>Size of Property (Decimal/SFT)</Label>
            <Input type="text" placeholder=" Size of Property (Decimal/SFT)" />
          </FormGroup>
        </Col>
        <Col sm="6" md="4">
          <FormGroup>
            <Label>Total Cost</Label>
            <Input type="text" placeholder=" Total  Cost" />
          </FormGroup>
        </Col>
        <Col sm="6" md="4">
          <FormGroup>
            <Label>Renovation/Development</Label>
            <Input
              type="text"
              placeholder="Renovation/Development"
              onChange={(e) =>
                handleInput(serial, "renovation_deployment", e.target.value)
              }
            />
          </FormGroup>
        </Col>
        <Col sm="6" md="4">
          <FormGroup>
            <Label>Sale of Portion (Decimal/SFT)</Label>
            <Input
              type="text"
              placeholder=" Sale of Portion (Decimal/SFT)"
              onChange={(e) =>
                handleInput(serial, "sale_of_portion", e.target.value)
              }
            />
          </FormGroup>
        </Col>
        <Col sm="6" md="4">
          <FormGroup>
            <Label>Cost of Sale Portion</Label>
            <Input
              type="text"
              placeholder="Cost of Sale Portion"
              onChange={(e) =>
                handleInput(serial, "cost_of_sale_portion", e.target.value)
              }
            />
          </FormGroup>
        </Col>
        <Col sm="6" md="4">
          <FormGroup>
            <Label>Net Cost of the Property</Label>
            <Input type="text" placeholder=" Net Cost of the Property" />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

export default NonAgricultureLandForm;
