/* src/scenes/game.ts */

import * as Phaser from "phaser";
import { Asset, AudioAsset, BirdBlue, BirdCrow, CsvAsset, Enemy, ImageAssets, SpriteAssets, Wind } from "../Symbol/ObjectPropaties";
import { BirdPink } from "../Symbol/ObjectPropaties";
import { Result } from "./result";

export class Game extends Phaser.Scene {
  //アセット
  //背景
  private noon!: Phaser.GameObjects.TileSprite;
  private noonTown!: Phaser.GameObjects.TileSprite;
  private evening!: Phaser.GameObjects.TileSprite;
  private eveningTown!: Phaser.GameObjects.TileSprite;
  private night!: Phaser.GameObjects.TileSprite;
  private nightTown!: Phaser.GameObjects.TileSprite;
  private ground!: Phaser.GameObjects.TileSprite;
  private platformTop!: Phaser.Physics.Arcade.StaticGroup;
  private platformBottom!: Phaser.Physics.Arcade.StaticGroup;

  //オブジェクト
  //プレイヤー
  private player!: Phaser.Physics.Arcade.Sprite;
  //アニメーション
  private flyAnims: { key: string, frameStart: number, frameEnd: number }[] = [
    { key: 'fly_left', frameStart: 0, frameEnd: 1 },
    { key: 'fly_right', frameStart: 2, frameEnd: 3 },
    { key: 'damage_left', frameStart: 4, frameEnd: 5 },
    { key: 'damage_right', frameStart: 6, frameEnd: 7 }
  ]
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
  //敵
  private enemise!: { enemy: Enemy, index: number }[];
  private winds!: { wind: Wind, index: number }[];

  //飛行距離表示
  private flyDistanceText!: Phaser.GameObjects.Text;

  //パラメーター
  //画面サイズ
  private gameWidth!: number;
  private gameHeight!: number;
  private fontStyle: Phaser.Types.GameObjects.Text.TextStyle = { color: 'white', fontSize: '30px' };
  //飛行距離
  private flyDistance!: number;
  /**時間帯管理:noon,evening,nightで管理*/
  private noonFlg!: string;
  /**時間帯が過ぎるたびに生成ランダム関数を減らして敵の出現率を上げる :Max500*/
  private level!: number;
  //綿毛の上昇量
  private upPower!: number;
  //当たり判定
  private hitFlg!: boolean;
  //gameoverフラグ
  private GameOver!: boolean;
  //ランク：データ渡し用
  public rankin!: number;
  //距離：データ渡し用
  public resultDistance!:number;

  
  //操作
  //マウス
  private pointerDown!: boolean;

  //アニメーション
  private mauseAnims: { key: string, frameStart: number, frameEnd: number } = { key: 'touchFlower', frameStart: 0, frameEnd: 5 };
  private mauseAnimConfig(config: { key: string, frameStart: number, frameEnd: number }): Phaser.Types.Animations.Animation {
    return {
      key: config.key,
      frames: this.anims.generateFrameNumbers(
        `flower`,
        {
          start: config.frameStart,
          end: config.frameEnd
        }
      ),
      frameRate: 4,
      repeat: 0
    }
  }

  //コンストラクタ
  constructor() {
    super({
      key: 'gameScene',
    })
  }

  //初期化
  init(): void {
    //ウィンドウサイズ
    const { width, height } = this.game.canvas;
    this.gameWidth = width;
    this.gameHeight = height * 0.75;

    //飛行距離
    this.flyDistance = 0;
    this.resultDistance =0;
    //時間帯
    this.noonFlg = "noon";
    /**レベル */
    this.level = 1;
    //移動量
    this.upPower = 1.0;

    //gameoverフラグ
    this.GameOver = false;
    //ランクイン
    this.rankin = 4;

    //マウス
    this.pointerDown = false;

    //オブジェクトリスト
    this.enemise = [];
    this.winds = [];
  }

