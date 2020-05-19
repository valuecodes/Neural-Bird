class Pipe {
    constructor(gap) {
      this.x=600-20;
      this.w=20;
      this.speed=2;
      this.gap=gap;
      this.getTopPipe=(gapWidth)=>{
          return [this.x,0,this.w,this.gap-gapWidth]
      }
      this.getBotPipe=(gapWidth)=>{
            return [this.x,this.gap+gapWidth,this.w,600]
      }
      this.update=()=>{
          this.x-=this.speed
      }
      this.draw=(canvas,gapWidth)=>{
        canvas.fillStyle = "rgba(69, 81, 94,0.9)";
        canvas.fillRect(this.x,0,this.w,this.gap-gapWidth)
        canvas.fillRect(this.x,this.gap+gapWidth,this.w,600)
        return
      }
    }
  }

export default Pipe;