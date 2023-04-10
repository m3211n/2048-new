namespace SpriteKind {
    export const Tile = SpriteKind.create()
}
function getRow (index: number) {
    tmpList = []
    for (let i = 0; i <= 3; i++) {
        tmpList.push(tilesNumbers[i + index])
    }
    return tmpList
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let j = 0; j <= 3; j++) {
        myList = getCol(j)
        myList = compressList(myList)
        putCol(j, myList)
        drawTiles()
    }
})
function getCol (index: number) {
    tmpList = []
    for (let k = 0; k <= 3; k++) {
        tmpList.push(tilesNumbers[k * 4 + index])
    }
    return tmpList
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let l = 0; l <= 3; l++) {
        myList = getRow(l)
        myList = compressList(myList)
        putRow(l, myList)
        drawTiles()
    }
})
function putRow (index: number, row: number[]) {
    for (let m = 0; m <= 3; m++) {
        tilesNumbers[m + index] = row.removeAt(0)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let n = 0; n <= 3; n++) {
        myList = getRow(n)
        myList.reverse()
        myList = compressList(myList)
        myList.reverse()
        putRow(n, myList)
        drawTiles()
    }
})
function putCol (index: number, col: number[]) {
    for (let o = 0; o <= 3; o++) {
        tilesNumbers[o * 4 + index] = col.removeAt(0)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let p = 0; p <= 3; p++) {
        myList = getCol(p)
        myList.reverse()
        myList = compressList(myList)
        myList.reverse()
        putCol(p, myList)
        drawTiles()
    }
})
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
    tilesNumbers = []
    for (let index = 0; index < 16; index++) {
        tmpValue = 0
        tilesNumbers.push(tmpValue)
        tilesSprites.push(sprites.create(tilesImages[tmpValue], SpriteKind.Tile))
    }
}
function compressList (list: number[]) {
    tmpList = list
    // clean out 0's between numbers
    for (let q = 0; q <= 3; q++) {
        if (tmpList[q] == 0) {
            tmpList.removeAt(q)
            tmpList.push(0)
        }
    }
    // compress values if needed
    for (let r = 0; r <= 2; r++) {
        if (tmpList[r] == tmpList[r + 1]) {
            tmpList[r] = tmpList[r] + 1
            tmpList[r + 1] = 0
        }
    }
    // clean up 0's again
    for (let s = 0; s <= 3; s++) {
        if (tmpList[s] == 0) {
            tmpList.removeAt(s)
            tmpList.push(0)
        }
    }
    return tmpList
}
function drawTiles () {
    for (let currentIndex = 0; currentIndex <= 15; currentIndex++) {
        X = X_start + currentIndex % 4 * 24
        Y = Y_start + Math.floor(currentIndex / 4) * 24
        tilesSprites[currentIndex].setImage(tilesImages[tilesNumbers[currentIndex]])
        tilesSprites[currentIndex].setPosition(X, Y)
    }
}
let tilesSprites: Sprite[] = []
let tilesImages: Image[] = []
let myList: number[] = []
let tilesNumbers: number[] = []
let tmpList: number[] = []
let Y: number
let X: number
let tmpValue: number
let Y_start: number
let X_start: number
X_start = 44
Y_start = 24
createTiles()
drawTiles()
