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
                    if (segment[i0] == segment[i1]) {
                        segment[i0] = segment[i0] + 1
                        segment.removeAt(i1)
                        segment.push(0)
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
        drawTiles()
    }
}

/*

function optimizeBufferList () {
    let i0 = 0
    let i1 = 1
    let bufferSnapshot: number[] = []
    bufferSnapshot = bufferList
    for (let index = 0; index < 3; index++) {
        if (bufferList[i0] != 0) {
            if (bufferList[i1] != 0) {
                if (bufferList[i0] == bufferList[i1]) {
                    bufferList[i0] = bufferList[i0] + 1
                    bufferList.removeAt(i1)
                    bufferList.push(0)
                }
                i0 += 1
                i1 += 1
            } else {
                bufferList.removeAt(i1)
                bufferList.push(0)
            }
        } else {
            bufferList.removeAt(i0)
            bufferList.push(0)
        }
    }
    isModified = false
    for (let i = 0; i < bufferList.length; i++) {
        if (bufferList[i] != bufferSnapshot[i]) {
            isModified = true
        }
    }
}

*/

function drawTiles () {
    let x = 0
    let y = 0
    for (let i = 0; i <= 15; i++) {
        x = x_start + i % 4 * 30
        y = y_start + Math.floor(i / 4) * 30
        tilesSprites[i].setImage(tilesImages[tilesNumbers[i]])
        tilesSprites[i].setPosition(x, y)
    }
}

/*

function getBufferList (position: number, isRow: boolean) {
    bufferList = [0, 0, 0, 0]
    for (let i = 0; i <= 3; i++) {
        if (isRow) {
            bufferList[i] = tilesNumbers[position * 4 + i]
        } else {
            bufferList[i] = tilesNumbers[i * 4 + position]
        }
    }
}

function putBufferList (position: number, isRow: boolean) {
    for (let i = 0; i <= 3; i++) {
        if (isRow) {
            tilesNumbers[position * 4 + i] = bufferList[i]
        } else {
            tilesNumbers[i * 4 + position] = bufferList[i]
        }
    }
}

*/

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

const _UP = 0                // direction constants
const _RIGHT = 3
const _DOWN = 6
const _LEFT = 9

let _top = 0
let _right = 3
let _bottom = 6
let _left = 9

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

for (let index = 0; index < 16; index++) {
    tilesSprites.push(sprites.create(tilesImages[0], SpriteKind.Tile))
}

let isModified = false
let zerosIndexes: number[] = []

let x_start = 35
let y_start = 15

add1()
add1()

drawTiles()