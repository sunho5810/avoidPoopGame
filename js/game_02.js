var gameMap = document.querySelector(".game_map");
var gameMapRect = gameMap.getBoundingClientRect();
var gameMapRectT = gameMapRect.top;
var gameMapRectR = gameMapRect.right - gameMapRect.left;
var gameMapRectL = gameMapRect.left - gameMapRect.left;
var gameMapRectB = gameMapRect.bottom - gameMapRectT;

// console.log("map R: " + gameMapRectR + ", L: " + gameMapRectL + ", B: " + gameMapRectB + ", T: " + gameMapRectT);

var hero = document.querySelector(".hero"); //클래스로 불러오기
var heroRect = hero.getBoundingClientRect(); // 해당 돔 요소의 각종 좌표값이 들어있음
var heroRectR = ((gameMapRect.right - gameMapRect.left) / 2) + 25;
var heroRectL = ((gameMapRect.right - gameMapRect.left) / 2) - 25;
var heroRectT = heroRect.top - gameMapRectT;
var heroPos = ((gameMapRect.right - gameMapRect.left) / 2) - 25;
// console.log("Hero R: " + heroRectR + ", L: " + heroRectL);
// console.log(heroPos);
// console.log("heroRectT: " + heroRectT);
hero.style.left = heroPos + "px";

var keyCanNot = false;

var heroFuc = function () {
    //키보드 동작
    heroPos = ((gameMapRect.right - gameMapRect.left) / 2) - 25;
    hero.style.opacity = 1;

    window.addEventListener("keydown", function (e) {

        // console.log(heroPos);

        if(keyCanNot == false){
            if (e.code === "ArrowRight") { //오른쪽 눌렀을때

                if (heroPos < gameMapRectR - 50) {
                    heroPos += 10;
                } else {
                    heroPos += 0;
                }
                hero.style.left = heroPos + "px";
                // console.log("Hero R: " + heroRectR + ", L: " + heroRectL);
    
            } else if (e.code === "ArrowLeft") {
    
                if (heroPos > gameMapRectL) { //왼쪽 눌렀을때
                    heroPos -= 10;
                } else {
                    heroPos -= 0;
                }
                hero.style.left = heroPos + "px";
                // console.log("Hero R: " + heroRectR + ", L: " + heroRectL);
    
            }
        } else {
           heroPos -= 0;
        }
      
    });
}



var enemy = document.querySelector(".enemy");
var enemyRect = enemy.getBoundingClientRect();
var enemyRectB = enemyRect.bottom;
var enemyRectL = enemyRect.left;
var enemyPos = gameMapRect.top - enemyRectB;
var ranPos = 0;
// var enemyClone = enemy.cloneNode(true);

var ranTime = 0;
var dropSpeed = 10;
var start = new Date().getTime();

var ts = new Date().getTime();


var runningGame = 0;

// console.log("enemyRectL: " + enemyRectL);
var count = 0;
var score = 0;

var enemyFuc = function (a) {
    ranPos = Math.floor(Math.random() * (340 + 30));
    // count += 1;

    var cloned = a.cloneNode(true);
    gameMap.appendChild(cloned);

    var clonedRect = cloned.getBoundingClientRect();
    var clonedRectB = clonedRect.bottom - gameMapRectT - cloned.offsetHeight;
    var clonedRectL = ranPos;
    var clonedRectR = ranPos + enemy.offsetWidth;
    // var clonedPos = clonedRect.top - clonedRectB;
    // console.log(cloned);

    cloned.style.left = ranPos + "px";
    cloned.style.display = "block";

    // console.log("gameMapRectB: " + gameMapRectB);
    // console.log("clonedRectL: " + clonedRectL);
    // console.log("clonedRectR: " + clonedRectR);
    // console.log("clonedRectB: " + clonedRectB);
    // console.log("enemy.offsetWidth:" + enemy.offsetWidth);

    // console.log("");
    // console.log("gameMapRectB: " + gameMapRectB);

    // var dropEnemy = function(){
    var dropTime = setInterval(function () {
        // console.log("clonedRectB: " + clonedRectB);
        // console.log("clonedRectL: " + clonedRectL + ", heroRectL: " + heroPos);
        // console.log("clonedRectB: " + clonedRectB + ", heroRectT: " + heroRectT);
        // console.log("clonedoffsetHeight: " + cloned.offsetHeight + ", cloned.offsetWidth: " + cloned.offsetWidth);

        // console.log("check");
        // if (ts - 35000 /* 1500 */ > start) {
        //     clearInterval(dropEnemy);
        //     console.log("껏!!");
        //     runningGame = 3;

        // } else {



        if (clonedRectB >= gameMapRectB) {
            // console.log("clonedRectB >= gameMapRectB");
            score += 1;
            clearInterval(dropTime);
            cloned.remove();
            clonedRectB += 0;
        } else {
            var cdCapture = collisionDetection();
            // console.log(cdCapture);
            if (cdCapture == true) {
                console.log("충돌");
                console.log("check2222");
                gameEnding.style.display = "block";
                gameOver.style.display = "flex";
                keyCanNot = true;
                clearInterval(dropTime);

            } else {
                clonedRectB += dropSpeed;

            }
        }
        cloned.style.top = clonedRectB + "px";
        console.log("만점 : ", enemyUnited, ", score: ", score);

        if (score >= enemyUnited) {
            console.log("check score");
            gameEnding.style.display = "block";
            gameClear.style.display = "flex";
            console.log("check3333");
            keyCanNot = true;
            clearInterval(dropTime);
        }
        if (reSet == 1) {
            cloned.remove();
            reSet = 0;
        }
        console.log("running3 : " + runningGame);

        // }
    }, 20);
    // }


    var collisionDetection = function () {
        if ((clonedRectL + cloned.offsetWidth) >= heroPos && clonedRectL <= (heroPos + hero.offsetWidth) && (clonedRectB + cloned.offsetHeight + dropSpeed) > heroRectT) {
            return true;
        } else {
            return false;
        }
    }
}






//게임시작 버튼 누르면 게임 시작

var gameStartBT = document.querySelector(".game_start_bt");
var gameEnding = document.querySelector(".game_ending");
var gameOver = document.querySelector(".game_over");
var gameClear = document.querySelector(".game_clear");
var restartBT = document.querySelector(".restart");
var reSet = 0;

var createEnemyDelay = null;

var enemyUnited = 20;


var gamePlay = function () {
    heroFuc();
    console.log("check123");


    for (i = 0; i < enemyUnited; i++) {
        ranTime = ((Math.random() * 15) + 2) * 1000;
        createEnemyDelay = setTimeout(function () {

            enemyFuc(enemy);

        }, ranTime);
    }

}



gameStartBT.addEventListener("click", function () {
    gameStartBT.style.display = "none";

    gamePlay();
});





restartBT.addEventListener("click", function () {
    // gameStartBT.style.display = "block";
    // restartBT.style.display = "none";
    // gameEnding.style.display = "none";
    // gameOver.style.display = "none";

    //초기화


    history.go(0);
});