import { CSSProperties, useEffect } from 'react';
import 'phaser'
import MainScene from './game/main';
import 'phaser/plugins/spine/dist/SpinePlugin'

// Phaserの設定
const config: Phaser.Types.Core.GameConfig = {
  width:480,
  height: 480,
  type: Phaser.AUTO,
  pixelArt: false,
  backgroundColor: "87cefa",
  

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_VERTICALLY,
    parent: 'game',
    fullscreenTarget: 'game'
  },

  

  // ここで読み込むシーンを取得する
  // 今回は軽いテストなので、MainSceneのみ
  scene: [MainScene],

  plugins: {
    scene: [
    ]
  },

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 50},
      debug: false
    },
  },
};

/**
 * PhaserのGameを生成するためのクラス
 */
class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

/**
 * ゲームを描写するDivコンポーネント
 */
const App: React.FC<{ className?: string }> = ({ className }) => {
  // お手軽にCSSの設定（フルスクリーンで、Canvasを中央寄せにする）
  const style: CSSProperties = {
    width: "100%",
    height: "100%"
  }

  // 画面の発描写時に実行する
  // 画面の終了時にはGameをDestroyする
  useEffect(() => {
    const g = new Game(config)
    return () => {
      g?.destroy(true)
    }
  }, []);

  // canvasをAppendするdivコンポーネント
  return (
    <div id="App" className={className} style={style}>
    </div >
  )
}

export default App;