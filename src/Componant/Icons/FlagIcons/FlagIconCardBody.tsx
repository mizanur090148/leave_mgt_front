import { CardBody, Col, Row } from 'reactstrap'
import { H5, H6 } from '../../../AbstractElements'
import { flagIconData } from '../../../Data/Icons/FlagIcons'
import { FlagIconType } from '../../../Types/Icons/IconsTypes'

const FlagIconCardBody:React.FC<FlagIconType> = ({ getITag }) => {
  return (
    <CardBody>
      <Row className="icon-lists flag-icons">
        {flagIconData.map((icon, index) => (
          <Col sm="6" xl="4" xs="12" key={index} onClick={() => getITag(icon.abbrivation)}>
            <div className="d-flex">
              <i className={`flag-icon flag-icon-${icon.abbrivation}`}></i>
              <div className="flex-grow-1">
                <H5 className="text-uppercase">{icon.abbrivation}</H5>
                <H6 className="mt-0">{icon.name}</H6>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </CardBody>
  )
}

export default FlagIconCardBody