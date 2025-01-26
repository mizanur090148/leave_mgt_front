import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { BasicModal } from '../../../../utils/Constant'
import SimpleModal from './SimpleModal'
import { basicData } from '../../../../Data/Ui-Kits/Modal/Modal'
import ScrollingModal from './ScrollingModal'
import ToolTipAndPopover from './ToolTipAndPopover/ToolTipAndPopover'
import OpenModalMofi from './OpenModalMofi/OpenModalMofi'

const BasicModalCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={BasicModal} span={basicData} />
        <CardBody className="badge-spacing">
          <SimpleModal />
          <ScrollingModal />
          <ToolTipAndPopover />
          <OpenModalMofi />
        </CardBody>
      </Card>
    </Col>
  )
}

export default BasicModalCart