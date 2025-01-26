import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { patchRequest } from "../../../utils/axiosRequests";
import { Btn } from "../../../AbstractElements";

interface UnionInputs {
  initialCodes: {
    citizenship: string;
    character: string;
    trade_licence: string;
    inheritance: string;
    death: string;
    unemployment: string;
    unmarried: string;
    married: string;
    certification: string;
    widow: string;
    new_voter: string;
    voter_transfer: string;
    parent_permission: string;
    monthly_income: string;
    yearly_income: string;
    non_objection: string;
    farm_worker: string;
    voter_correction: string;
    marriage_without_dowry: string;
  };
}

const CertificateSettingsForm = () => {
  const location = useLocation();
  const union = location?.state?.union;
  const unionId = union?.id;
  const [initialCodes, setInitialCodes] = useState(union.initialCodes);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UnionInputs>({ defaultValues: union });

  const onSubmit: SubmitHandler<UnionInputs> = (initialCodesData: any) => {
    patchRequest(`settings/unions/${unionId}`, {
      ...union,
      ...initialCodesData,
    })
      .then((res) => {
        toast.success("Successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-2">
        <Col md="4" className="position-relative">
          <Label>নাগরিকত্ব সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            defaultValue={initialCodes?.citizenship}
            className={`${
              errors?.initialCodes?.citizenship ? "is-invalid" : ""
            }`}
            {...register("initialCodes.citizenship", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.citizenship", e.target.value);
            }}
          />
          {errors?.initialCodes?.citizenship && (
            <span className="error-msg">
              {errors?.initialCodes?.citizenship?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>চারিত্রিক সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${errors?.initialCodes?.character ? "is-invalid" : ""}`}
            defaultValue={initialCodes?.character}
            {...register("initialCodes.character", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.character", e.target.value);
            }}
          />
          {errors?.initialCodes?.character && (
            <span className="error-msg">
              {errors?.initialCodes?.character?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>ট্রেড লাইসেন্স:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.trade_licence ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.trade_licence}
            {...register("initialCodes.trade_licence", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.trade_licence", e.target.value);
            }}
          />
          {errors?.initialCodes?.trade_licence && (
            <span className="error-msg">
              {errors?.initialCodes?.trade_licence?.message}
            </span>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md="4" className="position-relative">
          <Label>উত্তরাধিকার সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.inheritance ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.inheritance}
            {...register("initialCodes.inheritance", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.inheritance", e.target.value);
            }}
          />
          {errors?.initialCodes?.inheritance && (
            <span className="error-msg">
              {errors?.initialCodes?.inheritance?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>মৃত্যু সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${errors?.initialCodes?.death ? "is-invalid" : ""}`}
            defaultValue={initialCodes?.death}
            {...register("initialCodes.death", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.death", e.target.value);
            }}
          />
          {errors?.initialCodes?.death && (
            <span className="error-msg">
              {errors?.initialCodes?.death?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>বেকারত্ব সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.unemployment ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.unemployment}
            {...register("initialCodes.unemployment", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.unemployment", e.target.value);
            }}
          />
          {errors?.initialCodes?.unemployment && (
            <span className="error-msg">
              {errors?.initialCodes?.unemployment?.message}
            </span>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md="4" className="position-relative">
          <Label>অবিবাহিত সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${errors?.initialCodes?.unmarried ? "is-invalid" : ""}`}
            defaultValue={initialCodes?.unmarried}
            {...register("initialCodes.unmarried", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.unmarried", e.target.value);
            }}
          />
          {errors?.initialCodes?.unmarried && (
            <span className="error-msg">
              {errors?.initialCodes?.unmarried?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>বিবাহিত সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${errors?.initialCodes?.married ? "is-invalid" : ""}`}
            defaultValue={initialCodes?.married}
            {...register("initialCodes.married", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.married", e.target.value);
            }}
          />
          {errors?.initialCodes?.married && (
            <span className="error-msg">
              {errors?.initialCodes?.married?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>প্রত্যয়ন পত্র:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.certification ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.certification}
            {...register("initialCodes.certification", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.certification", e.target.value);
            }}
          />
          {errors?.initialCodes?.certification && (
            <span className="error-msg">
              {errors?.initialCodes?.certification?.message}
            </span>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md="4" className="position-relative">
          <Label>বিধবা সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${errors?.initialCodes?.widow ? "is-invalid" : ""}`}
            defaultValue={initialCodes?.widow}
            {...register("initialCodes.widow", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.widow", e.target.value);
            }}
          />
          {errors?.initialCodes?.widow && (
            <span className="error-msg">
              {errors?.initialCodes?.widow?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>নতুন ভোটার সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${errors?.initialCodes?.new_voter ? "is-invalid" : ""}`}
            defaultValue={initialCodes?.new_voter}
            {...register("initialCodes.new_voter", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.new_voter", e.target.value);
            }}
          />
          {errors?.initialCodes?.new_voter && (
            <span className="error-msg">
              {errors?.initialCodes?.new_voter?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>ভোটার এলাকা স্থানান্তর সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.voter_transfer ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.voter_transfer}
            {...register("initialCodes.voter_transfer", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.voter_transfer", e.target.value);
            }}
          />
          {errors?.initialCodes?.voter_transfer && (
            <span className="error-msg">
              {errors?.initialCodes?.voter_transfer?.message}
            </span>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md="4" className="position-relative">
          <Label>অভিভাবক সম্মতি সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.parent_permission ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.parent_permission}
            {...register("initialCodes.parent_permission", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.parent_permission", e.target.value);
            }}
          />
          {errors?.initialCodes?.parent_permission && (
            <span className="error-msg">
              {errors?.initialCodes?.parent_permission?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>মাসিক আয়ের সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.monthly_income ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.monthly_income}
            {...register("initialCodes.monthly_income", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.monthly_income", e.target.value);
            }}
          />
          {errors?.initialCodes?.monthly_income && (
            <span className="error-msg">
              {errors?.initialCodes?.monthly_income?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>বার্ষিক আয়ের সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.yearly_income ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.yearly_income}
            {...register("initialCodes.yearly_income", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.yearly_income", e.target.value);
            }}
          />
          {errors?.initialCodes?.yearly_income && (
            <span className="error-msg">
              {errors?.initialCodes?.yearly_income?.message}
            </span>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md="4" className="position-relative">
          <Label>অনাপত্তি পত্র:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.non_objection ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.non_objection}
            {...register("initialCodes.non_objection", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.non_objection", e.target.value);
            }}
          />
          {errors?.initialCodes?.non_objection && (
            <span className="error-msg">
              {errors?.initialCodes?.non_objection?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>খামারি প্রত্যয়ন পত্র:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.farm_worker ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.farm_worker}
            {...register("initialCodes.farm_worker", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.farm_worker", e.target.value);
            }}
          />
          {errors?.initialCodes?.farm_worker && (
            <span className="error-msg">
              {errors?.initialCodes?.farm_worker?.message}
            </span>
          )}
        </Col>
        <Col md="4" className="position-relative">
          <Label>ভোটার সংশোধনের প্রত্যয়ন পত্র:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.voter_correction ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.voter_correction}
            {...register("initialCodes.voter_correction", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.voter_correction", e.target.value);
            }}
          />
          {errors?.initialCodes?.voter_correction && (
            <span className="error-msg">
              {errors?.initialCodes?.voter_correction?.message}
            </span>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md="4" className="position-relative">
          <Label>যৌতুক বিহীন সনদ:</Label>
          <Input
            bsSize="sm"
            type="number"
            className={`${
              errors?.initialCodes?.marriage_without_dowry ? "is-invalid" : ""
            }`}
            defaultValue={initialCodes?.marriage_without_dowry}
            {...register("initialCodes.marriage_without_dowry", {
              maxLength: {
                value: 15,
                message: "Value must not exceed length 15",
              },
            })}
            onChange={(e) => {
              setValue("initialCodes.marriage_without_dowry", e.target.value);
            }}
          />
          {errors?.initialCodes?.marriage_without_dowry && (
            <span className="error-msg">
              {errors?.initialCodes?.marriage_without_dowry?.message}
            </span>
          )}
        </Col>
      </Row>
      <Row className="mt-3 mb-1">
        <Col sm="12" className="text-center">
          <Btn
            size="sm"
            color="primary"
            type="submit"
            onClick={() => handleSubmit(onSubmit)}
          >
            UPDATE
          </Btn>
        </Col>
      </Row>
    </Form>
  );
};

export default CertificateSettingsForm;
