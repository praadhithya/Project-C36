//Create variables here
var dog, happyDog, database, foodS, foodStock, house;
var firebase,feed,addfood,feedTime, lastFed,foodObj,Hungry;
var Image1,Image2,Image3,Image4;
var readState,gameState
function preload()
{
  //load images here
  Image1 = loadImage("images/dogimg2.png")
  Image2 = loadImage("images/dogimg3.jpg")
  Image3 = loadImage("images/House.jpg")
  Image4 = loadImage("images/Milk.png")
  Image5 = loadImage("images/Bed Room.png")
  Image6 = loadImage("images/Garden.png")
  Image7 = loadImage("images/Wash Room.png")
  Image8 = loadImage("images/Lazy.png")
  //Image14 = loadImage("images/Lazy.png")
}
function setup() {
  database = firebase.database()
  createCanvas(500, 500);
  Image4.resize(50,50);
  Image8.resize(150,150)
  dog = createSprite(300,300,5,5)
  Image1.resize(150,150)
  dog.addImage(Image1);
  foodObj = new food();
  lastFed = "No Data";
  
  Image2.resize(150,150)
  foodS = foodObj.getFoodStock();
  //console.log(foodS)
  feed = createButton("Feed the dog")
  feed.position(680,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food")
  addFood.position(780,95);
  addFood.mousePressed(addFoods);

  readState = database.ref('GameState')
  readState.on("value",function(data){
    gameState=data.val();
  });
}

function draw() {  
  background("white");
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
      lastFed = data.val(); 
  });
 
   
  //update("Hungry")
  if (gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
    fill("white")
    stroke(51)
  }else{
    feed.show();
    addFood.show();
    dog.addImage(Image8);
    fill("black")
   stroke(51)
  }
  currenttime=hour();
  if(currenttime==(lastFed+1)){
    update("Playing")
    foodObj.garden();
  }else if (currenttime==(lastFed+2)){
    update("slepping");
    foodObj.bedroom();
  }else if(currenttime>(lastFed+2) && currenttime<=(lastFed+4)){
    update("Bathing")
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }
   //add styles here
   
   
   textSize(25)
   text("Food Remaining: " + foodS,150,450)
   text("Game State : " + gameState,150,480)
   
  foodObj.display()
  fill("black")
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12 + " PM",390,30);
  }else if (lastFed == 0){
    text("Last Feed : 12 AM",250,30);
  }else{
    text("Last Feed : "+ lastFed + " AM",390,30)
  }
  if (foodS == 30){}
    //name = input.value(); 
  drawSprites();
  }

function addFoods(x){
  //foodS++
  if(foodS+1>=30){
    foodS = 30;
  }
  else{
    foodS = foodS+1
  } 
  foodObj.updateFoodStock(foodS,lastFed);
}
  function feedDog() {  
    dog.addImage(Image2);
    var time = hour();

    if(foodS-1<=0){
      foodS = 0;
    }
    else{
      foodS = foodS-1
    }
    foodObj.updateFoodStock(foodS,time);
  }
  function update(state){
    database.ref('/').update({
      GameState: state
    });
  }
