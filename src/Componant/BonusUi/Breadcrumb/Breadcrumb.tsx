import { Container, Row } from 'reactstrap'
import DefaultBreadcrumb from './DefaultBreadcrumb/DefaultBreadcrumb'
import DividerBreadcrumb from './DividerBreadcrumb/DividerBreadcrumb'
import WithIconsBreadcrumb from './WithIconsBreadcrumb/WithIconsBreadcrumb'
import VariationOfBreadcrumb from './VariationOfBreadcrumb/VariationOfBreadcrumb'
import ColoredBreadcrumb from './ColoredBreadcrumb/ColoredBreadcrumb'

const BreadcrumbContainer = () => {
  return (
    <Container fluid>
      <Row>
        <DefaultBreadcrumb />
        <DividerBreadcrumb />
        <WithIconsBreadcrumb />
        <VariationOfBreadcrumb />
        <ColoredBreadcrumb />
      </Row>
    </Container>
  )
}

export default BreadcrumbContainer