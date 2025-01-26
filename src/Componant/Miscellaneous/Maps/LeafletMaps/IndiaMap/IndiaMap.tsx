import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { LeafletIndiaMap } from '../../../../../utils/Constant'
import { indianMapData, indianMapPosition } from '../../../../../Data/Maps/Maps'
import { MapContainer, TileLayer } from "react-leaflet";

const IndiaMap = () => {
  return (
    <Col sm="6">
      <Card>
        <CardHeaderCommon title={LeafletIndiaMap} span={indianMapData} />
        <CardBody>
          <MapContainer className="jvector-map-height z-0" style={{ height: 389 }} zoom={5} center={indianMapPosition} zoomControl={true} doubleClickZoom={true} scrollWheelZoom={false} dragging={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </CardBody>
      </Card>
    </Col>
  )
}

export default IndiaMap