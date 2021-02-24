import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//square component
//state is controlled by <Board/> 
//so it is a controlled component
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

//Board component
//board will track the app state
class Board extends React.Component {
  constructor(props) {
    super(props);
    //initializing each box with null
    this.state = {
      squares: Array(9).fill(null),
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
    //update a element
    squares[i] = "X";
    //update the state
    //this will update the parent state(<Board/>)
    //as <Square/> is sharing state with its parent <Board/> it will re render as well
    this.setState({ squares: squares });
  }

  render() {
    const status = "Next player: X";

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
