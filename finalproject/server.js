
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Eatgrasseater = require("./modules/class.Eatgrasseater")
var Hunter = require("./modules/class.Hunter")
var Virus = require("./modules/class.virus")
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
xotArr = [];
eatArr = [];
gishArr = []
vorsArr = []
virArr = []
matrix = [];
grassHashiv = 0;
eatHashiv = 0
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, gish, vorsArr, virArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < gish; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < vorsArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < virArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 4, 5, 6, 7);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                eatArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var hunter = new Eatgrasseater(x, y);
                gishArr.push(Eatgrasseater);
                eatHashiv++
            }
            else if (matrix[y][x] == 4) {
                var hunter = new Hunter(x, y);
                vorsArr.push(hunter);

            }
            else if (matrix[y][x] == 5) {
                var virus = new Virus(x, y);
                virArr.push(virus);

            }
        }
    }
}
creatingObjects();

function game() {
    if (xotArr[0] !== undefined) {
        for (var i in xotArr) {
            xotArr[i].mul();
        }
    }
    if (eatArr[0] !== undefined) {
        for (var i in eatArr) {
            eatArr[i].eat();
        }
    }
    if (gishArr[0] !== undefined) {

        for (var i in gishArr) {
            // gishArr[i].eat();
        }
    }
    if (vorsArr[0] !== undefined) {
        for (var i in vorsArr) {
            vorsArr[i].eat();
        }
    }
    if (virArr[0] !== undefined) {
        for (var i in virArr) {
            virArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: eatHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

io.on('connection', function (socket) {
    socket.on("avelacra khot", function pushGrass() {
        for(var i = 0; i<3;i++){
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if(matrix[y][x] = 0){
                matrix[y][x] = 1
                xotArr.push(new Grass(x, y))
            }

        }
    })
})

    
    // socket.on("avelacra khot",pushGrass) 
    // socket.on("avelacra khot",pushGrass) 
    // socket.on("avelacra khot",pushGrass) 
    // socket.on("avelacra khot",pushGrass) 
    // socket.on("avelacra khot",pushGrass) 
    // socket.on("avelacra khot",pushGrass) 
    // socket.on("avelacra khot",pushGrass) 
    // socket.on("avelacra khot",pushGrass) 


setInterval(game, 1000)
