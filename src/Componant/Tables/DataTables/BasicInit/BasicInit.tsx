import { Container, Row } from 'reactstrap'
import ZeroConfigurationTable from './ZeroConfigurationTable/ZeroConfigurationTable'
import StateSaving from './StateSaving/StateSaving'
import ScrollVerticalDynamicHeight from './ScrollVerticalDynamicHeight/ScrollVerticalDynamicHeight'

const BasicInitContainer = () => {
  return (
    <Container fluid>
      <Row>
        <ZeroConfigurationTable />
        <StateSaving />
        <ScrollVerticalDynamicHeight />
      </Row>
    </Container>
  )
}

export default BasicInitContainer