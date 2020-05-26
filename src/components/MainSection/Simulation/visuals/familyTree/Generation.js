import React,{useState,useEffect} from 'react'

export default function Generation({oldGenData,settings}) {

    const [data,setData]=useState([]);
    const {
        selectedParents1,
        selectedParents2,
        treeGraph,
        colors,
        selectedValue
    }=settings

    useEffect(()=>{
        const getSelectedParents=(currentData)=>{
            let newData=[];
            for(var i=0;i<currentData.length;i++){
                if(selectedParents1.includes(currentData[i].birdID)){
                    newData.push(currentData[i])
                }
                if(selectedParents2.includes(currentData[i].birdID)){
                    newData.push(currentData[i])
                }
            }
            return newData;
        }
        let newData=[...oldGenData];
        if(treeGraph){
            newData=getSelectedParents(newData);
        }
        setData(newData);
    },[oldGenData,settings,treeGraph,selectedParents1,selectedParents2])



    const getBackGoundColor=(id)=>{
        if(selectedParents1.includes(id)){
            return 'white'
        }else if(selectedParents2.includes(id)){
            return 'gray'
        }else{
            return 'rgba(134, 180, 137,0.0)'
        }
    }

    const getDisplay=(id)=>{
        if(selectedParents1.includes(id)){
            return ''
        }else if(selectedParents2.includes(id)){
            return ''
        }else{
            return 'none'
        }
    }

    const getColors=(score)=>{
        let percent=(score/5000)*100;
        if(percent>100) percent=100;
        let r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
        let g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
        return 'rgba('+r+','+g+',0,0.5)';
    }

    const getSelectedValue=(data,value)=>{
        switch(value) {
            case 'birdID':
              return data.birdID
            case 'fitness':
                return `${(data.fitness*100).toFixed(1)}%`
            case 'score':
                return `${(data.score/1000).toFixed(2)}k`
            default:
                return data.birdID
          }
    }

    const treeGraphMargin=()=>{
        let length=data.length;
        if(length>10) length=10;
        return (220-(length*22))
    }

    return (
        <div className='generation'>
            <h3 className='genHeader'>
                Gen:{oldGenData.length!==0?oldGenData[0].generation-1:0}
            </h3>
            <div className='generationBirds'>
                {data.map((gen,index)=>
                    <div key={index} className='oldgen'
                        id={gen.birdID}
                        style={{
                            backgroundColor:colors?getColors(gen.score):getBackGoundColor(gen.birdID),
                            display:treeGraph?getDisplay(gen.birdID):'',
                            marginLeft:treeGraph?treeGraphMargin():0
                        }}>
                        <div>
                            <p>{getSelectedValue(gen,selectedValue)}</p>
                        </div> 
                    </div>
                )}              
            </div>
        </div>
    )
}
