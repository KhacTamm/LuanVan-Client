import Chart from 'react-apexcharts'
import './ChartReceipt.css'
import { formatDate } from '../../../../../untils'

function ChartReceipt({ orderShipping }) {
    const quantityOrderDay = (time) => {
        const result = orderShipping
            ? orderShipping.filter((items) => {
                  return formatDate(items.updatedAt) === time
              })
            : []
        return result ? result.length : 0
    }

    const chartOptions = {
        options: {
            colors: ['rgb(109, 121, 181)'],

            chart: {
                id: 'apexchart-example',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                color: '#000000',
            },
            xaxis: {
                categories: [
                    // formatDate(Date.now() - 777600000),
                    // formatDate(Date.now() - 691200000),
                    // formatDate(Date.now() - 604800000),
                    formatDate(Date.now() - 518400000),
                    formatDate(Date.now() - 432000000),
                    formatDate(Date.now() - 345600000),
                    formatDate(Date.now() - 259200000),
                    formatDate(Date.now() - 172800000),
                    formatDate(Date.now() - 86400000),
                    formatDate(Date.now()),
                ],
            },
        },
        series: [
            {
                name: 'Tổng đơn hàng',
                data: [
                    // quantityOrderDay(formatDate(Date.now() - 777600000)),
                    // quantityOrderDay(formatDate(Date.now() - 691200000)),
                    // quantityOrderDay(formatDate(Date.now() - 604800000)),
                    quantityOrderDay(formatDate(Date.now() - 518400000)),
                    quantityOrderDay(formatDate(Date.now() - 432000000)),
                    quantityOrderDay(formatDate(Date.now() - 345600000)),
                    quantityOrderDay(formatDate(Date.now() - 259200000)),
                    quantityOrderDay(formatDate(Date.now() - 172800000)),
                    quantityOrderDay(formatDate(Date.now() - 86400000)),
                    quantityOrderDay(formatDate(Date.now())),
                ],
            },
        ],
    }
    return (
        <div className="dashboard-middle-chart">
            <div className="dashboard-middle-chart_title">Đơn hàng theo ngày</div>
            <Chart options={chartOptions.options} series={chartOptions.series} type="bar" width={'100%'} height={225} />
        </div>
    )
}

export default ChartReceipt
