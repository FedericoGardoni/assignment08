var bottiglia;
var crop=76/176;
var riduci = 0.6;
var scuotendo = false;
var valore=0;
var sfondo;
//var c1=color(0,0,15);
//var c2=color(255,55,0);
//var sfondo =lerpColor(c1,c2,50);
var champagne;
var stappato = false;
var particelle = [];
var numeroParticelle = 50;
var tappo = false;
var tappoImm;
var tappoX=0;
var tappoY=0;
var incr=0;
var bottigliaAttuale;
var bottigliaStappata;
var urra;
var suonoTappo;

function preload() {
   bottiglia = loadImage("./assets/Bottiglia.png"); 
    bottigliaStappata = loadImage("./assets/Bottiglia_Stappata.png"); 
    bottigliaAttuale = bottiglia;
     tappoImm = loadImage("./assets/Tappo.png"); 
    urra = loadSound("./assets/brindisi.wav")
       suonoTappo = loadSound("./assets/tappo.wav")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
    angleMode(DEGREES);
    setShakeThreshold(10);
    
    
    
    
}


function draw() {
    sfondo= lerpColor(color('#ea0043'), color("#4ea7c0"), frameCount/300);
background(sfondo);
  //  background("red");
 
    //INSERIRE SHAKE IMMAGINE
    push();
if (scuotendo==true) {
    bottiglia.x +=10; // DA RIVEDERE
     translate(100, 100);
    rotate(10);
    }
    
    
    // BOTTIGLIA E POSIZIONE
imageMode(CENTER);
image(bottigliaAttuale,width/2,2*height/5,crop*windowHeight*riduci,windowHeight*riduci);
pop();
    
    
// TAPPO STAPPA
    if(tappo==true && stappato==true) {
        push();
        incr +=2;
        tappoX+=1*incr/3;
        tappoY-=incr;
        translate(tappoX,tappoY);
        rotate(15);
        fill(0,255,0);
        //rect(width/2,height/2,20,20);
        image(tappoImm,10*width/13,1*height/4,50,50);
        pop();
        console.log(incr+" "+ tappoX +" "+tappoX);
    } // fine tappo stappa
    
//Testo Sotto
push();
fill('gold');
textAlign(CENTER);
textSize(40);
textStyle(BOLD);
text("IT'S PARTY TIME!",width/2,10*height/12);
textSize(25);
textStyle(ITALIC);
fill(220);
text("Shake your device",width/2,9*height/10);
pop();
    
//CHAMPAGNE
    if (stappato==true) {
        
        for(var i=0;i<=numeroParticelle;i++) {
   particelle[i].display();
    particelle[i].move();
        
            
    } // fine ciclo
    } //fine if stappato
    
  
} // chiusura draw

function Champagne() {
    this.radius = 15*random(1,3);
    
    this.x=4*width/5;
    this.y=-200+height/2+random(-1,1)*50;
    
    this.incrementX = random(-3,3);
    this.incrementY = -6;
    
    this.display = function() {
        push();
        stroke(201,175,144);
        fill(251,236,209,150);
    ellipse(this.x,this.y,this.radius);  
        pop();
    } // FINE DISPLAY
    
    this.move = function() {
    this.x += this.incrementX;
    this.y += this.incrementY; 
    this.incrementY += 0.2;
        
        //console.log(this.incrementY);
    }
    
} // FINE OGGETTO


function deviceShaken() {
    scuotendo=true;
    valore +=1;
    if (!stappato && valore >= 100) {
        stappa();
    }
}

//DA CANCELLARE
function mouseWheel() {
    deviceShaken();
}

function stappa() {
    stappato = true;
    tappo=true;
    sfondo="#dd996s";
    bottigliaAttuale=bottigliaStappata;
    
    // SUONO BRINDISI
    if (urra.isPlaying()==true) {
        urra.stop();
    }
        else {
        urra.play();
        }
    // FINE SUONO BRINDISI
    
    // SUONO TAPPO
    if (suonoTappo.isPlaying()==true) {
        suonoTappo.stop();
    }
        else {
        suonoTappo.play();
        }
    // FINE SUONO TAPPO
    
    for(var i=0;i<=numeroParticelle;i++) {
       // champagne = ;
        particelle.push(new Champagne());
    }
    
    
}