import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//constructor(props) { 
//super(props);//super for defininf a constructor of a sub class
// this.state = {// reacte compnents can have state when setting this.state inside constructors, considered as privet to compo defined in 
//value: null,//stores vale of this.state and is changed when onClick
// };
// }

function Square(props) {//function ccomponent
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


class Board extends React.Component { // parent compo to the squares--- to lift data from, or to have 2 child comps communiscat with each other you need to declare the share state in their parent component instead 
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        //4.//, the Square components are now controlled components. The Board has full control over them.
        //const squares = this.state.squares.slice();//we call .slice() to create a copy of the squares array to modify instead of modifying the existing array.
        // the 2nd squares arry created by .slice and can be replaced by a new copy with the desired changes made to it 
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }



    renderSquare(i) {
        return (<Square
            value={this.props.squares[i]} // value is read from state of the squares in the boards constructor
            onClick={() => this.props.onClick(i)}
        // 2.when the button is clicked, React will call the on Click event handler defined in the Square's render method
        //calls a function whe ever a square is clicked
        />  // now passing DOWN 2 properties from board to square VALUE and ONCLICK. Where ONCLICK is a property set = to a function that square can call when clicked
        );//{i} />;//passing value {i} of each square to the render method
    }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
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
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,//indicate which step we’re currently viewing
            xIsNext: true
        };
    }

    handleClick(i) {// moved the click handle from the board compo to the game compo
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({//concat method will not mutate teh original array
            history: history.concat([{//for game handle CLick needs to concat the new hiostory enteries into history
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {//maps ver the history in games History
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                // keys are similar to IDs or used similarly to relational data bases
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

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