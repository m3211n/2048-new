namespace SpriteKind {
    export const Tile = SpriteKind.create()
}

function add1 () {
    zerosIndexes = []
    for (let n = 0; n < tilesNumbers.length; n++) {
        if (tilesNumbers[n] == 0) {
            zerosIndexes.push(n)
        }
    }
    tilesNumbers[zerosIndexes._pickRandom()] = 1
}

function shiftTiles (direction: number) {

    let nextIndex = 0                                               // index to get the number at from the main array

    let segment: number[] = []

    isModified = false                                              // array is not modified at the beginning

    // step through every segment, vertical or horizontal depending on direction
    for (let i = 0; i <= 3; i++) {                                  
        segment = [0, 0, 0, 0]                                      
        
        // get segment for specified index
        for (let j = 0; j <= 3; j++) {
            if (direction == _LEFT || direction == _RIGHT) {
                nextIndex = i * 4 + j
            } else {
                nextIndex = j * 4 + i
            }
            segment[j] = tilesNumbers[nextIndex]
        }

        // reverse the segment if it was swiped right or down
        if (direction == _RIGHT || direction == _DOWN) {
            segment.reverse()
        }

        // do the optimization of the segment
        let i0 = 0
        let i1 = 1
        for (let index = 0; index < 3; index++) {
            if (segment[i0] != 0) {
                if (segment[i1] != 0) {
                    if (segment[i0] == segment[i1]) {       // if two similar numbers then merge
                        segment[i0] = segment[i0] + 1
                        segment.removeAt(i1)
                        segment.push(0)
                        info.changeScoreBy(1)
                    }
                    i0 += 1
                    i1 += 1
                } else {
                    segment.removeAt(i1)
                    segment.push(0)
                }
            } else {
                segment.removeAt(i0)
                segment.push(0)
            }
        }

        // reverse back
        if (direction == _RIGHT || direction == _DOWN) {
            segment.reverse()
        }

        // put segment back to the main array and go to the next segment
        for (let j = 0; j <= 3; j++) {
            if (direction == _LEFT || direction == _RIGHT) {
                nextIndex = i * 4 + j
            } else {
                nextIndex = j * 4 + i
            }

            // verify if new numbers differs from the original. If so, consider the main array modified 
            if (segment[j] != tilesNumbers[nextIndex]) {
                tilesNumbers[nextIndex] = segment[j]
                isModified = true
            }
        }
    }

    // if the array was modified (at least one of segments was changed) then we need to seed new tile with "1" and tiles has to be re-drawn 
    if (isModified) {
        add1()
        updateTilesSprites()
    }
}

function updateTilesSprites () {
    for (let i = 0; i <= 15; i++) {
        if (tilesSprites[i].image != tilesImages[tilesNumbers[i]]) {
            tilesSprites[i].setImage(tilesImages[tilesNumbers[i]])
        }
    }
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    shiftTiles(_LEFT)
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    shiftTiles(_RIGHT)
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
    shiftTiles(_UP)
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    shiftTiles(_DOWN)
})

game.onUpdateInterval(500, function() {

    if (tilesNumbers.indexOf(11) != -1) {                 // WIN if reached 2048
        game.gameOver(true) 
    }

    if (tilesNumbers.indexOf(0) == -1) {                  // if there's no empty cells
        
        let possibleMoves = false;
        
        for (let i = 0; i <= 3; i++) {                      // find numbers with equal neighbours
            for (let j = 0; j <= 3; j++) {
                let i0 = i * 4 + j                          // tagret index
                let i_right = i0 + 1                        // index of the neighbour to the right
                let i_down = i0 + 4                         // index of the neighbour to the bottom
                if (i_right % 4 != 0 && tilesNumbers[i0] == tilesNumbers[i_right]) { // limiting to the box
                    possibleMoves = true
                }
                if (i_down <= 15 || tilesNumbers[i0] == tilesNumbers[i_down]) {
                    possibleMoves = true;
                }
            }
        }

        if (!possibleMoves) {
            game.gameOver(false)
        }

    }
    
})

const _UP = 0                // direction constants
const _RIGHT = 3
const _DOWN = 6
const _LEFT = 9

let tilesNumbers: number[] = [
    0, 0, 0, 0, 
    0, 0, 0, 0, 
    0, 0, 0, 0, 
    0, 0, 0, 0
]

let tilesImages: Image[] = [
    assets.image`tile0`,
    assets.image`tile1`,
    assets.image`tile2`,
    assets.image`tile3`,
    assets.image`tile4`,
    assets.image`tile5`,
    assets.image`tile6`,
    assets.image`tile7`,
    assets.image`tile8`,
    assets.image`tile9`,
    assets.image`tile10`,
    assets.image`tile11`
]

let tilesSprites: Sprite[] = []

let isModified = false
let zerosIndexes: number[] = []

let x_start = 35
let y_start = 15

// create and position tiles
for (let i = 0; i <= 15; i++) {
    tilesSprites.push(sprites.create(tilesImages[0], SpriteKind.Tile))
    tilesSprites[i].setPosition(x_start + i % 4 * 30, y_start + Math.floor(i / 4) * 30)
}

add1()
add1()

updateTilesSprites()