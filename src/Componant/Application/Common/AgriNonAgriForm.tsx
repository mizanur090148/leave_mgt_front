import { Col, FormGroup, Input, Label, Row, Form } from "reactstrap";
import { propertyTypes } from "../../../utils/helpers";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  deleteRequest,
  patchRequest,
  postRequest,
} from "../../../utils/axiosRequests";
import AgriNonAgriPartial from "./AgriNonAgriPartial";
import { Btn } from "../../../AbstractElements";
import ToastCustom from "../../BonusUi/Toast/LiveToast/TopToast/ToastCustom";

type PropertyProps = {
  items: any;
  setItems: any;
};

const AgriNonAgriForm = ({ items, setItems }: PropertyProps) => {
  const userInfo = useSelector((state: any) => state.auth.data);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const handleInput = (key: any, fieldName: string, value: any) => {
    items[key][fieldName] = value;
    setItems([...items]);
  };

  const onSubmit: SubmitHandler<any> = (inputData: any) => {
    const inputArr = items.map((item: any) => ({
      ...item,
      user_id: userInfo.id,
      type: "non-agri",
    }));
    setSaveLoading(true);
    const actionType = postRequest(`agri-non-agri-lands`, {
      ...inputArr,
    });
    actionType
      .then((res: any) => {
        setMessage("Successfully Updated");
        setOpen(true);
        setSaveLoading(false);
      })
      .catch((error) => {
        setSaveLoading(false);
        console.log("from react query error: ", error.message);
      });
  };

  const addMore = () => {
    setItems([
      ...items,
      {
        property_type: "",
        location_of_property: "",
        date_of_purchase: null,
        size_of_property: "",
        net_value_of_property: "",
      },
    ]);
  };

  const deleteAction = async (id: any, index: number) => {
    const updatedData = [...items];
    if (id) {
      await deleteRequest(`agri-non-agri-lands/${id}`)
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
  };

  // const getForms = () => {
  //   return items.map((item: object, key: number) => {
  //     console.log(item, "item");
  //     return (
  //       <AgriNonAgriPartial
  //         key={key}
  //         item={item}
  //         handleInput={handleInput}
  //         deleteAction={deleteAction}
  //         serial={key}
  //       />
  //     );
  //   });
  // };

  return (
    <>
      {open && message && (
        <ToastCustom message={message} open={open} setOpen={setOpen} />
      )}
      <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
        {/* {items.map((item: any, key:) => (
          <AgriNonAgriPartial
            key={key}
            serial={key}
            item={item}
            handleInput={handleInput}
            deleteAction={deleteAction}
            register={register}
            errors={errors}
          />
        ))} */}
        <Btn
          className="btn-full mb-2"
          color="outline-info"
          type="button"
          onClick={() => addMore()}
        >
          Add More <i className="fa fa-plus-circle pl-2"></i>
        </Btn>
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
      </Form>
    </>
  );
};

export default AgriNonAgriForm;
