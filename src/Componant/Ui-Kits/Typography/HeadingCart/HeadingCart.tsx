import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { Headings } from '../../../../utils/Constant'
import { headingData } from '../../../../Data/Ui-Kits/Typography/Typography'
import HeadingsBody from './HeadingsBody'

const HeadingCart = () => {
  return (
    <Col xxl="6">
      <Card className="height-equal">
        <CardHeaderCommon title={Headings} span={headingData} />
        <HeadingsBody />
      </Card>
    </Col>
  )
}

export default HeadingCart