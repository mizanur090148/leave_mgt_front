import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { propertyTypes } from "../../../utils/helpers";

type PropertyProps = {
  serial: number;
  item: any;
  handleInput: any;
  deleteAction: any;
  register: any;
  errors: any;
};

const AgriNonAgriPartial = ({
  serial,
  item,
  handleInput,
  deleteAction,
  register,
  errors,
}: PropertyProps) => {
  return (
    <>
      {serial > 0 && <div className="dashed-hr"></div>}
      <Row className="fw-bold">
        <Col>
          <b>
            Property: {serial.toString().padStart(2, "0")} (Type, Location,
            Value)
          </b>
        </Col>
        <Col className="text-end">
          {serial > 0 && (
            <i
              style={{ fontSize: "17px" }}
              className="fa fa-times-circle text-danger del-custom"
              onClick={() => deleteAction(item?.id, serial)}
            ></i>
          )}
        </Col>
      </Row>
      <Row>
        <Col sm="4" md="4">
          <FormGroup>
            <Label>Type Of Property</Label>
            <Input
              style={{ padding: "6px 10px" }}
              type="select"
              bsSize="sm"
              className="form-select select-custom"
              //defaultValue={item?.property_type}
              {...register(`items[${serial}].property_type`, {
                required: "Type of Property is required",
              })}
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
            {errors?.items?.[serial]?.property_type && (
              <span className="error-msg">
                {errors.items[serial].property_type.message}
              </span>
            )}
          </FormGroup>
        </Col>
        <Col sm="4" md="4">
          <FormGroup>
            <Label>Location of Property</Label>
            <Input
              type="text"
              placeholder="Location of Property"
              value={item?.location_of_property}
              {...register(`items[${serial}].location_of_property`, {
                required: "Location of Property is required",
              })}
              onChange={(e) =>
                handleInput(serial, "location_of_property", e.target.value)
              }
            />
            {errors?.items?.[serial]?.location_of_property && (
              <span className="error-msg">
                {errors.items[serial].location_of_property.message}
              </span>
            )}
          </FormGroup>
        </Col>
        <Col sm="4" md="4">
          <FormGroup>
            <Label>Date of Purchase</Label>
            <Input
              type="date"
              placeholder="Date of Purchase"
              defaultValue={item?.date_of_purchase}
              {...register(`items[${serial}].date_of_purchase`, {
                required: "Date of Purchase is required",
              })}
              onChange={(e) =>
                handleInput(serial, "date_of_purchase", e.target.value)
              }
            />
            {errors?.items?.[serial]?.date_of_purchase && (
              <span className="error-msg">
                {errors.items[serial].date_of_purchase.message}
              </span>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm="6" md="4">
          <FormGroup>
            <Label>Size of Property (SFT/Decimal)</Label>
            <Input
              type="text"
              placeholder="Size of Property (Decimal/SFT)"
              defaultValue={item?.size_of_property}
              {...register(`items[${serial}].size_of_property`, {
                required: "Size of Property is required",
              })}
              onChange={(e) =>
                handleInput(serial, "size_of_property", e.target.value)
              }
            />
            {errors?.items?.[serial]?.size_of_property && (
              <span className="error-msg">
                {errors.items[serial].size_of_property.message}
              </span>
            )}
          </FormGroup>
        </Col>
        <Col sm="6" md="4">
          <FormGroup>
            <Label>Net Cost of the Property</Label>
            <Input
              type="number"
              placeholder="Net Cost of the Property"
              defaultValue={item?.net_value_of_property}
              {...register(`items[${serial}].net_value_of_property`, {
                required: "Net Cost of the Property is required",
              })}
              onChange={(e) =>
                handleInput(serial, "net_value_of_property", e.target.value)
              }
            />
            {errors?.items?.[serial]?.net_value_of_property && (
              <span className="error-msg">
                {errors.items[serial].net_value_of_property.message}
              </span>
            )}
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

export default AgriNonAgriPartial;
