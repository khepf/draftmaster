import React, { Component } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterStorage');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage();

    this.updateDocumentTitle = this.updateDocumentTitle.bind(this);
    this.increment = this.increment.bind(this);
    this.increment2 = this.increment2.bind(this);
    this.increment3 = this.increment3.bind(this);
    this.incrementByThree = this.incrementByThree.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }
  // *** setState(state, props) ***

  updateDocumentTitle() {
    document.title = this.state.count;
  }

  increment() {
    // object based
    this.setState({ count: this.state.count + 1 });
  }

  increment2() {
    // function based
    this.setState(
      (state, props) => {
        const { max, step } = props;
        if (state.count >= max) return;
        console.log('before', this.state);
        return { count: state.count + step };
      },
      () => {
        console.log('after', this.state);
        localStorage.setItem('counterStorage', JSON.stringify(this.state));
      }
    );
  }

  increment3() {
    // function based
    this.setState(
      (state, props) => {
        const { max, step } = props;
        if (state.count >= max) return;
        console.log('before', this.state);
        return { count: state.count + step };
      },
      this.updateDocumentTitle
    );
  }

  incrementByThree() {
    this.setState((state) => {
      if (state.count >= 5) {
        alert('Number cannot be 5 or greater');
        return;
      }
      return { count: state.count + 1 };
    });
    this.setState((state) => {
      return { count: state.count + 1 };
    });
    this.setState((state) => {
      return { count: state.count + 1 };
    });
  }

  decrement() {
    // note that object structure is used but can still add `updateDocumentTitle` after a comma
    this.setState({ count: this.state.count - 1 }, this.updateDocumentTitle);
  }
  reset() {
    this.setState({ count: 0 }, this.updateDocumentTitle);
  }

  componentDidUpdate() {
    setTimeout(() => {
      console.log(`Count: ${this.state.count}`)
    }, 3000);
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <p>{count}</p>
        <section>
          <button onClick={this.increment3}>+ 5</button>
          <button onClick={this.incrementByThree}>+ 3</button>
          <button onClick={this.decrement}>- 1</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
