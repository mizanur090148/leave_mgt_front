import { Breadcrumb, BreadcrumbItem, Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { BreadcrumbBonusUi, Breadcrumbs, Href, WithIconsBreadcrumbs } from '../../../../utils/Constant'
import { withIconBreadcrumbData } from '../../../../Data/BonusUi/Breadcrumb'
import { Link } from 'react-router-dom'

const WithIconsBreadcrumb = () => {
  return (
    <Col sm="6">
      <Card className="height-equal">
        <CardHeaderCommon title={WithIconsBreadcrumbs} span={withIconBreadcrumbData} />
        <CardBody>
          <Breadcrumb className="bg-white p-l-0">
            <BreadcrumbItem>
                <Link to={Href}><i className="fa fa-home"></i></Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{BreadcrumbBonusUi}</BreadcrumbItem>
          </Breadcrumb>
          <Breadcrumb className="bg-white m-b-0 p-b-0 p-l-0" >
            <BreadcrumbItem>
                <Link to={Href}><i className="fa fa-home"></i></Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Link to={Href}>{BreadcrumbBonusUi}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{Breadcrumbs}</BreadcrumbItem>
          </Breadcrumb>
        </CardBody>
      </Card>
    </Col>
  )
}

export default WithIconsBreadcrumb