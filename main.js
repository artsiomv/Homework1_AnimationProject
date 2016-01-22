var moveFly = false;
Fly.radius = 25;
Fly.x;
Fly.y;
var score = 0;

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 20;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0, 500, 800, 300);
    ctx.fillRect(300, 350, 300, 40);
    ctx.font = "18px serif";
    ctx.fillText("Control:", 10, 50);
    ctx.fillText("Space = jump, A = move left, D = move right, S = get down", 10, 80);
    ctx.fillText("Q = attack, X = die (press space, A, or D to resurrect", 10, 100);
    Entity.prototype.draw.call(this);
}

function Fly(game) {
    this.flyAnimation = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 750, 0, 51, 29, 0.5, 2, true, false);
    this.radius = Fly.radius;
    Entity.call(this, game, 210, 210);
}
Fly.prototype = new Entity();
Fly.prototype.constructor = Fly;
Fly.prototype.update = function () {

    Fly.x = this.x;
    Fly.y = this.y;

    if (this.flyAnimation.isDone()) {
        this.flyAnimation.elapsedTime = 0;
    }

    var jumpDistance = this.flyAnimation.elapsedTime / this.flyAnimation.totalTime;
    var totalHeight = 2;

    if (jumpDistance > 0.5)
        jumpDistance = 1 - jumpDistance;

    var height = jumpDistance * 2 * totalHeight;
    //var height = totalHeight * (-4 * (jumpDistance * jumpDistance - jumpDistance));
    this.y -= height;
    this.y = this.y + 1;

    if (moveFly) {
        moveFly = false;
        //this.game.removeFromWorld = true;
        this.x = Math.floor(Math.random() * (750 - 50 + 1)) + 50;
        this.y = Math.floor(Math.random() * (210 - 400 + 1)) +400;
        
        // console.log('false');
    }
    //console.log(moveFly);

    Entity.prototype.update.call(this);
}

Fly.prototype.draw = function (ctx) {
    this.flyAnimation.drawFrame(this.game.clockTick, ctx, this.x-23, this.y-10);
    Entity.prototype.draw.call(this);
}

function Link(game) {
    this.standAnimation = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 0, 45, 79, 0.7, 2, true, false);
    //this.sleepAnimation = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 160, 45, 79, 1.5, 2, true, false);
    this.jumpingAnimation = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 465, 75, 101, 0.24, 3, false, false);
    this.runningAnimation = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 318, 75, 72, 0.1, 10, true, false);

    this.dyingAnimation = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 669, 96, 99, 0.15, 3, false, false);
    this.dyingAnimationReversed = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 769, 96, 99, 0.1, 3, false, false);

    this.deadAnimation = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 288, 742, 96, 99, 0.2, 1, true, false);
    this.deadAnimationReversed = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 288, 842, 96, 99, 0.2, 1, true, false);

    this.downAnimation = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 225, 510, 75, 56, 1, 1, true, false);
    this.downAnimationReversed = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 225, 612, 75, 56, 1, 1, true, false);

    this.standAnimationReversed = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 81, 45, 79, 0.7, 2, true, false);
    //this.sleepAnimationReversed = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 240, 45, 79, 1.5, 2, true, false);
    //this.jumpingAnimationReversed = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 567, 75, 101, 0.3, 3, false, false);
    this.runningAnimationReversed = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 392, 75, 72, 0.1, 10, true, false);

    this.slash2Animation = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 869, 150, 111, 0.1, 2, false, false);
    this.slash2AnimationReversed = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 981, 150, 111, 0.1, 2, false, false);

    this.slash3Animation = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 1093, 125, 93, 0.1, 2, false, false);
    this.slash3AnimationReversed = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 1187, 125, 93, 0.1, 2, false, false);

    this.slash1Animation = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 1281, 140, 86, 0.1, 2, false, false);
    this.slash1AnimationReversed = new Animation(ASSET_MANAGER.getAsset("./img/link-blueQUICK1.png"), 0, 1368, 140, 86, 0.1, 2, false, false);

    this.left = false;
    this.sleeping = false;
    this.running = false;
    this.jumping = false;
    this.down = false;
    this.dying = false;
    this.dead = false;
    this.slash = false;
 
    this.radius = 50;
    this.ground = 400;
    //var rect = this.getBoundingClientRect();
    Entity.call(this, game, 0, 423);
}

