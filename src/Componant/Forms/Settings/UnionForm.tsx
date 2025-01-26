import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { patchRequest, postRequest } from "../../../utils/axiosRequests";
import { getStatuses } from "../../../utils/helpers";
import { Btn } from "../../../AbstractElements";

interface UnionInputs {
  name: string;
  chairman: string;
  mobileNo: string;
  email: string;
  thana: string;
  zilla: string;
  status: string;
}

const UnionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const union = location?.state?.union;

  const defaultValues = {
    name: union?.name ?? "",
    chairman: union?.chairman ?? "",
    mobileNo: union?.mobileNo ?? "",
    email: union?.email ?? "",
    thana: union?.thana ?? "",
    zilla: union?.zilla ?? "",
    status: union?.status ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UnionInputs>({ defaultValues });

  const onSubmit: SubmitHandler<UnionInputs> = (inputData: any) => {
    const actionType = union?.id
      ? patchRequest(`settings/unions/${union?.id}`, inputData)
      : postRequest("settings/unions", inputData);

    actionType
      .then((data: any) => {
        toast.success("Successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/settings/unions");
      })
      .catch((error) => {
        console.log("from react query error: ", error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label>ইউনিয়ন নাম:</Label>
          <Input
            bsSize="sm"
            type="text"
            className={`${errors?.name ? "is-invalid" : ""}`}
            defaultValue={defaultValues.name}
            {...register("name", {
              required: true,
              maxLength: 60,
            })}
            onChange={(e) => {
              setValue("name", e.target.value);
            }}
          />
          {errors?.name && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>চেয়ারম্যান:</Label>
          <Input
            bsSize="sm"
            type="text"
            defaultValue={defaultValues.chairman}
            className={`${errors?.chairman ? "is-invalid" : ""}`}
            {...register("chairman", {
              required: true,
              maxLength: 40,
            })}
            onChange={(e) => {
              setValue("chairman", e.target.value);
            }}
          />
          {errors?.chairman && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>মোবাইল:</Label>
          <Input
            bsSize="sm"
            type="text"
            defaultValue={defaultValues.mobileNo}
            className={`${errors?.mobileNo ? "is-invalid" : ""}`}
            {...register("mobileNo", {
              required: true,
              maxLength: 15,
            })}
            onChange={(e) => {
              setValue("mobileNo", e.target.value);
            }}
          />
          {errors?.mobileNo && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label>ই-মেইল:</Label>
          <Input
            bsSize="sm"
            type="text"
            defaultValue={defaultValues.email}
            className={`${errors?.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: true,
              //maxLength: 15,
            })}
            onChange={(e) => {
              setValue("email", e.target.value);
            }}
          />
          {errors?.email && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>থানা:</Label>
          <Input
            bsSize="sm"
            type="text"
            defaultValue={defaultValues.thana}
            className={`${errors?.thana ? "is-invalid" : ""}`}
            {...register("thana", {
              required: true,
              maxLength: 35,
            })}
            onChange={(e) => {
              setValue("thana", e.target.value);
            }}
          />
          {errors?.thana && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>জেলা:</Label>
          <Input
            bsSize="sm"
            type="text"
            defaultValue={defaultValues.zilla}
            className={`${errors?.zilla ? "is-invalid" : ""}`}
            {...register("zilla", {
              required: true,
              maxLength: 35,
            })}
            onChange={(e) => {
              setValue("zilla", e.target.value);
            }}
          />
          {errors?.zilla && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label>স্ট্যাটাস:</Label>
          <Input
            type="select"
            id="type"
            bsSize="sm"
            defaultValue={union?.status}
            value={union?.status}
            {...register("status", { required: true })}
            onChange={(e) => {
              setValue("status", e.target.value);
            }}
          >
            {!union?.status && <option value="">সিলেক্ট সনদ টাইপ</option>}
            {getStatuses().map((data, key) => (
              <option key={key} value={data.id}>
                {data.name}
              </option>
            ))}
          </Input>
          {errors?.status && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
      <Row className="mt-3 mb-1">
        <Col sm="12" className="text-center">
          {/* <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="btn btn-primary text-center"
          >
            Submit
          </button> */}
          <Btn
            color="primary"
            type="submit"
            onClick={() => handleSubmit(onSubmit)}
          >
            Submit
          </Btn>
        </Col>
      </Row>
    </form>
  );
};

export default UnionForm;
