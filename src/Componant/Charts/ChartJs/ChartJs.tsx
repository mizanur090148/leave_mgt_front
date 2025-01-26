import { Container, Row } from 'reactstrap'
import BarChart from './BarChart/BarChart'
import LineGraph from './LineGraph/LineGraph'
import RadarGraph from './RadarGraph/RadarGraph'
import LineChart from './LineChart/LineChart'
import DoughnutChart from './DoughnutChart/DoughnutChart'
import PolarChart from './PolarChart/PolarChart'

const ChartJsContainer = () => {
  return (
    <Container fluid>
      <Row>
        <BarChart />
        <LineGraph />
        <RadarGraph />
        <LineChart />
        <DoughnutChart />
        <PolarChart />
      </Row>
    </Container>
  )
}

export default ChartJsContainer