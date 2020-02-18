'use strict';

{
  class Panel {
    /**
     * コンストラクタ
     */
    constructor() {
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
    }

    /**
     * el要素を返すゲッター
     */
    getEl() {
      return this.el
    }

    activate(num) {
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }
  }

  class Board {
    /**
     * コンストラクタ。数値パネルの生成、
     */
    constructor() {
      /**
       * 数値パネルの配列
       * @type Panel[]
       */
      this.panels = [];
      // 数値パネルの生成
      for (let i = 0; i < 4; i++) {
        this.panels.push(new Panel());
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

    activate() {
      this.panels.forEach(panel => {
        panel.activate(0);
      })
    }
  }

  /**
   * board要素
   * @type Board
   */
  const board = new Board();

  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
    board.activate();
  });
}
