import React, { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../../../utils/axiosRequests";
import { Btn } from "../../../../AbstractElements";
import CardHeaderCommon from "../../../../CommonElements/CardHeaderCommon/CardHeaderCommon";
import Loader from "../../../../Data/Ui-Kits/Loader/Loader";
import ToastCustom from "../../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";
import CommonModal from "../../../Ui-Kits/Modal/Common/CommonModal";
import { boolean } from "yup";

interface PropertyItem {
  id: string;
  name: string;
  status: number;
}

interface FormInputs {
  name: string;
  status: number;
}

const Leaves = () => {
  //const userInfo = useSelector((state: any) => state.auth.data);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [id, setId] = useState<any>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      status: 1,
    },
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      //const res = await getRequest(`settings/common?type=${type}`);
      const res = await getRequest('settings/leaves');
      setItems(res.data);
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
        await deleteRequest(`settings/leaves/${id}`)
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
      console.log("id", id);
      setSaveLoading(true);
      const inputData = { ...data };
      const res = id
        ? await patchRequest(`settings/leaves/${id}`, inputData)
        : await postRequest("settings/leaves", inputData);
      if (id) {
        setItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? res.data : item))
        );
      } else {
        setItems((prevItems) => [...prevItems, res.data]);
      }

      setMessage(res?.message);
      setOpen(true);
      setModalOpen(false);
      reset();
    } catch (error: any) {
      setErrorMsg(error?.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const modalTwoToggle = () => setModalOpen(!modalOpen);

  const editData = (item: any) => {
    console.log(item, "item")
    setErrorMsg("");
    setId(item.id);
    setValue("name", item.name); // Pre-fill the name
    setValue("status", item.status ? 1 : 0); // Pre-fill the status
    setModalOpen(true);
  };

  const openModal = () => {
    setId("");
    setErrorMsg("");
    setValue("name", "");
    setValue("status", 1);
    setModalOpen(true);
  };

  const name = watch("name");
  const status = watch("status");

  return (
    <Col xl="9">
      <Card className="profile-right">
        <CardHeaderCommon title={'Leaves'} tagClass="card-title mb-0" />
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
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.length > 0 &&
                      items.map((item: any, index: number) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.status ? "Active" : "Inactive"}</td>
                          <td className="action-td">
                            <span className="text-success">
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
                    <Col>
                      <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                        Leave
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
                    <Row className="g-3">
                      <Col md="12">
                        <Label>Name</Label>
                        <Input
                          bsSize="sm"
                          type="text"
                          className={`${errors?.name ? "is-invalid" : ""}`}
                          {...register("name", {
                            required: "This field is required",
                            maxLength: {
                              value: 40,
                              message:
                                "Name can't be longer than 40 characters",
                            },
                            minLength: {
                              value: 3,
                              message:
                                "Name can't be less than 3 characters",
                            },
                          })}
                          onChange={(e) => {
                            setValue("name", e.target.value);
                          }}
                          defaultValue={name}
                        />
                        {errors?.name && (
                          <span className="error-msg">
                            {errors?.name?.message}
                          </span>
                        )}
                        {errorMsg && (
                          <span className="error-msg">{errorMsg}</span>
                        )}
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <Label>Status</Label>
                          <Input
                            style={{ padding: "6px 10px" }}
                            type="select"
                            bsSize="sm"
                            className={`form-select select-custom ${errors?.status ? "is-invalid" : ""
                              }`}
                            {...register("status", {
                              required: "This field is required",
                            })}
                            defaultValue={status} // Watch for changes
                            value={status} // Watch for changes
                            onChange={(e) => setValue("status", parseInt(e.target.value))} // Convert string to number
                          >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                          </Input>
                          {errors?.status && (
                            <span className="error-msg">
                              {errors?.status?.message}
                            </span>
                          )}
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

export default Leaves;
