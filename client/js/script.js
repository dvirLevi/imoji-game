import score from './score.js'
import progressLife from './progressLife.js'
import eventAndToggle from './eventAndToggle.js'
import sendToServer from './sendToServer.js'

let myGamePiece;


const openGame = () => {
    myGameArea.start();
    setTimeout(() => {
        const openScreen = document.getElementById('openScreen');
        eventAndToggle.addToggle(openScreen)
    }, 6000);
    initalGameAll()
}

const initalGameAll = () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const closeModalScore = document.getElementById('closeModalScore');
    const modalScore = document.getElementById('modalScore');
    const startGame = document.getElementById('startGame');
    const formScore = document.querySelector('form');
    const wrapButtStart = document.getElementById('wrapButtStart');
    const openTable = document.getElementById('openTable');
    const modalTableScore = document.getElementById('modalTableScore');
    const closeModalTable = document.getElementById('closeModalTable');
    
    score.innerScore(0);
    progressLife.innerWidth(100);
    eventAndToggle.addEvent(hamburger, menu);
    eventAndToggle.addEvent(openTable, modalTableScore);
    eventAndToggle.addEvent(closeModalTable, modalTableScore);
    eventAndToggle.addEvent(menu, menu);
    eventAndToggle.addEvent(closeModalScore, modalScore);
    sendToServer.getScoreToTable();
    startGame.onclick = () => {
        wrapButtStart.style.display = 'none';
        initalGame.startGame();
    }
    formScore.onsubmit = (event) => {
        event.preventDefault();
        sendToServer.sendScoreToServer();
    sendToServer.getScoreToTable();
        eventAndToggle.addToggle(modalScore);
    }
}

let initalGame = {
    startGame() {
        this.clearGame();
        const myUpBtn = document.getElementById('myUpBtn');
        const myDownBtn = document.getElementById('myDownBtn');
        const myLeftBtn = document.getElementById('myLeftBtn');
        const myRightBtn = document.getElementById('myRightBtn');
        this.addEventToBtn(myUpBtn, 'Y', -0.5, -5, 0)
        this.addEventToBtn(myDownBtn, 'Y', 0.5, 5, 0)
        this.addEventToBtn(myLeftBtn, 'X', -0.5, -5, 0)
        this.addEventToBtn(myRightBtn, 'X', 0.5, 5, 0)
        myGameArea.intervalGame()
    },
    clearGame(){
        progressLife.width = 100;
        progressLife.innerWidth(0);
        score.numScore = 0;
        score.innerScore(0);
        initalParticles.arrPlayerBad = [];
    },
    addEventToBtn(el, axis, gravity, run, stop) {
        // el.onclick = () => {
        //     if (axis === 'Y') {
        //         myGamePiece.speedY = run;
        //         myGamePiece.gravityY = gravity;
        //     } else {
        //         myGamePiece.speedX = run;
        //         myGamePiece.gravityX = gravity;
        //     }
        //     setTimeout(() => {
        //         if (axis === 'Y') {
        //             myGamePiece.speedY = stop;
        //         } else {
        //             myGamePiece.speedX = stop;
        //         }
        //     }, 100);
        // }

        el.onmousedown = () => {
            if (axis === 'Y') {
                myGamePiece.speedY = run;
                myGamePiece.gravityY = gravity;
            } else {
                myGamePiece.speedX = run;
                myGamePiece.gravityX = gravity;
            }
        }
        el.onmouseup = () => {
            if (axis === 'Y') {
                myGamePiece.speedY = stop;
            } else {
                myGamePiece.speedX = stop;
            }
        }
        el.onmouseleave = () => {
            if (axis === 'Y') {
                myGamePiece.speedY = stop;
            } else {
                myGamePiece.speedX = stop;
            }
        }
        el.ontouchstart = (e) => {
            e.preventDefault()
            if (axis === 'Y') {
                myGamePiece.speedY = run;
                myGamePiece.gravityY = gravity;
            } else {
                myGamePiece.speedX = run;
                myGamePiece.gravityX = gravity;
            }
        }
        el.ontouchend = () => {
            if (axis === 'Y') {
                myGamePiece.speedY = stop;
            } else {
                myGamePiece.speedX = stop;
            }
        }
    }
}


