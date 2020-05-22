import React,{useState,useEffect} from 'react'
import CheckBoxInput from './../../../../../utils/CheckBoxInput'
import SelectorButton from './../../../../../utils/SelectorButton'

export default function GenerationOptions(props) {
    const [message,setMessage]=useState('');
    const { settings }=props;

    useEffect(()=>{
        const {selectedParents1,treeGraph}=settings;
        let newMessage='';
        if(selectedParents1.length===0&&treeGraph){
            newMessage='Select Bird to see familygraph!'
        } 
        setMessage(newMessage);

    },[settings])

    return (
        <div className='generationOptions'
            style={{height:settings.optionsOpen?100:0}}
        >
            <div className='genInfo'>
                <h2>Options</h2>
                <p className='message'>{message}</p>
            </div>
            <div className='genSettings'>                
                <div className='genSettingsValues'>
                    <SelectorButton selected={settings.selectedValue==='birdID'} changeValue={props.changeSettingsValue} option={'birdID'} header={'ID'}/>
                    <SelectorButton selected={settings.selectedValue==='fitness'}  changeValue={props.changeSettingsValue} option={'fitness'} header={'Fitness'}/>
                    <SelectorButton selected={settings.selectedValue==='score'}  changeValue={props.changeSettingsValue} option={'score'} header={'Score'}/>
                </div>                 
                <CheckBoxInput checked={props.changeSettings} option={'colors'} header={'Colors'}/>
                <CheckBoxInput checked={props.changeSettings} option={'treeGraph'} header={'Tree Graph'}/>              
            </div>
        </div>
    )
}
