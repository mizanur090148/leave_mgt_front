import ReactApexChart from 'react-apexcharts'
import { salesChartData } from '../../../../Data/Dashboard/DefaultChartData'

const SalesStatisticChart = () => {
  return (
    <ReactApexChart id="chart-dash-2-line" options={salesChartData} series={salesChartData.series} height={270} type='line' />
  )
}

export default SalesStatisticChart