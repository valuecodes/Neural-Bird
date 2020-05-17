import React,{useState,useContext} from 'react'
import BirdView from './birdView/BirdView'
import VisualNavigation from './VisualNavigation'
import NeuralNet from './neuralNet/NeuralNet'
import DNA from './dna/dna'
import FamilyTree from './familyTree/FamilyTree'
import {GlobalContext} from '../../../../context/GlobalState'

export default function Visuals() {

    const { setVisual } =useContext(GlobalContext);
    const [currentPage,setCurrentPage]=useState('nn')
    
    const changePage=(page)=>{
        setCurrentPage(page);
        setVisual(page)
    }

    return (
        <div className='visuals'>   
            <VisualNavigation
                changePage={changePage}
            />
            <div className='visualPages'>
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
