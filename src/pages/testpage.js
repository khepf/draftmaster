import React, { Component } from 'react';

import Counter2 from '../components/counter2';


class TestPage extends Component {
  render() {
    return (
      <Counter2 max={15} step={5}/>
    );
  }
}

export default TestPage;