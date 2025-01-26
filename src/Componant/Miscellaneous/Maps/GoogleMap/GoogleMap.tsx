import { Container, Row } from 'reactstrap'
import BasicMap from './BasicMap/BasicMap'
import MarkerMapComp from './MarkerMapComp/MarkerMapComp'
import PolygonsComp from './PolygonsComp/PolygonsComp'
import PolylineMapComp from './PolylineMapComp/PolylineMapComp'

const GoogleMapContainer = () => {
  return (
    <Container fluid>
      <Row>
        <BasicMap />
        <MarkerMapComp />
        <PolygonsComp />
        <PolylineMapComp />
      </Row>
    </Container>
  )
}

export default GoogleMapContainer