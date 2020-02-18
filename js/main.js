'use strict';

{
  class Panel {
    /**
     * コンストラクタ
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
      if (currentNum === parseInt(this.el.textContent, 10)) {
        this.el.classList.add('pressed');
        currentNum++;

        // 数値パネルが全て押し込まれたらタイマーを止める
        if (currentNum === 4) {
          clearTimeout(timeoutId);
        }
      }
    }
  }

  class Board {
    /**
     * コンストラクタ。数値パネルの生成、
     */
    constructor(game) {
      this.game = game;
      /**
       * 数値パネルの配列
       * @type Panel[]
       */
      this.panels = [];
      // 数値パネルの生成
      for (let i = 0; i < 4; i++) {
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
      const nums = [0, 1, 2, 3];

      // 数値ボックスに重複なくランダムに番号を振る
      this.panels.forEach(panel => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      })
    }
  }

  
  
  class Game {
    constructor() {
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
      this.this.startTime = undefined;
      
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
    }
  }

  /**
   * ゲームクラスを生成
   * @type Game
   */
  const game = new Game();
}
