import { Col, Form, Input, Label, Row } from "reactstrap";
import { ProductTitle } from "../../../../../../utils/Constant";
import { useDispatch } from "react-redux";
import { setFormValue } from "../../../../../../Store/Slices/AddProductSlice";
import { useSelector } from "react-redux";
import FormEditors from "./FormEditors";

const ProductOne = () => {
  const { formValue } = useSelector((state: any) => state.addProduct);
  const dispatch = useDispatch();
  return (
    <div className="sidebar-body">
      <Form>
        <Row className="g-2">
          <Col xs="12">
            <Label className="m-0">
              {ProductTitle} <span className="txt-danger"> *</span>
            </Label>
          </Col>
          <Col xs="12">
            <div className="custom-input">
              <Input
                className={formValue.userName !== "" ? "valid" : "is-invalid"}
                type="text"
                required
                name="userName"
                onChange={(e) =>
                  dispatch(
                    setFormValue({ name: "userName", value: e.target.value })
                  )
                }
              />
            </div>
          </Col>
          <FormEditors />
        </Row>
      </Form>
    </div>
  );
};

export default ProductOne;
