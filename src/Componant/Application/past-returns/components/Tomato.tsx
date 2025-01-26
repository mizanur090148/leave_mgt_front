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
import {SubmitHandler} from "react-hook-form/dist/types/form";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {patchRequest, postRequest} from "../../../../utils/axiosRequests";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../../../Store/Slices/AuthSlice";

import {Btn} from "../../../../AbstractElements";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";
import {CheckMeOut} from "../../../../utils/Constant";
import {Fragment} from "react";

const Tomato = () => {
    const dispatch = useDispatch();
    let userInfo = useSelector((state: any) => state.auth.data);

    const defaultValues = {};

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        watch,
    } = useForm<SalaryIncome>({defaultValues});

    const onSubmit: SubmitHandler<SalaryIncome> = (inputData) => {
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
                <UserDetailsInformation/>
                <Card className="profile-right">
                    <CardHeaderCommon
                        title={"Jewellery"}
                        tagClass={"card-title mb-0"}
                    />
                    <CardBody>
                        <Row className="mb-3">
                        </Row>
                        <h3>Jewellery:01 ( Type, Value)
                            </h3>
                        <br/>
                        <Row>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Type</Label>
                                    <Input
                                        style={{ padding: "6px 10px" }}
                                        type="select"
                                        bsSize="sm"
                                        className="form-select select-custom"

                                    >
                                        <option value="type 1">type 1</option>
                                        <option value="type 2">type 2</option>
                                        <option value="type 3">type 3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Closing Qty(Vori/Tola</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Closing Qty(Vori/Tola"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Closing Value</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Closing Value"
                                    />
                                </FormGroup>
                            </Col>


                            <br/>
                            Add More
                            <br/>
                        </Row>
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

export default Tomato;