  //asetts呼び出し
  create(): void {
    //背景
    //昼：
    //空
    this.noon = this.add.tileSprite(this.gameWidth / 2, this.gameHeight / 3, this.gameWidth, this.gameHeight / 2, ImageAssets.noon.getKey());
    this.noon.setDisplaySize(this.gameWidth * 2, this.gameHeight * 3 / 2);
    this.noon.setAlpha(1);
    //町
    this.noonTown = this.add.tileSprite(this.gameWidth / 2, this.gameHeight, this.gameWidth, this.gameHeight, ImageAssets.noonTown.getKey());
    this.noonTown.setDisplaySize(this.gameWidth * 2, this.gameHeight * 3);
    this.noonTown.setAlpha(1);
    //夕：
    //空
    this.evening = this.add.tileSprite(this.gameWidth / 2, this.gameHeight / 3, this.gameWidth, this.gameHeight / 2, ImageAssets.evening.getKey());
    this.evening.setDisplaySize(this.gameWidth * 2, this.gameHeight * 3 / 2);
    this.evening.setAlpha(0);
    //町
    this.eveningTown = this.add.tileSprite(this.gameWidth / 2, this.gameHeight, this.gameWidth, this.gameHeight, ImageAssets.eveningTown.getKey());
    this.eveningTown.setDisplaySize(this.gameWidth * 2, this.gameHeight * 3);
    this.eveningTown.setAlpha(0);
    //夜：
    //空
    this.night = this.add.tileSprite(this.gameWidth / 2, this.gameHeight / 3, this.gameWidth, this.gameHeight / 2, ImageAssets.night.getKey());
    this.night.setDisplaySize(this.gameWidth * 2, this.gameHeight * 3 / 2);
    this.night.setAlpha(0);
    //町
    this.nightTown = this.add.tileSprite(this.gameWidth / 2, this.gameHeight, this.gameWidth, this.gameHeight, ImageAssets.nightTown.getKey());
    this.nightTown.setDisplaySize(this.gameWidth * 2, this.gameHeight * 3);
    this.nightTown.setAlpha(0);

    //オブジェクト：
    //プレイヤー
    this.player = this.physics.add.sprite(this.gameWidth * 1 / 4, this.gameHeight * 1 / 3, SpriteAssets.butterfly.getKey(), 0);
    this.player.setDisplaySize(30, 30);
    this.player.setOrigin(0, 0)
    this.player.setCollideWorldBounds(true);
    //アニメーション
    for (let anim of this.flyAnims) {
      this.anims.create(this.flyAnimConfig(anim));
    }
    this.player.anims.play('fly_right');
    this.player.setBounce(0.3);

    //地面
    this.ground = this.add.tileSprite(this.gameWidth / 2, this.gameHeight, this.gameWidth, this.gameHeight / 10, ImageAssets.ground.getKey());
    this.ground.setDisplaySize(this.gameWidth, this.gameHeight / 10);
    this.platformTop = this.physics.add.staticGroup();
    this.platformTop.create(this.ground.x, 0, ImageAssets.platform.getKey()).setBodySize(this.ground.width, 0);
    this.platformTop.setOrigin(1 / 2, 1 / 2);
    this.physics.add.collider(this.platformTop, this.player);
    this.platformBottom = this.physics.add.staticGroup();
    this.platformBottom.create(this.ground.x, this.ground.y, ImageAssets.platform.getKey()).setBodySize(this.ground.width, this.ground.height);

    this.physics.add.collider(this.platformBottom, this.player, () => { this.doGameOver(); });
    //飛行距離
    this.flyDistanceText = this.add.text(this.gameWidth, 0, this.flyDistance + "Km", this.fontStyle);
    this.flyDistanceText.setOrigin(1, 0);


    // マウスエフェクト読み込み
    this.anims.create(this.mauseAnimConfig(this.mauseAnims));

    //bgm
    let bgm = this.sound.add(AudioAsset.bgm.getKey()).setLoop(true);
    bgm.play();
    bgm.setVolume(0.1);

  }

  update(): void {
    //ゲームオーバー判定
    if (!this.GameOver) {
      //飛行距離加算
      this.plusDistance();

      //背景管理
      //横スクロール
      this.scrollX();
      //背景時間切り替え
      this.goBackAlpha();
      //画面クリック
      this.clipMove();
      //敵生成
      this.addEnemies();
      //敵動作
      this.moveEnemies();
      //風生成
      this.addWind();
      //風動作
      this.moveWind();
    } 
  }

  /**
   * 飛行距離加算
   * 毎ロード地に0.0001加算
   * 表示は小数第二以下切り捨て
  */
  private plusDistance(): void {
    this.flyDistance += 0.001;
    let flyKm: String = this.flyDistance.toString();
    this.flyDistanceText.setText(flyKm.substring(0, flyKm.indexOf(".") + 2) + "Km");
  }

  /**
   * 背景横スクロール
   */
  private scrollX(): void {
    this.noon.tilePositionX += 0.01;
    this.noonTown.tilePositionX += 0.025;
    this.evening.tilePositionX += 0.01;
    this.eveningTown.tilePositionX += 0.025;
    this.night.tilePositionX += 0.01;
    this.nightTown.tilePositionX += 0.025;

    this.ground.tilePositionX += 0.08
  }

