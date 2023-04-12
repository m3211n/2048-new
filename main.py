@namespace
class SpriteKind:
    Tile = SpriteKind.create()
def add1():
    global zerosIndexes
    zerosIndexes = []
    n1 = 0
    while n1 <= len(tilesNumbers) - 1:
        if tilesNumbers[n1] == 0:
            zerosIndexes.append(n1)
        n1 += 1
    tilesNumbers[zerosIndexes._pick_random()] = 1
def optimizeBufferList():
    global i02, i13
    i02 = 0
    i13 = 1
    for index in range(3):
        if bufferList[i02] != 0:
            if bufferList[i13] != 0:
                if bufferList[i02] == bufferList[i13]:
                    bufferList[i02] = bufferList[i02] + 1
                    bufferList.remove_at(i13)
                    bufferList.append(0)
                i02 += 1
                i13 += 1
            else:
                bufferList.remove_at(i13)
                bufferList.append(0)
        else:
            bufferList.remove_at(i02)
            bufferList.append(0)
def createTiles():
    global tilesImages
    tilesImages = [assets.image("""
            tile0
        """),
        assets.image("""
            tile1
        """),
        assets.image("""
            tile2
        """),
        assets.image("""
            tile3
        """),
        assets.image("""
            tile4
        """),
        assets.image("""
            tile5
        """),
        assets.image("""
            tile6
        """),
        assets.image("""
            tile7
        """),
        assets.image("""
            tile8
        """),
        assets.image("""
            tile9
        """),
        assets.image("""
            tile10
        """),
        assets.image("""
            tile11
        """)]
    for index2 in range(16):
        tilesNumbers.append(0)
        tilesSprites.append(sprites.create(tilesImages[0], SpriteKind.Tile))
def drawTiles():
    global X, Y
    for i0 in range(16):
        X = X_start + i0 % 4 * 24
        Y = Y_start + Math.floor(i0 / 4) * 24
        tilesSprites[i0].set_image(tilesImages[tilesNumbers[i0]])
        tilesSprites[i0].set_position(X, Y)
def getBufferList(position: number, isRow: bool):
    global bufferList
    bufferList = [0, 0, 0, 0]
    for i1 in range(4):
        if isRow:
            bufferList[i1] = tilesNumbers[position * 4 + i1]
        else:
            bufferList[i1] = tilesNumbers[i1 * 4 + position]
def putBufferList(position2: number, isRow2: bool):
    for i12 in range(4):
        if isRow2:
            tilesNumbers[position2 * 4 + i12] = bufferList[i12]
        else:
            tilesNumbers[i12 * 4 + position2] = bufferList[i12]

def on_left_pressed():
    global i2
    i2 = 0
    while i2 <= 3:
        getBufferList(i2, True)
        optimizeBufferList()
        putBufferList(i2, True)
        i2 += 1
    drawTiles()
    add1()
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    global i2
    i2 = 0
    while i2 <= 3:
        getBufferList(i2, True)
        bufferList.reverse()
        optimizeBufferList()
        bufferList.reverse()
        putBufferList(i2, True)
        i2 += 1
    drawTiles()
    add1()
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_up_pressed():
    global i2
    i2 = 0
    while i2 <= 3:
        getBufferList(i2, False)
        optimizeBufferList()
        putBufferList(i2, False)
        i2 += 1
    drawTiles()
    add1()
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_down_pressed():
    global i2
    i2 = 0
    while i2 <= 3:
        getBufferList(i2, False)
        bufferList.reverse()
        optimizeBufferList()
        bufferList.reverse()
        putBufferList(i2, False)
        i2 += 1
    drawTiles()
    add1()
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

Y = 0
X = 0
tilesSprites: List[Sprite] = []
tilesImages: List[Image] = []
i2 = 0
i13 = 0
i02 = 0
# let newList: number[] = []
# let testList: number[] = []
bufferList: List[number] = []
zerosIndexes: List[number] = []
tilesNumbers: List[number] = []
Y_start = 0
X_start = 0
X_start = 44
Y_start = 24
tilesNumbers = []
createTiles()
add1()
add1()
drawTiles()