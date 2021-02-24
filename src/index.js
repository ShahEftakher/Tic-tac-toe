import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//square component(class based)
//state is controlled by <Board/>
//so it is a controlled component
/*
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => {
          //for updating the state
          //on this update the square component is re rendered with the updated value
          this.props.onClick();
        }}
      >
        {this.props.value}
      </button>
    );
  }
}
*/
//Square component (Functional)
function Square(props) {
  return (
    <button
      className="square"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.value}
    </button>
  );
}

//Board component
//board will track the app state
class Board extends React.Component {
  constructor(props) {
    super(props);
    //initializing each box with null
    //and first move as 'X'
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
      />
    );
  }

  handleClick(i) {
    //copy the whole array
    const squares = this.state.squares.slice();
    //if there is a winner then no further action is valid
    //if a box is aleady filled then that box will not be updated
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //update a element
    squares[i] = this.state.xIsNext ? "X" : "O";
    //update the state
    //this will update the parent state(<Board/>)
    //as <Square/> is sharing state with its parent <Board/> it will re render as well
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = " Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)} {/* === <Square value={0}>*/}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//Game component
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
