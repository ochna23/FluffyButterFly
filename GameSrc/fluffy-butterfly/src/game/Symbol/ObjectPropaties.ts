import * as Phaser from "phaser";

/**
 * Assetの配置クラス
 * @param key ロード、呼び出す際のキー
 * @param path ファイルのパス
 */
export class Asset {
    private key!: string;
    private path!: string;

    constructor(key: string, path: string) {
        this.key = key;
        this.path = path;
    }

    /**Assetのキーを取得 */
    public getKey(): string {
        return this.key;
    }
    /**Assetのパスを取得 */
    public getPath(): string {
        return this.path;
    }

}

/**
 * 画像Asset管理用一覧
 */
export class ImageAssets {
    //imageフォルダパス
    private static folderPath: string = "./assets/image/";

    //敵
    /**鳥：青 */
    public static bird_blue: Asset = new Asset("bird_blue", this.folderPath + "bird_blue.png");
    /**鳥：ピンク */
    public static bird_pink: Asset = new Asset("bird_pink", this.folderPath + "bird_pink.png");
    /**鳥：カラス */
    public static bird_crow: Asset = new Asset("bird_crow", this.folderPath + "crow.png");

    /**風：イメージ */
    public static wind: Asset = new Asset("wind", this.folderPath + "wind.png");

    //背景
    /**昼背景：空 */
    public static noon: Asset = new Asset("noon", this.folderPath + "noon.png");
    /**昼背景：町 */
    public static noonTown: Asset = new Asset("noonTown", this.folderPath + "noonTown.png");
    /**夕背景：空 */
    public static evening: Asset = new Asset("evening", this.folderPath + "evening.png");
    /**夕背景：町 */
    public static eveningTown: Asset = new Asset("eveningTown", this.folderPath + "eveningTown.png");
    /**夜背景：空 */
    public static night: Asset = new Asset("night", this.folderPath + "night.png");
    /**夜背景：町 */
    public static nightTown: Asset = new Asset("nightTown", this.folderPath + "nightTown.png");

    /** 地面 */
    public static ground: Asset = new Asset("ground", this.folderPath + "tile.png");
    /** 地面：当たり判定 */
    public static platform: Asset = new Asset("platform", this.folderPath + "cleaerPlatform.png");

    /** タイトルロゴ　*/
    public static titleLogo: Asset = new Asset("titleLogo", this.folderPath + "titleLogo.png");
    /** スタートロゴ */
    public static startLogo: Asset = new Asset("startLogo", this.folderPath + "startLogo.png");

    //コンソール
    public static keyBoardChars: Asset[] = [
        new Asset("A", this.folderPath + "/abc/a.png"),
        new Asset("B", this.folderPath + "/abc/b.png"),
        new Asset("C", this.folderPath + "/abc/c.png"),
        new Asset("D", this.folderPath + "/abc/d.png"),
        new Asset("E", this.folderPath + "/abc/e.png"),
        new Asset("F", this.folderPath + "/abc/f.png"),
        new Asset("G", this.folderPath + "/abc/g.png"),
        new Asset("H", this.folderPath + "/abc/h.png"),
        new Asset("I", this.folderPath + "/abc/i.png"),
        new Asset("J", this.folderPath + "/abc/j.png"),
        new Asset("K", this.folderPath + "/abc/k.png"),
        new Asset("L", this.folderPath + "/abc/l.png"),
        new Asset("M", this.folderPath + "/abc/m.png"),
        new Asset("N", this.folderPath + "/abc/n.png"),
        new Asset("O", this.folderPath + "/abc/o.png"),
        new Asset("P", this.folderPath + "/abc/p.png"),
        new Asset("Q", this.folderPath + "/abc/q.png"),
        new Asset("R", this.folderPath + "/abc/r.png"),
        new Asset("S", this.folderPath + "/abc/s.png"),
        new Asset("T", this.folderPath + "/abc/t.png"),
        new Asset("U", this.folderPath + "/abc/u.png"),
        new Asset("V", this.folderPath + "/abc/v.png"),
        new Asset("W", this.folderPath + "/abc/w.png"),
        new Asset("X", this.folderPath + "/abc/x.png"),
        new Asset("Y", this.folderPath + "/abc/y.png"),
        new Asset("Z", this.folderPath + "/abc/z.png"),
        new Asset("!", this.folderPath + "/abc/!.png"),
        new Asset("?", this.folderPath + "/abc/question.png"),
    ];

