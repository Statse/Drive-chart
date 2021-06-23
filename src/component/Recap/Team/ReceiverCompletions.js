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
            
            const receiver = parseInt(down.carrier)

            if (down.result !== "Incomplete" 
            && down.result !== "Interception" 
            && down.playType === "Pass"  
            && down.result !== "Penalty" 
            && receiver !== 0){

                
                if (tempReceivers.includes(receiver)){
                  receivers.forEach((rec, index) => {
                    if(rec.number ===  receiver) {
                        receivers[index].yards = receivers[index].yards + (parseInt(down.endYardline) - parseInt(down.startYardline));
                        receivers[index].targets = receivers[index].targets + 1
                    }
                })
                } else {
                    tempReceivers.push(receiver)
                    receivers.push({
                        number: receiver,
                        yards: parseInt(down.endYardline) - parseInt(down.startYardline),
                        targets: 1,
                    })
                }
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
