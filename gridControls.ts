import { Direction } from "./direction";
import { GridPhysics } from './gridPhsyics'

export class GridControls {
    constructor(
        private input: Phaser.Input.InputPlugin,
        private gridPhsysics: GridPhysics
    ) {}

    update() {
        const cursors = this.input.keyboard?.createCursorKeys()

        if(cursors?.left.isDown) {
            this.gridPhsysics.movePlayer(Direction.LEFT)
        } else if (cursors?.right.isDown) {
            this.gridPhsysics.movePlayer(Direction.RIGHT)
        } else if (cursors?.up.isDown) {
            this.gridPhsysics.movePlayer(Direction.UP)
        } else if (cursors?.down.isDown) {
            this.gridPhsysics.movePlayer(Direction.DOWN)
        }
    }
}