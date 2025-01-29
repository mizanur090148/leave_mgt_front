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

interface PropertyItem {
  id: string;
  name: string;
  leave_id: number,
  no_of_leaves: number,
}

interface FormInputs {
  name: string;
  status: number;
}

const CompanyLeaves = () => {
  //const userInfo = useSelector((state: any) => state.auth.data);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [id, setId] = useState<any>("");
  // const [items, setItems] = useState<PropertyItem[]>([
  //     {
  //       id: "",
  //       leave_id: "",
  //       no_of_leaves: "",
  //     },
  //   ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<{ items: PropertyItem[] }>({
    defaultValues: {
      items: [],
    },
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await getRequest('settings/leaves');
      const result = res?.data?.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          leave_id: 1,
          no_of_leaves: 10,
        };
      })
      if (result?.length) {
        setItems(result);
        reset({ items: result });
      }
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
    // setErrorMsg("");
    // setId(item.id);
    // setValue("name", item.name); // Pre-fill the name
    // setValue("status", item.status ? 1 : 0); // Pre-fill the status
    // setModalOpen(true);
  };

  return (
    <Col xl="9">
      <Card className="profile-right">
        <CardHeaderCommon title={'Company Leaves'} tagClass="card-title mb-0" />
        <CardBody>
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <>
              {open && message && (
                <ToastCustom message={message} open={open} setOpen={setOpen} />
              )}
              <div className="table-responsive">
                <table className="list-table table-hover my-0" style={{ width: '80%', alignContent: 'center' }}>
                  <thead>
                    <tr className="text-left">
                      <th>#</th>
                      <th>Status</th>
                      <th>Name</th>
                      <th style={{ width: '25%' }}>No. Of Leaves</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.length > 0 &&
                      items.map((item: any, key: number) => (
                        <tr key={item.id}>
                          <td>{key}</td>
                          <td>
                            <Input
                              type="checkbox"
                              checked={item.leave_id === item.id}
                              style={{
                                cursor: "pointer",
                                backgroundColor: item.leave_id === item.id ? "#7a70ba" : "lightgray",
                              }}
                              // onChange={(e) => {
                              //   const value = e.target.checked ? 1 : 0;
                              //   const updatedLands = [...items];
                              //   updatedLands[key].no_of_leaves = value;
                              //   setItems(updatedLands);
                              //   setValue(`items.${key}.no_of_leaves`, value);
                              // }}
                              onChange={(e) => {
                                const value = e.target.checked ? 1 : 0;
                                const updatedLands = [...items];
                                updatedLands[key].leave_id = item.id;
                                setItems(updatedLands);
                                setValue(`items.${key}.leave_id`, item.id);
                              }}
                            />
                            <Label style={{ marginLeft: "10px" }}>{item.leave_id === item.id ? 'Yes' : 'No'}</Label>
                          </td>
                          <td>{item.name}</td>
                          <td>
                            <Input
                              type="text"
                              bsSize="sm"
                              className="pl-2 mr-2"
                              placeholder="Registration No"
                              {...register(`items.${key}.no_of_leaves`, {
                                required: "This is required",
                                onChange: (e) => {
                                  const value = e.target.value;
                                  const updatedLands = [...items];
                                  updatedLands[key].no_of_leaves = value;
                                  setItems(updatedLands);
                                  setValue(`items.${key}.no_of_leaves`, value);
                                },
                              })}
                              defaultValue={item.no_of_leaves}
                            />
                            {errors.items?.[key]?.no_of_leaves && (
                              <span className="error-msg">
                                {errors.items[key]?.no_of_leaves?.message}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td colSpan={4} className="text-center">
                        <Btn
                          className="mt-2 mb-2"
                          color="primary"
                          size="sm"
                          type={saveLoading ? `button` : `submit`}
                        >
                          {saveLoading ? "Updating..." : "Update"}
                        </Btn>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default CompanyLeaves;
