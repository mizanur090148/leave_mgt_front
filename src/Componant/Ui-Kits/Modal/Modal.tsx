import { Container, Row } from 'reactstrap'
import BasicModalCart from './BasicModalCart/BasicModalCart'
import SizeModalCart from './SizeModalCart/SizeModalCart'
import FullScreenModals from './FullScreenModals/FullScreenModals'
import CenteredModal from './CenteredModal/CenteredModal'
import ToggleBetweenModals from './ToggleBetweenModals/ToggleBetweenModals'
import StaticBackdropModal from './StaticBackdropModal/StaticBackdropModal'
import MofiCustomModals from './MofiCustomModals/MofiCustomModals'

const ModalContainer = () => {
  return (
    <Container fluid>
      <Row>
        <BasicModalCart />
        <SizeModalCart />
        <FullScreenModals />
        <CenteredModal />
        <ToggleBetweenModals />
        <StaticBackdropModal />
        <MofiCustomModals />
      </Row>
    </Container>
  )
}

export default ModalContainer