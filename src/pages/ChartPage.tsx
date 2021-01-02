import React from 'react'
import { createStyles, makeStyles,  Theme } from '@material-ui/core'
import { VictoryPie , VictoryChart, VictoryLine, VictoryTheme} from "victory";
import { playlistsApi } from '../api/playlistsApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
     container: {
        maxWidth: '1300px',
        margin: '0px auto'
   },
   items_chart: {
       display: 'flex',
       marginTop: '50px'
   },
   items_chart_title: {
       textAlign: 'center'
   }
  }),
);

const CharPage = () => {
    const classes = useStyles();
    const [chartstate, setchartstate] = React.useState({
        viewsPlaylists: undefined
    })
    const [chartstate2, setchartstate2] = React.useState({
        subscribersUsers: undefined
    })

    const [LoadState, setLoadState] = React.useState(false);


    React.useEffect( () => {
        playlistsApi.GetChartData().then( res => {
            setLoadState(true);
            setchartstate({
                viewsPlaylists: res.data
            })
        })
        

   
    }, [])

    React.useEffect( () => {
      playlistsApi.GetChartData2().then ( res => {
        setchartstate2({
            subscribersUsers: res.data
        })
    })
    }, [])

 
  

  

    return (
        <div className={classes.container}>
          <div className={classes.items_chart}>
              {chartstate.viewsPlaylists && chartstate.viewsPlaylists.length > 0 ? <div className="item_chart">
                    <div className={classes.items_chart_title}>
                        Количество просмотров
                    </div>
                <VictoryPie 
             style={{
                labels: {
                  fontSize: 18, fill: "#ffffff", zIndex: 3
                }
              }}
            padAngle={({ datum }) => datum.x}
            innerRadius={100}
                width={850}
                name = "series-1"
                colorScale={["tomato", "orange", "gold", "cyan", "navy", "#FF00FF" ]}
                startAngle={90}
                endAngle={450}
                labels={({ datum }) => `${datum.x}: ${String(datum.y)}`}
                padAngle={({ datum }) => datum.x}
               
               
                data={chartstate.viewsPlaylists}
            />
                </div> : ""}
             {chartstate2.subscribersUsers && chartstate2.subscribersUsers.length > 0 ?   <div className="item_chart">
                <div className={classes.items_chart_title}>
                        Соотношение пользователей и ваших подписчиков
                    </div>
                <VictoryPie 
             style={{
                labels: {
                  fontSize: 18, fill: "#ffffff", zIndex: 3
                }
              }}
            innerRadius={100}
                width={850}
                name = "series-1"
                colorScale={["purple", "#00FA9A"  ]}
                startAngle={90}
                endAngle={450}
                labels={({ datum }) => `${datum.x}: ${datum.y}`}
                padAngle={({ datum }) => datum.x}
                data={chartstate2.subscribersUsers}

            />
                </div> : "Статистика отсутствует"}
            </div>
        </div>
        
            
  
        
    )
}

export default CharPage
