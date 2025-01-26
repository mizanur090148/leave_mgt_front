import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { DarkVariants } from '../../../../utils/Constant'
import CommonCarousel from '../Common/CommonCarousel'
import { darkVariantData, darkVariantDataList } from '../../../../Data/BonusUi/OwlCarousel'

const DarkVariant = () => {
  return (
    <Col xl="6" sm="12">
      <Card>
        <CardHeaderCommon title={DarkVariants} span={darkVariantData} />
        <CardBody>
          <CommonCarousel dark data={darkVariantDataList} control caption lightCaption indecators />
        </CardBody>
      </Card>
    </Col>
  )
}

export default DarkVariant