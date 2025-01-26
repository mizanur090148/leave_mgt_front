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
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
    deleteRequest,
    getRequest,
    patchRequest,
    postRequest,
} from "../../../../utils/axiosRequests";
import { useSelector } from "react-redux";
import { Btn } from "../../../../AbstractElements";
import { serialPadding } from "../../../../utils/helpers";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import UserDetailsInformation from "../../UserDetailsInformation/UserDetailsInformation";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";

interface PropertyItem {
    id: string;
    type: string;
    account_no: string;
    closing_amount: string;
    new_purchase: number;
    name_of_person?: string;
    etin_no?: string;
}

const types = [
    "shares",
    "savings",
    "loan_given",
    "fixed_deposit",
    "pf_or_other",
    "other",
];

const FinancialAssets = () => {
    const userInfo = useSelector((state: any) => state.auth.data);
    const [saveLoading, setSaveLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [items, setItems] = useState<PropertyItem[]>(
        types.map((type) => ({
            id: "",
            type,
            account_no: "",
            new_purchase: 0,
            closing_amount: "",
            name_of_person: "",
            etin_no: "",
        }))
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
    } = useForm<{ items: PropertyItem[] }>({
        defaultValues: { items },
    });

    const getData = async () => {
        setLoading(true);
        await getRequest(`financial-assets`)
            .then((res: any) => {
                setLoading(false);
                const data = res.data?.map((item: any) => ({
                    id: item.id,
                    type: item.type,
                    property_type: item.property_type,
                    account_no: item.account_no,
                    new_purchase: item.new_purchase ?? 0,
                    closing_amount: item.closing_amount,
                    name_of_person: item.name_of_person,
                    etin_no: item.etin_no,
                }));
                if (data?.length) {
                    setItems(data);
                    reset({ items: data });
                }
            })
            .catch((error: any) => {
                setLoading(false);
                console.error("Error fetching data:", error.message);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const onSubmit: SubmitHandler<{ items: PropertyItem[] }> = async (data) => {
        setSaveLoading(true);
        const inputArr = data.items.map((item) => ({
            ...item,
            user_id: userInfo.id,
        }));
        try {
            const res = await postRequest(`financial-assets`, inputArr);
            setOpen(true);
            setSaveLoading(false);
            setMessage("Successfully Updated");
            const updatedData = res.data?.map((item: any) => ({
                id: item?.id,
                type: item?.type,
                account_no: item?.account_no,
                closing_amount: item?.closing_amount,
                new_purchase: item.new_purchase ?? 0,
                name_of_person: item?.name_of_person,
                etin_no: item?.etin_no,
            }));
            setItems(updatedData);
            reset({ items: updatedData });
        } catch (error: any) {
            setSaveLoading(false);
            console.error("Error:", error.message);
        }
    };

    const addMore = (type: string) => {
        const newItem = {
            id: "",
            type: type,
            account_no: "",
            closing_amount: "",
            new_purchase: 0,
            name_of_person: "",
            etin_no: "",
        };
        const updatedData = [...items, newItem];
        setItems(updatedData);

        // Register the new item dynamically
        const newIndex = updatedData.length - 1;
        setValue(`items.${newIndex}.id`, "");
        setValue(`items.${newIndex}.type`, type);
        setValue(`items.${newIndex}.account_no`, "");
        setValue(`items.${newIndex}.new_purchase`, 0);
        setValue(`items.${newIndex}.closing_amount`, "");
        setValue(`items.${newIndex}.name_of_person`, "");
        setValue(`items.${newIndex}.etin_no`, "");
    };

    const deleteAction = async (id: any, type: string, index: any) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this item?"
        );
        if (confirmation) {
            const updatedData = [...items];
            if (id) {
                await deleteRequest(`financial-assets/${id}`)
                    .then((res) => {
                        const newItems = updatedData.filter((item) => item.id !== id);
                        setItems([...newItems]);
                        if (newItems.length === 0) {
                            getData();
                        }
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

    const getTitle = (type: string, key: number) => {
        switch (type) {
            case "shares":
                return `Shares From Secondary Market: ${serialPadding(key)} (BO ID)`;
            case "savings":
                return `Savings Certificate: ${serialPadding(key)} (Closing Value)`;
            case "loan_given":
                return `Loan Given: ${serialPadding(key)} (Name)`;
            case "fixed_deposit":
                return `Fixed Deposit: ${serialPadding(key)} (Closing Value)`;
            case "pf_or_other":
                return `PF or Other Fund: ${serialPadding(key)} (Closing Value)`;
            case "other":
                return `Other Investment: ${serialPadding(key)} (Closing Value)`;
            default:
                return "";
        }
    };

    const getFieldLabel = (type: string) => {
        switch (type) {
            case "shares":
                return {
                    firstLabel: "BO/Account ID",
                    secondLabel: "Closing Value",
                };
            case "savings":
            case "fixed_deposit":
            case "pf_or_other":
                return {
                    firstLabel: "A/C No",
                    secondLabel: "Closing Amount",
                };
            case "loan_given":
                return {
                    firstLabel: "Name of Person",
                    secondLabel: "Closing Amount",
                };
            case "other":
                return {
                    firstLabel: "A/C No/Policy No",
                    secondLabel: "Closing Amount",
                };
            default:
                return {
                    firstLabel: "",
                    secondLabel: "",
                };
        }
    };

    let totalHeadIncome = null;
    if (watch("items")) {
        totalHeadIncome = items.reduce(
            (acc, curr) => acc + Number(curr.closing_amount || 0),
            0
        );
    }

    return (
        <Col xl="9">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <UserDetailsInformation
                    title={"Total Financial Assets"}
                    totalHeadIncome={totalHeadIncome}
                />
                <Card className="profile-right">
                    <CardHeaderCommon
                        title={"Financial Assets"}
                        tagClass={"card-title mb-0"}
                    />
                    <CardBody>
                        {loading ? (
                            <Loader loading={loading} />
                        ) : (
                            <>
                                {open && message && (
                                    <ToastCustom
                                        message={message}
                                        open={open}
                                        setOpen={setOpen}
                                    />
                                )}
                                {[
                                    "shares",
                                    "savings",
                                    "loan_given",
                                    "fixed_deposit",
                                    "pf_or_other",
                                    "other",
                                ].map((type) => (
                                    <div key={type}>
                                        {items
                                            .map((item, index) => ({ ...item, index }))
                                            .filter((item) => item.type === type)
                                            .map((item, key) => (
                                                <Fragment key={item.index}>
                                                    <Row>
                                                        <Col>
                                                            <b>{getTitle(type, key)}</b>
                                                            {/* {item.index + 1} */}
                                                        </Col>
                                                        <Col className="text-end">
                                                            {((item.id && key > 0) || key > 0) && (
                                                                <i
                                                                    className="fa fa-times-circle text-danger pointer"
                                                                    onClick={() =>
                                                                        deleteAction(item?.id, type, item.index)
                                                                    }
                                                                />
                                                            )}
                                                        </Col>
                                                    </Row>
                                                    {/* {type === "shares" && ( */}
                                                    <Fragment>
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>BO/Account ID</Label>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.account_no`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.account_no`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.account_no}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>Opening Value</Label>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.closing_amount`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.closing_amount`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.closing_amount}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>New Purchase</Label>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.account_no`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.account_no`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.account_no}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>Sale</Label>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.account_no`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.account_no`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.account_no}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>Gain/Loss</Label>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        placeholder=""
                                                                        {...register(
                                                                            `items.${item.index}.account_no`,
                                                                            {
                                                                                //required: "Account No is required",
                                                                                onChange: (e) => {
                                                                                    setValue(
                                                                                        `items.${item.index}.account_no`,
                                                                                        e.target.value
                                                                                    );
                                                                                },
                                                                            }
                                                                        )}
                                                                        defaultValue={item.account_no}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col>
                                                                <FormGroup>
                                                                    <Label>Closing Value</Label>
                                                                    <Input
                                                                        bsSize="sm"
                                                                        disabled
                                                                        defaultValue={
                                                                            Number(item?.closing_amount || 0) +
                                                                            Number(item?.new_purchase || 0) -
                                                                            0
                                                                        }
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Fragment>
                                                    {/* )} */}
                                                </Fragment>
                                            ))}
                                        <Row>
                                            <Col>
                                                <Btn
                                                    className="btn-full mb-2"
                                                    color="outline-info"
                                                    type="button"
                                                    onClick={() => addMore(type)}
                                                >
                                                    Add More <i className="fa fa-plus-circle pl-2"></i>
                                                </Btn>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
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
                                >
                                    {saveLoading ? "Saving..." : "Save"}
                                </Btn>
                            </>
                        )}
                    </CardBody>
                    <CardFooter className="text-end"></CardFooter>
                </Card>
            </Form>
        </Col>
    );
};

export default FinancialAssets;
