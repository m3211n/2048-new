namespace SpriteKind {
    export const Tile = SpriteKind.create()
}

function add1 () {
    zerosIndexes = []
    for (let n1 = 0; n1 <= tilesNumbers.length - 1; n1++) {
        if (tilesNumbers[n1] == 0) {
            zerosIndexes.push(n1)
        }
    }
    tilesNumbers[zerosIndexes._pickRandom()] = 1
}

function optimizeBufferList () {
    i0 = 0
    i1 = 1
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
        console.logValue("i0", i0)
        console.logValue("i1", i1)
        console.logValue("list", bufferList)
    }
}

function createTiles () {
    tilesImages = [
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
    for (let index = 0; index < 16; index++) {
        tilesNumbers.push(0)
        tilesSprites.push(sprites.create(tilesImages[0], SpriteKind.Tile))
    }
}
function drawTiles () {
    for (let i0 = 0; i0 <= 15; i0++) {
        X = X_start + i0 % 4 * 24
        Y = Y_start + Math.floor(i0 / 4) * 24
        tilesSprites[i0].setImage(tilesImages[tilesNumbers[i0]])
        tilesSprites[i0].setPosition(X, Y)
    }
}
function getBufferList (position: number, isRow: boolean) {
    bufferList = [0, 0, 0, 0]
    for (let i1 = 0; i1 <= 3; i1++) {
        if (isRow) {
            bufferList[i1] = tilesNumbers[position * 4 + i1]
        } else {
            bufferList[i1] = tilesNumbers[i1 * 4 + position]
        }
    }
}

function putBufferList (position: number, isRow: boolean) {
    for (let i1 = 0; i1 <= 3; i1++) {
        if (isRow) {
            tilesNumbers[position * 4 + i1] = bufferList[i1]
        } else {
            tilesNumbers[i1 * 4 + position] = bufferList[i1]
        }
    }
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    for (i2 = 0; i2 <= 3; i2++) {
        getBufferList(i2, true)
        optimizeBufferList()
        putBufferList(i2, true)
    }
    drawTiles()
    add1()
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    for (i2 = 0; i2 <= 3; i2++) {
        getBufferList(i2, true)
        bufferList.reverse()
        optimizeBufferList()
        bufferList.reverse()
        putBufferList(i2, true)
    }
    drawTiles()
    add1()
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
    for (i2 = 0; i2 <= 3; i2++) {
        getBufferList(i2, false)
        optimizeBufferList()
        putBufferList(i2, false)
    }
    drawTiles()
    add1()
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    for (i2 = 0; i2 <= 3; i2++) {
        getBufferList(i2, true)
        bufferList.reverse()
        optimizeBufferList()
        bufferList.reverse()
        putBufferList(i2, true)
    }
    drawTiles()
    add1()
})

let Y = 0
let X = 0
let tilesSprites: Sprite[] = []
let tilesImages: Image[] = []
let i2 = 0
let i1 = 0
let i0 = 0
let newList: number[] = []
let testList: number[] = []
let bufferList: number[] = []
let zerosIndexes: number[] = []
let tilesNumbers: number[] = []
let Y_start = 0
let X_start = 0
X_start = 44
Y_start = 24
tilesNumbers = []
createTiles()
add1()
add1()
console.log(tilesNumbers)
drawTiles()