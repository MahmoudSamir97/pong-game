const initialVelocity = 0.025;
const increaseVelocity = 0.00001;

export default class Ball {
    constructor(elem){
        this.element = elem;
        this.reset();
    }


    rect(){
        return this.element.getBoundingClientRect();
    }

    get x(){
        return parseFloat(getComputedStyle(this.element).getPropertyValue("--x"));
    }
    set x(value){
        return this.element.style.setProperty("--x", value);
    }
    get y(){
        return parseFloat(getComputedStyle(this.element).getPropertyValue("--y"));
    }
    set y(value){
        return this.element.style.setProperty("--y", value);
    }


    reset(){
        this.x = 50;
        this.y = 50;
        const angle =  randomNumBetween(0, 2 * Math.PI);
        this.direction = {x: Math.sin(angle), y:Math.cos(angle) };
        this.velocity = initialVelocity;

   }


    update(time, paddleRects){
        this.x += this.direction.x * this.velocity * time ; 
        this.y += this.direction.y * this.velocity * time ;
        this.velocity += increaseVelocity * time;
        const rect = this.rect();
        // bouncing ball off Y
        if(rect.top <= 0 || rect.bottom >= innerHeight){
            this.direction.y *= -1;
        }

        // bouncing off paddles
        if(paddleRects.some(r=> isColiision(r, rect))){
            this.direction.x *= -1;
        }
    }
}

function randomNumBetween(min,max){
    return Math.random() * (max-min) + min ; 
}

function isColiision(rects, ball){
    return (
        ball.left <= rects.right &&
        ball.right >= rects.left &&
        ball.top <= rects.bottom &&
        ball.bottom >= rects.top 
    )

}