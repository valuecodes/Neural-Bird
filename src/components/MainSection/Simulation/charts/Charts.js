import React,{useContext,useState,useEffect} from 'react'
import {GlobalGenerational} from '../../../../context/GlobalGenerational'
import { GlobalContext } from './../../../../context/GlobalState'
import { Bar } from 'react-chartjs-2';

export default function Charts() {

    const { generationalData } = useContext(GlobalGenerational)
    const { globalSimulationState,visual,activePage } = useContext(GlobalContext)

    const [chartData,setChartData]=useState({
        max:{},
        total:{}
    });

    const [chartOptions,setChartOptions]=useState({});

    useEffect(()=>{
        setChartOptions({
            maintainAspectRatio: false,
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
    },[])

    useEffect(()=>{
        const {roundScores,totalRoundScores}=generationalData;
        let labels=[];
        let labelsTotal=[];
        for(var i=1;i<=roundScores.length;i++){
            labels.push('Gen:'+i)
            labelsTotal.push('Gen:'+i)
        }
        const max= {
            labels: labels,
            datasets: [{
                label: 'Highest Points',    
                data: roundScores,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor:'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                maxBarThickness:20
            }]
        }
        const total= {
            labels: labelsTotal,
            datasets: [{
                label: 'Total points',    
                data: totalRoundScores,
                backgroundColor: 'rgba(33, 105, 194, 0.2)',
                borderColor:'rgba(33, 105, 194, 1)',
                borderWidth: 1,
                maxBarThickness:20
            }]
        }
        setChartData({max,total});
    },[generationalData])
    return (
        <div className='chartContainer'
            style={{
                marginLeft:globalSimulationState,
                zIndex:visual==='charts'?2:-1,
                visibility:activePage==='simulation'?'visible':'hidden',
            }}

        >
            <div className='charts'
                style={{
                    marginLeft:globalSimulationState==='Offline'?800:40
                }}
            >
                <div className='chart'>
                    <Bar
                        data={chartData.max}
                        options={chartOptions}
                    />                
                </div>
                <div className='chart'>
                    <Bar
                        data={chartData.total}
                        options={chartOptions}
                    />    
                </div>                
            </div>
        </div>
    )
}
