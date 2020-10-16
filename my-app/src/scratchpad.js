function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
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
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

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
                    <ol>{/* TODO */}</ol>
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




































// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';

//constructor(props) { 
    //super(props);//super for defininf a constructor of a sub class
   // this.state = {// reacte compnents can have state when setting this.state inside constructors, considered as privet to compo defined in 
        //value: null,//stores vale of this.state and is changed when onClick
   // };
// }

// function Squares (props){
//     return(
//         <button className = "spuare"  onClick= {props.onClick}>
//             {props.value}
//         </button>
//     )
// }
// class Square extends React.Component {
    // render() { //change render to display current value onClick.
    //   return (
    //     <button className="square"
    //     onClick={() =>  this.props.onClick()}//({value: 'X' })} //set state removed and replaced by this.props.value// by calling this,setState from an onClick inside the aquare's render method, tells react to re-render the square whenthe button is clicked//
       // 1. the onClick property on the built-in DOM <button> component tells React to set up a click event listener
       // 3. the event handler calls this.props.onClick(). the Squares onClick prop was specified by thr Board
       // 4. Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked.
//         >  
//           {this.props.value}    
//         </button>
//             //{/* after a click this.state.value will be 'X' nad will display on the game board*/}
//             //{/* when you call setState in a compo Reacte automatically updates thedisplay */}
//       );
//     }
// }

// class Board extends React.Component { // parent compo to the squares--- to lift data from, or to have 2 child comps communiscat with each other you need to declare the share state in their parent component instead 
// constructor(props){//constructor is passed props //(contd from above) the parent compo can pass the state abck down to the chilfer by using props keeping everything in sync
//     super(props);//
//     this.state = {
//         squares: Array(9).fill(null),//sets board inital state to contain array of 9 nulls corresponding to the 9 squares
//     };
// }

// handleClick(i){//4.//, the Square components are now controlled components. The Board has full control over them.
//     const squares = this.state.squares.slice();//we call .slice() to create a copy of the squares array to modify instead of modifying the existing array.
//     // the 2nd squares arry created by .slice and can be replaced by a new copy with the desired changes made to it 
//     squares[i] = 'X';
//     this.setState({squares: squares});
// }
// renderSquare(i) {
//     return( <Square 
//         value ={this.state.squares[i]} // value is read from state of the squares in the boards constructor
//         onClick= {() => this.handleClick(i)} 
//         // 2.when the button is clicked, React will call the on Click event handler defined in the Square's render method
//         //calls a function whe ever a square is clicked
//         />  // now passing DOWN 2 properties from board to square VALUE and ONCLICK. Where ONCLICK is a property set = to a function that square can call when clicked
//     );//{i} />;//passing value {i} of each square to the render method
// }
// render() {
//     const status = 'Next player: X';

//     return (
//     <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//         {this.renderSquare(0)}
//         {this.renderSquare(1)}
//         {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//         {this.renderSquare(3)}
//         {this.renderSquare(4)}
//         {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//         {this.renderSquare(6)}
//         {this.renderSquare(7)}
//         {this.renderSquare(8)}
//         </div>
//     </div>
//     );
// }
// }

//   class Game extends React.Component {
//     render() {
//       return (
//         <div className="game">
//           <div className="game-board">
//             <Board />
//           </div>
//           <div className="game-info">
//             <div>{/* status */}</div>
//             <ol>{/* TODO */}</ol>
//           </div>
//         </div>
//       );
//     }
// }

//   // ========================================

//   ReactDOM.render(
//     <Game />,
//     document.getElementById('root')
//   );


//   render() {
//     const winner = calculateWinner (this.state.squares);
//     let status;
//     if (winner) {
//         status = 'Winner : '+winner;
//     }else{
//         status = 'Next player:' +(this.state.xIsNext ? 'X' :'O');
//     }
//     const status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');

//     return (
//     <div>
//         <div className="status">{status}</div>