export default function SeriesMappers(downs) {
    let series = []
    let currentSeries = []

    let currentTeam = downs[0].possession
    let currentQuater = downs[0].quarter

    downs.map((down, index)=>{
        if (currentTeam !== down.possession || (currentQuater === 3 && down.quarter === 4)){
            //change series possession
            currentTeam = down.possession 
            
            //push previous series to series
            series.push(currentSeries)

            //reset current series
            currentSeries = []
        } 
        currentSeries.push(down)
    })
    return series
}