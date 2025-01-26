import { Row } from 'reactstrap'
import ProfileMail from './ProfileMail'
import ProfileName from './ProfileName'
import ProfileContact from './ProfileContact'
import SocialMedia from './SocialMedia'
import ProfileFollower from './ProfileFollower'

const ProfileDetail = () => {
  return (
    <div className="info">
      <Row className="g-3 step3">
        <ProfileMail />
        <ProfileName />
        <ProfileContact />
      </Row>
      <hr />
      <SocialMedia />
      <ProfileFollower />
    </div>
  )
}

export default ProfileDetail