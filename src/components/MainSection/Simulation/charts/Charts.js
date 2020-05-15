import React,{useContext,useState,useEffect} from 'react'
import {GlobalContext} from '../../../../context/GlobalState'
import { Bar } from 'react-chartjs-2';

export default function Charts() {

    const { globalRoundScore,globalRoundTotalScore,globalSimulationState } = useContext(GlobalContext)

    const [chartData,setChartData]=useState({});
    const [chartDataTotal,setChartDataTotal]=useState({});
    const [chartOptions,setChartOptions]=useState({
                maintainAspectRatio: true,
                responsive: true,
                legend: {
                    display: true,
                    
                    labels: {
                        boxWidth: 0,
                        "fontSize": 20,
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }],
                    yAxes: [{
                        position: 'right',
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }]
                },
            })
    
    useEffect(()=>{
        let labels=globalRoundScore.map((score,index)=>
             'Gen:'+index
        )
        let labelsTotal=globalRoundTotalScore.map((score,index)=>
        'Gen:'+index
         )
        // console.log(labels)

        const data= {
            labels: labels,
            datasets: [{
                label: 'Points per generation',    
                data: globalRoundScore,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor:'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                maxBarThickness:20
            }]
        }
        const dataTotal= {
            labels: labelsTotal,
            datasets: [{
                label: 'Total points per generation',    
                data: globalRoundTotalScore,
                backgroundColor: 'rgba(33, 105, 194, 0.2)',
                borderColor:'rgba(33, 105, 194, 1)',
                borderWidth: 1,
                maxBarThickness:20
            }]
        }

        setChartData(data);
        setChartDataTotal(dataTotal)
        // return set

    },[globalRoundScore])




    // for (var x = 0; x < cDataTotal.length; x++) {
    //     chartData.datasets.push({
    //         label: tickerLabels[x],
    //         data: cDataTotal[x],
    //         backgroundColor: 'rgba(255, 99, 132, 0.1)',
    //         borderColor: color[x],
    //         borderWidth: 5
    //     })
    //         }

    // console.log(globalRoundScore)

    return (
        <div className='charts'>
            <div className='chart'>
                <Bar
                    data={chartData}
                    // width={60}
                    // height={40}
                    options={chartOptions}
                    // datasetKeyProvider={globalRoundScore}
                />                
            </div>
            <div className='chart'>
                <Bar
                    data={chartDataTotal}
                    // width={60}
                    // height={40}
                    options={chartOptions}
                    // datasetKeyProvider={globalRoundScore}
                />    
            </div>
        </div>
    )
}
