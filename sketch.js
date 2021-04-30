//Create variables here
var happyDogImg,dogImg;
var database;
var foodStock = 0;
var foodS,foodObj;
var feedTime=0;
var lastFed;
var database;

function preload()
{
 happyDogImg = loadImage("images/happydog.png");
 dogImg = loadImage("images/Dog.png")
 
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  dog = createSprite(250,350);
  dog.addImage(dogImg);
  dog.scale=0.2;
 
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  foodObj = new Food();
  feed = createButton("feed the dog")
  feed.position(300,50);
  feed.mousePressed(feedDog);

  addingFood = createButton("add food");
  addingFood.position(220,50)
  addingFood.mousePressed(addFood);
}


function draw() {  
//  background(46, 139, 87);
background(46, 139, 87);

  drawSprites();
  textSize(20);
  fill("blue");
  stroke("black");

  
  lastFed = database.ref('FeedTime')
  lastFed.on("value",function(data){
    feedTime = data.val();
  })

  if(feedTime > 12){
     text("last fed: "+feedTime % 12 +"P.M" , 50,50);
  }else if(feedTime === 0){
    text("last fed: 12 A.M",50,50)
  }else if(feedTime === 12){
    text("last fed: "+feedTime + " noon",50,50);
  }else{
    text("lastfed: "+feedTime + "A.M",50,50)
  }

  foodObj.display();
  
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function writeStock(x){

  if(x<= 0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

function feedDog(){

 if(foodStock <= 0 ){
    foodStock = 0;
    
 }else{
  dog.addImage(happyDogImg);
   foodStock = foodStock - 1
 }

 database.ref('/').update({
  food:foodObj.getFoodStock(),
  FeedTime:hour ()
})

 foodObj.updateFoodStock(foodObj.getFoodStock()-1)
}

function addFood(){

  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour ()
  })
  
   foodObj.updateFoodStock(foodObj.getFoodStock()+1)
}