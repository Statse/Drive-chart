import Chart from 'react-apexcharts'

export default function PieChart(props){
    const {data} = props

    const series= [{
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        },
        {
            name: 'series-1',
            data: [30, 10, 25, 10, 99, 40, 90, 11, 15]
        }]
    
      const options = {
        chart: {
          id: 'apexchart-example',
          type: 'pie',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      }
    return( 
        <Chart options={options} series={series} type="bar" width={500} height={320} />
    )
}