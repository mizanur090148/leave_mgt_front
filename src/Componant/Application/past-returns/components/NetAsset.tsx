import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { patchRequest, postRequest } from "../../../../utils/axiosRequests";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../../Store/Slices/AuthSlice";

import { Btn } from "../../../../AbstractElements";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";
import { CheckMeOut } from "../../../../utils/Constant";
import { useState } from "react";
import PastReturnTop from "./PastReturnTop";

const NetAsset = () => {
  const [isSubmitReturnLastYear, setIsSubmitReturnLastYear] =
    useState<boolean>(false);
  const [isSubmitIT10BLastReturn, setIsSubmitIT10BLastReturn] =
    useState<boolean>(false);
  const [isPreviouslyAssetsLiabilities, setIsPreviouslyAssetsLiabilities] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  let userInfo = useSelector((state: any) => state.auth.data);

  const defaultValues = {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({ defaultValues });

  const onSubmit: SubmitHandler<any> = (inputData) => {
    console.log(inputData, "inputDatainputData");
    patchRequest(`auth/profile-update/${userInfo.id}`, inputData)
      .then((data: any) => {
        const updatedUserInfo = {
          ...userInfo,
          user_detail: {
            ...userInfo.user_detail,
            ...data?.data,
          },
        };
        dispatch(signIn(updatedUserInfo));
        toast.success("Successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        console.log("from react query error: ", error.message);
      });
  };

  return (
    <Col xl="9">
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        <PastReturnTop itemName="" />
        <Card className="profile-right">
          <CardHeaderCommon
            title={"Net Assets As Per Last Return"}
            tagClass={"card-title mb-0"}
          />
          <CardBody>
            <Row className="mb-3"></Row>
            <Row>
              <Col sm="6" md="12">
                <FormGroup>
                  <Label className="d-block" check htmlFor="disabilities-no">
                    Do You Submit Tax Return For Last Income Year?
                  </Label>
                  <Input
                    className="radio_animated"
                    id="disabilities-no"
                    type="radio"
                    value="false"
                    checked={isSubmitReturnLastYear === false}
                    onChange={() => setIsSubmitReturnLastYear(false)}
                  />
                  <span className="radio-right-space">No</span>
                  <Input
                    className="radio_animated pl-5"
                    id="disabilities-yes"
                    type="radio"
                    value="true"
                    checked={isSubmitReturnLastYear === true}
                    onChange={() => setIsSubmitReturnLastYear(true)}
                  />
                  <span>Yes</span>
                </FormGroup>
              </Col>
            </Row>
            {isSubmitReturnLastYear && (
              <Row>
                <Col sm="6" md="12">
                  <FormGroup>
                    <Label className="d-block" check htmlFor="disabilities-no">
                      Do You Submit IT10B With You Last Return?
                    </Label>
                    <Input
                      className="radio_animated"
                      id="disabilities-no"
                      type="radio"
                      value="false"
                      checked={isSubmitIT10BLastReturn === false}
                      onChange={() => setIsSubmitIT10BLastReturn(false)}
                    />
                    <span className="radio-right-space">No</span>
                    <Input
                      className="radio_animated pl-5"
                      id="disabilities-yes"
                      type="radio"
                      value="true"
                      checked={isSubmitIT10BLastReturn === true}
                      onChange={() => setIsSubmitIT10BLastReturn(true)}
                    />
                    <span>Yes</span>
                  </FormGroup>
                </Col>
              </Row>
            )}
            {!isSubmitIT10BLastReturn && (
              <Row>
                <Col sm="6" md="12">
                  <FormGroup>
                    <Label className="d-block" check htmlFor="disabilities-no">
                      Do You Have Previously Acquired Assets/Liabilities?
                    </Label>
                    <Input
                      className="radio_animated"
                      id="disabilities-no"
                      type="radio"
                      value="false"
                      checked={isPreviouslyAssetsLiabilities === false}
                      onChange={() => setIsPreviouslyAssetsLiabilities(false)}
                    />
                    <span className="radio-right-space">No</span>
                    <Input
                      className="radio_animated pl-5"
                      id="disabilities-yes"
                      type="radio"
                      value="true"
                      checked={isPreviouslyAssetsLiabilities === true}
                      onChange={() => setIsPreviouslyAssetsLiabilities(true)}
                    />
                    <span>Yes</span>
                  </FormGroup>
                </Col>
              </Row>
            )}
            <Btn
              className="pull-right save-and-continue"
              color="primary"
              type="submit"
              onClick={() => handleSubmit(onSubmit)}
            >
              Save & Continue
            </Btn>
            <Btn
              className="pull-right"
              color="primary"
              type="submit"
              onClick={() => handleSubmit(onSubmit)}
            >
              Save
            </Btn>
          </CardBody>
          <CardFooter className="text-end"></CardFooter>
        </Card>
      </Form>
    </Col>
  );
};

export default NetAsset;
