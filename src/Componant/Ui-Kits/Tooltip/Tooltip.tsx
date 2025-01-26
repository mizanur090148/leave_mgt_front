import { Container, Row } from 'reactstrap'
import BasicTooltips from './BasicTooltips/BasicTooltips'
import ColoredTooltip from './ColoredTooltip/ColoredTooltip'
import TooltipDirections from './TooltipDirections/TooltipDirections'
import ElementsWithHoverEffect from './ElementsWithHoverEffect/ElementsWithHoverEffect'
import FilledTooltip from './FilledTooltip/FilledTooltip'

const TooltipContainer = () => {
  return (
    <Container fluid>
        <Row>
          <BasicTooltips />
          <ColoredTooltip />
          <TooltipDirections />
          <ElementsWithHoverEffect />
          <FilledTooltip />
        </Row>
    </Container>
  )
}

export default TooltipContainer