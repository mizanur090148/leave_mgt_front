import { Container, Row } from 'reactstrap'
import ButtonAddons from './ButtonAddons/ButtonAddons'
import CustomForms from './CustomForms/CustomForms'
import CustomFileInput from './CustomFileInput/CustomFileInput'
import ButtonsWithDropdowns from './ButtonsWithDropdowns/ButtonsWithDropdowns'
import SegmentedButtons from './SegmentedButtons/SegmentedButtons'
import CheckboxesAndRadios from './CheckboxesAndRadios/CheckboxesAndRadios'
import Sizing from './Sizing/Sizing'
import MultipleInputs from './MultipleInputs/MultipleInputs'
import BasicInputGroups from './BasicInputGroups/BasicInputGroups'
import VariationOfAddons from './VariationOfAddons/VariationOfAddons'

const InputGroupContainer = () => {
  return (
    <Container fluid>
      <Row>
        <ButtonAddons />
        <CustomForms />
        <CustomFileInput />
        <ButtonsWithDropdowns />
        <SegmentedButtons />
        <CheckboxesAndRadios />
        <Sizing />
        <MultipleInputs />
        <BasicInputGroups />
        <VariationOfAddons />
      </Row>
    </Container>
  )
}

export default InputGroupContainer