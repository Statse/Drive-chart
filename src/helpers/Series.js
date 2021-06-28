export default function SeriesMappers(downs) {
    let series = []
    let currentSeries = []

    let currentTeam = downs[0].possession
    let currentQuater = downs[0].quarter

    downs.map((down, index)=>{
        down.index = index
        if (down.playType === "KO" || currentTeam !== down.possession || (currentQuater === 3 && down.quarter === 4)){
            if (downs[index+1] && down.playType === "KO"){
                currentTeam = downs[index+1].possession
            } else {
                //change series possession
                currentTeam = down.possession 
            }

            //push previous series to series if it has downs
            if (currentSeries.length > 0){
                series.push(currentSeries)
            }

            //reset current series
            currentSeries = []
        } 
        
        //default push to series
        return currentSeries.push(down)
    })
    return series
}