import { Radar } from "react-chartjs-2";
import { Card, CardBody, Col } from 'reactstrap'
import CommonCardHeader from '../../../../CommonElements/CommonCardHeader/CommonCardHeader'
import { ChatJSRadarGraph } from '../../../../utils/Constant'
import { radarGraphChartData } from "../../../../Data/Charts/ChartJs/ChartJs";

const RadarGraph = () => {
  return (
    <Col xl="6" ms="12" className="box-col-6">
      <Card>
        <CommonCardHeader title={ChatJSRadarGraph} />
        <CardBody className="chart-block">
          <Radar id="myRadarGraph" data={radarGraphChartData} options={radarGraphChartData.options} width={778} height={400} />
        </CardBody>
      </Card>
    </Col>
  )
}

export default RadarGraph