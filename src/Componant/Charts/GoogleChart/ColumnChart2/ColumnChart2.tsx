import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import Chart from 'react-google-charts'
import { ColumnChartTwo } from '../../../../utils/Constant'
import { columnCartTwoData, columnCartTwoDataOption } from '../../../../Data/Charts/GoogleChart/GoogleChartData'

const ColumnChart2 = () => {
  return (
    <Col sm="12" xl="6" className="box-col-6">
      <Card>
        <CommonCardHeader title={ColumnChartTwo} />
        <CardBody className="chart-block">
          <div className="chart-overflow" id="column-chart2">
            <Chart chartType="Bar" width="100%" height="400px" data={columnCartTwoData} options={columnCartTwoDataOption} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ColumnChart2