let myGameArea = {
    wrapGame: document.getElementById("wrapGame"),
    canvas: document.createElement("canvas"),
    start() {
        this.wrapGame.insertBefore(this.canvas, this.wrapGame.childNodes[2]);
        if (window.innerWidth > 767) {
            this.canvas.width = 450;
            this.canvas.height = 800;
        } else {
            this.canvas.width = window.innerWidth;
            this.canvas.height = this.heightBar;
        }
        let butt = document.getElementsByClassName('butt');
        for (let b of butt) {
            b.style.height = this.canvas.height / 8 + 'px'
            b.style.width = this.canvas.width / 2 + 'px'
        }
        this.context = this.canvas.getContext("2d");
        console.log(this.heightBar)

    },
    get heightBar() {
        const bar = document.getElementById('bar');
        let heightBar = bar.offsetHeight;
        console.log(heightBar)
        let heightCanvas = window.innerHeight - heightBar;
        return heightCanvas;
    },
    intervalGame() {
        myGamePiece = new mainPlayerGame(50, 50, myGameArea.canvas.width / 2 - 25, myGameArea.canvas.height / 2 - 25);
        this.interval = setInterval(() => {
            this.updateGameArea()
        }, 20);
    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    finalGame() {
        // alert()
        if (progressLife.width <= 0) {
            // serverScore.scoreObj = score.numScore;
            // serverScore.sendScoreToServer();
            clearInterval(this.interval);
            eventAndToggle.addToggle(modalScore);
            wrapButtStart.style.display = 'block';
        }
    },
    updateGameArea() {
        this.clear();
        myGamePiece.newPos();
        initalParticles.update();
        this.finalGame();
    },
}

class mainPlayerGame {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.gravityY = 0;
        this.gravityX = 0;
        this.gravitySpeedX = 0;
        this.gravitySpeedY = 0;
        this.image = new Image();
        this.image.src = './img/smill.png';
        this.x = x;
        this.y = y;
    }
    update() {
        let ctx = myGameArea.context;
        ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);
        ctx.imageSmoothingQuality = "high";
    }
    newPos() {
        this.x += this.speedX + this.gravityXF;
        this.y += this.speedY + this.gravityYF;

        if (this.x >= myGameArea.canvas.width - this.width) {
            this.x = myGameArea.canvas.width - this.width;
            this.gravitySpeedX = 0
        }
        if (this.x <= 0) {
            this.x = 0;
            this.gravitySpeedX = 0
        }
        if (this.y >= myGameArea.canvas.height - this.height) {
            this.y = myGameArea.canvas.height - this.height;
            this.gravitySpeedY = 0
        }
        if (this.y <= 0) {
            this.y = 0;
            this.gravitySpeedY = 0
        }
        this.update()
    }
    get gravityXF() {
        if (this.speedX != 0) {
            this.gravitySpeedX += this.gravityX;
            return this.gravitySpeedX
        }
        if (this.speedX == 0) {
            if (this.gravityX < 0) {
                if (this.gravitySpeedX != 0)
                    this.gravitySpeedX -= this.gravityX / 4;
            }
            if (this.gravityX > 0) {
                if (this.gravitySpeedX != 0)
                    this.gravitySpeedX -= this.gravityX / 4;
            }
            return this.gravitySpeedX;
        }
        return 0
    }
    get gravityYF() {
        if (this.speedY != 0) {
            this.gravitySpeedY += this.gravityY;
            return this.gravitySpeedY
        }
        if (this.speedY == 0) {
            if (this.gravityY < 0) {
                if (this.gravitySpeedY != 0)
                    this.gravitySpeedY -= this.gravityY / 4;
            }
            if (this.gravityY > 0) {
                if (this.gravitySpeedY != 0)
                    this.gravitySpeedY -= this.gravityY / 4;
            }
            return this.gravitySpeedY;
        }
        return 0
    }
}
class badPlayerGame {
    constructor(width, height, color, x, y, id) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.testSize = 0;
        this.speed = Math.floor(Math.random() * 3) + 2;
        this.speedX = this.speed;
        this.speedY = this.speed;
        this.image = new Image();
        this.image.src = color;
        this.x = x;
        this.y = y;
        this.ctx = myGameArea.context;
        this.speedBoom = 4;
        this.testOne = 0
    }
    update() {
        if (this.LocationCheck) {
            this.drawPlayer();
            this.testOne = 0
        } else if (myGamePiece.gravitySpeedX > this.speedBoom || myGamePiece.gravitySpeedX < -this.speedBoom || myGamePiece.gravitySpeedY > this.speedBoom || myGamePiece.gravitySpeedY < -this.speedBoom) {
            initalParticles.arrParticles = [];
            initalParticles.Px = this.x;
            initalParticles.Py = this.y;
            initalParticles.intervalParticles();
            let index = initalParticles.arrPlayerBad.findIndex((val) => {
                return val.myGameGod.id == this.id
            })
            initalParticles.arrPlayerBad.splice(index, 1);

            score.innerScore(+5)
        } else {
            this.chengeImgMainPlayer();
            if (this.testOne === 0) {
                this.drawPlayer();
                this.speedX = -this.speedX;
                this.speedY = -this.speedY;
                if (score.numScore > 0) {
                    score.innerScore(-2)
                }
                progressLife.innerWidth(-5)
            } else {
                this.drawPlayer();
            }
            this.testOne = 1;
        }
        if (this.testSize > 200) {
            this.width = this.width + 5;
            this.height = this.height + 5;
            this.testSize = 0
        }
        this.testSize++;
    }
    chengeImgMainPlayer() {
        myGamePiece.image.src = './img/sed.png';
        setTimeout(() => {
            myGamePiece.image.src = './img/smill.png';
        }, 200);
    }
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x >= myGameArea.canvas.width - this.width) {
            this.x = myGameArea.canvas.width - this.width - 1
            this.speedX = -this.speedX;
            // this.drawPlayer();
        }
        if (this.x <= 0) {
            this.x = 1
            this.speedX = -this.speedX;
            // this.drawPlayer();
        }
        if (this.y >= myGameArea.canvas.height - this.height) {
            this.y = myGameArea.canvas.height - this.height - 1
            this.speedY = -this.speedY;
            // this.drawPlayer();
        }
        if (this.y <= 0) {
            this.y = 1
            this.speedY = -this.speedY;
            // this.drawPlayer();
        }
        this.update()
        // this.LocationCheck()
    }
    get LocationCheck() {
        let myleft = this.x;
        let myright = this.x + this.width;
        let mytop = this.y;
        let mybottom = this.y + this.height;
        let otherleft = myGamePiece.x;
        let otherright = myGamePiece.x + myGamePiece.width;
        let othertop = myGamePiece.y;
        let otherbottom = myGamePiece.y + myGamePiece.height;
        let crash = false;
        if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
            crash = true;
        }
        return crash;
    }
    drawPlayer() {
        let ctx = myGameArea.context;
        ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);
        ctx.imageSmoothingQuality = "high";
    }
}


