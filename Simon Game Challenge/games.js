var color=["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var level=0;
var count=0;
$(document).on("keypress",function(){
if(count==0)
  {
    // $("h1").text("Level "+level);
    // level++;
    nextSeq();
    count++;
  }
});
function startOver()
{
  level=0;
  gamePattern=[];
  userPattern=[];
  count=0;

}
function nextSeq()
{
  $("h1").text("Level "+level);
  level++;
  var rn=Math.floor(Math.random()*4);
  var next=color[rn];
  gamePattern.push(next);
  $("#"+next).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(next);
}

$(".btn").on("click",function()
{
  var choice=$(this).attr("id");
  // alert(choice);
  playSound(choice);
  animatePress(choice);
  userPattern.push(choice);
  checkAnswer(userPattern.length-1);

});

function playSound(key){
  var audio=new Audio("sounds/"+key+".mp3");
  audio.play();
}

function animatePress(choice)
{
  $("#"+choice).addClass("pressed");
  setTimeout(function(){
    $("#"+choice).removeClass("pressed");
  },100);
}

function checkAnswer(curLevel)
{
  if(userPattern[curLevel]===gamePattern[curLevel])
  {
    // alert("Right");
    if(curLevel===(level-1))
    {
      setTimeout(function(){
        userPattern=[];
        nextSeq();
      },100);
    }
  }
  else
  {
      // alert("Wrong");
      var audio=new Audio("sounds/wrong.mp3");
      audio.play();
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
  }
}
