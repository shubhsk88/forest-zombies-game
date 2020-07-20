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

function preload() {
  this.load.image('tiles', '../src/assets/assets.png');
  this.load.tilemapTiledJSON('map', '../src/assets/level1.json');
  this.load.image('background', '../src/assets/water.png');
}

function create() {
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('assets', 'tiles');
  const background = this.add.image(600, 300, 'background');

  const lowerLayer = map.createStaticLayer('LowerGround', tileset, 0, 0);
  const groundLayer = map.createStaticLayer('Ground', tileset, 0, 0);
  const grassLayer = map.createStaticLayer('Grass', tileset, 0, 0);
  const worldLayer = map.createStaticLayer('World', tileset, 0, 0);
  const highLayer = map.createStaticLayer('High', tileset, 0, 0);
}

function update() {}
