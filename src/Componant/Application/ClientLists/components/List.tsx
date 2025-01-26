import React, { useEffect, useState } from "react";
import {Card, CardBody, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import { Btn, H3 } from "../../../../AbstractElements";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import CommonModal from "../../../Ui-Kits/Modal/Common/CommonModal";

interface PropertyItem {
  id: string;
  full_name: string;
  email: string;
  profile_type: string;
  mobile: string;
  etin_number: string;
  profession: string;
  user_detail:{
    full_name: string;
    age: string;
    allowable_exemption: string;
    authorization_authority: string;
    authorization_designation: string;
    authorization_email: string;
    authorization_file: string;
    authorization_name: string;
    authorization_phone_no: string;
    bangla_boboborsho_allowance: string;
    bin: string;
    children_disable_details: string;
    children_disabled: boolean;
    circle_id: string;
    company_logo: string;
    company_name: string;
    disabilities: boolean;
    disability_details: string;
    discount_coupon: string;
    dob: string;
    email: string;
    employee_id: string;
    etin_business: string;
    etin_number: string;
    etin_spouse: string;
    fathers_etin: string;
    fathers_name: string;
    freedom_fighter: boolean;
    freedom_fighter_details: string;
    gender: string;
    incorporation_no: string;
    interest_receivable_on_provident_fund: string;
    license_no: string;
    marital_status: string;
    mobile: string;
    mothers_etin: string;
    mothers_name: string;
    name_of_employer: string;
    nid: string;
    nid_spouse: string;
    no_dependent_children: string;
    no_of_employee: string;
    office_address: string;
    office_city: string;
    office_country: string;
    office_post_code: string;
    old_circle_id: string;
    old_tin: string;
    old_zone_id: string;
    passport_no: string;
    permanent_address: string;
    permanent_city: string;
    permanent_country: string;
    permanent_post_code: string;
    phone_no: string;
    present_address: string;
    present_city: string;
    present_country: string;
    present_post_code: string;
    profession: string;
    profile_type: string;
    residential_status: string;
    spouse_name: string;
    tax_payer_location_id: string;
    tax_payer_status: string;
    total_cost: string;
    trade_license_no: string;
    type_of_business: string;
    type_of_practitioner: string;
    type_of_profession: string;
    user_id: string;
    zone_id: string;
  }
}

interface FormInputs {
  full_name: string;
  email: string;
  profile_type: string;
  mobile: string;
  etin_number: string;
  profession: string;
}

type UrlProps = {
  type: string;
};

const List = ({ type }: UrlProps) => {
  //const userInfo = useSelector((state: any) => state.auth.data);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [items, setItems] = useState<PropertyItem[]>([]);
  const [id, setId] = useState<any>("");

  const getTitle = () => {
    let title = "";
    switch (type) {
      case "client":
        title = "My Clients";
        break;
      default:
        title = "Unknown Type";
    }
    return title;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      full_name: "", // This default will only be used when no values are set
      email: "", // This default will only be used when no values are set
      profile_type: "", // This default will only be used when no values are set
      mobile: "", // This default will only be used when no values are set
      etin_number: "", // This default will only be used when no values are set
      profession: "", // This default will only be used when no values are set
    },
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`client-lists?type=${type}`);
      console.log("client lists", res);
      setItems(res?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteAction = async (id: string, index: number) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmation) {
      const updatedData = [...items];
      if (id) {
        await deleteRequest(`client-lists/${id}`)
          .then(() => {
            setItems(updatedData.filter((item) => item.id !== id));
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
          });
      } else {
        updatedData.splice(index, 1);
        setItems(updatedData);
      }
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setSaveLoading(true);
      const inputData = { ...data };
      const res = id
        ? await patchRequest(`client-lists/${id}`, inputData)
        : await postRequest("client-lists", inputData);

      setItems([...items, res.data]);
      setMessage(res?.message);
      setOpen(true);
      setModalOpen(false);
      reset();
      fetchItems();
    } catch (error: any) {
      setErrorMsg(error?.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const modalTwoToggle = () => setModalOpen(!modalOpen);

  const editData = (item: PropertyItem) => {
    setErrorMsg("");
    setId(item.id);
    setValue("full_name", item.user_detail.full_name);
    setValue("email", item.email);
    setValue("profile_type", item.profile_type);
    setValue("mobile", item.user_detail.mobile);
    setValue("etin_number", item.user_detail.etin_number);
    setValue("profession", item.user_detail.profession);
    setModalOpen(true);
  };

  const openModal = () => {
    setId("");
    setErrorMsg("");
    setValue("full_name", "");
    setValue("email", "");
    setValue("profile_type", "");
    setValue("mobile", "");
    setValue("etin_number", "");
    setValue("profession", "");
    setModalOpen(true);
  };

  const full_name = watch("full_name");
  const email = watch("email");
  const profile_type = watch("profile_type");
  const mobile = watch("mobile");
  const etin_number = watch("etin_number");
  const profession = watch("profession");

  return (
    <Col xl="9">
      <Card className="profile-right">
        <CardHeaderCommon title={getTitle()} tagClass="card-title mb-0" />
        <CardBody>
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <>
              {open && message && (
                <ToastCustom message={message} open={open} setOpen={setOpen} />
              )}
              <Row className="custom-flex">
                <Col>
                  <h6 className="card-title mb-0"></h6>
                </Col>
                <Col className="text-end">
                  <Btn
                    className="btn btn-sm btn-primary custom-btn"
                    onClick={() => openModal()}
                  >
                    Add New
                  </Btn>
                </Col>
              </Row>
              <div className="table-responsive">
                <table className="list-table table-hover my-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Profile Type</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.length > 0 &&
                      items.map((item: PropertyItem, index: number) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item?.user_detail?.full_name}</td>
                          <td>{item?.user_detail?.email}</td>
                          <td>{item?.user_detail?.mobile}</td>
                          <td>{item?.user_detail?.profile_type}</td>
                          <td className="action-td">
                            <span>
                              <i
                                className="fa fa-edit cursor-pointer"
                                aria-hidden="true"
                                onClick={() => editData(item)}
                              ></i>
                            </span>
                            <span onClick={() => deleteAction(item.id, index)}>
                              <i
                                className="fa fa-trash"
                                title="Delete"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Modal for adding new vehicle type */}

              <CommonModal
                centered
                modalBodyClassName="social-profile text-start"
                isOpen={modalOpen}
                toggle={modalTwoToggle}
              >
                <div className="modal-toggle-wrapper">
                  <Row>
                    <Col sm="6" md="4">
                      <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {getTitle()}
                      </div>
                    </Col>
                    <Col sm={1}>
                      <i
                        style={{ fontSize: "17px", cursor: "pointer" }}
                        onClick={() => setModalOpen(false)}
                        className="fa fa-times-circle text-danger"
                      ></i>
                    </Col>
                  </Row>
                  <hr />
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row >
                      <Col sm="6" md="4">
                        <Label>Name</Label>
                        <Input
                          bsSize="sm"
                          type="text"
                          className={`${errors?.full_name ? "is-invalid" : ""}`}
                          {...register("full_name", {
                            required: "This field is required",
                            maxLength: {
                              value: 30,
                              message:
                                "Name can't be longer than 30 characters",
                            },
                          })}
                          onChange={(e) => {
                            setValue("full_name", e.target.value);
                          }}
                          defaultValue={full_name}
                        />
                        {errors?.full_name && (
                          <span className="error-msg">
                            {errors?.full_name?.message}
                          </span>
                        )}
                        {errorMsg && (
                          <span className="error-msg">{errorMsg}</span>
                        )}
                      </Col>
                      <Col sm="6" md="4">
                        <Label>Email</Label>
                        <Input
                            bsSize="sm"
                            type="text"
                            className={`${errors?.email ? "is-invalid" : ""}`}
                            {...register("email", {
                              required: "This field is required",
                              maxLength: {
                                value: 30,
                                message:
                                    "Name can't be longer than 30 characters",
                              },
                            })}
                            onChange={(e) => {
                              setValue("email", e.target.value);
                            }}
                            defaultValue={email}
                        />
                        {errors?.email && (
                            <span className="error-msg">
                            {errors?.email?.message}
                          </span>
                        )}
                        {errorMsg && (
                            <span className="error-msg">{errorMsg}</span>
                        )}
                      </Col>
                      <Col sm="6" md="4">
                        <Label>Mobile</Label>
                        <Input
                            bsSize="sm"
                            type="text"
                            className={`${errors?.mobile ? "is-invalid" : ""}`}
                            {...register("mobile", {
                              required: "This field is required",
                              maxLength: {
                                value: 30,
                                message:
                                    "Name can't be longer than 30 characters",
                              },
                            })}
                            onChange={(e) => {
                              setValue("mobile", e.target.value);
                            }}
                            defaultValue={mobile}
                        />
                        {errors?.mobile && (
                            <span className="error-msg">
                            {errors?.mobile?.message}
                          </span>
                        )}
                        {errorMsg && (
                            <span className="error-msg">{errorMsg}</span>
                        )}
                      </Col>
                      <Col sm="6" md="4">
                        <Label>ETIN</Label>
                        <Input
                            bsSize="sm"
                            type="text"
                            className={`${errors?.etin_number ? "is-invalid" : ""}`}
                            {...register("etin_number", {
                              required: "This field is required",
                              maxLength: {
                                value: 30,
                                message:
                                    "Name can't be longer than 30 characters",
                              },
                            })}
                            onChange={(e) => {
                              setValue("etin_number", e.target.value);
                            }}
                            defaultValue={etin_number}
                        />
                        {errors?.etin_number && (
                            <span className="error-msg">
                            {errors?.etin_number?.message}
                          </span>
                        )}
                        {errorMsg && (
                            <span className="error-msg">{errorMsg}</span>
                        )}
                      </Col>
                      <Col sm="6" md="4">
                        <Label>Profession</Label>
                        <Input
                            bsSize="sm"
                            type="text"
                            className={`${errors?.profession ? "is-invalid" : ""}`}
                            {...register("profession", {
                              required: "This field is required",
                              maxLength: {
                                value: 30,
                                message:
                                    "Name can't be longer than 30 characters",
                              },
                            })}
                            onChange={(e) => {
                              setValue("profession", e.target.value);
                            }}
                            defaultValue={profession}
                        />
                        {errors?.profession && (
                            <span className="error-msg">
                            {errors?.profession?.message}
                          </span>
                        )}
                        {errorMsg && (
                            <span className="error-msg">{errorMsg}</span>
                        )}
                      </Col>
                      <Col sm="6" md="4">
                        <FormGroup>
                          <Label>Profile Type</Label>
                          <Input
                              style={{ padding: "6px 10px" }}
                              type="select"
                              bsSize="sm"
                              className="form-select select-custom"
                              defaultValue={profile_type}
                              value={profile_type}
                              {...register("profile_type")}
                              onChange={(e) => {
                                setValue("profile_type", e.target.value, {
                                  shouldValidate: true,
                                });
                              }}
                          >
                            <option value="individual">Individual</option>
                            <option value="corporate">Corporate</option>
                            <option value="practitioner">Practitioner</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr />
                    <Row className="mt-3">
                      <Col xs="12">
                        <Btn
                          className="pull-right"
                          color="primary"
                          type={saveLoading ? `button` : `submit`}
                        >
                          {saveLoading ? "Saving..." : "Save"}
                        </Btn>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </CommonModal>
            </>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default List;
