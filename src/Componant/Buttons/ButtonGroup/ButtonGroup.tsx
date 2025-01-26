import { Container, Row } from 'reactstrap'
import BasicButtonGroup from './BasicButtonGroup/BasicButtonGroup'
import EdgesButtonGroup from './EdgesButtonGroup/EdgesButtonGroup'
import FlatButtonGroup from './FlatButtonGroup/FlatButtonGroup'
import LargeButtonGroup from './LargeButtonGroup/LargeButtonGroup'
import LargeEdgesButtonGroup from './LargeEdgesButtonGroup/LargeEdgesButtonGroup'
import OutlineCustomButtonGroup from './OutlineCustomButtonGroup/OutlineCustomButtonGroup'
import OutlineCustomButtonGroups from './OutlineCustomButtonGroups/OutlineCustomButtonGroups'
import OutlineButtonGroup from './OutlineButtonGroup/OutlineButtonGroup'
import OutlineEdgesButton from './OutlineEdgesButton/OutlineEdgesButton'
import OutlineFlatButton from './OutlineFlatButton/OutlineFlatButton'
import RadioButtonGroup from './RadioButtonGroup/RadioButtonGroup'
import CheckBoxButtonGroup from './CheckBoxButtonGroup/CheckBoxButtonGroup'
import Nesting from './Nesting/Nesting'
import Vertical from './Vertical/Vertical'

const ButtonGroupContainer = () => {
  return (
    <Container fluid>
      <Row>
        <BasicButtonGroup />
        <EdgesButtonGroup />
        <FlatButtonGroup />
        <LargeButtonGroup />
        <LargeEdgesButtonGroup />
        <OutlineCustomButtonGroup />
        <OutlineCustomButtonGroups />
        <OutlineButtonGroup />
        <OutlineEdgesButton />
        <OutlineFlatButton />
        <RadioButtonGroup />
        <CheckBoxButtonGroup />
        <Nesting />
        <Vertical />
      </Row>
    </Container>
  )
}

export default ButtonGroupContainer