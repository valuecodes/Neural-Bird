import React,{useContext,useEffect,useState,useRef} from 'react'
import {GlobalContext} from '../../../../../context/GlobalState'
import { Radar } from 'react-chartjs-2';
import VisualHeader from '../VisualHeader'

export default function DNA() {
    const chartRef = React.useRef(null)
    const { globalDNA } =useContext(GlobalContext);
    const [structure,setStucture]=useState([]);
    const [sum,setSum]=useState(0);
    const [data,setData]=useState({
        datasets: [{
            label: 'Scatter Dataset',
            data: []
        }]
    })

    useEffect(()=>{
        let seq=['A','C','T','G'];
        let structure=[];
        for(var i=0;i<80;i++){
            structure.push(seq[Math.floor(Math.random()*seq.length)])
        }
        setStucture(structure);
    },[])

    useEffect(()=>{
        let sum=0;
        if(globalDNA.length!==0){
            let newData={
                labels: [],
                datasets: [{
                    data: []
                }
            ]
            }

            let count=0;
            for(var i=0;i<globalDNA.length-1;i++){
                if(i===1){
                    continue;
                }
                for(var a=0;a<globalDNA[i].length;a++){
                    newData.labels.push(`${structure[count]}${a}`)
                    newData.datasets[0].data.push(globalDNA[i][a]) 
                    sum+=globalDNA[i][a];
                    count++;
                    if(count>=80){
                        count=0;
                    }
                }
            }
            console.log(sum);
            setData(newData)   
            setSum(sum); 
        }
    },[globalDNA,structure])

    return (
        <div className='DNA'>
            <VisualHeader header={'DNA'}/>
            <div className='dnaChart'>
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
                                display: false
                            },
                            gridLines: {
                                display: false
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
