import { Container } from 'reactstrap'
import { H5, Image } from '../../../../AbstractElements'
import { dynamicImage } from '../../../../Service'
import { WeAreComingSoon } from '../../../../utils/Constant'
import CountdownData from '../Common/CountdownData'

const ComingSoonSimpleContainer = () => {
  return (
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      <Container fluid className="p-0">
        <div className="comingsoon">
          <div className="comingsoon-inner text-center">
            <Image src={dynamicImage("other-images/logo-login.png")} alt="coming soon" />
            <H5>{WeAreComingSoon}</H5>
            <div className="countdown" id="clockdiv">
              <CountdownData />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ComingSoonSimpleContainer