  /**
   * 時間切り替え
   * 時間帯のフラグを持たせ各画面ごとの透過率を調整
   */
  private goBackAlpha(): void {
    //時間経過
    let goTime: number = 0.00025;

    if (this.noonFlg === "noon") {
      this.noon.setAlpha(this.noon.alpha - goTime);
      this.noonTown.setAlpha(this.noonTown.alpha - goTime);
      this.evening.setAlpha(this.evening.alpha + goTime);
      this.eveningTown.setAlpha(this.eveningTown.alpha + goTime);
      if (this.noon.alpha === 0) {
        this.noonFlg = "evening";
        //レベルアップ
        if (this.level <= 500) {
          this.level++;
        }
      }
    } else if (this.noonFlg === "evening") {
      this.evening.setAlpha(this.evening.alpha - goTime);
      this.eveningTown.setAlpha(this.eveningTown.alpha - goTime);
      this.night.setAlpha(this.night.alpha + goTime);
      this.nightTown.setAlpha(this.nightTown.alpha + goTime);
      if (this.evening.alpha === 0) {
        this.noonFlg = "night";
        //レベルアップ
        if (this.level <= 500) {
          this.level++;
        }
      }
    } else {
      this.night.setAlpha(this.night.alpha - goTime);
      this.nightTown.setAlpha(this.nightTown.alpha - goTime);
      this.noon.setAlpha(this.noon.alpha + goTime);
      this.noonTown.setAlpha(this.noonTown.alpha + goTime);
      if (this.night.alpha === 0) {
        this.noonFlg = "noon";
        //レベルアップ
        if (this.level <= 500) {
          this.level++;
        }
      }
    }
  }

  /**
   * クリック時の移動
   * 上昇量に合わせて
  */
  private clipMove(): void {
    if (this.input.activePointer!.isDown) {
      let pointX: number = this.input.activePointer.x;
      let pointY: number = this.input.activePointer.y;
      let playerX: number = this.player.x;
      let playerY: number = this.player.y;

      //画面内
      if ((pointX > 0
        && pointX < this.gameWidth)
        && (pointY > 0
          && pointY < this.gameHeight)) {

        if (this.pointerDown) {
          //移動エフェクト
          let ef: Phaser.GameObjects.Sprite = this.add.sprite(pointX, pointY, SpriteAssets.flower.getKey());
          ef.setDisplaySize(30, 30);
          ef.setOrigin(0.5, 0.5);
          ef.play("touchFlower", true);

          //移動音
          let ea = this.sound.add(AudioAsset.flySound.getKey());
          ea.volume = 0.5;
          ea.play();
          //移動向き
          //左
          if (!this.hitFlg) {
            if (pointX < playerX) {
              this.player.anims.play("fly_left");
            } else {
              this.player.anims.play("fly_right");
            }
          } else {
            if (pointX < playerX) {
              this.player.anims.play("damage_left");
            } else {
              this.player.anims.play("damage_right");
            }
          }

          this.player.setVelocityX((pointX - playerX) * this.upPower);
          this.player.setVelocityY((pointY - playerY) * this.upPower);
          this.pointerDown = false;
          if (this.upPower > 0) {
            this.upPower -= 0.01;
          } else {
            this.upPower = 0;
          }

        }
      }
    } else {
      this.pointerDown = true;
    }
  }

  /**
   * 敵の出現
   * 内部パラメータに合わせてランダムで敵を生成
   * 出現位置：ｘ　左端+0～30
   * 出現位置：ｙ　最下-画面高さ
   */
  private addEnemies() {

    //生成ランダム
    let rand: number = Math.floor(Math.random() * 700 - this.level * 10);
    //生成高さ
    let maxHeight = this.gameHeight - 40;
    let minHeight = 50;
    let apierHeight: number = Math.floor(Math.random() * (maxHeight + 1 - minHeight)) + minHeight;
    if (1 === rand) {
      //青い鳥生成
      let enemy = this.physics.add.image(this.gameWidth, apierHeight, ImageAssets.bird_blue.getKey());
      enemy.body.allowGravity = false;
      let enemyAsset = new BirdBlue(enemy);
      this.setHitBird(enemyAsset, this.enemise.length);
      this.enemise.push({ enemy: enemyAsset, index: this.enemise.length });
      this.physics.add.collider(enemy, this.platformTop);
      this.physics.add.collider(enemy, this.platformBottom);
    } else if (2 === rand) {
      //ピンク鳥生成
      let enemy = this.physics.add.image(this.gameWidth, apierHeight, ImageAssets.bird_pink.getKey());
      enemy.body.allowGravity = false;
      let enemyAsset = new BirdPink(enemy, this.gameWidth, this.gameHeight, this.platformBottom)
      this.setHitBird(enemyAsset, this.enemise.length);
      this.enemise.push({ enemy: enemyAsset, index: this.enemise.length });
      this.physics.add.collider(enemy, this.platformTop);
      this.physics.add.collider(enemy, this.platformBottom);
    } else if (3 === rand) {
      //カラス生成
      let enemy = this.physics.add.image(this.gameWidth - 50, minHeight, ImageAssets.bird_crow.getKey());
      enemy.body.allowGravity = false;
      let enemyAsset = new BirdCrow(enemy, this.gameWidth, apierHeight, this.player);
      this.setHitBird(enemyAsset, this.enemise.length);
      this.enemise.push({ enemy: enemyAsset, index: this.enemise.length });
      this.physics.add.collider(enemy, this.platformTop);
      this.physics.add.collider(enemy, this.platformBottom);
    }
  }

