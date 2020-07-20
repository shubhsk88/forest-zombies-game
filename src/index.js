import Phaser from 'phaser';
import logoImg from './assets/logo.png';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let logo;
function preload() {
  this.load.image('logo', logoImg);
}

function create() {
  logo = this.add.image(400, 150, 'logo');

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: 'Power2',
    yoyo: true,
    loop: -1,
  });
}

function update() {
  logo.rotation += 0.01;
}
