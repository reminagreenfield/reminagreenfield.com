/* Mid-point circle algorithm */
let spores = [];
let fi = 1;
let mainColor;
let w,h;
let playCount = 0;
let play = false;
function setup() {
  w = window.outerWidth //min(windowHeight, windowWidth)
  h = window.outerHeight
  if(w > h){
    w = h;
  }
  let c = createCanvas(w, w);
  c.parent('petri');

  frameRate(10)
  mainColor = color(75,187,175)
  
  for(rad = 1; rad<6;rad++){
    for(cs = 0; cs<TWO_PI;cs+=0.5){
      spores.push(new Spore(0+(w/40*rad+random(-25,25))*sin(cs),
                              0+(w/40*rad+random(-25,25))*cos(cs),random(4,w/40), fi, fi))
    }
  }
}

function draw() {
    let el = document.querySelector("nav .em")
    let style = getComputedStyle(el)
    if(style.color){
        mainColor = style.color
      }
  clear()
  
  translate(w/2,w/2);

  noStroke()
  fill(mainColor)
  
  for(let i = 0; i < spores.length; i++){
    if(playCount > i){
        spores[i].draw()
    }

  }
  if(play && playCount <= spores.length){
    playCount += 1;
  }else if(playCount > 0){
    playCount -= 2;
  }

}

class Spore{
  constructor(x,y,s,f,dir){
    this.f = f;
    this.s = s;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.os = s;
    this.circles = []
  }
  draw(){
    this.circles = rasterCircle(this.x,this.y,this.s,this.f)
    for(let i = 0; i < this.circles.length;i++){
      let tooClose = 0;
      
      for(let j = 0; j < spores.length; j++){
        if(dist(spores[j].x,spores[j].y,this.circles[i][0], this.circles[i][1]) < spores[j].s + 1){
            if(playCount > j){
               tooClose = tooClose + 1; 
            }
          
        }
      }
      
      if(tooClose < 2){
        fill(mainColor)
       	rect(this.circles[i][0], this.circles[i][1],this.f,this.f);       
      }

    }

    for(let n = 0; n < (this.s - 10); n+=2){
      let softColor = mainColor.split("rgb")[0] + "rgba" + mainColor.split("rgb")[1]
      fill(softColor.split(')')[0] + ", 1)")
      console.log(softColor)
      let c = rasterCircle(this.x,this.y, n, this.f*2);
      c.forEach((element)=>{
        	rect(element[0], element[1],this.f,this.f/2);   
      } )
      
      
      
    }
    
    
    if(this.s >= (this.os * 2) && this.dir > 0){
      this.dir = this.dir * -1;
    }else if(this.s <= (this.os/2) && this.dir < 0){
      this.dir = this.dir * -1;
    }
    this.s +=   sin(this.dir/2)
  }
}

function rasterCircle(thisX,thisY, radius, fidelity){
    let b = fidelity
	let x = 0
	let y = radius
    let circles = []
    circles.push([thisX, thisY+radius]);
    circles.push([thisX, thisY-radius]);
    circles.push([thisX+radius, thisY]);
    circles.push([thisX - radius, thisY]);
    let count = 0;
    while(x < y){


     
        ddFx=(fidelity*2)*x+fidelity
		ddFy=-(fidelity*2)*y
		f=x*x+y*y-radius*radius+(b*2)*x-y+fidelity
		if( f >= 0 ){
			y=y-b
			ddFy=ddFy+(fidelity*2)
			f=ddFy
        }
		x=x+b
		ddFx=ddFx+(fidelity*2)
		f=ddFx
    if(count % 2 == 0){
      circles.push([thisX + x, thisY+y]);
      circles.push([thisX - x, thisY+y]);
      circles.push([thisX + x, thisY-y]);
      circles.push([thisX - x, thisY-y]);
      circles.push([thisX + y, thisY+x]);
      circles.push([thisX - y, thisY+x]);
      circles.push([thisX + y, thisY-x]);
      circles.push([thisX - y, thisY-x]);
    }
        
      count += 1
    }

    return(circles)
}

function rasterFullCircle(thisX,thisY, radius, fidelity){
  let b = fidelity
let x = 0
let y = radius
  let circles = []
  circles.push([thisX, thisY+radius]);
  circles.push([thisX, thisY-radius]);
  circles.push([thisX+radius, thisY]);
  circles.push([thisX - radius, thisY]);
  let count = 0;
  while(x < y){


   
      ddFx=(fidelity*2)*x+fidelity
  ddFy=-(fidelity*2)*y
  f=x*x+y*y-radius*radius+(b*2)*x-y+fidelity
  if( f >= 0 ){
    y=y-b
    ddFy=ddFy+(fidelity*2)
    f=ddFy
      }
  x=x+b
  ddFx=ddFx+(fidelity*2)
  f=ddFx

    circles.push([thisX + x, thisY+y]);
    circles.push([thisX - x, thisY+y]);
    circles.push([thisX + x, thisY-y]);
    circles.push([thisX - x, thisY-y]);
    circles.push([thisX + y, thisY+x]);
    circles.push([thisX - y, thisY+x]);
    circles.push([thisX + y, thisY-x]);
    circles.push([thisX - y, thisY-x]);
  
      
    count += 1
  }

  return(circles)
}


	

	
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function idleLogout() {
    var t;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;  // catches touchscreen presses as well      
    window.ontouchstart = resetTimer; // catches touchscreen swipes as well      
    window.ontouchmove = resetTimer;  // required by some devices 
    window.onclick = resetTimer;      // catches touchpad clicks as well
    window.onkeydown = resetTimer;   
    window.addEventListener('scroll', resetTimer, true); // improved; see comments

    function yourFunction() {
        // your function for too long inactivity goes here
        // e.g. window.location.href = 'logout.php';
        play = true;
    }

    function resetTimer() {
        clearTimeout(t);
        play = false;
        t = setTimeout(yourFunction, 10000);  // time is in milliseconds
    }
}
idleLogout();