/* src/scenes/game.ts */

import * as Phaser from "phaser";
import { AudioAsset, CsvAsset, ImageAssets, SpriteAssets } from "../Symbol/ObjectPropaties";
import { Game } from "./game";


/**仮実装：サーバー等整えたら使用予定
 * ：Asset上にある仮のCSVファイルに書き込む
 */
export class Result extends Phaser.Scene {
  //画面サイズ
  private gameWidth!: number;
  private gameHeight!: number;

  //キーボード
  private board!: Phaser.GameObjects.Image;
  private keyChars!: Phaser.GameObjects.Image[];

  //ゲーム結果
  private gameScene!: Game;

  //選択文字表示
  private underBar!: Phaser.GameObjects.Sprite[];
  private inputIndex!: number;
  private selectChar!: Phaser.GameObjects.Image[];
  private name!: string[];

  /**飛距離*/
  public getDistance!:string;
  /**ユーザー名*/
  public getName!:string[];

  //アンダーバー
  private underSelectAnims: { key: string, frameStart: number, frameEnd: number } = { key: 'inputNow', frameStart: 0, frameEnd: 1 };
  private animConfig(config: { key: string, frameStart: number, frameEnd: number }): Phaser.Types.Animations.Animation {
    return {
      key: config.key,
      frames: this.anims.generateFrameNumbers(
        SpriteAssets.underBar.getKey(),
        {
          start: config.frameStart,
          end: config.frameEnd
        }
      ),
      frameRate: 4,
      repeat: -1
    }
  }

  constructor() {
    super({
      key: 'resultScene',
    })
  }

  init() {
    const { width, height } = this.game.canvas;
    this.gameWidth = width;
    this.gameHeight = height * 0.75;

    //入力
    this.keyChars = [];

    //選択文字
    this.underBar = [];
    this.inputIndex = 0;
    this.selectChar = [];
    this.name = [];

    this.gameScene = this.scene.get("gameScene") as Game;
  }

  create() {
    let rankFlower: Phaser.GameObjects.Image = this.add.image(0, 0, ImageAssets.rankingFlower.getKey()).setDisplaySize(60, 60);
    rankFlower.setDisplayOrigin(0, 0);
    let flyDistance: Phaser.GameObjects.Text = this.add.text(0, 0, this.gameScene.rankin.toString(), { fontSize: 90, fontFamily: "Arial" }).setDisplaySize(60, 60);
    flyDistance.setDisplayOrigin(0, 0);
    //順位
    if (this.gameScene.rankin <= 4) {
      this.add.text(0, this.gameHeight / 13 * 3, "名前を入力してください!!", { fontSize: 15, fontFamily: "Arial" });
      //下地
      this.board = this.add.image(this.gameWidth / 2, this.gameHeight / 3 * 2, ImageAssets.rankingBoard.getKey());
      //キーボード
      let keyXPosition: number = 0;
      let keyYPosition: number = this.board.height;
      for (let i = 0; i < ImageAssets.keyBoardChars.length; i++) {
        let char1: Phaser.GameObjects.Image = this.add.image(keyXPosition += this.board.width / 9, keyYPosition, ImageAssets.keyBoardChars[i].getKey());
        char1.setDisplaySize(30, 30);
        char1.setInteractive();
        char1.on("pointerdown", () => {
          //キーボード入力時の処理を追加
          if (this.inputIndex < 8) {
            this.sound.add(AudioAsset.inputKey.getKey()).play();
            this.inputIndex += 1;
            this.name.push(ImageAssets.keyBoardChars[i].getKey());
            //文字表示
            let displayChar: Phaser.GameObjects.Image = this.add.image(this.gameWidth / 10 * this.inputIndex + 1, this.gameHeight / 13 * 4, ImageAssets.keyBoardChars[i].getKey());
            displayChar.setDisplaySize(30, 30);
            this.selectChar.push(displayChar);
          }
          console.log(this.name);
        }
        )
        this.keyChars.push(char1);

        //配置用パラメータ
        if ((i !== 0 && i % 7 === 6)) {
          keyXPosition = 0;
          keyYPosition += this.board.height / 5
        }
      }

      //決定キー
      let enterKey = this.add.image(keyXPosition += this.board.width / 9 * 8, keyYPosition -= this.board.height / 5 * 2, ImageAssets.enterKey.getKey());
      enterKey.setDisplaySize(30, 30);
      enterKey.setInteractive();
      enterKey.on("pointerdown", () => {
        //入力音
        this.sound.add(AudioAsset.enterKey.getKey()).play();

        //飛距離
        this.getDistance = this.gameScene.resultDistance.toString();
        //ユーザー名
        this.getName = this.name;

        this.gameScene.scene.stop();
        this.scene.launch("gameoverScene");

        
      });

      //戻るキー
      let backKey = this.add.image(keyXPosition, keyYPosition += this.board.height / 5, ImageAssets.backKey.getKey());
      backKey.setDisplaySize(30, 30);
      backKey.setInteractive();
      backKey.on("pointerdown", () => {
        if (this.inputIndex > 0) {
          //入力音
          this.sound.add(AudioAsset.backKey.getKey()).play();
          this.selectChar[this.inputIndex - 1].destroy();
          this.selectChar.splice(this.inputIndex - 1, 1);
          this.name.splice(this.inputIndex - 1, 1);
          this.inputIndex--;
        }

      });

      //バックスペース
      //アンダーバー
      this.anims.create(this.animConfig(this.underSelectAnims));

      for (let i = 1; i <= 8; i++) {
        let oneBar: Phaser.GameObjects.Sprite = this.add.sprite(this.gameWidth / 10 * i, this.gameHeight / 3, SpriteAssets.underBar.getKey());
        oneBar.setDisplaySize(30, 30);
        this.underBar.push(oneBar);
      }
    } else {
      this.gameScene.scene.launch("gameoverScene");
      this.scene.stop();
    }
  }

  update(): void {
    for (let i = 0; i < this.underBar.length; i++) {
      if (i === this.inputIndex) {
        if (!this.underBar[i].anims.isPlaying) {
          this.underBar[i].anims.play("inputNow");
        }
      } else {
        this.underBar[i].anims.stop();
        this.underBar[i].setFrame(0);
      }
    }
  }
}