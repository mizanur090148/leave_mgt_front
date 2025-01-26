import { MdeEditorExample } from '../../../../utils/Constant';
import { Card, CardBody, Col, Row } from 'reactstrap';
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon';
import { SimpleMdeReact } from "react-simplemde-editor";

const MdeExampleOne = () => {
    const mdeEditorText = `Enter text in the area on the left. For more info, click the ? (help) icon in the menu.`;

    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardHeaderCommon title={MdeEditorExample} />
            <CardBody>
              <SimpleMdeReact id="editor_container" value={mdeEditorText} options={{ autofocus: true, spellChecker: false }} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
}

export default MdeExampleOne