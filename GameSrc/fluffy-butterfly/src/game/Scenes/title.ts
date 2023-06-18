import * as Phaser from "phaser"
import { AudioAsset, ImageAssets, SpriteAssets } from "../Symbol/ObjectPropaties";

export class Title extends Phaser.Scene {
  //背景
  private noon!: Phaser.GameObjects.TileSprite;
  private noonTown!: Phaser.GameObjects.TileSprite;
  private ground!: Phaser.GameObjects.TileSprite;

  //パラメーター
  //画面サイズ
  private width!: number;
  private height!: number;
  //タイトルロゴ
  private titleLogo!: Phaser.GameObjects.Image;
  //スタートロゴ
  private startLogo!: Phaser.GameObjects.Image;
  //蝶々
  private player!: Phaser.GameObjects.Sprite;
  //アニメーション
  private flyAnims: { key: string, frameStart: number, frameEnd: number } = { key: 'fly_right', frameStart: 2, frameEnd: 3 };
  private flyAnimConfig(config: { key: string, frameStart: number, frameEnd: number }): Phaser.Types.Animations.Animation {
    return {
      key: config.key,
      frames: this.anims.generateFrameNumbers(
        SpriteAssets.butterfly.getKey(),
        {
          start: config.frameStart,
          end: config.frameEnd
        }
      ),
      frameRate: 8,
      repeat: -1
    }
  }

  constructor() {
    super({
      key: 'titleScene',
    })
  }

  init(): void {
    const { width, height } = this.game.canvas;
    this.width = width;
    this.height = height*0.75;
  }

  preload(): void {
    
  }

  create(): void {
    //昼：
    //空
    this.noon = this.add.tileSprite(this.width / 2, this.height / 3, this.width, this.height / 2, ImageAssets.noon.getKey());
    this.noon.setDisplaySize(this.width * 2, this.height * 3 / 2);
    //町
    //町
    this.noonTown = this.add.tileSprite(this.width / 2, this.height, this.width, this.height, ImageAssets.noonTown.getKey());
    this.noonTown.setDisplaySize(this.width * 2, this.height * 3);


    //地面
    this.ground = this.add.tileSprite(this.width / 2, this.height, this.width, this.height / 10, ImageAssets.ground.getKey());
    this.ground.setDisplaySize(this.width, this.height / 10);

    //タイトルロゴ
    this.titleLogo = this.add.image(this.width * 2 / 3, this.height / 3, ImageAssets.titleLogo.getKey());
    this.titleLogo.setDisplaySize(this.width / 2, this.height * 2 / 5);

    //スタートロゴ
    this.startLogo = this.add.image(this.width * 2 / 3, this.height / 4 * 3, ImageAssets.startLogo.getKey())
    this.startLogo.setDisplaySize(this.width / 4, this.height / 4);
    ////
    //gamestartEvent
    this.startLogo.setInteractive();
    this.startLogo.on('pointerdown', () => {
      this.sound.add(AudioAsset.sceneFinish.getKey()).play();
        this.scene.start('gameScene');
    });

    //プレイヤー
    this.player = this.add.sprite(this.width * 1 / 4, this.height * 1 / 3, SpriteAssets.butterfly.getKey(), 0);
    this.player.setDisplaySize(30, 30);
    this.player.setOrigin(0, 0)
    //アニメーション
  this.anims.create(this.flyAnimConfig(this.flyAnims));
    this.player.anims.play('fly_right');
  }

  update(): void {
    //雲を動かす
    this.noon.tilePositionX += 0.01;
    this.noonTown.tilePositionX += 0.025;
    this.ground.tilePositionX += 0.08


  }


}