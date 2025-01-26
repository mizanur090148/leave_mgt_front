import { Card, Col, Table } from 'reactstrap'
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { AddprojectAndUpload, Date, Price, ProjectName, Status } from '../../../../../utils/Constant'
import AddProjectsAndUploadTableBody from './AddProjectsAndUploadTableBody'

const AddProjectsAndUpload = () => {
  return (
    <Col md="12">
      <Card>
        <CardHeaderCommon title={AddprojectAndUpload} tagClass="card-title mb-0" />
        <div className="table-responsive add-project theme-scrollbar">
          <Table className="card-table table-vcenter text-nowrap">
            <thead>
              <tr>
                <th>{ProjectName}</th>
                <th>{Date}</th>
                <th>{Status}</th>
                <th>{Price}</th>
                <th />
              </tr>
            </thead>
            <AddProjectsAndUploadTableBody />
          </Table>
        </div>
      </Card>
    </Col>
  )
}

export default AddProjectsAndUpload