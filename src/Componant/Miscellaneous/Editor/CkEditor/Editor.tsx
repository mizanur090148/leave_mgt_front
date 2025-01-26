import { useState } from 'react'
import { Card, CardBody, Col } from 'reactstrap';
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon';
import { CKEditorExample } from '../../../../utils/Constant';
import CKEditors from "react-ckeditor-component";

const Editor = () => {
    const innerText = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at vulputate urna, sed dignissim arcu. Aliquam at ligula imperdiet, faucibus ante a, interdum enim. Sed in mauris a lectus lobortis condimentum. Sed in nunc magna. Quisque massa urna, cursus vitae commodo eget, rhoncus nec erat. Sed sapien turpis, elementum sit amet elit vitae, elementum gravida eros. In ornare tempus nibh ut lobortis. Nam venenatis justo ex, vitae vulputate neque laoreet a.</p>";

    const [content, setContent] = useState(innerText);
    const onChange = (evt: any) => {
      const newContent = evt.editor.getData();
      setContent(newContent);
    };
    return (
      <Col sm="12">
        <Card>
          <CardHeaderCommon title={CKEditorExample} />
          <CardBody>
            <CKEditors activeClassName="p10" content={content} events={{change: onChange}}/>
          </CardBody>
        </Card>
      </Col>
    );
}

export default Editor