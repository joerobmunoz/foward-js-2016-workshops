import './index.css';
import React, { Component } from 'react';
import * as actions from 'actions/counter-actions.js';
import { connect }  from 'react-redux';

function Counter({catCount, incrementCatCount, decrementCatCount}) {
  // constructor(props) {
  //   super(props);
  //   //this.state = { catCount: 1 };
  // }

  // handleIncrement = () => this.setState({catCount: this.state.catCount + 1});
  // handleDecrement = () => this.setState({catCount: this.state.catCount - 1});

  // render() {
    // const { catCount } = this.state;
    const cats = [];
    for (let i = 0; i < catCount; i++) {
      cats.push(<CatImage key={i}/>)
    }
    
    return (
      <div className='counter-container'>
        <div className='buttons'>
          <button className='increment' onClick={incrementCatCount}>More Cats</button>
          <button className='decrement' onClick={decrementCatCount}>Fewer Cats</button>
        </div>
        { cats }
      </div>
    );
  // }
}

function CatImage() {
  return <img width='200' src='http://thecatapi.com/api/images/get?format=src&type=gif'/>
}

function mapStateToProps(state) {
  return {
    catCount: state.catCount
  }
}

export default connect(mapStateToProps, actions)(Counter)

// how connect works:
//    designed to inject props into the component that it's decorating
//    you pass in actions and it will automatically dispatch them to the store