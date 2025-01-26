import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { getCurrentDate } from "../../../utils/helpers";
import ReactDatePicker from "react-datepicker";

const KhamariCertificate = ({
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
  const applicantName = watch("details.applicantName");
  const fathersName = watch("details.fathersName");
  const mothersName = watch("details.mothersName");
  const applicantAddress = watch("details.applicantAddress");
  const nid = watch("details.nid");
  const birthCertificateNo = watch("details.birthCertificateNo");

  useEffect(() => {
    setValue("issueDate", issueDate ? issueDate : new Date());
  }, []);

  return (
    <>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
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
        <Col md="4" className="position-relative">
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
        <Col md="4" className="position-relative">
          <Label>আবেদনকারীর নাম:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.applicantName ? "is-invalid" : ""}`}
            {...register("details.applicantName", { required: true })}
            defaultValue={applicantName}
            onChange={(e) => {
              setValue("details.applicantName", e.target.value);
            }}
          />
          {errors?.details?.applicantName && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label>পিতার নাম:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.fathersName ? "is-invalid" : ""}`}
            {...register("details.fathersName", { required: true })}
            defaultValue={fathersName}
            onChange={(e) => {
              setValue("details.fathersName", e.target.value);
            }}
          />
          {errors?.details?.fathersName && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>মাতার নাম:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.mothersName ? "is-invalid" : ""}`}
            {...register("details.mothersName", { required: true })}
            defaultValue={mothersName}
            onChange={(e) => {
              setValue("details.mothersName", e.target.value);
            }}
          />
          {errors?.details?.mothersName && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label style={{ paddingRight: "6px" }}>
            <input
              type="radio"
              className="mr-2"
              name="isNid"
              checked={isNid === false}
              onChange={(e) => setIsNid(false)}
            />{" "}
            জন্ম নিবন্ধন নম্বর{" "}
          </Label>
          <Label style={{ paddingLeft: "6px" }}>
            <input
              type="radio"
              name="isNid"
              checked={isNid === true}
              onChange={(e) => setIsNid(true)}
            />{" "}
            জাতীয় পরিচয় পত্র নম্বর
          </Label>
          {!isNid && (
            <>
              <Input
                bsSize="sm"
                type="text"
                placeholder=" জন্ম নিবন্ধন নম্বর"
                className={`${
                  errors?.details?.birthCertificateNo ? "is-invalid" : ""
                }`}
                {...register("details.birthCertificateNo", {})}
                defaultValue={birthCertificateNo}
                onChange={(e) => {
                  setValue("details.birthCertificateNo", e.target.value);
                }}
              />
              {errors?.details?.birthCertificateNo && (
                <span className="error-msg">This field is required</span>
              )}
            </>
          )}
          {isNid && (
            <>
              <Input
                bsSize="sm"
                type="text"
                placeholder="জাতীয় পরিচয় পত্র নম্বর"
                className={`${errors?.details?.nid ? "is-invalid" : ""}`}
                {...register("details.nid", {})}
                defaultValue={nid}
                onChange={(e) => {
                  setValue("details.nid", e.target.value);
                }}
              />
              {errors?.details?.nid && (
                <span className="error-msg">This field is required</span>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs="12">
          <Label>স্থায়ী ঠিকানা:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${
              errors?.details?.applicantAddress ? "is-invalid" : ""
            }`}
            {...register("details.applicantAddress", { required: true })}
            defaultValue={applicantAddress}
            onChange={(e) => {
              setValue("details.applicantAddress", e.target.value);
            }}
          />
          {errors?.details?.applicantAddress && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
    </>
  );
};

export default KhamariCertificate;
