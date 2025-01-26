import { H1, P } from '../../../../AbstractElements';
import { Card, CardBody, Col } from 'reactstrap';
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon';
import { EditorsText, InlineEditors } from '../../../../utils/Constant';

const InlineEditor = () => {
    const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at vulputate urna, sed dignissim arcu. Aliquam at ligula imperdiet, faucibus ante a, interdum enim. Sed in mauris a lectus lobortis condimentum. Sed in nunc magna. Quisque massa urna, cursus vitae commodo eget, rhoncus nec erat. Sed sapien turpis, elementum sit amet elit vitae, elementum gravida eros. In ornare tempus nibh ut lobortis. Nam venenatis justo ex, vitae vulputate neque laoreet a.";

    return (
      <Col sm="12">
        <Card>
          <CardHeaderCommon title={InlineEditors} />
          <CardBody>
            <div id="area1" contextMenu="true">
              <H1>{EditorsText}</H1>
              <P>{loremText}</P>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
}

export default InlineEditor