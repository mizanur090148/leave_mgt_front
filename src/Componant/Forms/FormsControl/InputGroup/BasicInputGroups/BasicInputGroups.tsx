import { Card, Col } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { BasicInputGroup } from '../../../../../utils/Constant'
import { basicInputGroupData } from '../../../../../Data/Forms/FormsControl/InputGroup/InputGroup'
import BasicInputGroupsCardBody from './BasicInputGroupsCardBody'
import BasicInputGroupsCardFooter from './BasicInputGroupsCardFooter'

const BasicInputGroups = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={BasicInputGroup} span={basicInputGroupData} />
        <BasicInputGroupsCardBody/>
        <BasicInputGroupsCardFooter />
      </Card>
    </Col>
  )
}

export default BasicInputGroups