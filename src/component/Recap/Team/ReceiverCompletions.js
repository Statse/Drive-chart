import React from 'react'
import Chart  from 'react-apexcharts'
import StatCard from '../Wrappers/StatCard'

export default function ReceiverSeparation(props) {
    const {game, team} = props
    const {downs} = game

    //Count how many times each receiver got the ball
    let tempReceivers = []
    let receivers = []

    const passes = downs.filter((down)=>{
        if (down.possession.toLowerCase() === team){
            if (down.result !== "Incomplete" && down.result !== "Interception" && down.playType === "Pass"  && down.result !== "Penalty" && parseInt(down.receiver) !== 0){
       

                if (tempReceivers.includes(parseInt(down.carrier))){
                  receivers.forEach((rec, index) => {
                    if(rec.number ===  down.carrier) {
                        receivers[index].yards = receivers[index].yards + (parseInt(down.endYardline) - parseInt(down.startYardline));
                        receivers[index].targets = receivers[index].targets + 1
                    }
                })
                } else {
                    console.log("new carrier", down.carrier)
                    tempReceivers.push(parseInt(down.carrier))
                    receivers.push({
                        number: parseInt(down.carrier),
                        yards: parseInt(down.endYardline) - parseInt(down.startYardline),
                        targets: 1,
                    })
                }
                console.log(receivers)
            }
        }
    }) 


    const series = [
        {
            name: 'Targets',
            data: receivers.map((receiver)=>{return receiver.targets}),
        }]
      
      const options = {
        chart: {
          height: 350,
          type: 'radar',
        },
        title: {
          text: 'Receiver completions'
        },
        xaxis: {
          categories: receivers.map((receiver)=>{return "#"+receiver.number})
        },
        responsive: [{
        breakpoint: 480,
        options: {
            chart: {
            width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
        }]
      }

    return (
        <StatCard>
            <Chart options={options} series={series} type="radar" height={350} />
        </StatCard>
    )
}
