import React, { Component } from "react";
import Die from "../Die";
import "./Dice.css";

class Dice extends Component {
  render() {
    return (
      <div className="Dice">
        {this.props.dice.map((d, idx) => (
          <Die
            handleDieClick={this.props.handleClick}
            val={d}
            locked={this.props.locked[idx]}
            idx={idx}
            key={idx}
            disabled={this.props.disabled}
            dieRoll={this.props.rolling && !this.props.locked[idx]}
          />
        ))}
      </div>
    );
  }
}

export default Dice;
