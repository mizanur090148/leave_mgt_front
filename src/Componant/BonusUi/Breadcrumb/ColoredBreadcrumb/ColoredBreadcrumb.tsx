import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { ColoredBreadcrumbs } from '../../../../utils/Constant'
import { coloredBreadcrumbData } from '../../../../Data/BonusUi/Breadcrumb'
import StaticColoredBreadcrumb from './StaticColoredBreadcrumb'
import DynamicColoredBreadcrumb from './DynamicColoredBreadcrumb'

const ColoredBreadcrumb = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={ColoredBreadcrumbs} span={coloredBreadcrumbData} />
        <CardBody>
          <StaticColoredBreadcrumb />
          <DynamicColoredBreadcrumb />
        </CardBody>
      </Card>
    </Col>
  )
}

export default ColoredBreadcrumb