const initalParticles = {
    widthPlayer: 40,
    idPlayer: 0,
    arrPlayerBad: [],
    arrParticles: [],
    Px: '',
    Py: '',
    counter: 180,
    update() {
        this.updateParticles();
        this.createNewBadPlayer();
    },
    createNewBadPlayer() {
        if (this.counter > 100) {
            let id = this.idPlayer;
            let x = Math.floor(Math.random() * myGameArea.canvas.height / 2);
            let y = Math.floor(Math.random() * myGameArea.canvas.width / 2);
            this.arrPlayerBad.push({
                myGameGod: new badPlayerGame(this.widthPlayer, this.widthPlayer, './img/black.png', x, y, id)
            })
            this.counter = 0;
            this.idPlayer++;
        }
        this.counter++
    },
    intervalParticles() {
        if (!this.arrParticles.length) {
            for (let x = 0; x < 20; x++) {
                this.arrParticles.push({
                    a: new drowParticles(this.Px, this.Py, this.widthPlayer)
                })
            }
        }
    },
    updateParticles() {
        for (let x in this.arrPlayerBad) {
            if (this.arrPlayerBad[x].myGameGod) {
                this.arrPlayerBad[x].myGameGod.newPos()
            }
        }
        for (let x in this.arrParticles) {
            if (this.arrParticles[x].a) {
                this.arrParticles[x].a.move()
            }
        }
    }
}

class drowParticles {
    constructor(x, y, sizePlayer) {
        this.ctx = myGameArea.context
        this.direction = Math.floor(Math.random() * 180) + 180;
        this.emoji = '▞';
        this.size = Math.random() * 10 + 10;
        this.direction = Math.floor(Math.random() * 180) + 180;
        this.angle = 0;
        this.x = x + sizePlayer / 2;
        this.y = y + sizePlayer / 2;
        this.spin = 0.2;
        this.life = 15;
    }
    move() {
        this.life -= 1;
        let speed = Math.floor(Math.random() * 8) + 8;
        // console.log(speed)
        var toRadians = this.direction / 180 * 3 * Math.PI;
        this.x += speed * Math.cos(toRadians)
        this.y += speed * Math.sin(toRadians)
        this.angle += this.spin
        if (this.life >= 0) {
            this.drawEmoji()
        }
    }
    drawEmoji() {
        this.ctx.font = this.size + "px Arial"
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.save(); /// To restore the state later on using ctx.restore();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle)
        this.ctx.fillText(this.emoji, 0, 0);
        this.ctx.restore();
        //restoring state  
    }

}
openGame();