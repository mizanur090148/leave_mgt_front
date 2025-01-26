import { Card, CardBody, Col, Form } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { DatePicker } from '../../../../../utils/Constant'
import DatePickerComponentFirst from './DatePickerComponentFirst'
import HumanFriendlyDatePicker from './HumanFriendlyDatePicker'
import MinMaxValueDatePicker from './MinMaxValueDatePicker'
import DisabledDatePickerComponent from './DisabledDatePickerComponent'
import MultiplesDates from './MultiplesDates'
import MyDatePicker from './MyDatePicker'
import DatePickerComponentLast from './DatePickerComponentLast'

const DatesPicker = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={DatePicker} />
        <CardBody className="main-flatpickr">
          <div className="card-wrapper border rounded-3">
            <Form className="timepicker-wrapper">
              <DatePickerComponentFirst />
              <HumanFriendlyDatePicker />
              <MinMaxValueDatePicker />
              <DisabledDatePickerComponent />
              <MultiplesDates />
              <MyDatePicker />
              <DatePickerComponentLast />
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DatesPicker