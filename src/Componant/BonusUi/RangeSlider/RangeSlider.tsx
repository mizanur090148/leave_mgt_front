import { Container, Row } from 'reactstrap'
import DefaultRangeSlider from './DefaultRangeSlider/DefaultRangeSlider'
import MinMaxValue from './MinMaxValue/MinMaxValue'
import NegativeValue from './NegativeValue/NegativeValue'
import Disabled from './Disabled/Disabled'
import Prefix from './Prefix/Prefix'
import FormatedLabel from './FormatedLabel/FormatedLabel'

const RangeSliderContainer = () => {
  return (
    <Container fluid>
      <Row>
        <DefaultRangeSlider />
        <MinMaxValue />
        <NegativeValue />
        <Disabled />
        <Prefix />
        <FormatedLabel />
      </Row>
    </Container>
  )
}

export default RangeSliderContainer