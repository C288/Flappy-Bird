var brush=document.getElementById("c1").getContext("2d")
var birdX=100;//x
var birdY=100;//y
var birdSize=20;
var dy=1;//speed of bird
var g=0.1;
var jumpI=7
var pipes=[[150,100,100],[300,200,60],[450,150,50]];//x,y,h of oath through pipes
var pipesW=30;
var speedBr=2
var timer=setInterval(drawFrame,20)
var score=0
document.addEventListener("keydown", onkeydown)

function init(){
     pipes=[[150,100,100],[300,200,60],[450,150,50]];//x,y,h of oath through pipes
     score=0
     dy=2;//speed of bird
    birdX=100;//x
    birdY=100;//y
    timer=setInterval(drawFrame,20)
}

function drawpipes(){
    brush.fillStyle="#03EE02"
    for (var i= 0; i <pipes.length; ++i){
        //draw upper part
        brush.fillRect(pipes[i][0],0,pipesW,pipes[i][1]);
        //lower part
        var y_lower=pipes[i][1]+pipes[i][2];
        var x_lower=pipes[i][0];
        var h_lower=400 -y_lower
        brush.fillRect(x_lower, y_lower , pipesW, h_lower);
    }
}

function onkeydown(e){
    if (e.key===" "){
       dy -= jumpI;
    }
    if (e.key==="Enter"){
        clearInterval(timer);
        init();
     }
}

function updatebird(){
    dy += g;
    birdY += dy;
}

function updatePipes(){
    for (var i = 0 ;i<pipes.length; ++i){
        pipes[i][0]-=speedBr
        if (pipes[i][0]+ pipesW < 0){
            pipes[i][0]=400;
            if (score = 0){
                score = 1;
            }
            ++score;
        }
    }
}

function drawScore(){
    brush.font="18px Arial";
    brush.textBaseline= "top";
    brush.textAlign="center";
    brush.fillStyle="#000000";
    brush.fillText("Score: " + score,40,10);
}

function gameOver(){
    brush.font="60px Arial";
    brush.textBaseline= "top";
    brush.textAlign="center";
    brush.fillStyle="#000000";
    brush.fillText("Game Over!",200,170);
}

function drawFrame(){
    if (birdDead()){
        clearInterval(timer);
        gameOver();
        return;
    }
    updatebird();
    updatePipes();
    drawBackground();
    drawpipes();
    drawBird();
    drawScore();
}

function drawBackground(){
    //sky
    brush.fillStyle= "#00EEFF";
    brush.fillRect(0,0,400,300);//290 works
    //line
    brush.fillStyle="#000000";
    brush.fillRect(0,300,400,10);
    //grass
    brush.fillStyle="#AC8021";
    brush.fillRect(0,300,400,100)
}

function drawBird(){
    brush.fillStyle="#F4FF00";
    brush.fillRect(birdX,birdY,birdSize,birdSize);
}

//send this part
function IsXyInRect(x,y,rectX,rectY,rectW,rectH){
    if (x >=rectX && x<=rectX+rectW && y>= rectY && y<=rectY+rectH ){
        return true;
    }
    else {
        return false;
    }
}

//end here for part
function birdDead(){
    for(var i=0; i<pipes.length;++i){
        //bird variables
        //top
        var B_top_left_x=birdX;
        var B_top_left_y=birdY;
        var B_top_right_x=birdX + birdSize;
        var B_top_right_y=birdY;
        //bottom
        var B_bottom_left_x=birdX;
        var B_bottom_left_y=birdY + birdSize;
        var B_bottom_right_x=birdX + birdSize;
        var B_bottom_right_y=birdY+birdSize;
        //pipes varibels
        //top
        var upper_pipes_x =pipes[i][0];
        var upper_pipes_y =0;
        var upper_pipes_h=pipes[i][1];
        var upper_pipes_w=pipesW;
        //Lower
        var lower_pipes_x=upper_pipes_x;
        var lower_pipes_y=upper_pipes_h+pipes[i][2]
        var lower_pipes_h=400-lower_pipes_y;
        var lower_pipes_w=pipesW;
        if(IsXyInRect(B_top_left_x,B_top_left_y,upper_pipes_x,upper_pipes_y,upper_pipes_w,upper_pipes_h) ||
        IsXyInRect(B_top_right_x,B_top_right_y,upper_pipes_x,upper_pipes_y,upper_pipes_w,upper_pipes_h) ||
        //lower bottom
        IsXyInRect(B_bottom_left_x,B_bottom_left_y,lower_pipes_x,upper_pipes_y,upper_pipes_w,upper_pipes_h) ||
        IsXyInRect(B_bottom_right_x,B_bottom_right_y,lower_pipes_x,lower_pipes_y,lower_pipes_w,lower_pipes_h)){
            return true;
         }
    }
    if (B_top_left_y<=0||B_bottom_left_y>=400){
        return true;
    }
    return false;
}