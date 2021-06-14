export default function SeriesMappers(downs) {
    let series = []
    let currentSeries = []

    let currentTeam = downs[0].possession
    let currentQuater = downs[0].quarter

    downs.map((down, index)=>{

        if (currentTeam !== down.possession || currentQuater === 3 && down.quarter === 4){
            //change series possession
            currentTeam = down.possession 

            console.log("currentSeries", currentSeries, "----------")
            //push previous series to series
            series.push(currentSeries)

            //reset currentSeries
            currentSeries = []
        } else {
            //if team is same as last down then keep the series
            currentSeries.push(down)
        }
    })

    console.log("series", series)

    return series
}