import NeuralNetwork from '../NeuralNetwork';

class Bird{
    constructor(brain,speed){
        this.y=(250);
        this.x=20;
        this.size=10;
        this.gravity=0.8;
        this.lift=-10;
        this.velocity=0;
        this.alive=true;
        if(brain){
            this.brain=brain.copy();
        }else{
            this.brain=new NeuralNetwork(5,8,2);
        }
        this.update=(speed)=>{
            this.velocity+=this.gravity;
            this.y+=this.velocity*0.9;
            if(this.y>600-this.size){
                this.alive=false
            }
            if(this.y<0){
                this.alive=false
            }
        }
        this.getPosition=()=>{
            return [this.x,this.y,this.size,this.size]
        }
        this.up=()=>{
            this.velocity=+this.lift
        }
        this.think=(pipe,gapW)=>{
            let inputs=[];
            inputs[0]=this.y/600;
            inputs[1]=(pipe.gap+gapW+10)/600;
            inputs[2]=(pipe.gap-gapW-10)/600;
            inputs[3]=pipe.x/600;
            inputs[4]=this.velocity/20;
            let output = this.brain.predict(inputs);
            return output;
        }

    }
}

export default Bird