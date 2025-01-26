import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { CalendarBootstrap } from '../../../../../utils/Constant'
import BootstrapCalendarBody from './BootstrapCalendarBody'

const BootstrapCalendar = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={CalendarBootstrap} />
        <BootstrapCalendarBody/>
      </Card>
    </Col>
  )
}

export default BootstrapCalendar