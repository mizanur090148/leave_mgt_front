import { Card, CardBody, Col, Row } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { MofiCustomModal } from '../../../../utils/Constant'
import { customModalData } from '../../../../Data/Ui-Kits/Modal/Modal'
import ModalOne from './ModalOne/ModalOne'
import ModalTwo from './ModalTwo/ModalTwo'
import ModalThird from './ModalThird/ModalThird'

const MofiCustomModals = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={MofiCustomModal} span={customModalData} />
        <CardBody>
          <Row className="g-3">
            <ModalOne />
            <ModalTwo />
            <ModalThird />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default MofiCustomModals