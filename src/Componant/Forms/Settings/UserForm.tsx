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
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../utils/axiosRequests";
import { getStatuses, userTypes } from "../../../utils/helpers";
import { Btn } from "../../../AbstractElements";

interface UserInputs {
  name: string;
  chairman: string;
  mobile: string;
  unionId: string;
  userType: string;
  email: string;
  password: string;
  confirmPassword: string;
  status: string;
}

const UserForm = () => {
  const [type, setType] = useState("");
  const [unions, setUnions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location?.state?.user;

  useEffect(() => {
    getUnios();
  }, []);

  const defaultValues = {
    name: user?.name ?? "",
    chairman: user?.chairman ?? "",
    mobile: user?.mobile ?? "",
    unionId: user?.unionId ?? "",
    userType: user?.userType ?? "",
    email: user?.email ?? "",
    password: user?.password ?? "",
    confirmPassword: user?.confirmPassword ?? "",
    status: user?.status ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserInputs>({ defaultValues });

  const onSubmit: SubmitHandler<UserInputs> = (inputData: any) => {
    console.log(inputData, "inputDatainputData");
    const actionType = user?.id
      ? patchRequest(`settings/users/${user?.id}`, inputData)
      : postRequest("settings/users", inputData);

    actionType
      .then((data: any) => {
        toast.success("Successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/settings/users");
      })
      .catch((error) => {
        console.log("from react query error: ", error.message);
      });
  };

  const getUnios = () => {
    getRequest(`settings/unions`)
      .then((data: any) => {
        setUnions(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label>নাম:</Label>
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
          <Label>মোবাইল:</Label>
          <Input
            bsSize="sm"
            type="text"
            defaultValue={defaultValues.mobile}
            className={`${errors?.mobile ? "is-invalid" : ""}`}
            {...register("mobile", {
              required: true,
              maxLength: 15,
            })}
            onChange={(e) => {
              setValue("mobile", e.target.value);
            }}
          />
          {errors?.mobile && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>ইউনিয়ন:</Label>
          <Input
            type="select"
            id="type"
            bsSize="sm"
            {...register("unionId", { required: true })}
            onChange={(e) => {
              setValue("unionId", e.target.value);
            }}
          >
            <option value="">সিলেক্ট ইউনিয়ন</option>
            {unions.length &&
              unions?.map((data: any, key) => (
                <option key={key} value={data.id}>
                  {data.name}
                </option>
              ))}
          </Input>
          {errors?.unionId && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label>ইউজার টাইপ:</Label>
          <Input
            type="select"
            id="type"
            bsSize="sm"
            defaultValue={user?.userType}
            value={user?.userType}
            {...register("userType", { required: true })}
            onChange={(e) => {
              setValue("userType", e.target.value);
            }}
          >
            {!user?.userType && <option value="">সিলেক্ট টাইপ</option>}
            {userTypes().map((data, key) => (
              <option key={key} value={data.id}>
                {data.name}
              </option>
            ))}
          </Input>
          {errors?.userType && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>স্ট্যাটাস:</Label>
          <Input
            type="select"
            id="type"
            bsSize="sm"
            defaultValue={user?.status}
            value={user?.status}
            {...register("status", { required: true })}
            onChange={(e) => {
              setValue("status", e.target.value);
            }}
          >
            {!user?.status && <option value="">সিলেক্ট টাইপ</option>}
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
      </Row>
      <Row className="mb-3">
        <Col md="4" className="position-relative">
          <Label>পাসওয়ার্ড:</Label>
          <Input
            bsSize="sm"
            type="password"
            className={`${errors?.password ? "is-invalid" : ""}`}
            {...register("password", {
              required: true,
              maxLength: 35,
            })}
            onChange={(e) => {
              setValue("password", e.target.value);
            }}
          />
          {errors?.password && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>কন্ফার্ম পাসওয়ার্ড:</Label>
          <Input
            bsSize="sm"
            type="password"
            className={`${errors?.confirmPassword ? "is-invalid" : ""}`}
            {...register("confirmPassword", {
              required: true,
              maxLength: 35,
            })}
            onChange={(e) => {
              setValue("confirmPassword", e.target.value);
            }}
          />
          {errors?.confirmPassword && (
            <span className="error-msg">This field is required</span>
          )}
        </Col>
      </Row>
      <Row className="mb-3"></Row>
      <Row className="mt-3 mb-1">
        <Col sm="12" className="text-center">
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

export default UserForm;
