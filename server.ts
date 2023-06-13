import * as Phaser from 'phaser'
import { Player } from './player'
import { GridControls } from './gridControls'
import { GridPhysics } from './gridPhsyics'
import { Direction } from './direction'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game'
}

const CANVAS_WIDTH = 720
const CANVAS_HEIGHT = 528

export class GameScene extends Phaser.Scene {
    constructor(
        private gridControls: GridControls,
        private gridPhysics: GridPhysics
    ) {
        super(sceneConfig)
    }



    static readonly TILE_SIZE = 48

    public preload() {
        this.load.image('tiles', './assets/cloud_tileset.png')
        this.load.tilemapTiledJSON('cloud-city-map', './assets/cloud_city_map.json')

        this.load.spritesheet('player', './assets/sprites.png', {
            frameWidth: 26,
            frameHeight: 32
        })
    }

    public create() {
        const cloudCityTilemap = this.make.tilemap({ key: 'cloud-city-map' })
        cloudCityTilemap.addTilesetImage('Cloud City', 'tiles')

        for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
            const layer = cloudCityTilemap.createLayer(i, 'Cloud City', 0, 0)
            if (layer) {
                layer.setDepth(i)
                layer.scale = 3
            }
        }

        const playerSprite = this.add.sprite(0, 0, 'player')
        playerSprite.setDepth(2)
        playerSprite.scale = 3
        this.cameras.main.startFollow(playerSprite)
        this.cameras.main.roundPixels = true
        const player = new Player(playerSprite, new Phaser.Math.Vector2(6, 6))

        this.gridPhysics = new GridPhysics(player)
        this.gridControls = new GridControls(this.input, this.gridPhysics)

        this.createPlayerAnimation(Direction.UP, 37, 38)
        this.createPlayerAnimation(Direction.RIGHT, 78, 80)
        this.createPlayerAnimation(Direction.DOWN, 0, 1)
        this.createPlayerAnimation(Direction.LEFT, 66, 68)

    }

    public update(_time: number, delta: number) {
        this.gridControls.update()
        this.gridPhysics.update(delta)
    }

    private createPlayerAnimation(
        name: string,
        startFrame: number,
        endFrame: number
    ) {
        this.anims.create({
            key: name,
            frames: this.anims.generateFrameNumbers('player', {
                start: startFrame,
                end: endFrame
            }),
            frameRate: 10,
            repeat: -1,
            yoyo: true
        })
    }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Phaser 2d RPG',
    render: {
        antialias: false
    },
    type: Phaser.AUTO,
    scene: GameScene,
    scale: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: 'game',
    backgroundColor: '#48C4F8'
}

export const game = new Phaser.Game(gameConfig)