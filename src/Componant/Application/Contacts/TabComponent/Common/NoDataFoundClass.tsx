import { Card, CardBody, CardHeader } from 'reactstrap'
import { H5, P } from '../../../../../AbstractElements'
import { NoDataFoundPropsType } from '../../../../../Types/Application/Contacts'

const NoDataFoundClass = ({ title }: NoDataFoundPropsType) => {
  return (
    <Card className="mb-0">
      <CardHeader className="d-flex">
        <H5>{title}</H5>
        <span className="f-14 pull-right mt-0">4 Contacts</span>
      </CardHeader>
      <CardBody>
        <P>No Data Found</P>
      </CardBody>
    </Card>
  )
}

export default NoDataFoundClass