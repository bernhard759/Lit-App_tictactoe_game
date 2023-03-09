import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styles } from './styles';

// Gameboard 
@customElement('tictactoe-game')
export class MyElement extends LitElement {

  // Scoped styles
  static styles = styles;

  // State board
  @state()
  private _board = new Array(9).fill("");

  // State turn
  @state()
  private _turn: String = "X";

  // State gameover
  @state()
  private _gameover: Boolean = false;

  // State winner
  @state()
  private _winner: String = "";

  // State winning combo
  @state()
  private _winningCombo: number[] = [];

  // State user action
  @state()
  private _userAction: Boolean = true;

  // Render the markup
  render() {
    // Classes
    return (!this._gameover)
      ? 
      html`
      <div id="gameboard">
        ${this._board.map((content, i) =>
          html`<div @click=${()=> this._handleClickedSquare(i)} class=${this._winningCombo.includes(i) ? "square winner" : "square"}>${content}</div>`
        )}
      </div>`
      : 
      html`
    <div class="gameover">
      ${this._getGameoverMessage()}
      <button @click=${this._playNewGame}>Play again</button>
    </div>`;
  }

  // Get gameover message
  private _getGameoverMessage() {
    let message;
    if (this._winner === "") {
      message = html`<div>The game ended in a draw.</div>`
    } else {
      message = html`<div>The winner is ${this._winner}.</div>`
    }
    return message;
  }

  // Clicked square
  private _handleClickedSquare(index: number) {
    const newBoard = [...this._board];
    if (newBoard[index] !== "" || !this._userAction) return;
    newBoard[index] = this._turn;
    this._board = newBoard;
    // Check win conditions
    this._isWinner()
    this._isDraw()
    // Switch turns
    this._turn = this._turn === "X" ? "O" : "X";
  }

  // Check for a winner
  private _isWinner() {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    possibleLines.forEach((line) => {
      const [a, b, c] = line;
      if (
        this._board[a] !== "" &&
        this._board[a] === this._board[b] &&
        this._board[a] === this._board[c]
      ) {
        console.log("winner");
        this._userAction = false;
        this._winner = this._turn;
        setTimeout(() => this._gameover = true, 2000);
        this._winningCombo = line;
      }
    });
    return false;
  }

  // Check for a draw
  private _isDraw() {
    let draw = this._board.filter((s) => s === "").length === 0;
    if (draw) {
      console.log("draw");
    }
  }

  // Play a new game
  private _playNewGame() {
    // Reset the internal reactive state
    this._board = Array(9).fill("");
    this._gameover = false;
    this._userAction = true;
    this._winningCombo = [];
  }


}