    //戻るキー
    public static backKey = new Asset("backKey", this.folderPath + "/abc/back.png")
    //決定キー
    public static enterKey = new Asset("enterKey", this.folderPath + "/abc/enter.png")

    //ランキングボード
    public static rankingBoard: Asset = new Asset("rankingBoard", this.folderPath + "rankingBoard.png");
    public static rankingNo1: Asset = new Asset("rankingNo1", this.folderPath + "rankingNo1.png");
    public static rankingNo2: Asset = new Asset("rankingNo2", this.folderPath + "rankingNo2.png");
    public static rankingNo3: Asset = new Asset("rankingNo3", this.folderPath + "rankingNo3.png");

    //ランク用表示下地花
    public static rankingFlower: Asset = new Asset("rankingFlower", this.folderPath + "rankFlower.png");

    //マニュアル
    public static manual1: Asset = new Asset("manual1", this.folderPath + "manual1.png");
    public static manual2: Asset = new Asset("manual2", this.folderPath + "manual2.png");
    public static manual3: Asset = new Asset("manual3", this.folderPath + "manual3.png");
    public static manual4: Asset = new Asset("manual4", this.folderPath + "manual4.png");


    //矢印
    public static leftAllow: Asset = new Asset("left", this.folderPath + "left.png");
    public static rightAllow: Asset = new Asset("right", this.folderPath + "right.png");
    //デバッグ
    public static deb1: Asset = new Asset("deb1", this.folderPath + "debug/debug_1.png");
    public static deb2: Asset = new Asset("deb2", this.folderPath + "debug/debug_2.png");
    public static deb3: Asset = new Asset("deb3", this.folderPath + "debug/debug_3.png");
}

/**
 * spriteAsset管理用一覧
 * 画像サイズは60x60固定
 * サイズはgame画面で設定
 */
export class SpriteAssets {
    //spriteフォルダパス
    private static folderPath: string = "./assets/sprite/";

    /**蝶々*/
    public static butterfly: Asset = new Asset("butterfly", this.folderPath + "butterflySprite.png")

    /**タッチ*/
    public static flower: Asset = new Asset("flower", this.folderPath + "FlowerSplite.png");

    /**下線*/
    public static underBar: Asset = new Asset("underBar", this.folderPath + "underbarSplite.png");
}
/**
 * audioAssetの管理用一覧
 *  
*/
export class AudioAsset {
    //Audioフォルダパス
    private static folderPath: string = "./assets/audio/";

    /**鳥のヒット音 */
    public static birdVoice: Asset = new Asset("birdVoice", this.folderPath + "birdVoice.mp3");
    /**カラスのヒット音 */
    public static crowVoice: Asset = new Asset("crowVoice", this.folderPath + "crowVoice.mp3");
    /**風の音 */
    public static windSound: Asset = new Asset("wind", this.folderPath + "windSound.mp3");
    /**羽ばたき */
    public static flySound: Asset = new Asset("flySound", this.folderPath + "flySound.mp3");

    /**BGM */
    public static bgm:Asset = new Asset("bgm",this.folderPath+"bgm.mp3");
    /**シーン転換音 */
    public static sceneFinish:Asset = new Asset("sceneFinish",this.folderPath +"gamefinish.mp3");

    /**キー入力 */
    public static inputKey:Asset = new Asset("inputKey",this.folderPath+"input.mp3");
    public static enterKey:Asset = new Asset("enterKey",this.folderPath+ "enter.mp3");
    public static backKey:Asset = new Asset("backKey",this.folderPath+"back.mp3");
}

/**
 * 敵（鳥の抽象クラス）
 */
export abstract class Enemy {
    //イメージ本体
    private enemy !: Phaser.Physics.Arcade.Image;
    //ヒット時音声
    private hitSoundKey!: string;
    //ヒットフラグ
    private hitFlg!: boolean;



