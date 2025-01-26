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
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {getRequest, patchRequest, postRequest} from "../../../../utils/axiosRequests";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {signIn} from "../../../../Store/Slices/AuthSlice";

import {Btn} from "../../../../AbstractElements";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";

const InstitutionalLiabilities = () => {
    const [isInstitutionalLiabilities, setIsInstitutionalLiabilities] = useState(false);
    const [institutionalLiabilities, setInstitutionalLiabilities] = useState<any>({});
    const [typeOfLiabilitiesEntry, setTypeOfLiabilitiesEntry] =useState("institutional");
    console.log("institutionalLiabilities", institutionalLiabilities)
    const [id, setId] = useState<string>("");
    console.log('idddddddd', id);
    let userInfo = useSelector((state: any) => state.auth.data);
    const [loading, setLoading] = useState(false);
    const [isMore, setIsMore] = useState(true);
    const [anyPaymentExpand, setAnyPaymentExpand] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [saveLoading, setSaveLoading] = useState(false);



    const getInstitutionalLiabilities = async () => {
        setLoading(true);
        await getRequest(`liability-entries/${userInfo.id}/${typeOfLiabilitiesEntry}`)
            .then((res) => {
                setLoading(false);
                setId(res?.data?.id);
                setIsInstitutionalLiabilities(res?.data?.liabilities_entry?.isInstitutionalLiabilities ?? true);
                setInstitutionalLiabilities(res?.data);
            })
            .catch((error) => {
                setLoading(false);
                console.log("from react query error: ", error.message);
            });
    };




    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<any>({
        defaultValues: {
            type_of_liabilities_entry: institutionalLiabilities?.type_of_liabilities_entry || null,
            bank_fi_name: institutionalLiabilities?.bank_fi_name || null,
            account_no: institutionalLiabilities?.account_no || null,
            opening: institutionalLiabilities?.opening || null,
            new_loan: institutionalLiabilities?.new_loan || null,
            principal_paid:
                institutionalLiabilities?.principal_paid || null,
            invest_paid:
                institutionalLiabilities?.invest_paid || null,
            closing: institutionalLiabilities?.closing || null,
            total_principal: institutionalLiabilities?.total_principal || null,
            total_interest: institutionalLiabilities?.total_interest || null,
            name_of_person: institutionalLiabilities?.name_of_person || null,
            etin_no: institutionalLiabilities?.etin_no || null,
            name_of_loan: institutionalLiabilities?.name_of_loan || null,
            type: institutionalLiabilities?.type || null,
            total_closing: institutionalLiabilities?.total_closing || null,
        },
    });

    const type_of_liabilities_entry = watch("type_of_liabilities_entry");
    const bank_fi_name = watch("bank_fi_name");
    const account_no = watch("account_no");
    const opening = watch("opening");
    const new_loan = watch("new_loan");
    const principal_paid = watch("principal_paid");
    const invest_paid = watch(
        "invest_paid"
    );
    const closing = watch("closing");
    const total_principal = watch("total_principal");
    const total_interest = watch("total_interest");
    const name_of_person = watch("name_of_person");
    const etin_no = watch("etin_no");
    const name_of_loan = watch("name_of_loan");
    const type = watch("type");
    const total_closing = watch("total_closing");
console.log(bank_fi_name, "bank_fi_name")
    const onSubmit: SubmitHandler<GovernmentIncome> = (inputData: any) => {
        setSaveLoading(true);
        inputData["employee_type"] = "government";
        inputData["user_id"] = userInfo.id;
        inputData["is_institutional_liabilities"] = isInstitutionalLiabilities;

        const actionType = id
            ? patchRequest(`liability-entries/${id}`, {
                user_id: userInfo.id,
                institutional_liabilities: inputData,
            })
            : postRequest(`liability-entries`, {
                user_id: userInfo.id,
                institutional_liabilities: inputData,
            });
        actionType
            .then((res) => {
                console.log(res, "resresres");
                setId(res?.data?.id);
                setSaveLoading(false);
                setMessage("Successfully Updated");
                setOpen(true);
            })
            .catch((error) => {
                setSaveLoading(false);
                setMessage("Something went wrong");
                setOpen(true);
            });
    };

    useEffect(() => {
        if (id){
            console.log("institutionalLiabilities institutionalLiabilities", institutionalLiabilities);

        }
        else {
            getInstitutionalLiabilities();
        }
        if (institutionalLiabilities) {
            setValue("type_of_liabilities_entry", institutionalLiabilities?.type_of_liabilities_entry || null);
            setValue("bank_fi_name", institutionalLiabilities?.bank_fi_name || "");
            setValue("account_no", institutionalLiabilities?.account_no || "");
            setValue("opening", institutionalLiabilities?.opening || null);
            setValue("new_loan", institutionalLiabilities?.new_loan || null);
            setValue("principal_paid", institutionalLiabilities?.principal_paid || null);
            setValue("invest_paid", institutionalLiabilities?.invest_paid || null);
            setValue("closing", institutionalLiabilities?.closing || null);
            setValue("total_principal", institutionalLiabilities?.total_principal || null);
            setValue("total_interest", institutionalLiabilities?.total_interest || null);
            setValue("name_of_person", institutionalLiabilities?.name_of_person || "");
            setValue("etin_no", institutionalLiabilities?.etin_no || "");
            setValue("name_of_loan", institutionalLiabilities?.name_of_loan || "");
            setValue("type", institutionalLiabilities?.type || null);
            setValue("total_closing", institutionalLiabilities?.total_closing || null);
        }
    }, [institutionalLiabilities, setValue]);

    return (
        <Col xl="9">
                {/*<UserDetailsInformation/>*/}
                <Card className="profile-right">
                    <CardBody>
                        <Row>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>User Name</Label>
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        defaultValue={userInfo?.user_detail?.full_name ?? ""}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>ETIN</Label>
                                    <Input
                                        type="number"
                                        placeholder="ETIN"
                                        disabled
                                        defaultValue={userInfo?.user_detail?.etin_number ?? ""}
                                    />
                                </FormGroup>
                            </Col>

                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Total Income</Label>
                                    <Input type="number" placeholder="Total Income" />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Income Year</Label>
                                    <Input type="number" placeholder="Income Year" />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Profession</Label>
                                    <Input
                                        type="text"
                                        placeholder="Profession"
                                        disabled
                                        defaultValue={userInfo?.user_detail?.profession ?? ""}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Total Head Income</Label>
                                    <Input type="number" placeholder="Total Head Income" />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Total Tax</Label>
                                    <Input type="number" placeholder=" Total Tax" />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="3">
                                <FormGroup>
                                    <Label>Assessment Year</Label>
                                    <Input type="number" placeholder="Assessment Year" />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="profile-right">
                    <CardHeaderCommon
                        title={"Institutional Liabilities"}
                        tagClass={"card-title mb-0"}
                    />
                    <>
                        {loading ? (
                            <Loader loading={loading} />
                        ) : (
                            <>
                            {open && message && (
                                <ToastCustom message={message} open={open} setOpen={setOpen} />
                            )}
                    <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                    <CardBody>
                        <Row className="mb-3">

                        </Row>


                        <Row>
                            <h3>Loan: 01 (Name/Account)</h3>
                            <br/>
                            <br/>


                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Bank/FI Name</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Bank/FI Name"
                                        className={`${errors.bank_fi_name ? "is-invalid" : ""}`}
                                        {...register("bank_fi_name")}
                                        defaultValue={bank_fi_name}
                                        onChange={(e) =>
                                            setValue("bank_fi_name", parseInt(e.target.value))
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>A/C No</Label>
                                    <Input
                                        type="text"
                                        placeholder=" A/C No"
                                        className={`${errors.account_no ? "is-invalid" : ""}`}
                                        {...register("account_no")}
                                        defaultValue={account_no}
                                        onChange={(e) =>
                                            setValue("account_no", parseInt(e.target.value))
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Opening</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Opening"
                                        className={`${errors.opening ? "is-invalid" : ""}`}
                                        {...register("opening")}
                                        defaultValue={opening}
                                        onChange={(e) =>
                                            setValue("opening", parseInt(e.target.value))
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>New Loan</Label>
                                    <Input
                                        type="text"
                                        placeholder=" New Loan"
                                        className={`${errors.new_loan ? "is-invalid" : ""}`}
                                        {...register("new_loan")}
                                        defaultValue={new_loan}
                                        onChange={(e) =>
                                            setValue("new_loan", parseInt(e.target.value))
                                        }

                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Principal Paid</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Principal Paid"
                                        className={`${errors.principal_paid ? "is-invalid" : ""}`}
                                        {...register("principal_paid")}
                                        defaultValue={principal_paid}
                                        onChange={(e) =>
                                            setValue("principal_paid", parseInt(e.target.value))
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Invest Paid</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Invest Paid"
                                        className={`${errors.invest_paid ? "is-invalid" : ""}`}
                                        {...register("invest_paid")}
                                        defaultValue={invest_paid}
                                        onChange={(e) =>
                                            setValue("invest_paid", parseInt(e.target.value))
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="12">
                                <FormGroup>
                                    <Label>Closing</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Closing"
                                        className={`${errors.closing ? "is-invalid" : ""}`}
                                        {...register("closing")}
                                        defaultValue={closing}
                                        onChange={(e) =>
                                            setValue("closing", parseInt(e.target.value))
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <br/>
                            <Col sm="6" md="12">
                                Add More
                            </Col>
                            <br/>
                            <br/>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Total Principal</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Total Principal"
                                        className={`${errors.total_principal ? "is-invalid" : ""}`}
                                        {...register("total_principal")}
                                        defaultValue={total_principal}
                                        onChange={(e) =>
                                            setValue("total_principal", parseInt(e.target.value))
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Total Interest</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Total Invest"
                                        className={`${errors.total_interest ? "is-invalid" : ""}`}
                                        {...register("total_interest")}
                                        defaultValue={total_interest}
                                        onChange={(e) =>
                                            setValue("total_interest", parseInt(e.target.value))
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="6" md="4">
                                <FormGroup>
                                    <Label>Total Closing</Label>
                                    <Input
                                        type="text"
                                        placeholder=" Total Closing"
                                        className={`${errors.total_closing ? "is-invalid" : ""}`}
                                        {...register("total_closing")}
                                        defaultValue={total_closing}
                                        onChange={(e) =>
                                            setValue("total_closing", parseInt(e.target.value))
                                        }
                                    />
                                </FormGroup>
                            </Col>



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
                            type={saveLoading ? `button` : `submit`}
                            onClick={() => handleSubmit(onSubmit)}
                        >
                            {saveLoading ? "Saving..." : "Save"}
                        </Btn>
                    </CardBody>
                </Form>
                            </>
                        )}
                    </>
            <CardFooter className="text-end"></CardFooter>
                </Card>
        </Col>
    );
};

export default InstitutionalLiabilities;
