import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import { Btn } from "../../../AbstractElements";
import {
  getCurrentDate,
  financeYears,
  numberArray,
} from "../../../utils/helpers";
import ReactDatePicker from "react-datepicker";

const CitizenShip = ({
  setValue,
  isNid,
  setIsNid,
  details,
  taxesAndFees,
  setTaxesAndFees,
  financeYear,
  setFinanceYear,
  register,
  watch,
  errors,
  serverError,
}) => {
  const certificateNo = watch("certificateNo");
  const issueDate = watch("issueDate");

  useEffect(() => {
    setValue("issueDate", new Date());
  }, []);

  const handleRow = (action, key) => {
    if (action === "add") {
      setTaxesAndFees([...taxesAndFees, { item: "", amount: "" }]);
    } else {
      setTaxesAndFees(
        taxesAndFees.filter((item: any, index: number) => index !== key)
      );
    }
  };

  const taxAndFeeRows = () => {
    const taxesData =
      details && details?.taxesAndFees ? details.taxesAndFees : taxesAndFees;
    return (
      taxesData?.length &&
      taxesData?.map((data, key) => {
        let count = key;
        return (
          <tr key={key}>
            <td className="text-center">{numberArray[count]}</td>
            <td>
              <Input
                type="text"
                bsSize="sm"
                defaultValue={data?.item}
                onChange={(e) =>
                  handleTaxesAndFees("item", key, e.target.value)
                }
              />
            </td>
            <td style={{ width: "220px" }}>
              <Input
                type="number"
                bsSize="sm"
                defaultValue={data?.amount}
                onChange={(e) =>
                  handleTaxesAndFees("amount", key, e.target.value)
                }
              />
            </td>
            <td className="text-center">
              <i
                className="fa fa-plus-circle custom-icon"
                onClick={() => handleRow("add")}
              ></i>
              {taxesAndFees.length > 1 && (
                <i
                  className="fa fa-times-circle text-danger custom-icon"
                  style={{ paddingLeft: "6px" }}
                  onClick={() => handleRow("delete", key)}
                ></i>
              )}
            </td>
          </tr>
        );
      })
    );
  };

  const handleTaxesAndFees = (filedName, key, val) => {
    taxesAndFees[key][filedName] = val;
    setTaxesAndFees([...taxesAndFees]);
  };

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
          <Label>অর্থ বছর:</Label>
          <Col>
            <Input
              type="select"
              id="type"
              bsSize="sm"
              onChange={(e) => setFinanceYear(e.target.value)}
              defaultValue={financeYear}
            >
              <option value="">সিলেক্ট সনদ টাইপ</option>
              {financeYears.map((data, key) => (
                <option key={key} value={data.id}>
                  {data.name}
                </option>
              ))}
            </Input>
            {errors.details?.birthDate && (
              <span className="error-msg">This field must be a valid date</span>
            )}
          </Col>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label>ব্যবসা প্রতিষ্ঠানের নাম:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.instituteName ? "is-invalid" : ""}`}
            {...register("details.instituteName", { required: true })}
            onChange={(date) => setValue("details.instituteName", date)}
          />
          {errors?.details?.instituteName && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>ব্যবসার ধরন:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.typeOfBusiness ? "is-invalid" : ""}`}
            {...register("details.typeOfBusiness", { required: true })}
            onChange={(e) => {
              setValue("details.typeOfBusiness", e.target.value);
            }}
          />
          {errors?.details?.typeOfBusiness && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>কর অঞ্চল:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.tax_region ? "is-invalid" : ""}`}
            {...register("details.tax_region", { required: true })}
            onChange={(e) => {
              setValue("details.tax_region", e.target.value);
            }}
          />
          {errors?.details?.tax_region && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label>ওয়ার্ড নং:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.ward_no ? "is-invalid" : ""}`}
            {...register("details.ward_no", { required: true })}
            onChange={(e) => {
              setValue("details.ward_no", e.target.value);
            }}
          />
          {errors?.details?.ward_no && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>বৈধতার মেয়াদ:</Label>
          <ReactDatePicker
            className="form-control form-control-sm flatpickr-input"
            {...register("details.validDate", {})}
            //selected={validDate}
            onChange={(date) => setValue("details.validDate", date)}
            dateFormat="dd-MM-yyyy"
          />
          {errors.details?.validDate && (
            <span className="error-msg">This field must be a valid date</span>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label>আবেদনকারীর নাম:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.applicantName ? "is-invalid" : ""}`}
            {...register("details.applicantName", { required: true })}
            onChange={(e) => {
              setValue("details.applicantName", e.target.value);
            }}
          />
          {errors?.details?.applicantName && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>পিতার নাম:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.fathersName ? "is-invalid" : ""}`}
            {...register("details.fathersName", { required: true })}
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
            onChange={(e) => {
              setValue("details.mothersName", e.target.value);
            }}
          />
          {errors?.details?.mothersName && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label>স্বামী/স্ত্রীর নাম (প্রযোজ্য ক্ষেত্রে):</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.husbandOrWife ? "is-invalid" : ""}`}
            {...register("details.husbandOrWife", { required: true })}
            onChange={(e) => {
              setValue("details.husbandOrWife", e.target.value);
            }}
          />
          {errors?.details?.husbandOrWife && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>মোবাইল/টেলিফোন:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.mobileNo ? "is-invalid" : ""}`}
            {...register("details.mobileNo", { required: true })}
            onChange={(e) => {
              setValue("details.mobileNo", e.target.value);
            }}
          />
          {errors?.details?.mobileNo && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>ই-মেইল:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.email ? "is-invalid" : ""}`}
            {...register("details.email", { required: true })}
            onChange={(e) => {
              setValue("details.email", e.target.value);
            }}
          />
          {errors?.details?.email && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label> জাতীয় পরিচয় পত্র নম্বর/পাসপোর্ট নম্বর:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${
              errors?.details?.nid_passport_birth_reg_no ? "is-invalid" : ""
            }`}
            {...register("details.nid_passport_birth_reg_no", {
              required: true,
            })}
            onChange={(e) => {
              setValue("details.nid_passport_birth_reg_no", e.target.value);
            }}
          />
          {errors?.details?.nid_passport_birth_reg_no && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label> ই-টিন:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.details?.tin ? "is-invalid" : ""}`}
            {...register("details.tin", { required: true })}
            onChange={(e) => {
              setValue("details.tin", e.target.value);
            }}
          />
          {errors?.details?.tin && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Label>প্রতিষ্ঠানের ঠিকানা:</Label>
          <Input
            bsSize="sm"
            type="textarea"
            className={`${
              errors?.details?.instituteAddress ? "is-invalid" : ""
            }`}
            {...register("details.instituteAddress", { required: true })}
            onChange={(e) => {
              setValue("details.instituteAddress", e.target.value);
            }}
          />
          {errors?.details?.instituteAddress && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col>
          <Col>
            <Label>আবেদনকারীর বর্তমান ঠিকানা:</Label>
            <Input
              bsSize="sm"
              type="textarea"
              className={`${
                errors?.details?.presentAddress ? "is-invalid" : ""
              }`}
              {...register("details.presentAddress", { required: true })}
              onChange={(e) => {
                setValue("details.presentAddress", e.target.value);
              }}
            />
            {errors?.details?.presentAddress && (
              <span className="error-msg">This field is required</span>
            )}
          </Col>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Label>আবেদনকারীর স্থায়ী ঠিকানা:</Label>
          <Input
            bsSize="sm"
            type="textarea"
            className={`${
              errors?.details?.permanentAddress ? "is-invalid" : ""
            }`}
            {...register("details.permanentAddress", { required: true })}
            onChange={(e) => {
              setValue("details.permanentAddress", e.target.value);
            }}
          />
          {errors?.details?.permanentAddress && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col>
          <Col>
            <Label>মূলধন:</Label>
            <Input
              bsSize="sm"
              type="number"
              className={`${
                errors?.details?.presentAddress ? "is-invalid" : ""
              }`}
              //defaultValue={details?.capital}
              {...register("details.capital", {
                required: true,
                maxLength: {
                  value: 200,
                  message: "Maximum length is 30 characters",
                },
              })}
              onChange={(e) => {
                setValue("details.presentAddress", e.target.value);
              }}
            />
            {errors?.details?.presentAddress && (
              <span className="error-msg">This field is required</span>
            )}
          </Col>
        </Col>
      </Row>
      <Row className="mb-3">
        <Label>ফি ও করের পরিমান:</Label>
        <div className="col-sm-12">
          <table className="table my-0">
            <thead>
              <tr className="fw-bold">
                <th style={{ width: "90px" }}>ক্রমিক নং</th>
                <th>আইটেমের নাম</th>
                <th>পরিমান</th>
                <th className="text-center">#</th>
              </tr>
            </thead>
            <tbody>{taxAndFeeRows()}</tbody>
          </table>
        </div>
      </Row>
    </>
  );
};

export default CitizenShip;
