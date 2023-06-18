import 'phaser'
import * as Phaser from "phaser";
import { ImageAssets } from '../Symbol/ObjectPropaties';
import { Asset } from '../Symbol/ObjectPropaties';

/**
 * マニュアルシーン
 * 各要素の読み込み
 * スタートシーンへの遷移を行う
 */
export class Manual extends Phaser.Scene {
  //画面ページ
  private gamen!:Phaser.GameObjects.Image[];
  //矢印
  private leftAllow!:Phaser.GameObjects.Image;
  private rightAllow!:Phaser.GameObjects.Image;

  //画面サイズ
  　private width!:number;
  　private height!:number;
    private top!:number;
    private left!:number;
    private bottom!:number;
    private right!:number;

    //現在ページ
    private nowPage!:number;

  
  constructor() {
    super({
      key: 'manualScene',
    })
  }

  /**
   * 初期処理
   */
  init(): void {
    this.gamen = [];
    //ウィンドウサイズ
    const { width, height } = this.game.canvas;
    this.width = width*0.6;
    this.height = height*0.25;
    this.top=height*0.75;
    this.left= 0;
    this.bottom = this.height;
    this.right = this.width;

    this.nowPage = 0;

  }

  /**
   * アセットデータ読込などを行う処理
   */
  preload(): void {
    this.assetsLoad(ImageAssets.manual1);
    this.assetsLoad(ImageAssets.manual2);
    this.assetsLoad(ImageAssets.manual3);
    this.assetsLoad(ImageAssets.manual4);

    this.assetsLoad(ImageAssets.leftAllow);
    this.assetsLoad(ImageAssets.rightAllow);
  }

  /**
   * ゲーム画面の作成処理やイベントアクションを記述する処理
   */
  create(): void {
    //画面読み込み
    //操作情報
    let gamen1:Phaser.GameObjects.Image = this.add.image(0,this.top,"manual1");
    gamen1.setDisplaySize(this.width,this.height);
    gamen1.setOrigin(0,0);
    gamen1.setAlpha(1);
    let gamen2:Phaser.GameObjects.Image = this.add.image(0,this.top,"manual2");
    gamen2.setDisplaySize(this.width,this.height);
    gamen2.setOrigin(0,0);
    gamen2.setAlpha(0);
    let gamen3:Phaser.GameObjects.Image = this.add.image(0,this.top,"manual3");
    gamen3.setDisplaySize(this.width,this.height);
    gamen3.setOrigin(0,0);
    gamen3.setAlpha(0);
    let gamen4:Phaser.GameObjects.Image = this.add.image(0,this.top,"manual4");
    gamen4.setDisplaySize(this.width,this.height);
    gamen4.setOrigin(0,0);
    gamen4.setAlpha(0);  
    
    this.gamen.push(gamen1);
    this.gamen.push(gamen2);
    this.gamen.push(gamen3);
    this.gamen.push(gamen4);

    this.leftAllow = this.add.image(this.right/6*4,this.top+this.height/5,"left");
    this.leftAllow.setInteractive();
    this.leftAllow.on('pointerdown',()=>{
      if(this.nowPage>0){
        this.nowPage--;
      }
      console.log(this.nowPage);
    });
    this.leftAllow.setDisplaySize(30,30);
    this.rightAllow = this.add.image(this.right/6*5,this.top+this.height/5,"right");
    this.rightAllow.setInteractive();
    this.rightAllow.on('pointerdown',()=>{
      if(this.nowPage<3){
        this.nowPage++;
      }
      console.log(this.nowPage);
    });
    this.rightAllow.setDisplaySize(30,30);
  }

  update(): void {
    for(let i = 0;i<this.gamen.length;i++){
      if(this.nowPage===i){
        this.gamen[i].setAlpha(1);
      }else{
        this.gamen[i].setAlpha(0);
      }
    }
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
}