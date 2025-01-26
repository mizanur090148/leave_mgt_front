import React, { useEffect } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import ReactDatePicker from "react-datepicker";

const ParentPermissionCertificate = ({
  setValue,
  isNid,
  setIsNid,
  isHusband,
  setIsHusband,
  register,
  watch,
  errors,
  serverError,
}) => {
  const certificateNo = watch("certificateNo");
  const issueDate = watch("issueDate");

  useEffect(() => {
    setValue("issueDate", issueDate ? issueDate : new Date());
  }, []);

  return (
    <Row className="mb-3">
      <Col md="6" className="position-relative">
        <Label>সনদ নং:</Label>
        <Input
          type="text"
          bsSize="sm"
          className={`${errors?.certificateNo ? "is-invalid" : ""}`}
          {...register("certificateNo", { required: true })}
          value={certificateNo}
          disabled
        />
        {errors.certificateNo && (
          <span className="error-msg">This field is required</span>
        )}
      </Col>
      <Col md="6" className="position-relative">
        <Label>ইস্যু তারিখ:</Label>
        <ReactDatePicker
          className="form-control form-control-sm flatpickr-input"
          {...register("issueDate", { required: true })}
          selected={issueDate}
          onChange={(date) => setValue("issueDate", date)}
          dateFormat="dd-MM-yyyy"
        />
        {errors.issueDate && (
          <span className="error-msg">This field is required</span>
        )}
      </Col>
    </Row>
  );
};

export default ParentPermissionCertificate;
