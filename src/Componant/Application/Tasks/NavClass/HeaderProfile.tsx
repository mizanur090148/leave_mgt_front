import { H4, Image, P } from '../../../../AbstractElements'
import { dynamicImage } from '../../../../Service'

const HeaderProfile = () => {
  return (
    <div className="d-flex">
      <div className="media-size-email">
        <Image
          className="me-3 rounded-circle"
          src={dynamicImage("user/user.png")}
          alt="user"
        />
      </div>
      <div className="flex-grow-1">
        <H4>{'MARK JENCO'}</H4>
        <P>{'Markjecno@gmail.com'}</P>
      </div>
    </div>
  )
}

export default HeaderProfile