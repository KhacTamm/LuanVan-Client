import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'

// import { getAllOrder } from "../../../../actions/OrderAction";
import { getAllOrder } from '../../../../../redux/actions/OrderAction'
import { formatDate } from '../../../../../untils'

export default function ChartRevenue() {
    const dispatch = useDispatch()
    // const allOrder = useSelector((state) => state.allOrder.order)
    const { orderShipping } = useSelector((state) => state.allOrder)

    const quantityOrderDay = (time) => {
        const order = orderShipping
            ? orderShipping.filter((items) => {
                  return formatDate(items.updatedAt) === time
              })
            : []

        const result = order.reduce((accumulator, item) => {
            const result = accumulator + item.totalPriceFeeShip
            return result ? result : 0
        }, 0)

        return result
    }

    // const valueMonth = (month) => {
    //     const today = new Date()
    //     const date = today.getMonth()

    //     return date + month
    // }

    // const numberOfOrdersOnMonth = (month) => {
    //     if (orderShipping) {
    //         const order = orderShipping.filter((order) => {
    //             const orderShipping = new Date(order.updatedAt).getMonth()
    //             if (orderShipping + 1 === month) {
    //                 return order
    //             }
    //         })

    //         const result = order.reduce((accumulator, item) => {
    //             const result = accumulator + item.totalPrice
    //             return result ? result : 0
    //         }, 0)

    //         return result
    //     }
    //     return
    // }

    useEffect(() => {
        dispatch(getAllOrder())
    }, [dispatch])

    const chartOptions = {
        series: [
            {
                name: 'Tổng danh thu',
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
        options: {
            colors: ['rgb(109, 121, 181)'],

            chart: {
                background: 'transparent',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
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
            legend: {
                position: 'top',
            },
            grid: {
                show: false,
            },
        },
    }

    return (
        <div className="dashboard-middle-chart">
            <div className="dashboard-middle-chart_title">Doanh thu theo ngày</div>

            <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="line"
                height={225}
                width={'100%'}
            />
        </div>
    )
}
