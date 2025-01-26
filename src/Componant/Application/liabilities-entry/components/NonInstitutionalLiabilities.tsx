import React, { Fragment, useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteRequest,
    getRequest,
    postRequest,
} from "../../../../utils/axiosRequests";
import { Btn } from "../../../../AbstractElements";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import { liabilitiesTotalData, serialPadding } from "../../../../utils/helpers";
import LiabilityTop from "./LiabilityTop";
import { liability } from "../../../../Store/Slices/PastReturnTotalSlice";

interface PropertyItem {
    id: any;
    type_of_liabilities_entry: string;
    name_of_person: string;
    etin_no: string;
    opening: number;
    new_loan: number;
    principal_paid: number;
    interest_paid: number;
    closing: number;
    total_principal: number;
    total_interest: number;
    total_closing: number;
}
const NonInstitutionalLiabilities: React.FC = () => {
    const userInfo = useSelector((state: any) => state.auth.data);
    const liabilityData = useSelector((state: any) => state?.pastReturn?.liabilityData);
    const [saveLoading, setSaveLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [items, setItems] = useState<PropertyItem[]>([
        {
            id: "",
            type_of_liabilities_entry: "institutional",
            name_of_person: "",
            etin_no: "",
            opening: 0,
            new_loan: 0,
            principal_paid: 0,
            interest_paid: 0,
            closing: 0,
            total_principal: 0,
            total_interest: 0,
            total_closing: 0,
        },
    ]);
    const dispatch = useDispatch();
    // Calculate the total principal dynamically
    const calculateTotalPrincipal = () => {
        return items.reduce(
            (acc, curr) => acc + Number(curr.principal_paid || 0),
            0
        );
    };
    const calculateTotalInterest = () => {
        return items.reduce(
            (acc, curr) => acc + Number(curr.interest_paid || 0),
            0
        );
    };
    const calculateTotalClosing = () => {
        return items.reduce(
            (acc, curr) => acc + Number(curr.closing || 0),
            0
        );
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<{ items: PropertyItem[] }>({
        defaultValues: {
            items: [],
        },
    });

    const getchitems = async () => {
        setLoading(true);
        try {
            const res = await getRequest(`non-institutional-liabilities`);
            const data = res.data?.map((item: any) => ({
                id: item.id,
                type_of_liabilities_entry: item.type_of_liabilities_entry,
                name_of_person: item.name_of_person,
                etin_no: item.etin_no,
                opening: item.opening,
                new_loan: item.new_loan,
                principal_paid: item.principal_paid,
                interest_paid: item.interest_paid,
                closing: item.closing,
                total_principal: item.total_principal,
                total_interest: item.total_interest,
                total_closing: item.total_closing,
            }));

            if (data?.length) {
                setItems(data);
                reset({ items: data });
            }
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        getchitems();
    }, []);

    // Handle Input Change (for principal_paid or any other field)
    const handleInputChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        const updatedLands = [...items];
        updatedLands[index] = { ...updatedLands[index], [name]: value };
        setItems(updatedLands);
        setValue(`items.${index}.interest_paid`, Number(value));
    };

    const addMore = () => {
        setItems([
            ...items,
            {
                id: "",
                type_of_liabilities_entry: "institutional",
                name_of_person: "",
                etin_no: "",
                opening: 0,
                new_loan: 0,
                principal_paid: 0,
                interest_paid: 0,
                closing: 0,
                total_principal: 0,
                total_interest: 0,
                total_closing: 0,
            },
        ]);
    };

    const deleteAction = async (id: any, index: number) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this item?"
        );
        if (confirmation) {
            const updatedData = [...items];
            if (id) {
                await deleteRequest(`non-institutional-liabilities/${id}`)
                    .then((res) => {
                        setItems(updatedData.filter((item) => item.id !== id));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                updatedData.splice(index, 1);
                setItems(updatedData);
            }
        }
    };

    const onSubmit: SubmitHandler<{ items: PropertyItem[] }> = async (data) => {
        setSaveLoading(true);
        const inputArr = data?.items?.map((item) => ({
            ...item,
            user_id: userInfo.id,
        }));
        console.log("inputArr", inputArr);
        await postRequest(`non-institutional-liabilities`, inputArr)
            .then((res) => {
                setOpen(true);
                setMessage("Successfully Updated");
                const updatedData = res?.data?.map((item: any) => ({
                    id: item.id,
                    type_of_liabilities_entry: item.type_of_liabilities_entry,
                    name_of_person: item.name_of_person,
                    etin_no: item.etin_no,
                    opening: item.opening,
                    new_loan: item.new_loan,
                    principal_paid: item.principal_paid,
                    interest_paid: item.interest_paid,
                    closing: item.closing,
                    total_principal: item.total_principal,
                    total_interest: item.total_interest,
                    total_closing: item.total_closing,
                }));
                setItems(updatedData);
                reset({ items: updatedData });
                updateHeadData(updatedData);
                setSaveLoading(false);
            })
            .catch((error) => {
                setSaveLoading(false);
                console.error("Error:", error.message);
            });
    };

    const updateHeadData = (updatedData: any) => {
        const result = updatedData?.reduce(
            (acc: any, curr: any) => acc + Number(curr.closing || 0),
            0
        );
        const updatedState = {
            ...liabilityData,
            nonInstitutional: result,
            total: liabilitiesTotalData({ ...liabilityData, nonInstitutional: result })
        };
        dispatch(liability(updatedState));
    }

    return (
        <Col xl="9">
            <LiabilityTop title="Non Institutional Liabilities" itemName="nonInstitutional" />
            <Card className="profile-right">
                <CardHeaderCommon title="Non Institutional Liabilities" tagClass="card-title mb-0" />
                <CardBody>
                    {loading ? (
                        <Loader loading={loading} />
                    ) : (
                        <>
                            {open && message && (
                                <ToastCustom message={message} open={open} setOpen={setOpen} />
                            )}
                            <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                                {items.map((item, key) => (
                                    <Fragment key={key}>
                                        {key > 0 && <div className="dashed-hr"></div>}
                                        <Row className="fw-bold">
                                            <Col>
                                                <b>Loan: {serialPadding(key)} (Name/Account)</b>
                                            </Col>
                                            <Col className="text-end">
                                                {key > 0 && (
                                                    <i
                                                        style={{ fontSize: "17px" }}
                                                        className="fa fa-times-circle text-danger del-custom"
                                                        onClick={() => deleteAction(item?.id, key)}
                                                    ></i>
                                                )}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Input
                                                        type="hidden"
                                                        {...register(`items.${key}.type_of_liabilities_entry`, {
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].type_of_liabilities_entry = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.type_of_liabilities_entry`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.type_of_liabilities_entry}
                                                    />

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>Name Of Person</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Name Of Person"
                                                        {...register(`items.${key}.name_of_person`, {
                                                            required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].name_of_person = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.name_of_person`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.name_of_person}
                                                    />
                                                    {errors.items?.[key]?.name_of_person && (
                                                        <span className="error-msg">
                                                            {errors.items[key]?.name_of_person?.message}
                                                        </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>ETIN</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="ETIN"
                                                        {...register(`items.${key}.etin_no`, {
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].etin_no = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.etin_no`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.etin_no}
                                                    />
                                                    {errors.items?.[key]?.etin_no && (
                                                        <span className="error-msg">
                                                            {errors.items[key]?.etin_no?.message}
                                                        </span>
                                                    )}
                                                </FormGroup>
                                            </Col>

                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>Opening</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Opening"
                                                        {...register(`items.${key}.opening`, {
                                                            required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].opening = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.opening`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.opening}
                                                    />
                                                    {errors.items?.[key]?.opening && (
                                                        <span className="error-msg">
                                                            {errors.items[key]?.opening?.message}
                                                        </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>New Loan</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="New Loan"
                                                        {...register(`items.${key}.new_loan`, {
                                                            //required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].new_loan = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.new_loan`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.new_loan}
                                                    />
                                                    {errors.items?.[key]?.new_loan && (
                                                        <span className="error-msg">
                                                            {errors.items[key]?.new_loan?.message}
                                                        </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>Principal Paid</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Principal Paid"
                                                        {...register(`items.${key}.principal_paid`, {
                                                            //required: "This is required",
                                                            onChange: (e) => {
                                                                handleInputChange(key, e);
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].principal_paid = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.principal_paid`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.principal_paid}
                                                    />
                                                    {errors.items?.[key]?.principal_paid && (
                                                        <span className="error-msg">
                                                            {errors.items[key]?.principal_paid?.message}
                                                        </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>Interest Paid</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Interest Paid"
                                                        {...register(`items.${key}.interest_paid`, {
                                                            //required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].interest_paid = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.interest_paid`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.interest_paid}
                                                    />
                                                    {errors.items?.[key]?.interest_paid && (
                                                        <span className="error-msg">
                                                            {errors.items[key]?.interest_paid?.message}
                                                        </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>Closing</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Closing"
                                                        {...register(`items.${key}.closing`, {
                                                            //required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].closing = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.closing`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.closing}
                                                    />
                                                    {errors.items?.[key]?.closing && (
                                                        <span className="error-msg">
                                                            {errors.items[key]?.closing?.message}
                                                        </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Fragment>
                                ))}
                                <Row>
                                    <Col>
                                        <Btn
                                            className="btn-full mb-2"
                                            color="outline-info"
                                            type="button"
                                            onClick={() => addMore()}
                                        >
                                            Add More <i className="fa fa-plus-circle pl-2"></i>
                                        </Btn>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="4">
                                        <FormGroup>
                                            <Label>Total Principal</Label>
                                            <Input
                                                type="text"
                                                name="total_principal"
                                                value={calculateTotalPrincipal()} // Display the calculated value
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="4">
                                        <FormGroup>
                                            <Label>Total Interest</Label>
                                            <Input
                                                type="text"
                                                name="total_interest"
                                                value={calculateTotalInterest()} // Display the calculated value
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="4">
                                        <FormGroup>
                                            <Label>Total Closing</Label>
                                            <Input
                                                type="text"
                                                name="total_closing"
                                                value={calculateTotalClosing()} // Display the calculated value
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12">
                                        <FormGroup className="text-center">
                                            <Btn
                                                className="pull-right save-and-continue"
                                                color="primary"
                                                type="submit"
                                            >
                                                Save & Continue
                                            </Btn>
                                            <Btn
                                                className="pull-right"
                                                color="primary"
                                                type={saveLoading ? `button` : `submit`}
                                            >
                                                {saveLoading ? "Saving..." : "Save"}
                                            </Btn>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </>
                    )}
                </CardBody>
            </Card>
        </Col>
    );
};

export default NonInstitutionalLiabilities;
