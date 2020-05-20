import React,{useState,useEffect} from 'react'
import { Bar } from 'react-chartjs-2';
export default function Generation(props) {

    const [chartOptions,setChartOptions]=useState({});
    const [data,setData]=useState([]);

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
        const {oldGen}=props;
        console.log(oldGen)
        if(oldGen.length>1){
            let labels=[];
            let labelsTotal=[];
            let data=[];
            for(var i=1;i<=oldGen.length-1;i++){
                console.log(oldGen[i][2])
                labels.push('Bird:'+oldGen[i][2])
                data.push(oldGen[i][3])
                // labelsTotal.push('Gen:'+i)
            }
            const data1= {
                labels: labels,
                datasets: [{
                    label: 'Highest Points',    
                    data: data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor:'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    maxBarThickness:20
                }]
            }
            // const total= {
            //     labels: labelsTotal,
            //     datasets: [{
            //         label: 'Total points',    
            //         data: totalRoundScores,
            //         backgroundColor: 'rgba(33, 105, 194, 0.2)',
            //         borderColor:'rgba(33, 105, 194, 1)',
            //         borderWidth: 1,
            //         maxBarThickness:20
            //     }]
            // }
            setData(data1);
        }
    },[props])

    // console.log(props);
    return (
        <div className='generation'>
            {/* {props.oldGen.map((gen,index)=>
                <div key={index} className='oldgen'>
                    <p>{(gen[3]*100).toFixed(2)}%</p>
                </div>
            )} */}
            <Bar
                data={data}
                options={chartOptions}
            />   
        </div>
    )
}
