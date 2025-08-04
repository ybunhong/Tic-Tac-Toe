import { BaseComponent } from "../base-component.js";
import "../main.js";
import chevorn from "../../assets/icons/chevron.svg";

export class StartGame extends BaseComponent {
  static get observedAttributes() {
    return ["label"];
  }

  constructor() {
    super();
    this.label = "";
    this.players = ["X", "O"];
    this.currentPlayer = this.players[0];
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.message = "";
    this.playerName = localStorage.getItem("playerName") || "Guest";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("click", this.handleBoardClick.bind(this));
    this.addEventListener("base-button", (event) => {
      if (event.detail.action === "restart-btn") {
        this.resetGame();
      }
    });
    this.addEventListener("name-change", (event) => {
      this.name = event.detail; // store name from <name-input>
      console.log("Player name:", this.name);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && name === "label") {
      this.label = newValue;
      this.updateTemplate();
    }
  }

  //when any element is clicked, check data-x and data-y. if so call handleClick() to mark the cell
  handleBoardClick(event) {
    const target = event.target;
    const x = parseInt(target.getAttribute("data-x"));
    const y = parseInt(target.getAttribute("data-y"));

    if (!isNaN(x) && !isNaN(y)) {
      this.handleClick(x, y);
    }
  }

  handleClick(x, y) {
    //place current player's mark in the selected cell
    if (this.board[y][x] === "") {
      this.board[y][x] = this.currentPlayer;
      const winner = this.checkWinner();
      if (winner) {
        this.showMessage(`Player ${winner} wins!`);
        return;
      }
      if (this.isBoardFull()) {
        this.showMessage(`It's a draw`);
        return;
      }
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      this.updateBoardUI();
    }
  }

  //display in console which player is currently playing
  updateBoardUI() {
    this.updateTemplate();
    console.log("Now playing:", this.currentPlayer);
  }

  //show win/draw overlay with message
  showMessage(msg) {
    this.message = msg;
    this.updateTemplate();
  }

  updateTemplate() {
    let html = `
    <div class="relative w-fit flex flex-col items-center justify-center gap-4">
    ${
      this.message
        ? `
        <div class="absolute w-[200px] h-[200px] bg-stone-500/70 z-50 flex flex-col items-center justify-center gap-4 text-white">
          <p class="text-2xl font-bold">${this.message}</p>
          <base-button label="Start Again" variant="primary" action="restart-btn"></base-button>
        </div>
        `
        : ""
    }
    <div class="flex justify-between w-full">
          <div class="relative w-fit " style="transform: rotate(180deg)">
          <icon-button
          icon="${chevorn}"
          href="/index.html"
          size="2.5"
          ></icon-button>
        </div>
          <div class="relative w-fit ">
          <p class=" text-xl underline pt-5">Player name: ${this.playerName}</p>
          </div>
        </div>

        <!--disables mouse interactions on this div and its children-->

      <div class="grid grid-cols-3 w-fit ${
        this.message ? "pointer-events-none" : ""
      }">
  `;

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const val = this.board[y][x];

        const right = x < 2 ? "border-r-2" : ""; // Add right border unless it's the last column
        const bottom = y < 2 ? "border-b-2" : ""; // Add bottom border unless it's the last row

        html += `
        <div 
          data-x="${x}" 
          data-y="${y}" 
          class="cell ${right} ${bottom} border-black p-12 text-4xl text-center cursor-pointer select-none w-[100px] h-[100px] flex items-center justify-center"
        >
          ${val}
        </div>`;
      }
    }

    html += `
      </div>
      <p class="text-xl">Current player: ${this.currentPlayer}</p>
      <base-button
        class="cursor-pointer"
        label="Restart"
        variant="primary"
        action="restart-btn"
      ></base-button>
    </div>
  `;

    this.template = html;
    this.render();
  }

  //return true if all cells are filled then call it in handleClick() to make it draw
  isBoardFull() {
    return this.board.flat().every((cell) => cell !== "");
  }

  checkWinner() {
    const b = this.board;
    const lines = [
      // Rows
      [b[0][0], b[0][1], b[0][2]],
      [b[1][0], b[1][1], b[1][2]],
      [b[2][0], b[2][1], b[2][2]],
      // Columns
      [b[0][0], b[1][0], b[2][0]],
      [b[0][1], b[1][1], b[2][1]],
      [b[0][2], b[1][2], b[2][2]],
      // Diagonals
      [b[0][0], b[1][1], b[2][2]],
      [b[0][2], b[1][1], b[2][0]],
    ];

    // Loop through each possible winning line (row, column, diagonal).
    // For each winning line (which is an array of 3 cells):
    // 1. Check if the first cell in the line is not empty (means a player has marked it).
    // 2. Check if the first cell equals the second cell.
    // 3. Check if the second cell equals the third cell.
    // 4. If all three cells are equal and not empty, that means one player has won with this line.
    // 5. Return the symbol (either "X" or "O") representing the winner.
    for (const line of lines) {
      if (line[0] && line[0] === line[1] && line[1] === line[2]) {
        return line[0];
      }
    }
    return null;
  }

  resetGame() {
    //restart game
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    // make X is the first player
    this.currentPlayer = "X";
    // restart message
    this.message = "";
    this.updateTemplate();
  }
}

customElements.define("start-game", StartGame);
