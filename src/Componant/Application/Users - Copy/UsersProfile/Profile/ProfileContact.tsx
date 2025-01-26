import { Col, Row } from 'reactstrap'
import { H6 } from '../../../../../AbstractElements'
import { userProfileData } from '../../../../../Data/Application/Users/UsersProfile/UsersProfile'

const ProfileContact = () => {
  return (
    <Col sm="6" xl="4" className="order-sm-2 order-xl-2">
      <Row className="g-3">
        {userProfileData.slice(2,4).map((data,i)=>(
          <Col md="6" className="mt-0 mt-sm-3" key={i}>
            <div className="ttl-info text-start">
              <H6>
                <i className={`fa fa-${data.icon}`} /> {data.title}
              </H6>
              <span>{data.detail}</span>
            </div>
          </Col>
        ))}
      </Row>
    </Col>
  )
}

export default ProfileContact