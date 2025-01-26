import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import CardHeaderCommon from '../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { SupportTicketList } from '../../../utils/Constant'
import { supportData } from '../../../Data/SupportTicket/SupportTicket'
import TicketList from './TicketList/TicketList'
import TicketTable from './TicketTable/TicketTable'

const SupportTicketContainer = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardHeaderCommon title={SupportTicketList} span={supportData} headClass="card-no-border pb-0" />
            <CardBody>
              <TicketList />
              <TicketTable />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SupportTicketContainer