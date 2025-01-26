import { Users } from "react-feather";
import { Btn } from "../../../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  setContactValidation,
  setModal,
} from "../../../../Store/Slices/ContactSlice";
import { ContactUsersType } from "../../../../Types/Application/Contacts";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AddContacts,
  Cancel,
  EmailAddress,
  FirstName,
  LastName,
  Mobile,
  Name,
  NewContacts,
  Phone,
  Save,
} from "../../../../utils/Constant";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

const CreateContact = () => {
  const { modal, contactValidation } = useSelector(
    (state: any) => state.contact
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ContactUsersType>();
  const dispatch = useDispatch();
  const toggle = () => dispatch(setModal());

  const AddContact: SubmitHandler<ContactUsersType> = (data: any) => {
    if (data !== undefined) {
      dispatch(createUser(data));
      dispatch(setModal());
      reset();
    }
  };
  return (
    <>
      <Btn
        block
        className="badge-light-primary w-100 btn-mail"
        color="transparent"
        onClick={toggle}
      >
        <Users className="me-2" />
        {NewContacts}
      </Btn>
      <Modal
        className="modal-bookmark"
        isOpen={modal}
        toggle={toggle}
        size="lg"
      >
        <ModalHeader toggle={toggle}>{AddContacts}</ModalHeader>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(AddContact)}
          >
            <Row className="g-3">
              <Col md="12">
                <Label check>{Name}</Label>
                <Row>
                  <Col sm="6">
                    <input
                      className={`form-control ${
                        contactValidation &&
                        `${errors.name ? "is-invalid" : "is-valid"}`
                      }`}
                      type="text"
                      {...register("name", { required: true })}
                      placeholder={FirstName}
                    />
                  </Col>
                  <Col sm="6">
                    <input
                      className={`form-control ${
                        contactValidation &&
                        `${errors.sureName ? "is-invalid" : "is-valid"}`
                      }`}
                      type="text"
                      {...register("sureName", { required: true })}
                      placeholder={LastName}
                    />
                  </Col>
                </Row>
              </Col>
              <Col md="12">
                <Label check>{EmailAddress}</Label>
                <input
                  className={`form-control ${
                    contactValidation &&
                    `${errors.email ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("email", { required: true })}
                />
              </Col>
              <Col md="12">
                <Label check>{Phone}</Label>
                <Row>
                  <Col sm="6">
                    <input
                      className={`form-control ${
                        contactValidation &&
                        `${errors.mobile ? "is-invalid" : "is-valid"}`
                      }`}
                      type="number"
                      {...register("mobile", { required: true })}
                    />
                  </Col>
                  <Col sm="6">
                    <Label check>{Mobile}</Label>
                    <Input type="select">
                      <option>{"Mobile"}</option>
                      <option>{"Work"}</option>
                      <option>{"Other"}</option>
                    </Input>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Btn
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setContactValidation(true))}
            >
              {Save}
            </Btn>
            <Btn color="primary" onClick={toggle}>
              {Cancel}
            </Btn>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CreateContact;
