class BackGround {
    constructor(pos) {
        this.pos=pos;
        this.update=()=>{
            this.pos-=0.3;
            if(this.pos<-6000) this.pos=-60;
        }
        this.draw=(canvas,bg)=>{
            canvas.drawImage(bg,this.pos,-200)
            return
        }
    }
  }

export default BackGround;