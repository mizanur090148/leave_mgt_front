import { Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Btn, H1, P } from "../../../../../../AbstractElements";
import { Add, Cancel, CategoryName, CreateNewCategoryHeading, Href } from "../../../../../../utils/Constant";
import { useState } from "react";
import SimpleMdeReact from "react-simplemde-editor";

const CreateNewCategory = () => {
  const mdeEditorText = `Enter your messages...`;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <Col xs="12">
      <div className="category-buton">
        <Btn color="primary" className="bg-light-primary" href={Href} onClick={toggle}>
          <i className="me-2 fa fa-plus"> </i>{CreateNewCategoryHeading}
        </Btn>
      </div>
      <Modal isOpen={modal} toggle={toggle} size="lg" >
        <div className="modal-header">
          <H1 className="modal-title fs-5">{CreateNewCategoryHeading}</H1>
          <Btn className="btn-close" onClick={toggle} />
        </div>
        <ModalBody className="custom-input">
          <div className="create-category">
            <Label for="validationServer01">
              {CategoryName} <span className="txt-danger"> *</span>
            </Label>
            <Input className="m-0" id="validationServer01" type="text" required />
            <div id="editor3" >
              <SimpleMdeReact id="editor_container" value={mdeEditorText} options={{ autofocus: true, spellChecker: false }} />
            </div>
            <P className="f-light">
              Improve product visibility by adding a compelling description.
            </P>
          </div>
        </ModalBody>
        <ModalFooter>
          <Btn color="light" onClick={toggle}> {Cancel}</Btn>
          <Btn color="primary" onClick={toggle}> {Add}</Btn>
        </ModalFooter>
      </Modal>
    </Col>
  );
};

export default CreateNewCategory;
