import { Container, Row } from 'reactstrap'
import WorldMap from './WorldMap/WorldMap'
import USAMap from './USAMap/USAMap'
import IndiaMap from './IndiaMap/IndiaMap'
import AustraliaMap from './AustraliaMap/AustraliaMap'

const LeafletMapsContainer = () => {
  return (
    <Container fluid>
      <Row>
        <WorldMap />
        <USAMap />
        <IndiaMap />
        <AustraliaMap/>
      </Row>
    </Container>
  )
}

export default LeafletMapsContainer