'use strict';

{
  class Panel {
    /**
     * コンストラクタ
     * @param {Game} game
     */
    constructor(game) {
      this.game = game;
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        this.check();
      });
    }

    /**
     * el要素を返すゲッター
     */
    getEl() {
      return this.el
    }

    /**
     * 数値ボックスに表示する番号を引数にとり、押せるように表示を変更する
     * @param {number} num 
     */
    activate(num) {
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }

    /**
     * 押されたボタンが現在押すべきボタンかどうかチェックする
     */
    check() {
      // perseInt(strign, 基数)
      if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
        this.el.classList.add('pressed');
        this.game.addCurrentNum();

        // 数値パネルが全て押し込まれたらタイマーを止める
        if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }
  }

  class Board {
    /**
     * コンストラクタ。数値パネルの生成、
     * @param {Game} game
     */
    constructor(game) {
      this.game = game;
      /**
       * 数値パネルの配列
       * @type Panel[]
       */
      this.panels = [];
      // 数値パネルの生成
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        this.panels.push(new Panel(this.game));
      }
      this.setup();
    }

    /**
     * 数値パネルを#board要素に追加する
     */
    setup() {
      const board = document.getElementById('board');
      this.panels.forEach(panel => {
        board.appendChild(panel.getEl()); // カプセル化、直接、他のクラスの要素にアクセスさせないようにする
      });
    }

    /**
     * 全ての数値ボックスを押せるように設定する
     */
    activate() {
      // 数値ボックスに振る番号（決め打ち）
      const nums = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        nums.push(i);
      }

      // 数値ボックスに重複なくランダムに番号を振る
      this.panels.forEach(panel => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      });
    }
  }

  
  
  class Game {
    constructor(level) {
      this.level = level;
      /**
       * board要素
       * @type Board
       */
      this.board = new Board(this);
      
      /**
       * 現在押すべきボタンの番号を保持
       * @type number
       */
      this.currentNum = undefined;
      
      /**
       * タイマーを開始した時刻
       * @type number
       */
      this.startTime = undefined;
      
      /**
       * タイムアウトid
       * @type number
       */
      this.timeoutId = undefined;
      
      /**
       * ボタン要素
       * @type HTMLElement
       */
      const btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        this.start();
      });

      this.setup();
    }
    
    /**
     * 画面表示にて、レベルに応じて横幅を計算して表示する
     */
    setup() {
      const container = document.getElementById('container');
      const PANEL_WIDTH = 50;
      const BOARD_PADDING = 10;
      /* 50px * 2 + 10px * 2 */
      // style.width には ’px’をつけて文字列として値を渡す
      container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
    }
    /**
     * タイマーの初期化、ゲームの初期化
     */
    start() {
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
      }
      this.currentNum = 0;
      this.board.activate();
      
      this.startTime = Date.now();
      this.runTimer();
    }

    /**
     * タイマーを開始する
     */
    runTimer() {
      /**
       * タイマー要素の取得
       * @type HTMLElement
       */
      const timer = document.getElementById('timer');
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }

    /**
     * 現在の押すべき数値パネル番号をインクリメントする
     */
    addCurrentNum() {
      this.currentNum++;
    }

    /**
     * 現在の押すべき数値パネル番号を取得する
     * @return number
     */
    getCurrentNum() {
      return this.currentNum;
    }

    /**
     * タイムアウトIDを取得する
     * @return number
     */
    getTimeoutId() {
      return this.timeoutId;
    }

    /**
     * ゲームのレベルを取得する
     * @return number
     */
    getLevel() {
      return this.level;
    }
  }


  /**
   * ゲームクラスを生成
   * @type Game
   */
  new Game(5);
}
