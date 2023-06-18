import 'phaser'
import * as Phaser from "phaser";
import { Title } from "./Scenes/title";
import { Game } from "./Scenes/game";
import { Result } from "./Scenes/result";
import { Asset, AudioAsset, SpriteAssets } from './Symbol/ObjectPropaties';
import { ImageAssets } from './Symbol/ObjectPropaties';
import { Manual } from './manual/manual';
import { Ranking } from './manual/ranking';
import { GameOver } from './Scenes/gameover';


/**
 * メインシーン
 * 各要素の読み込み
 * スタートシーンへの遷移を行う
 */
class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Main',
    })
  }

  //メインエリア
  private mainScene!:Phaser.Scene;
  //操作方法エリア
  private manualScene!:Phaser.Scene;
  //ランキングエリア
  private rankingScene!:Phaser.Scene;

  /**
   * 初期処理
   */
  init(): void {
    console.log("データを読み込んでいます");
  }

  /**
   * アセットデータ読込などを行う処理
   */
  preload(): void {
    //背景
    //昼
    this.assetsLoad(ImageAssets.noon);
    this.assetsLoad(ImageAssets.noonTown);
    //夕
    this.assetsLoad(ImageAssets.evening);
    this.assetsLoad(ImageAssets.eveningTown);
    //夜
    this.assetsLoad(ImageAssets.night);
    this.assetsLoad(ImageAssets.nightTown);
    //地面
    this.assetsLoad(ImageAssets.ground);
    this.assetsLoad(ImageAssets.platform);
    //オブジェクト
    //プレイヤー
    this.assetsLoad(SpriteAssets.butterfly);
    //飛行音
    this.assetsLoad(AudioAsset.flySound);
    //敵
    //青鳥
    this.assetsLoad(ImageAssets.bird_blue);
    this.assetsLoad(ImageAssets.bird_pink);
    this.assetsLoad(ImageAssets.bird_crow);
    //ヒット音
    this.assetsLoad(AudioAsset.birdVoice);
    this.assetsLoad(AudioAsset.crowVoice);

    //風
    this.assetsLoad(ImageAssets.wind);
    this.assetsLoad(AudioAsset.windSound);

    //タイトルロゴ
    this.assetsLoad(ImageAssets.titleLogo);
    //スタートロゴ
    this.assetsLoad(ImageAssets.startLogo);

    //ランク結果表示
    this.assetsLoad(ImageAssets.rankingFlower);

    //キーボード
    for(let asset of ImageAssets.keyBoardChars){
      this.assetsLoad(asset);
    }
    this.assetsLoad(AudioAsset.inputKey);
    //〇キー
    this.assetsLoad(ImageAssets.enterKey);
    this.assetsLoad(AudioAsset.enterKey);
    //戻るキー
    this.assetsLoad(ImageAssets.backKey);
    this.assetsLoad(AudioAsset.backKey);
    //アンダーバー
    this.assetsLoad(SpriteAssets.underBar);


    /**タッチ */
    this.assetsLoad(SpriteAssets.flower);

    /**bgm */
    this.assetsLoad(AudioAsset.bgm);
    this.assetsLoad(AudioAsset.sceneFinish);
  }

  /**
   * ゲーム画面の作成処理やイベントアクションを記述する処理
   */
  create(): void {
    this.add.text(this.game.canvas.width,this.game.canvas.height,"loading now").setOrigin(1,1);

        // シーンにキーを割り振って登録
        this.scene.add("titleScene", Title,false);//タイトル
        this.scene.add("gameScene", Game, false);//ゲーム
        this.scene.add("resultScene",Result,false);//リザルト

        this.scene.add("manualScene",Manual,false);
        this.scene.add("rankingScene",Ranking,false);
        this.scene.add("gameoverScene",GameOver,false);
        
        this.scene.launch("titleScene");
        this.scene.launch("manualScene");
        this.scene.launch("rankingScene");
  }

  /**assetを読み込む
   * @param asset　image:ImageAssets,sound:sounAssetsから参照
   *
   */
  private assetsLoad(asset:Asset):void{
    var assetType:string = asset.getPath().substring(9,11);
    if(assetType==="im"){
      this.load.image(asset.getKey(),asset.getPath());
    }else if(assetType==="sp"){
      this.load.spritesheet(asset.getKey(),asset.getPath(),{frameWidth:60,frameHeight:60});
    }else if(assetType==="au"){
      this.load.audio(asset.getKey(),asset.getPath());
    }
  }
}

export default MainScene