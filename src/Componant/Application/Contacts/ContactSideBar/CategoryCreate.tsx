import { Btn } from "../../../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryModal } from "../../../../Store/Slices/ContactSlice";
import {
  AddCategory,
  Cancel,
  EnterCategoryName,
  Save,
} from "../../../../utils/Constant";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

const CategoryCreate = () => {
  const { categoryModal } = useSelector((state: any) => state.contact);
  const dispatch = useDispatch();
  const categoryToggle = () => dispatch(setCategoryModal());
  return (
    <>
      <Btn
        color="transparent"
        className="btn-category"
        onClick={categoryToggle}
      >
        <span className="title"> + {AddCategory}</span>
      </Btn>
      <Modal fade isOpen={categoryModal} toggle={categoryToggle}>
        <ModalHeader toggle={categoryToggle}>{AddCategory}</ModalHeader>
        <ModalBody>
          <Form className="form-bookmark">
            <Row className="g-2">
              <Col md="12">
                <FormGroup>
                  <Input
                    type="text"
                    required
                    placeholder={EnterCategoryName}
                    autoComplete="off"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Btn color="secondary" className="me-1" onClick={categoryToggle}>
              {Save}
            </Btn>
            <Btn color="primary" onClick={categoryToggle}>
              {Cancel}
            </Btn>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CategoryCreate;
