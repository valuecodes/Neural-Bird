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
        const xs=tf.tensor2d([inputs])
        const ys=this.model.predict(xs)
        const outputs=ys.dataSync();
        return outputs
    }

    copy(){
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
    }

    mutate(rate=0.1){
        console.log('mutate')
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) {
              let tensor = weights[i];
              let shape = weights[i].shape;
              let values = tensor.dataSync().slice();
              for (let j = 0; j < values.length; j++) {
                if (Math.random() < rate) {
                  let w = values[j];
                  values[j] = w + Math.random();
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
}
export default NeuralNetwork;
