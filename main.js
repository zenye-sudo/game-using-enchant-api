enchant();

window.onload = function () {
    var game = new Game(640, 320);
    game.rootScene.backgroundColor = "blue";
    game.preload('images/backgroundMusic.mp3', 'images/gameBonus.wav', 'images/chara1.png', 'images/test.png', 'images/test1.png', 'images/map0.png', 'images/start.png', 'images/end.png');
    game.fps = 100;
    var backwardCheck = false;
    var directionRightCheck = true;
    game.onload = function () {
        // Game start scene start
        var StartScene = Class.create(Scene, {
            initialize: function () {
                Scene.apply(this);
                this.backgroundColor = 'rgba(0, 0, 0, 0.5)';

                // Display the start message
                var start_scene_sprit = new Sprite(236, 48);
                start_scene_sprit.image = game.assets["images/start.png"];
                start_scene_sprit.frame = 0;
                start_scene_sprit.x = game.width / 2 - start_scene_sprit.width / 2;
                start_scene_sprit.y = game.height / 2 - start_scene_sprit.height / 2;
                this.addChild(start_scene_sprit);

                var label=new Label("Enter to continue");
                label.width = 128;
                label.height = 64;
                // label.font = "20px 'Arial'";
                label.color = "white";
                label.x=game.width/2-label.width/2;
                label.y=(game.height / 2 - label.height / 2 ) +  (start_scene_sprit.height+10);
                this.addChild(label);
            }
        });
        // Game start scene end
        // Game over scene start
        var GameOverScene = Class.create(Scene, {
            initialize: function () {
                Scene.apply(this);
                this.backgroundColor = 'rgba(0, 0, 0, 0.5)';

                // Display the start message
                var game_over_sprit = new Sprite(189, 97);
                game_over_sprit.image = game.assets["images/end.png"];
                game_over_sprit.frame = 0;
                game_over_sprit.x = game.width / 2 - game_over_sprit.width / 2;
                game_over_sprit.y = game.height / 2 - game_over_sprit.height / 2;
                this.addChild(game_over_sprit);
            }
        });
        // Game over scene start

        var prize_score = 0;
        var map = new Map(16, 16);
        var groundCheck = true;
        map.image = game.assets['images/map0.png'];

        map.loadData(
            [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,],
                [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,],
                [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]
        );
        game.rootScene.addChild(map);
        var label = new enchant.Label();
        label.width = 128;
        label.height = 64;
        label.font = "20px 'Arial'";
        label.color = "white";
        label.moveTo(10, 10);
        label.text = "Prize score: " + prize_score;
        game.rootScene.addChild(label);
        // game.rootScene.addChild(label);
        var delayCounter = 0;
        var delayCounter1 = 0;
        var delayCounter2 = 0;
        var delayCounter3 = 0;
        var delayCounter4 = 0;
        var delayCounter5 = 0;
        //for game start scene start
        var startScene = new StartScene();
        game.pushScene(startScene);
        // Handle click events to start the game
        document.addEventListener('keydown', function(event) {
            var keyPressed = event.key || event.keyCode;
            if(keyPressed=="Enter"){
                game.removeScene(startScene);
                document.getElementById("backgroundMusic").play();
            }
        });
        startScene.addEventListener(Event.TOUCH_START, function () {
            // Remove the start scene
            game.removeScene(startScene);
            document.getElementById("backgroundMusic").play();

        });
        //for game start scene end
        //for initial object start
        var initialBuildingGroup = new Group();
        for (var x = 8, y = 0; x < 12; x++, y += 150) {
            if (x < 11 && x > 8) {
                var initialcloud = new Sprite(100, 55);
                initialcloud.image = game.assets['images/test1.png'];
                initialcloud.frame = x - 5;
                initialcloud.x = y;
                initialcloud.y = randomNumber(1, 3) == 1 ? game.height - 250 : 10;
                ;
                initialBuildingGroup.addChild(initialcloud);
            }
            var initialBuilding = new Sprite(125, 150);
            initialBuilding.image = game.assets['images/test1.png'];
            initialBuilding.frame = x;
            initialBuilding.x = y;
            initialBuilding.y = game.height - (144 + initialBuilding.height - 3);
            initialBuildingGroup.addChild(initialBuilding);


        }
        game.rootScene.addChild(initialBuildingGroup);
        //for initial object end

        //For materials start

        game.rootScene.addEventListener('enterframe', function () {
            initialBuildingGroup.x -= 1;
            delayCounter++;
            delayCounter1++;
            delayCounter2++;
            delayCounter3++;
            delayCounter4++;
            delayCounter5++;

            // console.log("DelayCounter" + delayCounter);
            if (Math.random() < 0.01 && delayCounter4 > 90) {
                var building = new Sprite(125, 150);
                building.image = game.assets['images/test1.png'];
                building.frame = randomNumber(8, 16);
                console.log("building Frame is " + building.frame);
                building.x = game.width;
                building.y = game.height - (144 + building.height - 3);
                building.addEventListener('enterframe', function () {
                    //     if (car.x < -car.width) {
                    //         game.rootScene.removeChild(car);
                    //     }
                    if (backwardCheck != true && directionRightCheck == true) {
                        building.x -= 1;
                    } else {
                        building.x += 1;
                    }
                });
                game.rootScene.addChild(building);
                delayCounter4 = 0;
            }
            if (Math.random() < 0.01 && delayCounter > 260) {
                var cactus = new Sprite(28, 28);
                // cactus.image = game.assets['images/monster/monster6.gif'];
                cactus.image = game.assets['images/test.png'];
                // cactus.frame = 9;
                cactus.frame = 0;
                cactus.x = game.width;
                cactus.y = game.height - cactus.height * 1.4;
                cactus.addEventListener('enterframe', function () {
                    if (cactus.intersect(player)) {
                        game.stop();
                        var gameOverScene = new GameOverScene();
                        document.getElementById("gameOver").play();
                        game.pushScene(gameOverScene);
                        document.getElementById("backgroundMusic").pause();
                        document.addEventListener('keydown', function(event) {
                            var keyPressed = event.key || event.keyCode;
                            if(keyPressed=="Enter"){
                                location.reload();
                            }
                        });

                    }
                    if (cactus.x < -cactus.width) {
                        game.rootScene.removeChild(cactus);
                    }
                    if (backwardCheck != true && directionRightCheck == true) {
                        cactus.x -= 2.5;

                    } else {
                        cactus.x += 2.5;
                    }
                });
                game.rootScene.addChild(cactus);
                delayCounter = 0;
            }
            if (Math.random() < 0.01 && delayCounter1 > 200) {
                var car = new Sprite(100, 55);
                car.image = game.assets['images/test1.png'];
                // cactus.frame = 9;
                car.frame = randomNumber(1, 3);
                console.log("car Frame is " + car.frame);
                car.x = game.width;
                car.y = game.height - (110 + car.height);
                car.addEventListener('enterframe', function () {
                    //     if (car.x < -car.width) {
                    //         game.rootScene.removeChild(car);
                    //     }
                    if (backwardCheck != true && directionRightCheck == true) {
                        car.x -= 5;

                    } else {
                        car.x -= 2.5;
                    }
                });
                game.rootScene.addChild(car);
                delayCounter1 = 0;
            }
            if (Math.random() < 0.01 && delayCounter2 > 350) {
                var cloud = new Sprite(100, 55);
                cloud.image = game.assets['images/test1.png'];
                cloud.frame = randomNumber(3, 6);
                console.log("cloud Frame is " + cloud.frame);
                cloud.x = game.width;
                cloud.y = randomNumber(1, 3) == 1 ? game.height - 250 : 10;
                cloud.addEventListener('enterframe', function () {
                    //     if (car.x < -car.width) {
                    //         game.rootScene.removeChild(car);
                    //     }
                    if (backwardCheck != true && directionRightCheck == true) {
                        cloud.x -= 0.4;
                    } else {
                        cloud.x += 0.2;
                    }
                });
                game.rootScene.addChild(cloud);
                delayCounter2 = 0;
            }
            if (Math.random() < 0.01 && delayCounter3 > 400) {
                var bench = new Sprite(100, 55);
                bench.image = game.assets['images/test1.png'];
                bench.frame = 6;
                console.log("bench Frame is " + bench.frame);
                bench.x = game.width;
                bench.y = game.height - 115;
                bench.addEventListener('enterframe', function () {
                    //     if (car.x < -car.width) {
                    //         game.rootScene.removeChild(car);
                    //     }
                    if (backwardCheck != true && directionRightCheck == true) {
                        bench.x -= 1;

                    } else {
                        bench.x += 1;
                    }
                });
                game.rootScene.addChild(bench);
                delayCounter3 = 0;
            }
            if (Math.random() < 0.01 && delayCounter5 > 400) {
                var prize = new Sprite(16, 16);
                prize.image = game.assets['images/map0.png'];
                prize.frame = 25;
                console.log("prize Frame is " + prize.frame);
                prize.x = game.width;
                prize.y = game.height - 110;
                prize.addEventListener('enterframe', function () {
                    //     if (car.x < -car.width) {
                    //         game.rootScene.removeChild(car);
                    //     }
                    if (prize.intersect(player)) {
                        if (groundCheck == false) {
                            prize_score++;
                            game.rootScene.removeChild(prize);
                            label.text = "Prize score: " + prize_score;
                            document.getElementById("gameBonus").play();
                            game.rootScene.addChild(label);
                        }
                        groundCheck = true;
                        console.log(prize_score);
                        // game.stop();
                        // alert('Game Over!');
                    }
                    if (backwardCheck != true && directionRightCheck == true) {
                        prize.x -= 2.5;
                    } else {
                        prize.x += 2.5;
                    }
                });
                game.rootScene.addChild(prize);
                delayCounter5 = 0;
            }

        });

        //for materials end
        var player = new Sprite(32, 32);
        player.image = game.assets['images/chara1.png'];
        player.frame = 5; // Initial frame
        player.x = 0;
        player.y = game.height - player.height * 1.4;
        player.vx = 0; // Initial velocity
        player.vy = 0;
        player.jumpHeight = -8; // Jump height
        player.gravity = 0.4; // Gravity
        // player.rotation=90;
        // Define animations
        var walkForwardFrames = [6, 7]; // Frames for walking forward animation
        var walkBackwardFrames = [6, 7]; // Frames for walking backward animation
        var jumpFrames = [5]; // Frame for jump animation
        function randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        // Start the walk forward animation
        player.walkForward = function () {
            this.frame = walkForwardFrames[Math.floor(this.age % walkForwardFrames.length)];
            // this.frame = walkForwardFrames[randomNumber(0, 2)];
        };

        // Start the walk backward animation
        player.walkBackward = function () {
            this.frame = walkBackwardFrames[Math.floor(this.age % walkBackwardFrames.length)];
            // this.frame = walkForwardFrames[randomNumber(0, 2)];

        };

        // Start the jump animation
        player.jump = function () {
            document.getElementById("aha").play();
            this.frame = jumpFrames[0];
            groundCheck = false;
        };
        // Event listener for game loop
        player.addEventListener('enterframe', function () {

            // Apply gravity
            // var Enemy = new Enemy();
            this.vy += this.gravity;

            // Move player
            this.x += this.vx;
            this.y += this.vy;
            // Check for collision with ground
            if (this.y > game.height - this.height * 1.4) {
                this.y = game.height - this.height * 1.4;
                this.vy = 0;
            }
            // Handle input for movement
            if (game.input.left) {
                this.vx = -2; // Move left
                this.scaleX = -1; // Flip sprite horizontally
                this.walkBackward(); // Start walk backward animation
                backwardCheck = true;
                directionRightCheck = false;
            } else if (game.input.right) {
                this.vx = 1; // Move right
                this.scaleX = 1; // Reset sprite orientation
                this.walkForward(); // Start walk forward animation
                backwardCheck = false;
                directionRightCheck = true;
            } else {
                this.vx = 0; // Stop horizontal movement
                if (this.y == game.height - this.height * 1.4) { //for animation ground level
                    this.frame = [6, 7]; // Stop animation
                    groundCheck = true;
                    backwardCheck = false;
                    // directionRightCheck=true;
                    if (this.x < game.width / 2 - this.width) {
                        this.x += 1;
                    }
                }
            }

            // Handle input for jumping
            if (game.input.up && this.y === game.height - this.height * 1.4) {
                this.vy = this.jumpHeight; // Apply jump velocity
                this.jump(); // Start jump animation
            }
        });

        game.rootScene.addChild(player);
    };

    game.start();
};