    constructor(image: Phaser.Physics.Arcade.Image) {
        //イメージ本体
        this.enemy = image;
        //サイズ
        this.getEnemy().setDisplaySize(30, 30);
        this.getEnemy().setOrigin(1 / 2, 1 / 2);
        this.hitFlg = false;
    }

    //移動
    public abstract move(): void;

    //本体を取得
    public getEnemy(): Phaser.Physics.Arcade.Image {
        return this.enemy;
    }
    //ヒット時音声取得
    public getHitSoundKey() {
        return this.hitSoundKey;
    }
    //ヒット時音声設定
    public setHitSoundKey(hitkey: string) {
        this.hitSoundKey = hitkey;
    }
    //ヒット時フラグ取得
    public getHitFlg() {
        return this.hitFlg;
    }
    //ヒットフラグ設定
    public setHitFlg(flg: boolean) {
        this.hitFlg = flg;
    }
}

/**敵・青い鳥*/
export class BirdBlue extends Enemy {

    constructor(image: Phaser.Physics.Arcade.Image) {
        super(image);
        //ヒット時：鳥の鳴き声
        this.setHitSoundKey(AudioAsset.birdVoice.getKey());
    }

    /**
     * 横に直線移動
     */
    public move(): void {
        this.getEnemy().setVelocityX(-150);
    }
}

/**
 * 敵・ピンク鳥
 * 
*/
export class BirdPink extends Enemy {
    //上昇フラグ:trueで上昇
    private velecityUpFlg: boolean;
    //上昇量
    private velecityYvalue!: number;
    //上昇量追加（波用）
    private velecityYglow: number = 1;

    //画面サイズ
    private width!: number;
    private height!: number;

    //コンストラクタ
    constructor(image: Phaser.Physics.Arcade.Image, width: number, height: number, platform: Phaser.Physics.Arcade.StaticGroup) {
        super(image);

        //初期値設定
        this.width = width;
        this.height = height;

        let rand: number = Math.floor(Math.random() * 2);
        if (rand === 1) {
            this.velecityUpFlg = true;
        } else {
            this.velecityUpFlg = false;
        }
        this.velecityYvalue = 0;

        //ヒット時：鳥の鳴き声
        this.setHitSoundKey(AudioAsset.birdVoice.getKey());



    }

    /**
     * 上下に波移動
    */
    public move(): void {
        //移動：フレーム50
        this.getEnemy().setVelocityX(-100);
        if (this.velecityUpFlg) {
            //上向きに
            if (this.getEnemy().angle <= 45) {
                this.getEnemy().setAngle(this.getEnemy().angle + 0.3);
            }
            this.getEnemy().setVelocityY(-this.velecityYvalue);
        } else {
            //下向きに
            if (this.getEnemy().angle > -90 || this.getEnemy().y <= 0) {
                this.getEnemy().setAngle(this.getEnemy().angle - 0.3);
            }
            this.getEnemy().setVelocityY(this.velecityYvalue);
        }


        //上下フラグ
        if (this.getEnemy().angle >= 45) {
            this.velecityUpFlg = false;
            this.velecityYvalue = 0;
        } else if (this.getEnemy().angle <= -45) {
            this.velecityUpFlg = true;
            this.velecityYvalue = 0;
        }
        this.velecityYvalue += this.velecityYglow;
    }
}

/**敵・カラス*/
export class BirdCrow extends Enemy {

    //座標情報
    private startX!: number;
    private startY!: number;
    private player!: Phaser.Physics.Arcade.Sprite

    //突撃フラグ
    private goFlg!: boolean;
    //上昇下降制御
    private upFlg: boolean = false;
    private atAngle!: number;


    constructor(image: Phaser.Physics.Arcade.Image, startX: number, startY: number, palyer: Phaser.Physics.Arcade.Sprite) {
        super(image);

        this.getEnemy().setDisplaySize(30, 30);
        //パラメータ
        this.startX = startX;
        this.startY = startY;
        this.player = palyer;
        this.atAngle = 0;

        //ヒット時：カラス
        this.setHitSoundKey(AudioAsset.crowVoice.getKey());
    }

