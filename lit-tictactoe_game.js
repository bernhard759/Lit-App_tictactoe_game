import { css as u, LitElement as h, html as d } from "lit";
import { state as c, customElement as m } from "lit/decorators.js";
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload"))
    return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
    s(e);
  new MutationObserver((e) => {
    for (const r of e)
      if (r.type === "childList")
        for (const a of r.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && s(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(e) {
    const r = {};
    return e.integrity && (r.integrity = e.integrity), e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy), e.crossOrigin === "use-credentials" ? r.credentials = "include" : e.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r;
  }
  function s(e) {
    if (e.ep)
      return;
    e.ep = !0;
    const r = o(e);
    fetch(e.href, r);
  }
})();
const p = u`
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
var _ = Object.defineProperty, g = Object.getOwnPropertyDescriptor, l = (i, t, o, s) => {
  for (var e = s > 1 ? void 0 : s ? g(t, o) : t, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (e = (s ? a(t, o, e) : a(e)) || e);
  return s && e && _(t, o, e), e;
};
let n = class extends h {
  constructor() {
    super(...arguments), this._board = new Array(9).fill(""), this._turn = "X", this._gameover = !1, this._winner = "", this._winningCombo = [], this._userAction = !0;
  }
  // Render the markup
  render() {
    return this._gameover ? d`
    <div class="gameover">
      ${this._getGameoverMessage()}
      <button @click=${this._playNewGame}>Play again</button>
    </div>` : d`
      <div id="gameboard">
        ${this._board.map(
      (i, t) => d`<div @click=${() => this._handleClickedSquare(t)} class=${this._winningCombo.includes(t) ? "square winner" : "square"}>${i}</div>`
    )}
      </div>`;
  }
  // Get gameover message
  _getGameoverMessage() {
    let i;
    return this._winner === "" ? i = d`<div>The game ended in a draw.</div>` : i = d`<div>The winner is ${this._winner}.</div>`, i;
  }
  // Clicked square
  _handleClickedSquare(i) {
    const t = [...this._board];
    t[i] !== "" || !this._userAction || (t[i] = this._turn, this._board = t, this._isWinner(), this._isDraw(), this._turn = this._turn === "X" ? "O" : "X");
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
    ].forEach((t) => {
      const [o, s, e] = t;
      this._board[o] !== "" && this._board[o] === this._board[s] && this._board[o] === this._board[e] && (console.log("winner"), this._userAction = !1, this._winner = this._turn, setTimeout(() => this._gameover = !0, 2e3), this._winningCombo = t);
    }), !1;
  }
  // Check for a draw
  _isDraw() {
    this._board.filter((t) => t === "").length === 0 && console.log("draw");
  }
  // Play a new game
  _playNewGame() {
    this._board = Array(9).fill(""), this._gameover = !1, this._userAction = !0, this._winningCombo = [];
  }
};
n.styles = p;
l([
  c()
], n.prototype, "_board", 2);
l([
  c()
], n.prototype, "_turn", 2);
l([
  c()
], n.prototype, "_gameover", 2);
l([
  c()
], n.prototype, "_winner", 2);
l([
  c()
], n.prototype, "_winningCombo", 2);
l([
  c()
], n.prototype, "_userAction", 2);
n = l([
  m("tictactoe-game")
], n);
