$(function () {
    var $gameMap = $(".game_map");

    var $hero = $(".hero");
    var key;
    var heroPos = 200;


    var $enemy = $(".enemy");
    var enemyPos = 30;
    var enemyPos = $enemy.offset();
    var enemyPosTop = enemyPos.top;



    console.log("check22");
    $(window).on("keydown", function (e) {
        key = e.keyCode;

        console.log(key);
        console.log(heroPos);

        if (key == 39) {
            //오른쪽으로 움직일때
            if (heroPos < 370) {
                console.log("check");
                heroPos += 10;
                console.log("move : " + heroPos);
            } else {
                console.log("check33");

                heroPos += 0;
                console.log("move : " + heroPos);
            }

            $hero.stop().animate({
                left: heroPos + "px"
            }, 100)

        } else if (key == 37) {
            //왼쪽으로 움직일때
            if (heroPos > 30) {
                console.log("check");
                heroPos -= 10;
                console.log("move : " + heroPos);
            } else {
                console.log("check33");

                heroPos += 0;
                console.log("move : " + heroPos);
            }

            $hero.stop().animate({
                left: heroPos + "px"
            }, 100)
        }
    })
    var $enemyDropper = $(".enemy_wrap");
    var enemyDropperPos = 0;
    var enemyDropperPosLeft = 0;

    var $gameMapBottom = $(".game_map .bottom");
    var gameMapBottomPos = $gameMapBottom.offset().top;
    var move = 0;

    var start = new Date().getTime();
    var power = 4;
    var enemyTopPos = 0;
    var enemyPos = null;
    var abc = null;
    var time = 0;

    var enemyFc = function ($this) {
        ranPx = Math.floor(Math.random() * (340 + 30));
        // console.log(ranPx);

        // $this.clone().appendTo($gameMap).css({
        //     display: "block",
        //     left: ranPx + "px"
        // });
        $this.css({
            display: "block",
            left: ranPx + "px"
        });

        var callback = function () {
            var ts = new Date().getTime();
            if (ts - 3000 > start) {
                console.log("껏!!");
            } else {
                console.log("동작 중");

                if (($this.offset().top) < ($gameMap.height() + 100)) {
                    enemyTopPos += power;
                    $this.css({
                        top: enemyTopPos + "px"
                    });

                    console.log("this: ", $this.offset());
                    console.log("hero: ", $hero.offset());

                    if ((($this.offset().top) - (100 - $this.height()) == ($hero.offset().top - 100)) && (($this.offset().left) == ($hero.offset().left))) {
                        enemyTopPos += 0;

                        console.log("check");
                        $this.css({
                            top: enemyTopPos + "px",
                            display: "none"
                        })
                    }
                }
                requestAnimationFrame(callback);
            }
            requestAnimationFrame(callback);

        }


    }
    // enemyFc($enemy.clone().appendTo($gameMap));


    for (var i = 0; i < 100; i++) {
        ranTime = (Math.random() * (60 + 3)) * 1000;
        setTimeout(function () {
            enemyFc($enemy.clone().appendTo($gameMap));




        }, (ranTime))

    };
})

// console.log(start);
// console.log($hero.offset().top - 100);
// var callback = function () {
//     var ts = new Date().getTime();
//     if (ts - 3000 > start) {
//         console.log("check!!");
//     } else {
//         console.log("check!@#: ", ts);

//         console.log("gameMap: ", $gameMap.height());

//         if (($enemy.offset().top - 100) < ($gameMap.height())) {
//             enemyTopPos += power;
//             $enemy.css({
//                 top: enemyTopPos + "px"
//             });
//             console.log("enemyTopPos: ", enemyTopPos);
//             requestAnimationFrame(callback);

//             if (($enemy.offset().top) - (100 - $enemy.height()) > ($hero.offset().top - 100)) {
//                 $enemy.css({
//                     display: "none"
//                 });
//             }
//         }
//     }
// }

// requestAnimationFrame(callback);




// for (var i = 0; i < 100; i++) {
//     ranTime = (Math.random() * (60 + 3)) * 1000;
//     setTimeout(function () {
//         ranPx = Math.floor(Math.random() * (340 + 30));
//         enemyDropperPos = ranPx;
//         $enemyDropper.css({
//             left: ranPx + "px"
//         });

//         $enemy.clone().appendTo($gameMap).animate({
//             top:  700 + "px"
//         }, 3000).css({
//             display: "block",
//             left: ranPx + "px"
//         });

//         if($enemy.position() == $hero.position()){
//             console.log("check!!!");
//             $enemy.css({display: none});
//         }


//         // enemyTopPos = $(this).offset().top
//         console.log("enemyTopPos :" + $enemy.offset().top)

//         // console.log("랜덤 시간값 : " + (ranTime));

//         // console.log("랜덤 픽셀값 :" + ranPx);
//     }, (ranTime))