var animNum = 1;
Link.prototype = new Entity();
Link.prototype.constructor = Link;

Link.prototype.update = function () {
    if (this.hitFly()) {
        //Fly.removeFromWorld = true;
        //console.log(Fly.removeFromWorld);
        moveFly = true;
        //console.log(moveFly);
            //Math.floor(Math.random() * (750 - 50 + 1)) + 50;
        //console.log(Math.floor(Math.random() * (750 - 50 + 1)) + 50);
        //Entity.prototype.update.call(this);
        //this.removeFromWorld = true;
        //this.game.lives -= 1;
        console.log(true);
    }

    //*************************************//
    //****GET ORIENTATION OF MOVEMENTS*****//
    //*************************************//
    if (this.game.A) this.left = true;
    if (this.game.D) this.left = false;

    //*************************************//
    //******CANCEL RUNNING ANIMATION*******//
    //*************************************//
    if (!this.game.D || !this.game.A) this.running = false;

    //*************************************//
    //********CANCEL DOWN ANIMATION********//
    //*************************************//
    if (!this.game.S) this.down = false;

    //*************************************//
    //********CANCEL DEAD ANIMATION********//
    //*************************************//
    if (this.game.space || this.game.A || this.game.D) this.dead = false;

    //*************************************//
    //*********START RUNNING RIGHT*********//
    //*************************************//
    if (this.game.D) {
        this.left = false;
        this.running = true;
        this.x += 4;
    }
   
    //*************************************//
    //*********START RUNNING LEFT**********//
    //*************************************//
    if (this.game.A) {
        this.left = true;
        this.running = true;
        this.x -= 4;
    }

    //*************************************//
    //*********ACTIVATE JUMPING************//
    //*************************************//
    if (this.game.space) this.jumping = true;
    //*************************************//
    //*********ACTIVATE "DOWN"*************//
    //*************************************//
    if (this.game.S) this.down = true;
    //*************************************//
    //*********ACTIVATE DYING**************//
    //*************************************//
    if (this.game.X) this.dying = true;
    //*************************************//
    //*********ACTIVATE SLASH**************//
    //*************************************//
    if (this.game.Q) {
        this.slash = true;
    }
    //*************************************//
    //***********JUMPING LOGIC*************//
    //*************************************//
    if (this.jumping) {
        if (this.jumpingAnimation.isDone()) {
            this.jumpingAnimation.elapsedTime = 0;
            this.jumping = false;
        } 
        var jumpDistance = this.jumpingAnimation.elapsedTime / this.jumpingAnimation.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight * (-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
        this.y = this.y + 23;
        //this.sleeping = false;
    }

    //*************************************//
    //**************DOWN LOGIC*************//
    //*************************************//
    if (this.down) {
        if (this.downAnimation.isDone()) {
            this.downAnimation.elapsedTime = 0;
        }
    }

    //*************************************//
    //*************DYING LOGIC*************//
    //*************************************//
    if (this.dying) {
        if (this.dyingAnimation.isDone() || this.dyingAnimationReversed.isDone()) {
            this.dead = true;
            this.dyingAnimation.elapsedTime = 0;
            this.dyingAnimationReversed.elapsedTime = 0;
            this.dying = false;
        }

        if (this.left) this.x += 2;
        if (!this.left) this.x -= 2;
    }

    //*************************************//
    //**************DEAD LOGIC*************//
    //*************************************//
    if (this.dead) {
        if (this.deadAnimation.isDone()) {
            this.deadAnimation.elapsedTime = 0;
            //if (this.game.space) this.dying = false;
        }
    }

    //*************************************//
    //***********SLASH LOGIC***************//
    //*************************************//
    if (this.slash) {
        //animNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        //needs optimization
        if (this.slash1Animation.isDone() || this.slash1AnimationReversed.isDone() ||
            this.slash2Animation.isDone() || this.slash2AnimationReversed.isDone() ||
            this.slash3Animation.isDone() || this.slash3AnimationReversed.isDone()) {
            this.slash1Animation.elapsedTime = 0;
            this.slash1AnimationReversed.elapsedTime = 0
            this.slash2Animation.elapsedTime = 0;
            this.slash2AnimationReversed.elapsedTime = 0;
            this.slash3Animation.elapsedTime = 0;
            this.slash3AnimationReversed.elapsedTime = 0;
            this.slash = false;
            if (animNum == 3) animNum = 1;
            else animNum++;
        }
    }

    //*************************************//
    //************CHECK BOUNDS*************//
    //*************************************//
    if (this.x <= 0) {
        this.x = this.x + 4;
    }
    if (this.x >= 800-75) {   // frame width - sprite width
        this.x = this.x - 4;
    }

    //for(var i = 0, i < this.game.Entity.ledgel; i++) {

    //}

    //if (isCollide(this, Background)) 
    //if(this.x || this.y)
        //console.log(isCollide(this, Background));


    Entity.prototype.update.call(this);
}


Link.prototype.draw = function (ctx) {
    if (this.left) {
        if (this.sleeping) {
            //this.sleepAnimationReversed.drawFrame(this.game.clockTick, ctx, this.x, this.y+1);
        }
        else if (this.jumping) {
            ctx.save();
            ctx.scale(-1, 1);
            this.jumpingAnimation.drawFrame(this.game.clockTick, ctx, -this.x-60, this.y - 21);
            ctx.restore();
        }
        else if (this.running) {
            this.runningAnimationReversed.drawFrame(this.game.clockTick, ctx, this.x, this.y + 5);
        }
        else if (this.down) {
            this.downAnimationReversed.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23);
        }
        else if (this.dying) {
            this.dyingAnimationReversed.drawFrame(this.game.clockTick, ctx, this.x, this.y-20);
        }
        else if (this.dead) {
            this.deadAnimationReversed.drawFrame(this.game.clockTick, ctx, this.x, this.y + 53);
        }
        else if (this.slash) {
            if (animNum == 1) this.slash1AnimationReversed.drawFrame(this.game.clockTick, ctx, this.x - 79, this.y - 7); //OK
            if (animNum == 2) this.slash2AnimationReversed.drawFrame(this.game.clockTick, ctx, this.x - 81, this.y - 32); //OK
            if (animNum == 3) this.slash3AnimationReversed.drawFrame(this.game.clockTick, ctx, this.x - 77, this.y - 5); //OK
        }
        else {
            this.standAnimationReversed.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    }
    else {
        if (this.sleeping) {
            //this.sleepAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else if (this.jumping) {
            this.jumpingAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y - 21);
        }
        else if (this.running) {
            this.runningAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y + 5);
        }
        else if (this.down) {
            this.downAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23);
        }
        else if (this.dying) {
            this.dyingAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y-20);
        }
        else if (this.dead) {
            this.deadAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y + 53);
        }
        else if (this.slash) {
            if (animNum == 1) this.slash1Animation.drawFrame(this.game.clockTick, ctx, this.x - 15, this.y - 7); //OK
            if (animNum == 2) this.slash2Animation.drawFrame(this.game.clockTick, ctx, this.x - 22, this.y - 32); //OK
            if (animNum == 3) this.slash3Animation.drawFrame(this.game.clockTick, ctx, this.x, this.y - 5); //OK
        }
        else {
            this.standAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    }
    Entity.prototype.draw.call(this);
}
// the "main" code begins here

Link.prototype.hitFly = function () {
    return ((this.y <= Fly.y + 29 && this.y >= Fly.y ||
    this.y + 101 <= Fly.y + 29 && this.y + 101 >= Fly.y) &&
    (this.x + 75 >= Fly.x && this.x + 75 <= Fly.x + 51 ||
    this.x >= Fly.x && this.x <= Fly.x + 51));
}

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/link-blueQUICK1.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
    var fly = new Fly(gameEngine);
    var link = new Link(gameEngine);
    

    gameEngine.addEntity(bg);
    gameEngine.addEntity(fly);
    gameEngine.addEntity(link);
    
 
    gameEngine.init(ctx);
    gameEngine.start();
});
