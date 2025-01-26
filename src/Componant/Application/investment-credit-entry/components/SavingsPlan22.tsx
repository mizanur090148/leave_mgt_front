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
import { useSelector } from "react-redux";
import {
    deleteRequest,
    getRequest,
    postRequest,
} from "../../../../utils/axiosRequests";
import { Btn } from "../../../../AbstractElements";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import { serialPadding } from "../../../../utils/helpers";
//import UserDetailsInformation from "../../liabilities-entry/components/UserDetailsInformation";

interface PropertyItem {
    id: any;
    type: string;
    policy_number: number;
    insured_amount: number;
    current_year_amount: number;
}
interface PropertyItem2 {
    id: any;
    type: string;
    bank_name: string;
    account_no: string;
    paid_amount: number;
}
const SavingsPlan22: React.FC = () => {
    const userInfo = useSelector((state: any) => state.auth.data);
    const [saveLoading, setSaveLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [items, setItems] = useState<PropertyItem[]>([
        {
            id: "",
            type: "insurance",
            policy_number: 0,
            insured_amount: 0,
            current_year_amount: 0,
        },
    ]);
    const [items2, setItems2] = useState<PropertyItem2[]>([
        {
            id: "",
            type: "deposit",
            bank_name: "",
            account_no: "",
            paid_amount: 0,
        },
    ]);
    // Calculate the total principal dynamically
   /* const calculateTotalPrincipal = () => {
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
    };*/
    /*const calculateTotalClosing = () => {
        return items.reduce(
            (acc, curr) => acc + Number(curr.closing || 0),
            0
        );
    };*/

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<{ items: PropertyItem[], items2: PropertyItem2[]  }>({
        defaultValues: {
            items: [],
            items2: []
        },
    });



    const getchitems = async () => {
        setLoading(true);
        try {
            const res = await getRequest(`savings-plan`);
            const data = res.data?.map((item: any) => ({
                id: item.id,
                type: item.type,
                policy_number: item.policy_number,
                insured_amount: item.insured_amount,
                current_year_amount: item.current_year_amount,
                bank_name: item.bank_name,
                account_no: item.account_no,
                paid_amount: item.paid_amount,

            }));

            if (data?.length) {
                setItems(data);
                setItems2(data);
                reset({ items: data });
                reset({ items2: data });
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
        const updatedLands2 = [...items2];
        updatedLands[index] = { ...updatedLands[index], [name]: value };
        updatedLands2[index] = { ...updatedLands2[index], [name]: value };
        setItems(updatedLands);
        setItems2(updatedLands2);
        // setValue(`items.${index}.interest_paid`, Number(value));
    };

    const addMore = () => {
        setItems([
            ...items,
            {
                id: "",
                type: "insurance",
                policy_number: 0,
                insured_amount: 0,
                current_year_amount: 0,

            },
        ]);
    };
    const addMore2 = () => {
        setItems2([
            ...items2,
            {
                id: "",
                type: "deposit",
                bank_name: "",
                account_no: "",
                paid_amount: 0,

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
                await deleteRequest(`savings-plan/${id}`)
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

    const onSubmit: SubmitHandler<{ items: PropertyItem[], items2: PropertyItem2[] }> = (data) => {
        setSaveLoading(true);
        const inputArr = [
            ...data?.items?.map((item) => ({
                ...item,
                user_id: userInfo.id,
                type: 'item', // Optional: Adding a type property to distinguish if needed
            })),
            ...data?.items2?.map((item) => ({
                ...item,
                user_id: userInfo.id,
                type: 'item2', // Optional: Adding a type property to distinguish if needed
            })),
        ].filter(Boolean); // This filters out any undefined values

        // Now inputArr contains both items and items2
        console.log(inputArr);
        console.log("inputArr", inputArr);
        postRequest(`savings-plan`, inputArr)
            .then((res) => {
                setOpen(true);
                setMessage("Successfully Updated");
                const updatedData = res?.data?.map((item: any) => ({
                    id: item.id,
                    type: item.type,
                    policy_number: item.policy_number,
                    insured_amount: item.insured_amount,
                    current_year_amount: item.current_year_amount,
                    bank_name: item.bank_name,
                    account_no: item.account_no,
                    paid_amount: item.paid_amount,

                }));
                setItems(updatedData);
                setItems2(updatedData);
                reset({ items: updatedData });
                reset({ items2: updatedData });
                setSaveLoading(false);
            })
            .catch((error) => {
                setSaveLoading(false);
                console.error("Error:", error.message);
            });
    };

    return (
        <Col xl="9">
            {/* <UserDetailsInformation userDetails = {userInfo} /> */}
            <Card className="profile-right">
                <CardHeaderCommon title="Institutional Liabilities" tagClass="card-title mb-0" />
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
                                                <b>Life Insurance Premium: {serialPadding(key)}</b>
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
                                                    <Label>Policy Number</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Policy Number"
                                                        {...register(`items.${key}.policy_number`, {
                                                            required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].policy_number = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.policy_number`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.policy_number}
                                                    />
                                                    {errors.items?.[key]?.policy_number && (
                                                        <span className="error-msg">
                                                    {errors.items[key]?.policy_number?.message}
                                                     </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>Insured Amount</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Insured Amount"
                                                        {...register(`items.${key}.insured_amount`, {
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].insured_amount = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.insured_amount`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.insured_amount}
                                                    />
                                                    {errors.items?.[key]?.insured_amount && (
                                                        <span className="error-msg">
                              {errors.items[key]?.insured_amount?.message}
                            </span>
                                                    )}
                                                </FormGroup>
                                            </Col>

                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>Current Year Payment</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Current Year Payment"
                                                        {...register(`items.${key}.current_year_amount`, {
                                                            required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands = [...items];
                                                                updatedLands[key].current_year_amount = value;
                                                                setItems(updatedLands);
                                                                setValue(`items.${key}.current_year_amount`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.current_year_amount}
                                                    />
                                                    {errors.items?.[key]?.current_year_amount && (
                                                        <span className="error-msg">
                              {errors.items[key]?.current_year_amount?.message}
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

                                {items2.map((item, key) => (
                                    <Fragment key={key}>
                                        {key > 0 && <div className="dashed-hr"></div>}
                                        <Row className="fw-bold">
                                            <Col>
                                                <b>Deposit Pension Scheme/ Monthly Savings Scheme: {serialPadding(key)}</b>
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
                                                    <Label>Bank Name</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Bank Name"
                                                        {...register(`items2.${key}.bank_name`, {
                                                            required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands2 = [...items2];
                                                                updatedLands2[key].bank_name = value;
                                                                setItems2(updatedLands2);
                                                                setValue(`items2.${key}.bank_name`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.bank_name}
                                                    />
                                                    {errors.items2?.[key]?.bank_name && (
                                                        <span className="error-msg">
                                                    {errors.items2[key]?.bank_name?.message}
                                                     </span>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>A/C No</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="A/C No"
                                                        {...register(`items2.${key}.account_no`, {
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands2 = [...items2];
                                                                updatedLands2[key].account_no = value;
                                                                setItems2(updatedLands2);
                                                                setValue(`items2.${key}.account_no`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.account_no}
                                                    />
                                                    {errors.items2?.[key]?.account_no && (
                                                        <span className="error-msg">
                              {errors.items2[key]?.account_no?.message}
                            </span>
                                                    )}
                                                </FormGroup>
                                            </Col>

                                            <Col sm="4" md="4">
                                                <FormGroup>
                                                    <Label>Paid Amount</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Paid Amount"
                                                        {...register(`items2.${key}.paid_amount`, {
                                                            required: "This is required",
                                                            onChange: (e) => {
                                                                const value = e.target.value;
                                                                const updatedLands2 = [...items2];
                                                                updatedLands2[key].paid_amount = value;
                                                                setItems2(updatedLands2);
                                                                setValue(`items2.${key}.paid_amount`, value);
                                                            },
                                                        })}
                                                        defaultValue={item.paid_amount}
                                                    />
                                                    {errors.items2?.[key]?.paid_amount && (
                                                        <span className="error-msg">
                                                      {errors.items2[key]?.paid_amount?.message}
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
                                            onClick={() => addMore2()}
                                        >
                                            Add More <i className="fa fa-plus-circle pl-2"></i>
                                        </Btn>
                                    </Col>
                                </Row>











                                {/*<Row>
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
                                </Row>*/}
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

export default SavingsPlan22;
