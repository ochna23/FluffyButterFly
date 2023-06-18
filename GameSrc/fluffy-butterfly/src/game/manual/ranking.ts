import 'phaser'
import * as Phaser from "phaser";
import { CsvAsset, ImageAssets } from '../Symbol/ObjectPropaties';
import { Asset } from '../Symbol/ObjectPropaties';

/**
 * マニュアルシーン
 * 各要素の読み込み
 * スタートシーンへの遷移を行う
 */
export class Ranking extends Phaser.Scene {
  private board!:Phaser.GameObjects.Image;
  private board1!:Phaser.GameObjects.Image;
  private board2!:Phaser.GameObjects.Image;
  private board3!:Phaser.GameObjects.Image;
  private No1!:Phaser.GameObjects.Text;
  private No2!:Phaser.GameObjects.Text;
  private No3!:Phaser.GameObjects.Text;

  //画面サイズ
　private width!:number;
　private height!:number;
  private top!:number;
  private left!:number;
  private bottom!:number;
  private right!:number;

  
  constructor() {
    super({
      key: 'rankingScene',
    })
  }

  /**
   * 初期処理
   */
  init(): void {
    //ウィンドウサイズ
    const { width, height } = this.game.canvas;
    this.width = width*0.4;
    this.height = height*0.25;
    this.top = height*0.75;
    this.left = width*0.6;
    this.bottom = height;
    this.right = width;
  }

  /**
   * アセットデータ読込などを行う処理
   */
  preload(): void {
    alert("ランキング機能は仮実装のため"
    +"仮配置したＣＳＶファイルを読み込んでいます")

    //ランキングボード
    this.assetsLoad(ImageAssets.rankingBoard);
    this.assetsLoad(ImageAssets.rankingNo1);
    this.assetsLoad(ImageAssets.rankingNo2);
    this.assetsLoad(ImageAssets.rankingNo3);
  }

  /**
   * ゲーム画面の作成処理やイベントアクションを記述する処理
   */
  create(): void {
    this.board = this.add.image(this.left,this.top,ImageAssets.rankingBoard.getKey());
    this.board.setDisplaySize(this.width,this.height);
    this.board.setDisplayOrigin(0,0); 

    this.board1 = this.add.image(this.left+this.width/2,this.top+this.height/4,ImageAssets.rankingNo1.getKey());
    this.board1.setOrigin(0.5,0.5);
    this.board1.setDisplaySize(this.width,this.height/3);
    this.No1 = this.add.text(this.left+this.width/2,this.top+this.height/4,"1", {fontSize: 30,fontFamily: "Arial"});
    this.No1.setOrigin(0.5,0.5);
    this.No1.setDisplaySize(this.width/22,this.height/10);
    this.No1.setColor("white");

    this.board2 = this.add.image(this.left+this.width/2,this.top+this.height/2,ImageAssets.rankingNo2.getKey());
    this.board2.setOrigin(0.5,0.5);
    this.board2.setDisplaySize(this.width,this.height/3);
    this.No2 = this.add.text(this.left+this.width/2,this.top+this.height/2,"2",{fontSize: 30,fontFamily: "Arial"});
    this.No2.setOrigin(0.5,0.5);
    this.No2.setDisplaySize(this.width/22,this.height/10);
    this.No2.setColor("white");

    this.board3 = this.add.image(this.left+this.width/2,this.top+this.height/4*3,ImageAssets.rankingNo3.getKey());
    this.board3.setOrigin(0.5,0.5);
    this.board3.setDisplaySize(this.width,this.height/3);
    this.No3 = this.add.text(this.left+this.width/2,this.top+this.height/4*3,"3",{fontSize: 30,fontFamily: "Arial"});
    this.No3.setOrigin(0.5,0.5);
    this.No3.setDisplaySize(this.width/22,this.height/10);
    this.No3.setColor("white");
  }

  update(): void {
    this.getCsv();
  }

  /**assetを読み込む
   * @param asset　image:ImageAssets,sound:sounAssetsから参照
   *
   */
  private assetsLoad(asset:Asset):void{
    var assetType:string = asset.getPath().substring(9,11);
    if(assetType==="im"){
      this.load.image(asset.getKey(),asset.getPath());
    }else if(assetType==="au"){
      this.load.audio(asset.getKey(),asset.getPath());
    }
  }

  /**
   * csvデータの取得
   * Asset/CSV内のデータを読み込む
  */
 private getCsv():void{
  let resCsv:string[][] =CsvAsset.readCsv();

   this.No1.setText("1. "+resCsv[1][1] + " "+resCsv[1][2]+"Km");
   this.No2.setText("2. "+resCsv[2][1] + " "+resCsv[2][2]+"Km");
   this.No3.setText("3. "+resCsv[3][1] + " "+resCsv[3][2]+"Km");
 }
}