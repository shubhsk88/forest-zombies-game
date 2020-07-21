import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import Enemies from './Enemies';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1200,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
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
  this.load.spritesheet('player', '../src/assets/player.png', {
    frameWidth: 32,
    frameHeight: 64,
  });
  this.load.image('slime', '../src/assets/slime.png');
}
let player, cursors, enemies;

function create() {
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('assets', 'tiles');
  const background = this.add.image(600, 300, 'background');

  const lowerLayer = map.createStaticLayer('LowerGround', tileset, 0, 0);
  const groundLayer = map.createStaticLayer('Ground', tileset, 0, 0);
  const grassLayer = map.createStaticLayer('Grass', tileset, 0, 0);
  const worldLayer = map.createStaticLayer('World', tileset, 0, 0);
  const highLayer = map.createStaticLayer('High', tileset, 0, 0);
  lowerLayer.setCollisionByProperty({ collides: true });
  groundLayer.setCollisionByProperty({ collides: true });
  worldLayer.setCollisionByProperty({ collides: true });
  highLayer.setDepth(10);

  //Player

  const spawnObject = map.findObject(
    'Player',
    (obj) => obj.name === 'Spawn Point'
  );
  player = this.physics.add.sprite(spawnObject.x, spawnObject.y, 'player');
  this.physics.add.collider(player, lowerLayer);
  this.physics.add.collider(player, groundLayer);
  this.physics.add.collider(player, worldLayer);

  //Enemies
  this.enemies = map.createFromObjects('Enemies', 'Enemy', {});
  this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies);
  this.physics.add.collider(this.enemiesGroup, lowerLayer);
  this.physics.add.collider(this.enemiesGroup, groundLayer);
  this.physics.add.collider(this.enemiesGroup, worldLayer);
  this.physics.add.collider(this.enemiesGroup, player, hitEnemy, null, this);

  const anims = this.anims;
  anims.create({
    key: 'left',
    frames: anims.generateFrameNames('player', {
      start: 20,
      end: 29,
      frames: 10,
      repeat: -1,
    }),
  });

  anims.create({
    key: 'right',
    frames: anims.generateFrameNames('player', {
      start: 30,
      end: 39,
      frames: 10,
      repeat: -1,
    }),
  });
  anims.create({
    key: 'front',
    frames: anims.generateFrameNames('player', {
      start: 0,
      end: 7,
      frames: 10,
      repeat: -1,
    }),
  });
  anims.create({
    key: 'back',
    frames: anims.generateFrameNames('player', {
      start: 10,
      end: 17,
      frames: 10,
      repeat: -1,
    }),
  });
  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}

function update() {
  player.body.setVelocity(0);
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    player.body.setVelocityX(-100);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(100);
  } else if (cursors.up.isDown) {
    player.body.setVelocityY(-100);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(100);
  }

  if (cursors.left.isDown) {
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.anims.play('right', true);
  } else if (cursors.up.isDown) {
    player.anims.play('back', true);
  } else if (cursors.down.isDown) {
    player.anims.play('front', true);
  } else player.anims.stop();
}

function hitEnemy(player, enemiesGroup) {
  this.scene.restart();
}
