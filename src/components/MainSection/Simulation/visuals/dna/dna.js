import React,{useContext,useEffect,useState} from 'react'
import {GlobalGenerational} from '../../../../../context/GlobalGenerational'
import { Radar } from 'react-chartjs-2';
import VisualHeader from '../VisualHeader'

export default function DNA() {
    const chartRef = React.useRef(null)
    const {generationalData} = useContext(GlobalGenerational)
    const [structure,setStucture]=useState([]);
    const [fitness,setFitness]=useState(0);
    const [data,setData]=useState({
        datasets: [{
            label: 'Scatter Dataset',
            data: []
        }]
    })

    const calculateFitness=(data)=>{
        let sum=0;
        for(var i=0;i<data.length;i++){
            sum+=data[i];
        }
        return (((sum/data.length)/10000)*100).toFixed(2);
    }

    useEffect(()=>{
        let seq=['A','C','T','G'];
        let structure=[];
        for(var i=0;i<80;i++){
            structure.push(seq[Math.floor(Math.random()*seq.length)])
        }
        setStucture(structure);
    },[])

    useEffect(()=>{
        const {roundScores,dna}=generationalData
        let fitnessPercentage=calculateFitness(roundScores);
        if(isNaN(fitnessPercentage)) fitnessPercentage=0
        setFitness(fitnessPercentage)
        if(fitnessPercentage>100) fitnessPercentage=100

        if(dna.length!==0){
            let newData={
                labels: [],
                datasets: [{
                    label: '1',
                    borderColor: "rgba(53, 53, 53, 0.438)",
                    borderWidth:2,
                    data: []
                },
                {
                    label: '2',
                    backgroundColor: 'rgba(13, 72, 92,0)',
                    borderColor: "rgba(53, 53, 53, 0)",
                    borderWidth:2,
                    pointBorderColor: "rgba(13, 72, 92,1)'",
                    data: []
                },
                {
                    label: '3',
                    backgroundColor: "rgba(53, 53, 53, 0.5)",
                    borderColor: "rgba(53, 53, 53, 1)",
                    borderWidth:2,
                    pointWidth:0,
                    pointRadius: 0,
                    pointBorderColor: "rgba(13, 72, 92,0.1)",
                    pointBackgroundColor: "rgba(179,181,198,0)",
                    data: []
                }
            ]
            }

            let count=0;
            for(var i=0;i<dna.length-1;i++){
                if(i===1){
                    continue;
                }
                for(var a=0;a<dna[i].length;a++){
                    newData.labels.push(`${structure[count]}${a}`)
                    newData.datasets[0].data.push(dna[i][a]) 
                    newData.datasets[1].data.push(1) 
                    newData.datasets[2].data.push(-1) 
                    count++;
                    if(count>=80){
                        count=0;
                    }
                }
            }
            setData(newData)   
        }
    },[generationalData,structure])

    return (
        <div className='DNA'>
            <VisualHeader header={'DNA'}/>
            <div className='dnaChart'>
            <div className='centerDot'>
                <p>Fitness:</p>
                <h3 className='fitnessPercentage'>{fitness}%</h3>
            </div>
                <Radar
                    data={data}
                    width={50}
                    height={50}
                    options={ {
                        legend: {
                            display: false
                        },
                        scale: {
                            angleLines: {
                                // display: false,
                                // color: 'rgba(13, 72, 92,0.8)',
                            },
                            gridLines: {
                                display: false,
                                circular: true 
                            },
                            ticks: {
                                display:false
                            }
                        }
                    }}
                    ref={chartRef}
                />            
            </div>
        </div>
    )
}
