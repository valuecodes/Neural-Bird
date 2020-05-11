class Pipe {
    constructor(gap) {
      this.x=600-20;
      this.w=20;
      this.speed=2;
      this.gap=gap;
      this.getTopPipe=()=>{
          return [this.x,0,this.w,this.gap]
      }
      this.getBotPipe=(gapWidth)=>{
            return [this.x,this.gap+gapWidth,this.w,600]
      }
      this.update=()=>{
          this.x-=this.speed
      };
    }
  }

export default Pipe;