let LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Hunter extends LiveForm {
    constructor(x, y) {
        super(x, y)
        
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1]

        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    move() {
        var found1 = this.chooseCell(0);
        var found2 = this.chooseCell(1);
        var found = found1.concat(found2)
        var cord = random(found);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    eat() {

        var fundCords = this.chooseCell(3);
        var cord = random(fundCords);


        if (cord) {
            var x = cord[0];
            var y = cord[1];


            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in gishArr) {
                if (x == gishArr[i].x && y == gishArr[i].y) {
                    gishArr.splice(i, 1);
                }
            }

            if (this.multiply == 2) {
                this.mul()
                this.multiply = 0;
            }


        } else {

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

            var norvorsord = new Hunter(x, y);
            vorsArr.push(norvorsord);

            matrix[y][x] = 4;

        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in vorsArr) {
            if (this.x == vorsArr[i].x && this.y == vorsArr[i].y) {
                vorsArr.splice(i, 1);
            }
        }
    }
}