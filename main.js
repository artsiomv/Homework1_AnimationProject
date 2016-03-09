var energyNeededToClone = 10;
var percentageRateClone = 0.005;
var energyLoss = 0.5;
var energyGain = 1;

var socket = io.connect("http://76.28.150.193:8888");

window.onload = function () {
    socket.on("connect", function () {
        console.log("Socket connected.")
    });
    socket.on("disconnect", function () {
        console.log("Socket disconnected.")
    });
    socket.on("reconnect", function () {
        console.log("Socket reconnected.")
    });
}

function BoundingBox(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;
}

BoundingBox.prototype.collide = function (oth) {
    if (this.right >= oth.left && this.left <= oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
    return false;
}

function Slider1(game) {
    Entity.call(this, game, 100, 820);
}
Slider1.prototype = new Entity();
Slider1.prototype.constructor = Slider1;

Slider1.prototype.update = function () {
    this.sliderBox1Less = new BoundingBox(200, 810, 45, 25);
    this.sliderBox1More = new BoundingBox(300, 810, 45, 25);

    this.sliderBox2Less = new BoundingBox(200, 850, 45, 25);
    this.sliderBox2More = new BoundingBox(300, 850, 45, 25);

    this.sliderBox3Less = new BoundingBox(200, 890, 45, 25);
    this.sliderBox3More = new BoundingBox(300, 890, 45, 25);

    this.sliderBox4Less = new BoundingBox(200, 930, 45, 25);
    this.sliderBox4More = new BoundingBox(300, 930, 45, 25);

    if (this.game.mouse) {
        if (this.game.mouse.x > this.sliderBox1Less.left && this.game.mouse.x < this.sliderBox1Less.right &&
                            this.game.mouse.y > this.sliderBox1Less.top && this.game.mouse.y < this.sliderBox1Less.bottom) {
            if (this.game.click && !(energyNeededToClone <= 6)) energyNeededToClone--;
        }
        if (this.game.mouse.x > this.sliderBox1More.left && this.game.mouse.x < this.sliderBox1More.right &&
                            this.game.mouse.y > this.sliderBox1More.top && this.game.mouse.y < this.sliderBox1More.bottom) {
            if (this.game.click) energyNeededToClone++;
        }

        if (this.game.mouse.x > this.sliderBox2Less.left && this.game.mouse.x < this.sliderBox2Less.right &&
                            this.game.mouse.y > this.sliderBox2Less.top && this.game.mouse.y < this.sliderBox2Less.bottom) {
            if (this.game.click && !(percentageRateClone <= 0)) percentageRateClone -= 0.001;
        }
        if (this.game.mouse.x > this.sliderBox2More.left && this.game.mouse.x < this.sliderBox2More.right &&
                            this.game.mouse.y > this.sliderBox2More.top && this.game.mouse.y < this.sliderBox2More.bottom) {
            if (this.game.click) percentageRateClone += 0.001;
        }

        if (this.game.mouse.x > this.sliderBox3Less.left && this.game.mouse.x < this.sliderBox3Less.right &&
                            this.game.mouse.y > this.sliderBox3Less.top && this.game.mouse.y < this.sliderBox3Less.bottom) {
            if (this.game.click && energyLoss > 0.1) energyLoss -= 0.1;
        }
        if (this.game.mouse.x > this.sliderBox3More.left && this.game.mouse.x < this.sliderBox3More.right &&
                            this.game.mouse.y > this.sliderBox3More.top && this.game.mouse.y < this.sliderBox3More.bottom) {
            if (this.game.click) energyLoss += 0.1;
        }

        if (this.game.mouse.x > this.sliderBox4Less.left && this.game.mouse.x < this.sliderBox4Less.right &&
                            this.game.mouse.y > this.sliderBox4Less.top && this.game.mouse.y < this.sliderBox4Less.bottom) {
            if (this.game.click && !(energyGain <= 0.1)) energyGain -= 0.1;
        }
        if (this.game.mouse.x > this.sliderBox4More.left && this.game.mouse.x < this.sliderBox4More.right &&
                            this.game.mouse.y > this.sliderBox4More.top && this.game.mouse.y < this.sliderBox4More.bottom) {
            if (this.game.click) energyGain += 0.1;
        }
    }
    Entity.prototype.update.call(this);
}
Slider1.prototype.draw = function (ctx) {
    if (topArr[0] != null) {
        ctx.fillStyle = "Blue";
        ctx.font = "20px serif";
        ctx.fillText("Best Rabbit" + ": " + "Kids: " + topArr[0].kids + "   Cabbage Eaten: " + topArr[0].cabbageEaten, 600, 830);
    }
    ctx.lineWidth = 1;
    ctx.fillStyle = "Blue";
    ctx.font = "20px serif";
    ctx.fillText("Energy to breed: ", 20, 830);
    ctx.fillStyle = "Red";
    ctx.font = "20px serif";
    ctx.fillText("Less", 200, 830);
    ctx.strokeStyle = "Red";
    ctx.strokeRect(this.sliderBox1Less.left, this.sliderBox1Less.top, 45, 25);
    ctx.fillStyle = "Green";
    ctx.font = "20px serif";
    ctx.fillText("More", 300, 830);
    ctx.strokeStyle = "Green";
    ctx.strokeRect(this.sliderBox1More.left, this.sliderBox1More.top, 45, 25);
    ctx.fillStyle = "Black";
    ctx.font = "20px serif";
    ctx.fillText(energyNeededToClone, 260, 830);

    ctx.fillStyle = "Blue";
    ctx.font = "20px serif";
    ctx.fillText("Food Regeneration: ", 20, 870);
    ctx.fillStyle = "Red";
    ctx.font = "20px serif";
    ctx.fillText("Less", 200, 870);
    ctx.strokeStyle = "Red";
    ctx.strokeRect(this.sliderBox2Less.left, this.sliderBox2Less.top, 45, 25);
    ctx.fillStyle = "Green";
    ctx.font = "20px serif";
    ctx.fillText("More", 300, 870);
    ctx.strokeStyle = "Green";
    ctx.strokeRect(this.sliderBox2More.left, this.sliderBox2More.top, 45, 25);
    ctx.fillStyle = "Black";
    ctx.font = "20px serif";
    ctx.fillText(Math.round(percentageRateClone * 1000) / 1000, 250, 870);

    ctx.fillStyle = "Blue";
    ctx.font = "20px serif";
    ctx.fillText("Energy loss: ", 20, 910);
    ctx.fillStyle = "Red";
    ctx.font = "20px serif";
    ctx.fillText("Less", 200, 910);
    ctx.strokeStyle = "Red";
    ctx.strokeRect(this.sliderBox3Less.left, this.sliderBox3Less.top, 45, 25);
    ctx.fillStyle = "Green";
    ctx.font = "20px serif";
    ctx.fillText("More", 300, 910);
    ctx.strokeStyle = "Green";
    ctx.strokeRect(this.sliderBox3More.left, this.sliderBox3More.top, 45, 25);
    ctx.fillStyle = "Black";
    ctx.font = "20px serif";
    ctx.fillText(Math.round(energyLoss * 100) / 100, 250, 910);

    ctx.fillStyle = "Blue";
    ctx.font = "20px serif";
    ctx.fillText("Energy gain: ", 20, 950);
    ctx.fillStyle = "Red";
    ctx.font = "20px serif";
    ctx.fillText("Less", 200, 950);
    ctx.strokeStyle = "Red";
    ctx.strokeRect(this.sliderBox4Less.left, this.sliderBox4Less.top, 45, 25);
    ctx.fillStyle = "Green";
    ctx.font = "20px serif";
    ctx.fillText("More", 300, 950);
    ctx.strokeStyle = "Green";
    ctx.strokeRect(this.sliderBox4More.left, this.sliderBox4More.top, 45, 25);
    ctx.fillStyle = "Black";
    ctx.font = "20px serif";
    ctx.fillText(Math.round(energyGain * 100) / 100, 250, 950);


    ctx.fillStyle = "Black";
    ctx.font = "20px serif";
    ctx.fillText('Legend:', 850, 50);
    ctx.fillText('1. Rabbits eat cabbage if they touch it.', 850, 80);
    ctx.fillText('2. Cabbage grows over time. (Food Regeneration)', 850, 100);
    ctx.fillText('3. Rabbits lose energy over time. (Energy loss)', 850, 120);
    ctx.fillText('4. Rabbits gain energy if they eat cabbage. (Energy gain)', 850, 140);
    ctx.fillText('5. If rabbit has 0 energy it dies.', 850, 160);
    ctx.fillText('6. If rabbit has enough energy it breeds. (Energy to breed)', 850, 180);
    ctx.fillText('7. Every rabbit is getting born with 5 energy.', 850, 200);
};

function Food(game, x, y) {
    this.color;
    var num = Math.random();
    if (num <= 0.3) this.color = "Black";
    else this.color = "#00FF00";
    this.x = x;
    this.y = y;

}
Food.prototype = new Entity();
Food.prototype.constructor = Food;

Food.prototype.update = function () {
    if (this.color === "Black") {
        var num = Math.random();
        if (num <= percentageRateClone) this.color = "#00FF00";
    }
    Entity.prototype.update.call(this);
}
Food.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 5, 5);
};

