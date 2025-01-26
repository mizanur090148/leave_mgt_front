import { Container, Row } from 'reactstrap'
import StockResult from './StockResult/StockResult'
import RowCreateCallback from './RowCreateCallback/RowCreateCallback'

const AdvanceInitContainer = () => {
  return (
    <Container fluid>
      <Row>
        <StockResult />
        <RowCreateCallback />
      </Row>
    </Container>
  )
}

export default AdvanceInitContainer