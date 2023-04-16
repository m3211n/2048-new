// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level":
            case "level1":return tiles.createTilemap(hex`0a0008000209050505050505080301050a0a0a0a0a0a050401050a0a0a0a0a0a050301050a0a0a0a0a0a050301050a0a0a0a0a0a050302050a0a0a0a0a0a050301050a0a0a0a0a0a050401070505050505050603`, img`
. 2 2 2 2 2 2 2 2 . 
. 2 . . . . . . 2 . 
. 2 . . . . . . 2 . 
. 2 . . . . . . 2 . 
. 2 . . . . . . 2 . 
. 2 . . . . . . 2 . 
. 2 . . . . . . 2 . 
. 2 2 2 2 2 2 2 2 . 
`, [myTiles.transparency16,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterEast1,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterWest1,sprites.dungeon.floorDark2,sprites.dungeon.floorDark3,sprites.dungeon.floorDark1,sprites.dungeon.floorDark4,sprites.dungeon.floorDark0,sprites.dungeon.darkGroundCenter], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
