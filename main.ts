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
}

function drawTiles () {
    let X = 0
    let Y = 0
    for (let i = 0; i <= 15; i++) {
        X = X_start + i % 4 * 24
        Y = Y_start + Math.floor(i / 4) * 24
        tilesSprites[i].setImage(tilesImages[tilesNumbers[i]])
        tilesSprites[i].setPosition(X, Y)
    }
}

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

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    isOptimized = false
    for (let i = 0; i <= 3; i++) {
        getBufferList(i, true)
        optimizeBufferList()
        putBufferList(i, true)
    }
    if (isOptimized) {
        add1()
        drawTiles()
    }
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    isOptimized = false
    for (let i = 0; i <= 3; i++) {
        getBufferList(i, true)
        bufferList.reverse()
        optimizeBufferList()
        bufferList.reverse()
        putBufferList(i, true)
    }
    if (isOptimized) {
        add1()
        drawTiles()
    }
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
    isOptimized = false
    for (let i = 0; i <= 3; i++) {
        getBufferList(i, false)
        optimizeBufferList()
        putBufferList(i, false)
    }
    if (isOptimized) {
        add1()
        drawTiles()
    }
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    isOptimized = false
    for (let i = 0; i <= 3; i++) {
        getBufferList(i, false)
        bufferList.reverse()
        optimizeBufferList()
        bufferList.reverse()
        putBufferList(i, false)
    }
    if (isOptimized) {
        add1()
        drawTiles()
    }
})

//let i2 = 0
//let i1 = 0
//let i0 = 0
//let newList: number[] = []
//let testList: number[] = []

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

let bufferList: number[] = []
let isOptimized = false
let zerosIndexes: number[] = []

let Y_start = 44
let X_start = 24

add1()
add1()

drawTiles()