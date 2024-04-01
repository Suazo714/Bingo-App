import React from 'react';
import './Bingo.css';

class Bingo extends React.Component {
    constructor(props) {
        super(props);

        const data = this.populateData();

        const card = this.populateCard(data);

        this.handleMouseClick = this.handleMouseClick.bind(this);

        this.state = {
            data: data,
            card: card,
        };
    }

    handleMouseClick(e) {
        e.target.classList.toggle('highlight');
    }

    populateData() {
        let data = [];
        for (let i = 1; i <= 75; i++) {
            data.push(i);
        }
        return data;
    }

    populateCard(data) {
        let card = [];
        for (let row = 0; row < 5; row++) {
            let offset = row * 15;
            for (let col = 0; col < 5; col++) {
                let idx;
                do {
                    idx = Math.floor(Math.random() * 15) + offset;
                } while (card.includes(data[idx]));
                card.push(data[idx]);
            }
        }
        return card;
    }

    getNumber(idx) {
        const bingoCard = this.state.card;
        return bingoCard[idx];
    }

    renderBingoCells() {
      let rows = [];
      for (let row = 0; row < 5; row++) {
          let cells = [];
          for (let i = 0; i < 5; i++) {
              let cellIndex = row * 5 + i;
              cells.push(
                  <div key={cellIndex} className="bingo" onClick={this.handleMouseClick}>
                      <span>{cellIndex === 12 ? "FREE" : this.getNumber(cellIndex)}</span>
                  </div>
              );
          }
          rows.push(<div key={`row-${row}`} className="row">{cells}</div>);
      }
      return rows;
  }
  
  render() {
      return (
          <div id="bingo-container">
              <div id="board">
                  {this.renderBingoCells()}
              </div>
          </div>
      );
  }
}

export default Bingo;
