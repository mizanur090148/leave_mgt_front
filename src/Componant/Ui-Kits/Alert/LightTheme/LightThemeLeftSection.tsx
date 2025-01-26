import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'
import { Alerts, P } from '../../../../AbstractElements'
import { Href } from '../../../../utils/Constant'
import { lightThemeList } from '../../../../Data/Ui-Kits/Alert/AlertData'

const LightThemeLeftSection = () => {
  return (
    <Col xl="6">
      <P className="mb-0 f-w-500">Primary Light Alert</P>
      <Alerts color="light-primary">
        <P className="txt-primary">This is a
          <Link className="alert-link txt-primary" to={Href}> primary alert</Link>
          with an example link.Check it out.
        </P>
      </Alerts>
      {lightThemeList.map((title, index) => (
        <Fragment key={index}>
          <P className="mb-0 f-w-500 text-capitalize">{title} Light Alert</P>
          <Alerts className={`alert-light-${title} border-0`}>
            <P className={`txt-${title}`}>{`This is a `}
              <Link className={`alert-link txt-${title}`} to={Href}>{title} alert</Link> with an example link. Check it out.
            </P>
          </Alerts>
        </Fragment>
      ))}
    </Col>
  )
}

export default LightThemeLeftSection