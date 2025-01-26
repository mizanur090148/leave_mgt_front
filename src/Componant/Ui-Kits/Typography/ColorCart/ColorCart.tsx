import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { ColoredHeadings } from '../../../../utils/Constant'
import { headingData } from '../../../../Data/Ui-Kits/Typography/Typography'
import ColorHeadingBody from './ColorHeadingBody'

const ColorHeading = () => {
  return (
    <Col xxl="6">
      <Card className="height-equal">
        <CardHeaderCommon title={ColoredHeadings} span={headingData} />
        <ColorHeadingBody />
      </Card>
    </Col>
  )
}

export default ColorHeading