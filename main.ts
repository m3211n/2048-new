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
function optimizeList (list: number[]) {
    newList = list
    i0 = 0
    i1 = 1
    for (let index = 0; index < 3; index++) {
        if (newList[i0] != 0) {
            if (newList[i1] != 0) {
                if (newList[i0] == newList[i1]) {
                    newList[i0] = newList[i0] + 1
                    newList.removeAt(i1)
                    newList.push(0)
                }
                i0 += 1
                i1 += 1
            } else {
                newList.removeAt(i1)
                newList.push(0)
            }
        } else {
            newList.removeAt(i0)
            newList.push(0)
        }
        console.logValue("i0", i0)
        console.logValue("i1", i1)
        console.logValue("list", newList)
    }
    return newList
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
function getList (position: number, isRow: boolean) {
    newList = [
    0,
    0,
    0,
    0
    ]
    for (let i1 = 0; i1 <= 3; i1++) {
        if (isRow) {
            newList[i1] = tilesNumbers[position * 4 + i1]
        } else {
            newList[i1] = tilesNumbers[i1 * 4 + position]
        }
    }
    return newList
}
let Y = 0
let X = 0
let tilesSprites: Sprite[] = []
let tilesImages: Image[] = []
let i1 = 0
let i0 = 0
let newList: number[] = []
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
