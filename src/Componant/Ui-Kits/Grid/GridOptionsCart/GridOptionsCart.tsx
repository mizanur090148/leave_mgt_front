import { Card, CardBody, Col, Table } from 'reactstrap'
import GridOptionTableHead from './GridOptionTableHead'
import GridOptionTableBody from './GridOptionTableBody'
import CardHeaderCommon from '../../../../CommonElements/CardHeaderCommon/CardHeaderCommon'
import { GridOptions } from '../../../../utils/Constant'
import { gridData } from '../../../../Data/Ui-Kits/Grid/GridData'

const GridOptionsCart = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon title={GridOptions} span={gridData} />
        <CardBody>
          <div className="table-responsive theme-scrollbar">
            <Table bordered striped responsive>
              <GridOptionTableHead />
              <GridOptionTableBody />
            </Table>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default GridOptionsCart