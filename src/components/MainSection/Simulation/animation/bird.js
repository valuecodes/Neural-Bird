import NeuralNetwork from '../NeuralNetwork';

class Bird{
    constructor(nnForm,brain){
        this.y=(250);
        this.x=20;
        this.size=10;
        this.gravity=0.8;
        this.lift=-10;
        this.velocity=0;
        this.alive=true;
        this.score=0;
        this.fitness=0;
        if(brain){
            this.brain=brain.copy();
        }else{
            this.brain=new NeuralNetwork(nnForm[0],nnForm[1],nnForm[2]);
        }
        this.update=()=>{
            this.velocity+=this.gravity;
            this.y+=this.velocity*0.9;
            this.score++;
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

            // console.log(`Pipe top:${pipe.gap+gapW} Pipe bot ${pipe.gap-gapW} Pipe x: ${pipe.x} Bird y:${this.y}`)
            inputs[0]=this.y/600;
            inputs[1]=(pipe.gap+gapW)/600;
            inputs[2]=(pipe.gap-gapW)/600;
            inputs[3]=pipe.x/600;
            inputs[4]=this.velocity/20;
            // inputs[5]=gapW/600
            // console.log(inputs)
            let output = this.brain.predict(inputs);
            return {
                outputData:output,
                inputData:inputs
            };
        }

    }
}

export default Bird