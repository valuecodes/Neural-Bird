import React,{useContext,useState,useEffect} from 'react'
import {GlobalGenerational} from '../../../../context/GlobalGenerational'
import { Bar } from 'react-chartjs-2';

export default function Charts() {

    const {generationalData} = useContext(GlobalGenerational)

    const [chartData,setChartData]=useState({
        max:[],
        total:[]
    });

    const [chartOptions,setChartOptions]=useState({});

    useEffect(()=>{
        setChartOptions({
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
                label: 'Points per generation',    
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
                label: 'Total points per generation',    
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
        <div className='charts' >
            <div className='chart'>
                <Bar
                    data={chartData.max}
                    // width={60}
                    // height={40}
                    options={chartOptions}
                    // datasetKeyProvider={globalRoundScore}
                />                
            </div>
            <div className='chart'>
                <Bar
                    data={chartData.total}
                    // width={60}
                    // height={40}
                    options={chartOptions}
                    // datasetKeyProvider={globalRoundScore}
                />    
            </div>
        </div>
    )
}
