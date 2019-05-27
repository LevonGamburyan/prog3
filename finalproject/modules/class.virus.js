let LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Virus extends LiveForm {
    constructor(x, y) {
        super(x, y)
    
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    move() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    eat() {

        var found1 = this.chooseCell(1);
        var found2 = this.chooseCell(2);
        var found3 = this.chooseCell(3);
        var found4 = this.chooseCell(4);
       var found = found4.concat(found3, found2, found1)
        var cord = random(found);


        if (cord) {
            
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

          // this.energy++;


            if (matrix[y][x] == 1) {

                for (var i in xotArr) {
                    if (x == xotArr[i].x && y == xotArr[i].y) {
                        xotArr.splice(i, 1);
                    }
                }
            }
            else if (matrix[y][x] == 2) {

                for (var i in eatArr) {
                    if (x == eatArr[i].x && y == eatArr[i].y) {
                        eatArr.splice(i, 1);

                    }
                }
            }
            else if (matrix[y][x] == 3) {

                for (var i in gishArr) {
                    if (x == gishArr[i].x && y == gishArr[i].y) {
                        gishArr.splice(i, 1);
                        
                    }
                }
            }
           else if (matrix[y][x] == 4) {

                for (var i in vorsArr) {
                    if (x == vorsArr[i].x && y == vorsArr[i].y) {
                        hunterArr.splice(i, 1);
                        
                    }
                }
            }

            if (this.multiply >= 15) {
                this.mul();
                this.multiply = 0;
            }
        }
        else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }



    }
    mul() {

        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            var virus = new Virus(x, y);
            virArr.push(virus);

            matrix[y][x] = 5;

        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in virArr) {
            if (this.x == virArr[i].x && this.y == virArr[i].y) {
                virArr.splice(i, 1);
            }
        }
    }
}