import { css as d, LitElement as c, html as l } from "lit";
import { state as a, customElement as u } from "lit/decorators.js";
const m = d`
#gameboard {
    width: 50vmin;
    aspect-ratio: 1;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
}

.gameover {
    height: 50vmin;
    width: 100%;
    aspect-ratio: 1;
    display: grid;
    grid-template-rows: 50% 50%;
    justify-content: center;
    align-items: center;
}

.gameover button {
    border: none;
    padding: 12px 16px;
    color: white;
    background: steelblue;
    cursor: pointer;
}

.gameover button:hover {
    background: hsl(207, 44%, 39%);
}

.square {
    background-color: steelblue;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.5em;
}

.square.winner {
    background-color: hsl(120, 30%, 55%) !important;
  }
`;
var g = Object.defineProperty, p = Object.getOwnPropertyDescriptor, o = (t, e, s, n) => {
  for (var r = n > 1 ? void 0 : n ? p(e, s) : e, h = t.length - 1, _; h >= 0; h--)
    (_ = t[h]) && (r = (n ? _(e, s, r) : _(r)) || r);
  return n && r && g(e, s, r), r;
};
let i = class extends c {
  constructor() {
    super(...arguments), this._board = new Array(9).fill(""), this._turn = "X", this._gameover = !1, this._winner = "", this._winningCombo = [], this._userAction = !0;
  }
  // Render the markup
  render() {
    return this._gameover ? l`
    <div class="gameover">
      ${this._getGameoverMessage()}
      <button @click=${this._playNewGame}>Play again</button>
    </div>` : l`
      <div id="gameboard">
        ${this._board.map(
      (t, e) => l`<div @click=${() => this._handleClickedSquare(e)} class=${this._winningCombo.includes(e) ? "square winner" : "square"}>${t}</div>`
    )}
      </div>`;
  }
  // Get gameover message
  _getGameoverMessage() {
    let t;
    return this._winner === "" ? t = l`<div>The game ended in a draw.</div>` : t = l`<div>The winner is ${this._winner}.</div>`, t;
  }
  // Clicked square
  _handleClickedSquare(t) {
    const e = [...this._board];
    e[t] !== "" || !this._userAction || (e[t] = this._turn, this._board = e, this._isWinner(), this._isDraw(), this._turn = this._turn === "X" ? "O" : "X");
  }
  // Check for a winner
  _isWinner() {
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ].forEach((e) => {
      const [s, n, r] = e;
      this._board[s] !== "" && this._board[s] === this._board[n] && this._board[s] === this._board[r] && (console.log("winner"), this._userAction = !1, this._winner = this._turn, setTimeout(() => this._gameover = !0, 2e3), this._winningCombo = e);
    }), !1;
  }
  // Check for a draw
  _isDraw() {
    this._board.filter((e) => e === "").length === 0 && console.log("draw");
  }
  // Play a new game
  _playNewGame() {
    this._board = Array(9).fill(""), this._gameover = !1, this._userAction = !0, this._winningCombo = [];
  }
};
i.styles = m;
o([
  a()
], i.prototype, "_board", 2);
o([
  a()
], i.prototype, "_turn", 2);
o([
  a()
], i.prototype, "_gameover", 2);
o([
  a()
], i.prototype, "_winner", 2);
o([
  a()
], i.prototype, "_winningCombo", 2);
o([
  a()
], i.prototype, "_userAction", 2);
i = o([
  u("tictactoe-game")
], i);
export {
  i as MyElement
};
