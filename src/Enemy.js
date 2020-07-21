class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'slime', 0);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.timeEvent = this.scene.time.addEvent({
      delay: 3000,
      callback: this.move,
      loop: true,
      callbackScope: this,
    });
  }

  move() {
    const randNum = Math.floor(Math.random() * 4 + 1);
    switch (randNum) {
      case 1:
        this.setVelocityX(100);
        break;
      case 2:
        this.setVelocityX(-100);
        break;
      case 3:
        this.setVelocityY(100);
        break;
      case 4:
        this.setVelocityY(-100);
        break;
      default:
        this.setVelocityX(100);
    }
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.setVelocity(0);
      },
      callbackScope: this,
    });
  }
}

export default Enemy;
