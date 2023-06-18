import * as Phaser from "phaser"
import { Result } from "./result";

export class GameOver extends Phaser.Scene {
  //背景
  private noon!: Phaser.GameObjects.TileSprite;

  //元画面
  private resultScene!: Result;
  //結果文
  private resultMassage!: Phaser.GameObjects.Text;

  //タイトルに戻る文
  private clickText!: Phaser.GameObjects.Text;

  //パラメーター
  //画面サイズ
  private width!: number;
  private height!: number;

  constructor() {
    super({
      key: 'gameoverScene',
    })
  }

  init(): void {
    const { width, height } = this.game.canvas;
    this.width = width;
    this.height = height * 0.75;

    //結果画面取得
    this.resultScene = this.scene.get("resultScene") as Result;
  }

  create(): void {
    //昼：
    //空
    this.noon = this.add.tileSprite(0, 0, this.width, this.height / 2, "noon");
    this.noon.setDisplaySize(this.width, this.height);
    this.noon.setDisplayOrigin(1, 0)

    this.add.text(0, 0, "GameOver", { fontSize: 90, fontFamily: "Arial" }).setDisplaySize(120, 60);

    //結果文
    let resutText: string = "";
    let distance: string = this.resultScene.getDistance.substring(0, this.resultScene.getDistance.indexOf(".") + 2);
    if (this.resultScene.getName.length === 0) {
      resutText = "シャイなあなたは " + distance + "Km 飛べました";
    } else {
      let name: string = "";
      for (let i = 0; i < this.resultScene.getName.length; i++) {
        name += this.resultScene.getName[i];
      }
      resutText = name + "さんは " + distance + "Km 飛べました";
    }

    this.resultMassage = this.add.text(this.width / 2, this.height * 4 / 5, resutText, { fontSize: 25, fontFamily: "Arial" });
    this.resultMassage.setOrigin(0.5, 1);
    this.resultMassage.setAlpha(0);

    //タイトルに戻る画面
    this.clickText = this.add.text(this.width / 2, this.height, "画面クリックでタイトルに戻ります", { fontSize: 15, fontFamily: "Arial" });
    this.clickText.setOrigin(0.5, 1);
    this.clickText.setAlpha(0);

  }

  update(): void {
    //雲を動かす
    this.noon.tilePositionX += 0.01;

    //リサルトメッセージ
    if (this.resultMassage.alpha < 1) {
      this.resultMassage.alpha += 0.01;
    } else {
      this.clickText.alpha += 0.01;
    }

    if (this.input.activePointer!.isDown) {
      let pointX: number = this.input.activePointer.x;
      let pointY: number = this.input.activePointer.y;
      //画面内
      if ((pointX > 0
        && pointX < this.width)
        && (pointY > 0
          && pointY < this.height)) {
        //タイトルに戻る
        if (this.clickText.alpha >= 1) {
          this.resultScene.scene.stop();
          this.scene.get("gameScene").sound.stopAll();
          this.scene.get("gameScene").scene.stop();
          this.scene.start("titleScene");
        }
      }
    }
  }


}