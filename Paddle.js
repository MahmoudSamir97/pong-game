const computerVelocity = 0.02;
export default class Paddle {
    constructor(elem){
        this.element = elem;
        this.reset();
    }

    get position (){
        return parseFloat(getComputedStyle(this.element).getPropertyValue("--position"));
    }

    set position (value){
      return  this.element.style.setProperty("--position", value);
    }

    rect(){
        return this.element.getBoundingClientRect();
    }

    reset(){
        this.position = 50;
    }

    update(time, y){
       this.position += time * computerVelocity * ( y - this.position);
    }

 
}