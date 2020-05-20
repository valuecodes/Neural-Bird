import * as tf from '@tensorflow/tfjs';
tf.setBackend('cpu')

class NeuralNetwork{
    constructor(a,b,c,d){
        if(a instanceof tf.Sequential){
            this.model=a;
            this.inputNodes=b;
            this.hiddenNodes=c;
            this.outputNodes=d;
        }else{
            this.inputNodes=a;
            this.hiddenNodes=b;
            this.outputNodes=c;
            this.model= this.createModel();            
        }
    }

    predict(inputs){
        return tf.tidy(() => {
            const xs=tf.tensor2d([inputs])
            const ys=this.model.predict(xs)
            const outputs=ys.dataSync();
            return outputs
        });
    }

    getDNA(){
        let dna=[];
        tf.tidy(() => {
            const weights = this.model.getWeights();
            for (let i = 0; i < weights.length; i++) {
              let tensor = weights[i];
              let values = tensor.dataSync().slice();
              dna.push(values);
            }
          });
          return dna
    }

    shuffleGenes(otherParent){
        tf.tidy(() => {
            const mutatedWeights = [];
            const weights = this.model.getWeights();
            let oWeights=otherParent.brain.model.getWeights();
            for (let i=0;i<weights.length;i++) {
              let tensor = weights[i];
              let shape = weights[i].shape;
              let values = tensor.dataSync().slice();
              let oTensor=oWeights[i]
              let oValues=oTensor.dataSync().slice();
              for (let j=0;j<values.length;j++) {
                let chance=Math.random();
                let w = values[j];
                let ov = oValues[j]

                if(chance<0.33){
                    values[j] = w
                }
                if(chance>=0.33&&chance<0.66){
                    values[j] = ov
                }
                if(chance>=0.66){
                    values[j] = (w + ov)/2; 
                }
              }
              let newTensor=tf.tensor(values,shape);
              mutatedWeights[i]=newTensor;
            }
            this.model.setWeights(mutatedWeights);
          });
    }

    copy(){
        return tf.tidy(() => {
        const modelCopy=this.createModel();
        const weights=this.model.getWeights();
        const weightCopies=[];
        for (let i = 0; i < weights.length; i++) {
            weightCopies[i] = weights[i].clone();
          }
        modelCopy.setWeights(weightCopies);
        return new NeuralNetwork(
            modelCopy,
            this.inputNodes,
            this.hiddenNodes,
            this.outputNodes)
        });
    }

    mutate(rate=0.1,alpha){
        rate=rate/100;
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            let aWeights=alpha.brain.model.getWeights();
            for (let i=0;i<weights.length;i++) {
              let tensor = weights[i];
              let shape = weights[i].shape;
              let values = tensor.dataSync().slice();
              let aTensor=aWeights[i]
              let aValues=aTensor.dataSync().slice();
              for (let j=0;j<values.length;j++) {
                let w = values[j];
                let av = aValues[j]
                values[j] = (w + av)/2;
                if (Math.random()<rate) {
                    values[j] = w+randomGaussian();
                    values[j] = (w+av/2)+randomGaussian();
                }
              }
              let newTensor = tf.tensor(values, shape);
              mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
          });
    }

    createModel(){
        const model = tf.sequential();
        const hidden = tf.layers.dense({
            units:this.hiddenNodes,
            inputShape:[this.inputNodes],
            activation:'sigmoid'
        })
        model.add(hidden);
        const output=tf.layers.dense({
            units:this.outputNodes,
            activation:'softmax'
        })
        model.add(output);
        return model
    }
    async saveModel(){
        
        console.log(await this.model)
    }
    createAlpha(alpha){
        let alphaValues=alpha;
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const alphaWeights = [];
            for (let i=0;i<weights.length;i++) {
              let tensor = weights[i];
              let shape = weights[i].shape;
              let values = tensor.dataSync().slice();
              let aValues=alphaValues[i];
              for (let j=0;j<values.length;j++) {
                values[j] = aValues[j]
              }
              let newTensor = tf.tensor(values, shape);
              alphaWeights[i] = newTensor;
            }
            this.model.setWeights(alphaWeights);
          });
    }
}
export default NeuralNetwork;

function randomGaussian() {
    var rand = 0;
    for (var i=0;i<6;i++) {
      rand += Math.random();
    }
    return (rand/6)-0.5;
  }