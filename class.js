class Grass{
    constructor(x, y) {
       this.x = x;
       this.y = y;
       this.multiply = 0
       this.directions = [
        [this.x - 1, this.y - 1],
        [this.x    , this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y    ],
        [this.x + 1, this.y    ],
        [this.x - 1, this.y + 1],
        [this.x    , this.y + 1],
        [this.x + 1, this.y + 1]
    ];
    
    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
            if (matrix[y][x] == character) {
                found.push(this.directions[i]);
            }
        }
    }
        return found;
     
     }
     
     mul() {
         this.multiply++
         let found = this.chooseCell(0);
         let exact = random(found)
         if(exact && this.multiply > 0) {
             let x = exact[0];
             let y = exact[1];
             matrix[y][x] = 1;
             let gr = new Grass(x,y)
             grassArr.push(gr)
             this.multiply = 0
         }
     }
}

class GrassEater {

    constructor(x, y) {
        this.x = x
        this.y = y

        this.energy = 12

        this.directions = [];
    }

    updateDirection() {
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

    chooseCell(num) {
        this.updateDirection()
        let result = []

        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix.length + 24 && y < matrix.length)
                if (matrix[y][x] == num) {
                    result.push(this.directions[i])
                }
        }
        return result

    }

    move() {
        let emptyCell = this.chooseCell(0)
        if (emptyCell.length != 0) {
            let randomCell = random(emptyCell)
            let x = randomCell[0]
            let y = randomCell[1]
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x
            this.y = y
            this.energy--

        }

    }

    eat() {

        let foods = this.chooseCell(1)
        if (foods.length != 0) {
            let randFood = random(foods)
            let x = randFood[0]
            let y = randFood[1]
                // uteliqi kordinatnern en -> x , y
                //mer es pahin gtnvelu kordinatner@ -> this x, this y
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }




            this.x = x
            this.y = y
            this.energy += 3
        }
    }

    mul() {


        let emptyCell = this.chooseCell(0)
        if (emptyCell.length != 0) {
            let randomCell = random(emptyCell)
            let x = randomCell[0]
            let y = randomCell[1]

            matrix[y][x] = 2
            let norGrEater = new GrassEater(x, y)
            grEaterArr.push(norGrEater)
            this.energy /= 2

        }

    }

    die() {
        matrix[this.y][this.x] = 0

        for (let i in grEaterArr) {
            if (this.x == grEaterArr[i].x && this.y == grEaterArr[i].y) {
                grEaterArr.splice(i, 1)
                break
            }
        }
    }

    start() {
        if (this.energy > 0) {
            if (this.chooseCell(1).length != 0) {
                this.eat()
            } else {
                this.move()
            }
            if (this.energy > 15) {
                this.mul()
            }
        } else {
            this.die()
        }

    }
}

class Predator {

    constructor(x, y) {
        this.x = x
        this.y = y

        this.energy = 12

        this.directions = [];
    }

    updateDirection() {
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

    chooseCell(num) {
        this.updateDirection()
        let result = []

        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)
                if (matrix[y][x] == num) {
                    result.push(this.directions[i])
                }
        }
        return result

    }

    move() {
        let emptyCell = this.chooseCell(0)
        if (emptyCell.length != 0) {
            let randomCell = random(emptyCell)
            let x = randomCell[0]
            let y = randomCell[1]

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0

            this.x = x
            this.y = y
            this.energy--
        }


    }

    eat() {
  
        let foods = this.chooseCell(2)
        if (foods.length != 0) {
            let randFood = random(foods)
            let x = randFood[0]
            let y = randFood[1]
                // uteliqi kordinatnern en -> x , y
                //mer es pahin gtnvelu kordinatner@ -> this x, this y
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0

            for (let i in grEaterArr) {
                if (x == grEaterArr[i].x && y == grEaterArr[i].y) {
                    grEaterArr.splice(i, 1)
                    break
                }
            }




            this.x = x
            this.y = y
            this.energy += 3
        }
    }

    mul() {


        let emptyCell = this.chooseCell(0)
        if (emptyCell.length != 0) {
            let randomCell = random(emptyCell)
            let x = randomCell[0]
            let y = randomCell[1]

            matrix[y][x] = 3

            let norPredator = new Predator(x, y)
            predatorArr.push(norPredator)
            this.energy /= 2

        }

    }

    die() {
        matrix[this.y][this.x] = 0

        for (let i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1)
                break
            }
        }
    }

    start() {
        if (this.energy > 0) {
            if (this.chooseCell(2).length != 0) {
                this.eat()
            } else {
                this.move()
            }
            if (this.energy > 15) {
                this.mul()
            }
        } else {
            this.die()
        }

    }
  
}

