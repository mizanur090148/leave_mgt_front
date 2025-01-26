import { Container, Row } from 'reactstrap'
import DefaultCalendar from './DefaultCalendar/DefaultCalendar'
import BootstrapCalendar from './BootstrapCalendar/BootstrapCalendar'
import DatesPicker from './DatesPicker/DatesPicker'
import TimePicker from './TimePicker/TimePicker'

const DatePickerContainer = () => {
  return (
    <Container fluid>
      <Row>
        <DefaultCalendar />
        <BootstrapCalendar />
        <DatesPicker />
        <TimePicker />
      </Row>
    </Container>
  )
}

export default DatePickerContainer