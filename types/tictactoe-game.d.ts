import { LitElement } from 'lit';
export declare class MyElement extends LitElement {
    static styles: import("lit").CSSResult;
    private _board;
    private _turn;
    private _gameover;
    private _winner;
    private _winningCombo;
    private _userAction;
    render(): import("lit-html").TemplateResult<1>;
    private _getGameoverMessage;
    private _handleClickedSquare;
    private _isWinner;
    private _isDraw;
    private _playNewGame;
}
