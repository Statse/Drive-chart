import React from 'react'
import SeriesMappers from '../../helpers/Series'
import DownAccordion from './DriveChart/DownAccordion';



import Grid from '@material-ui/core/Grid';

export default function DriveChart(props) {
    const {game} = props
    const series = SeriesMappers(game.downs)
    return (
        <Grid container spacing={3}>
            {series.length && (
                <>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            (series.map((singleSeries, index)=>{
                                return <DownAccordion key={index} series={singleSeries} seriesIndex={index}/>
                            }))
                        }
                    </Grid>
                </>
            )}
        </Grid>
    )
}