function Rabbit(game, x, y) {
    this.kids = 0;
    this.cabbageEaten = 0;
    this.game = game;
    this.best = false;
    this.box;
    this.x = x;
    this.y = y;
    this.energy = 5;
    this.direction = 0;
};

Rabbit.prototype = new Entity();
Rabbit.prototype.constructor = Rabbit;

Rabbit.prototype.collideLeft = function () {
    return this.x <= 0;
};

Rabbit.prototype.collideRight = function () {
    return (this.x + 5) >= 800;
};

Rabbit.prototype.collideTop = function () {
    return this.y <= 0;
};

Rabbit.prototype.collideBottom = function () {
    return (this.y + 5) >= 800;
};

Rabbit.prototype.update = function () {

    if (topArr[0] != null && this.kids > topArr[0].kids && this.cabbageEaten > topArr[0].cabbageEaten) topArr[0] = this;
    else if (topArr[0] == null) topArr.push(this);

    if (topArr[0] === this) this.best = true;
    else this.best = false;

    if (this.energy >= energyNeededToClone) {
        this.energy = 5;
        var rabbit;
        this.kids++;
        rabbit = new Rabbit(this.game, this.x, this.y);
        this.game.addEntity(rabbit);
        rabbitArray.push(rabbit);
    }
    var changeDir = Math.random();
    if (changeDir <= 0.50) {
        var move = Math.random();
        if (move <= 0.25 && !this.collideLeft()) {
            this.x -= 5; // move left
            this.direction = 0;
        }
        else if (move > 0.25 && move <= 0.50 && !this.collideRight()) {
            this.x += 5; // move right
            this.direction = 1;
        }
        else if (move > 0.50 && move <= 0.75 && !this.collideTop()) {
            this.y -= 5; // move down
            this.direction = 2;
        }
        else if (move > 0.75 && !this.collideBottom()) {
            this.y += 5; // move up
            this.direction = 3;
        }
    } else {
        if (this.direction === 0 && !this.collideLeft()) this.x -= 5;
        else if (this.direction === 1 && !this.collideRight()) this.x += 5;
        else if (this.direction === 2 && !this.collideTop()) this.y -= 5;
        else if (this.direction === 3 && !this.collideBottom()) this.y += 5;
    }

    if (foodArray[this.x * 32 + this.y / 5].color === "#00FF00") {
        this.energy += energyGain;
        this.cabbageEaten++;
        foodArray[this.x * 32 + this.y / 5].color = "Black";
    }
    else {
        if (!(this.energy <= 0)) this.energy -= energyLoss;
        else this.removeFromWorld = true;
        if (this.best) topArr = [];
    }
    Entity.prototype.update.call(this);


    var that = this;
    var save = document.getElementById('save');
    var load = document.getElementById('load');
    var stateName = document.getElementById('csave');
    var loadName = document.getElementById('cload');

    save.onclick = function () {
        that.game.test = SaveState(this.game);
        if (stateName === '') return;
        console.log(stateName.value);
        socket.emit("save", { studentname: "Artsiom Vainilovich", statename: stateName.value, data: that.game.test });
        stateName.value = '';
    };

    load.onclick = function () {
        if (loadName === '') return;

        socket.emit("load", { studentname: "Artsiom Vainilovich", statename: loadName.value });
        loadName.value = '';
    };
};

