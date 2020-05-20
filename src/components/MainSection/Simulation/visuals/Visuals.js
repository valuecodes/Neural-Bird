import React,{useState,useContext,useEffect} from 'react'
import BirdView from './birdView/BirdView'
import VisualNavigation from './VisualNavigation'
import NeuralNet from './neuralNet/NeuralNet'
import DNA from './dna/dna'
import FamilyTree from './familyTree/FamilyTree'
import {GlobalContext} from '../../../../context/GlobalState'

export default function Visuals() {

    const { setVisual,globalSimulationState,activePage,visual } =useContext(GlobalContext);
    const [currentPage,setCurrentPage]=useState('nn')
    
    useEffect(()=>{
        setCurrentPage(visual)
    },[visual])

    const changePage=(page)=>{
        setCurrentPage(page);
        setVisual(page)
    }
    return (
        <div 
            className='visuals'
            style={{
                height:currentPage===''?0:'100vh',
                visibility:activePage==='simulation'?'visible':'hidden',
                // marginTop:activePage==='landing'?50:0,
                // backgroundColor:globalSimulationState==='Offline'?'rgb(211, 211, 212)':'rgba(255,255, 255, 0.0)',
                zIndex:globalSimulationState==='Offline'?3:2
            }}>   
            <VisualNavigation
                changePage={changePage}
                state={globalSimulationState}
            />
            <div className='visualShade'
                style={{
                    display:currentPage===''?'none':''
                }}>
            </div>
            <div className='visualPages'
                    style={{
                        display:currentPage===''?'none':''
                    }}>
                    <div
                        style={{display:currentPage==='nn'?'':'none'}}
                        className='visualPage'>
                        <NeuralNet/>
                    </div>
                    <div
                        style={{display:currentPage==='bird'?'':'none'}}
                        className='visualPage'>
                        <BirdView/>
                    </div>
                    <div
                        style={{display:currentPage==='family'?'':'none'}}
                        className='visualPage'>
                        <FamilyTree/>
                    </div>
                    <div
                        style={{display:currentPage==='dna'?'':'none'}}
                        className='visualPage'>
                        <DNA/>
                    </div>                
                </div>
        </div>
    )
}
