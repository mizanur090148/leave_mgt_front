import { Card, CardBody, Col } from 'reactstrap'
import Chart from 'react-google-charts'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { GanttCharts } from '../../../../utils/Constant'
import { ganttChartData, ganttChartDataOption } from '../../../../Data/Charts/GoogleChart/GoogleChartData'

const GanttChart = () => {
  return (
    <Col sm="12" className="box-col-12">
      <Card>
        <CommonCardHeader title={GanttCharts} />
        <CardBody className="chart-block">
          <div className="chart-overflow" id="gantt_chart">
            <Chart chartType="Gantt" width="100%" height="280px" data={ganttChartData} options={ganttChartDataOption} />
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default GanttChart