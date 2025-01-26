import { UserPropsType } from '../../../../../Types/Application/Users/UsersProfile'
import { Col, Row } from 'reactstrap'
import { H5, Image } from '../../../../../AbstractElements'
import { dynamicImage } from '../../../../../Service'

const CommonProfileHead = ({ activeTime }: UserPropsType) => {
  return (
    <Row className="g-2 align-items-center">
      <Col sm="8">
        <div className="d-flex">
          <Image className="img-thumbnail rounded-circle me-3" src={dynamicImage('user/7.jpg')} alt="Generic placeholder image" />
          <div className="flex-grow-1 align-self-center">
            <H5 className="mt-0 user-name">{'JOHAN DIO'}</H5>
          </div>
        </div>
      </Col>
      <Col sm="4" className="text-end">
        <small>{activeTime}</small>
      </Col>
    </Row>
  )
}

export default CommonProfileHead