class PredatorEater {

    constructor(x, y) {
        this.x = x
        this.y = y

        this.energy = 8

        this.directions = [];
    }

    updateDirection() {
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

    chooseCell(num1, num2){
        this.updateDirection()
        let result = []

        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)
                if (matrix[y][x] == num1 || matrix[y][x] == num2 ) {
                    result.push(this.directions[i])
                }
        
          
        }
        return result

    }
    
    move() {
        let emptyCell = this.chooseCell(0)
        if (emptyCell.length != 0) {
            let randomCell = random(emptyCell)
            let x = randomCell[0]
            let y = randomCell[1]

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            this.x = x
            this.y = y
            this.energy--
        }


    }

    eat() {

        let foods = this.chooseCell(2, 3)
        if (foods.length != 0) {
            let randFood = random(foods)
            let x = randFood[0]
            let y = randFood[1]
                // uteliqi kordinatnern en -> x , y
                //mer es pahin gtnvelu kordinatner@ -> this x, this y
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0

            for (let i in predatorArr) {
                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break
                } 
            }
          
          for(let i in grEaterArr) {
            if(x == grEaterArr[i].x && y == grEaterArr[i].y) {
              grEaterArr.splice(i, 1)
              break
            }
          }
          
          
          
 
            this.x = x
            this.y = y
            this.energy += 3
        }
    }

    mul() {


        let emptyCell = this.chooseCell(0)
        if (emptyCell.length != 0) {
            let randomCell = random(emptyCell)
            let x = randomCell[0]
            let y = randomCell[1]

            matrix[y][x] = 4

            let norPredatorEater = new PredatorEater(x, y)
            predatorEaterArr.push(norPredatorEater)
            this.energy /= 2

        }

    }

    die() {
        matrix[this.y][this.x] = 0

        for (let i in predatorEaterArr) {
            if (this.x == predatorEaterArr[i].x && this.y == predatorEaterArr[i].y) {
                predatorEaterArr.splice(i, 1)
                break
            }
        }
    }

    start() {
        if (this.energy > 0) {
            if (this.chooseCell(2, 3).length != 0) {
                this.eat()
            } else {
                this.move()
            }
            if (this.energy > 15) {
                this.mul()
            }
        } else {
            this.die()
        }

    
}
}
class Lava{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8
      
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
    chooseCell(num1,num2,num3,num4,num5) {
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if ( y < matrix.length && y >= 0 && x < matrix[0].length  && x >= 0 )
                if (matrix[y][x] == num1 || matrix[y][x] == num2 || matrix[y][x] == num3 || matrix[y][x] == num4 || matrix[y][x] == num5 ) {
                    result.push(this.directions[i]);
                }
          
        }
    
            
            
      return result;
    }
  
     mul() {


        let emptyCell = this.chooseCell(0)
        if (emptyCell.length != 0) {
            let randomCell = random(emptyCell)
            let x = randomCell[0]
            let y = randomCell[1]

            matrix[y][x] = 5

            let norlava = new Lava(x, y)
            lavaArr.push(norlava)
       

        }

    }

  
    eat() {

        let foods = this.chooseCell( 1, 2, 3, 4)
        if (foods.length != 0) {
            let randFood = random(foods)
            let x = randFood[0]
            let y = randFood[1]
                // uteliqi kordinatnern en -> x , y
                //mer es pahin gtnvelu kordinatner@ -> this x, this y
            matrix[y][x] = 5
            matrix[this.y][this.x] = 0

            for (let i in predatorArr) {
                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break
                } 
            }
          
            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                } 
            }
            
          
          for(let i in grEaterArr) {
                if(x == grEaterArr[i].x && y == grEaterArr[i].y) {
                    grEaterArr.splice(i, 1)
                    break
            }
          }
            
            
           for (let i in predatorEaterArr) {
                if (x == predatorEaterArr[i].x && y == predatorEaterArr[i].y) {
                    predatorEaterArr.splice(i, 1)
                    break
                } 
            }
          
          
          
 
            this.x = x
            this.y = y
          
        }
      
    }
  start() {
     
            if (this.chooseCell(1,2,3,4).length != 0) {
                this.eat()
            } else {
                this.mul()
            } 
            
  }
}