Rabbit.prototype.draw = function (ctx) {
    if (this.best) {
        ctx.fillStyle = "Red";
        ctx.fillRect(this.x, this.y, 5, 5);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
            ctx.strokeRect(this.x-10, this.y-10, 20, 20);
    } else {
        ctx.fillStyle = "Gray";
        ctx.fillRect(this.x, this.y, 5, 5);

    }
};

function SaveState(game) {
    var temp = [];
    temp.push(energyNeededToClone);
    temp.push(energyLoss);
    temp.push(energyGain);
    temp.push(percentageRateClone);
    return temp;
};

function LoadState(game) {
    var temp = game.tempData;
    energyNeededToClone = temp[0];
    energyLoss = temp[1];
    energyGain = temp[2];
    percentageRateClone = temp[3];
};

var topArr = [];
var foodArray = [];
var rabbitArray = [];
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/white.png");


ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();

    var food;
    for (var i = 0; i < 160; i++) {
        for (var j = 0; j < 160; j++) {
            food = new Food(gameEngine, i*5, j*5);
            gameEngine.addEntity(food);
            foodArray.push(food);
        }
    }
    gameEngine.foodArray = foodArray;

    var rabbit;
    for (var i = 0; i < 50; i++) {
        rabbit = new Rabbit(gameEngine, (Math.floor(Math.random() * (160 - 0) + 0))*5, (Math.floor(Math.random() * (160 - 0) + 0))*5);
        gameEngine.addEntity(rabbit);
        rabbitArray.push(rabbit);
    }
    gameEngine.rabbitArray = rabbitArray;


    var slider = new Slider1(gameEngine);
    gameEngine.slider = slider;
    gameEngine.addEntity(slider);

    socket.on("ping", function (ping) {
        console.log(ping);
        socket.emit("pong");
    });
    socket.on("load", function (data) {
        gameEngine.tempData = data.data;
        LoadState(gameEngine);
    });

    gameEngine.init(ctx);
    gameEngine.start();
});
