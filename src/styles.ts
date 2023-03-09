import { css } from 'lit';

// Export the styles
export const styles = css`
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
`
;