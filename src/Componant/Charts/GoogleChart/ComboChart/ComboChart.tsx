import Chart from 'react-google-charts'
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { ComboCharts } from '../../../../utils/Constant'
import { comboChartData, comboChartDataOption } from '../../../../Data/Charts/GoogleChart/GoogleChartData'

const ComboChart = () => {
  return (
    <Col sm="12" className="box-col-12">
      <Card>
        <CommonCardHeader title={ComboCharts} />
        <CardBody className="chart-block">
          <div className="chart-overflow" id="combo-chart">
            <Chart chartType="ComboChart" width="100%" height="500px" data={comboChartData} options={comboChartDataOption} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ComboChart