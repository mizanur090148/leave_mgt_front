import { Fragment, useState } from "react";
import { Btn, H4 } from "../../../../AbstractElements";
import { CheckCircle } from "react-feather";
import {
  AddNewTask,
  Cancel,
  Collection,
  Description,
  NewTask,
  Save,
  TaskTitle,
} from "../../../../utils/Constant";
import {
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormDataTypes } from "../../../../Types/Application/Tasks";

import { SubmitHandler, useForm } from "react-hook-form";
import { setAllTasks } from "../../../../Store/Slices/TasksSlice";

const NewTaskClass = () => {
  const { allTasks } = useSelector((state: any) => state.tasks);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataTypes>();

  const [addModal, setAddModal] = useState(false);
  const addToggle = () => {
    setAddModal(!addModal);
    reset({
      description: "",
      title: "",
    });
  };

  const addTask: SubmitHandler<FormDataTypes> = (data: any) => {
    if (data.description !== "" && data.title !== "") {
      const taskTemp = {
        id: allTasks.length + 1,
        title: data.title,
        collection: "General",
        description: data.description,
      };
      dispatch(setAllTasks([...allTasks, taskTemp]));
      setAddModal(false);
      reset({
        description: "",
        title: "",
      });
    }
  };
  return (
    <Fragment>
      <Btn
        block
        color="transparent"
        className="badge-light-primary txt-primary btn-mail w-100"
        onClick={addToggle}
      >
        <CheckCircle className="me-2" /> {NewTask}
      </Btn>
      <Modal isOpen={addModal} toggle={addToggle} size="lg">
        <div className="modal-header">
          <H4 className="modal-title">{AddNewTask}</H4>
          <Btn color="transparent" onClick={addToggle}></Btn>
        </div>
        <ModalBody>
          <form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(addTask)}
          >
            <Row>
              <Col md="12">
                <FormGroup className="create-group">
                  <Label>{TaskTitle}</Label>
                  <input
                    className="form-control"
                    type="text"
                    {...register("title", { required: true })}
                  />
                  <span style={{ color: "red" }}>
                    {errors.title && "Title is required"}
                  </span>
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup className="create-group">
                  <Label>{Collection}</Label>
                  <Input
                    className="js-example-disabled-results"
                    name="collection"
                    type="select"
                  >
                    <option value="general">{"General"}</option>
                    <option value="fs">{"Fs"}</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup className="create-group">
                  <Label>{Description}</Label>
                  <input
                    className="form-control"
                    type="textarea"
                    {...register("description", { required: true })}
                  />
                  <span style={{ color: "red" }}>
                    {errors.description && "Description is required"}
                  </span>
                </FormGroup>
              </Col>
            </Row>
            <Btn color="secondary" className="me-1">
              {Save}
            </Btn>
            <Btn color="primary" onClick={addToggle}>
              {Cancel}
            </Btn>
          </form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default NewTaskClass;