  /**敵の移動
   * 各敵のクラスから移動メソッドを呼び出す
   */
  private moveEnemies(): void {
    //敵をそれぞれ動かす
    for (let i = 0; i < this.enemise.length; i++) {
      let enemy = this.enemise[i];
      //移動
      enemy.enemy.move();
      //画面端判定
      if (enemy.enemy.getEnemy().x < -80) {
        enemy.enemy.getEnemy().destroy();
        this.enemise.splice(i, 1);
      }
    }
  }

  /**
   * 敵へのヒット時の処理
   * 
   */
  private setHitBird(enemy: Enemy, index: number): void {
    this.physics.add.overlap(this.player, enemy.getEnemy(), () => {
      if (!enemy.getHitFlg()) {
        //移動力を下げる
          this.upPower -= 0.1;
          if(this.upPower<0){
            this.upPower = 0;  
          }
          

        //ヒットフラグ(敵が鳴いている間は無敵)を制御する
        this.sound.add(enemy.getHitSoundKey()).play();

        //判定を消す
        enemy.setHitFlg(true);
        enemy.getEnemy().setAlpha(0.5);

      }
    });
  }

  /**風を起こす
   * 
   */
  private addWind() {
    //生成ランダム
    let rand: number = Math.floor(Math.random() * 1000);
    //生成高さ
    let maxHeight = this.gameHeight - 40;
    let minHeight = 50;
    let apierHeight: number = Math.floor(Math.random() * (maxHeight + 1 - minHeight)) + minHeight;
    if (1 === rand) {
      //風生成
      let wind = this.physics.add.image(0, apierHeight, ImageAssets.wind.getKey());
      wind.body.allowGravity = false;
      let windAsset = new Wind(wind);
      this.setHitWind(windAsset, this.winds.length);
      this.winds.push({ wind: windAsset, index: this.winds.length });
      this.physics.add.collider(wind, this.platformTop);
      this.physics.add.collider(wind, this.platformBottom);
    }
  }

  /**敵の移動
  * 各敵のクラスから移動メソッドを呼び出す
  */
  private moveWind(): void {
    //敵をそれぞれ動かす
    for (let i = 0; i < this.winds.length; i++) {
      let wind = this.winds[i]
      //移動
      wind.wind.move();
      //画面端判定
      if (wind.wind.getImage().x > this.gameWidth + 80) {
        wind.wind.getImage().destroy();
        this.winds.splice(i, 1);
      }
    }
  }


  /**
   * 風へのヒット時の処理
   * 
   */
  private setHitWind(wind: Wind, index: number): void {
    this.physics.add.overlap(this.player, wind.getImage(), () => {
      //無敵時間
      if (!wind.getHitFlg()) {
        //移動力を下げる
          this.upPower += 0.1;
          if(this.upPower>1.0){
            this.upPower =1.0;
          }

        this.sound.add(wind.getHitSoundKey()).play();

        //判定を消す
        wind.setHitFlg(true);
        wind.getImage().setAlpha(0);
      }
    });
  }

  /**ゲームオーバー時の処理
   * 
   */
  private doGameOver(): void {
    this.sound.add(AudioAsset.sceneFinish.getKey()).play();
    this.GameOver = true;
    this.flyDistanceText.setColor("red");
    this.flyDistanceText.setScale(2);
    //オブジェクトを削除
    for (let enemy of this.enemise) {
      enemy.enemy.getEnemy().destroy();
    }
    this.enemise = [];
    for (let wind of this.winds) {
      wind.wind.getImage().destroy();
    }
    this.winds = [];
    this.player.anims.stop();
    this.player.setFrame(3);
    this.scene.pause();

    //ランキング判定
    let resCsv: string[][] = CsvAsset.readCsv();
    
    //3位
    if (Number.parseFloat(resCsv[1][2]) < this.flyDistance) {
      this.rankin = 1;
    }
    //2位
    if (Number.parseFloat(resCsv[2][2]) < this.flyDistance) {
      this.rankin = 2;
    }
    //1位
    if (Number.parseFloat(resCsv[3][2]) < this.flyDistance) {
      this.rankin = 3;
    }

    //仮実装
    alert('ランキング機能は未実装のため登録はできませんが\r\n仮の名前入力画面へ遷移します。');

    this.resultDistance = this.flyDistance;
    this.scene.launch('resultScene');
  }
}