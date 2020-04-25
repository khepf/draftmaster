import React, { Component } from 'react';

// *** alternative option to break out method ***
// const increment = (state, props) => {
//   const { max, step } = props;
//   if (state.count >= max) return;
//   return { count: state.count + step };
// };

// *** hooks ***
// const [count, setCount] = React.useState(0);

// const increment = () => setCount(count + 1);
// const decrement = () => setCount(count - 1);
// const reset = () => setCount(0);

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
}

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = getStateFromLocalStorage();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
    this.updateDocumentTitle = this.updateDocumentTitle.bind(this);
  }

  updateDocumentTitle() {
    document.title = this.state.count;
  }

  increment() {
    this.setState((state, props) => {
      const { max, step } = props;
      if (state.count >= max) return;
      return { count: state.count + step };
    },
    this.updateDocumentTitle
    );
    
  }

  decrement() {
    this.setState({ count: this.state.count - 1 }, this.updateDocumentTitle);
  }

  reset() {
    this.setState({ count: 0 }, this.updateDocumentTitle);
  }

  render() {
    const { count } = this.state;
    
    return (
      <div>
        <p>{count}</p>
        <section>
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;