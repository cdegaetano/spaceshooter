namespace SpriteKind {
    export const PowerUp = SpriteKind.create()
    export const powerUPmode = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        `, Player1, 0, -50)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    doubleFireMode = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 2 2 . . . . . . 2 2 . . . 
        . . . 2 2 . . . . . . 2 2 . . . 
        . . . 2 2 . . . . . . 2 2 . . . 
        . . . 2 2 . . . . . . 2 2 . . . 
        . . . 2 2 . . . . . . 2 2 . . . 
        . . . 2 2 . . . . . . 2 2 . . . 
        . . . 2 2 . . . . . . 2 2 . . . 
        . . 8 2 2 8 . . . . 8 2 2 8 . . 
        . . 8 2 2 8 . . . . 8 2 2 8 . . 
        . . 8 2 2 8 . . . . 8 2 2 8 . . 
        . . 8 2 2 8 . . . . 8 2 2 8 . . 
        . . 8 2 2 8 . . . . 8 2 2 8 . . 
        . . 8 2 2 8 . . . . 8 2 2 8 . . 
        `, SpriteKind.powerUPmode)
    doubleFireMode.setPosition(52, 8)
    doubleFireMode.lifespan = 10000
    sprites.destroy(otherSprite)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemyDeath(status.spriteAttachedTo())
})
function enemyDeath (enemy: Sprite) {
    sprites.destroy(enemy, effects.disintegrate, 200)
    if (Math.percentChance(50)) {
        powerUp = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            . . . 8 8 7 7 7 7 7 7 8 . . . . 
            . . 8 8 8 7 7 8 8 8 7 7 8 . . . 
            . 8 8 8 8 7 7 8 8 8 7 7 8 8 . . 
            . 8 8 8 8 7 7 8 8 8 7 7 8 8 . . 
            . 8 8 8 8 7 7 7 7 7 7 7 8 8 . . 
            . 8 8 8 8 7 7 8 8 8 8 8 8 8 . . 
            . 8 8 8 8 7 7 8 8 8 8 8 8 8 . . 
            . 8 8 8 8 7 7 8 8 8 8 8 8 8 . . 
            . 8 8 8 8 7 7 8 8 8 8 8 8 8 . . 
            . . 8 8 8 7 7 8 8 8 8 8 8 . . . 
            . . . 8 8 7 7 8 8 8 8 8 . . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.PowerUp)
        powerUp.x = enemy.x
        powerUp.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -20
    info.changeScoreBy(1)
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemyDeath(otherSprite)
    info.changeLifeBy(-1)
})
let statusbar: StatusBarSprite = null
let powerUp: Sprite = null
let doubleFireMode: Sprite = null
let projectile: Sprite = null
let Player1: Sprite = null
effects.starField.startScreenEffect()
Player1 = sprites.create(img`
    . . . . . . . . . 2 . . . . . . 
    . . . . . . . . 2 2 . . . . . . 
    . . . . . . . . 2 2 . . . . . . 
    . . . . . . e 8 2 e 2 . . . . . 
    . . . . . e 8 8 2 e 2 . . . . . 
    . . . . . e 8 8 2 e 2 2 . . . . 
    . . . . . . e 8 2 e 5 2 . . . . 
    . . . . . . . 2 2 2 5 2 . . . . 
    . . . . . . 2 2 2 2 5 5 . . . . 
    . . . . . . 2 5 2 2 2 . . . . . 
    . . . . . 2 2 5 2 5 2 . . . . . 
    . . . . . 2 5 5 2 5 2 2 . . . . 
    . . . . . 2 5 5 2 5 4 2 . . . . 
    . . . . . 2 5 5 2 5 4 2 . . . . 
    . . . . . 5 5 4 2 5 5 5 . . . . 
    . . . . 5 5 5 4 4 4 4 5 . . . . 
    `, SpriteKind.Player)
Player1.setPosition(86, 102)
controller.moveSprite(Player1)
Player1.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    powerUp = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 1 . . . . . . 1 . . . . 
        . . . 1 1 . . . . . . 1 1 . . . 
        . . 1 1 1 . . . . . 1 1 1 1 . . 
        . . 1 1 1 1 . . . 1 1 1 1 1 . . 
        . . 1 2 2 1 1 1 1 1 1 2 2 1 . . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        . . 1 1 1 1 2 2 2 2 1 1 1 . . . 
        . . . 1 1 2 1 1 1 1 2 1 1 . . . 
        . . . 1 1 1 1 1 1 1 1 1 . . . . 
        . . . . 1 . . . . . 1 . . . . . 
        . . . . 1 . . . . . 1 . . . . . 
        . . . 1 1 . . . . . 1 1 . . . . 
        `, SpriteKind.Enemy)
    powerUp.setPosition(randint(0, scene.screenWidth()), -10)
    powerUp.setVelocity(0, 32)
    statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(powerUp)
})