    /**
     * 出現後ランダム位置からプレイヤー目掛けて狙撃
     */
    public move(): void {
        //横加速
        let speed: number = 150;

        if (!this.goFlg) {
            if (this.getEnemy().y < this.startY) {
                //角度計算
                let angleRadian: number = Math.atan2(this.getEnemy().y - this.player.y, this.getEnemy().x - this.player.x);
                this.getEnemy().setAngle(angleRadian * (180 / Math.PI));//角度angleに成形
                this.getEnemy().setVelocityY(50);
            }
            else {
                //突撃角度
                this.atAngle = Math.abs(this.getEnemy().y - this.player.y) / Math.abs(this.getEnemy().x - this.player.x);
                //突撃フラグ制御
                this.goFlg = true;
                if (this.getEnemy().y < this.player.y) {
                    this.upFlg = true;
                } else {
                    this.upFlg = false;
                }
            }
        } else {
            //突撃
            this.getEnemy().setVelocityX(-speed);
            if (this.upFlg) {
                this.getEnemy().setVelocityY(this.atAngle * speed);
            } else {
                this.getEnemy().setVelocityY(-this.atAngle * speed);
            }

        }
    }
}

/**風*/
export class Wind {

    //イメージ本体
    private image !: Phaser.Physics.Arcade.Image;
    //ヒット時音声
    private hitSoundKey!: string;
    //ヒットフラグ
    private hitFlg!: boolean;

    constructor(image: Phaser.Physics.Arcade.Image) {
        //イメージ本体
        this.image = image;
        //サイズ
        this.image.setDisplaySize(30, 30);
        this.hitFlg = false;
        //取得音声
        this.hitSoundKey = AudioAsset.windSound.getKey();

    }

    //移動
    public move(): void {
        this.getImage().setVelocityX(100);
    }

    //本体を取得
    public getImage(): Phaser.Physics.Arcade.Image {
        return this.image;
    }
    //ヒット時音声取得
    public getHitSoundKey() {
        return this.hitSoundKey;
    }
    //ヒット時音声設定
    public setHitSoundKey(hitkey: string) {
        this.hitSoundKey = hitkey;
    }
    //ヒット時フラグ取得
    public getHitFlg() {
        return this.hitFlg;
    }
    //ヒットフラグ設定
    public setHitFlg(flg: boolean) {
        this.hitFlg = flg;
    }
}

/**
 * CSVデータの読み込みと書き込みが出来る
 */
export class CsvAsset {
    /**CSVファイルのパス */
    private static csvPath: string = "./assets/CSV/rank.csv";

    /**
     * CSVの内容取得
     * 0:名前
     * 1:距離
     */
    public static readCsv(): string[][] {
        let resCsv: string[][] = [];
        // CSVファイルを取得
        let csv = new XMLHttpRequest();

        // CSVファイルへのパス
        csv.open("GET", this.csvPath, false);

        // csvファイル読み込み失敗時のエラー対応
        try {
            csv.send(null);
        } catch (err) {
            console.log(err);
        }

        // 配列を定義
        let lineArray: string[] = [];

        // 改行ごと分解
        let lines = csv.responseText;
        // 1行ごとに処理
        let line: string = ""
        for (let oneline of lines) {
            if (oneline === "\n") {
                if (line.length !== 0) {
                    lineArray.push(line);
                }
                line = ""
            } else if (oneline === "\r") {
                if (line.length !== 0) {
                    lineArray.push(line);
                }
                line = ""
            } else {
                line += oneline;
            }
        }
        if (line.length !== 0) {
            lineArray.push(line);
        }

        //,ごとに分解

        for (let date of lineArray) {
            let dateArray: string[] = [];
            let dateColom: string = "";
            for (let char1 of date) {
                if (char1 === ",") {
                    dateArray.push(dateColom);
                    dateColom = "";
                } else {
                    dateColom += char1;
                }
            }
            if (dateColom.length !== 0) {
                dateArray.push(dateColom);
            }
            resCsv.push(dateArray);
        }

        return resCsv;
    }
}