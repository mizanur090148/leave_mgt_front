import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { LeafletAustraliaMap } from '../../../../../utils/Constant'
import { australiaMapData, australiaMapPosition } from '../../../../../Data/Maps/Maps'
import { MapContainer, TileLayer } from "react-leaflet";

const AustraliaMap = () => {
  return (
    <Col sm="6">
      <Card>
        <CardHeaderCommon title={LeafletAustraliaMap} span={australiaMapData}/>
        <CardBody>
          <MapContainer className="jvector-map-height z-0" style={{ height: 389 }} zoom={4} center={australiaMapPosition} zoomControl={true} doubleClickZoom={true} scrollWheelZoom={false} dragging={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </CardBody>
      </Card>
    </Col>
  )
}

export default AustraliaMap