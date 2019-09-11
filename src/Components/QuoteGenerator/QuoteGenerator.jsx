import React, { Component } from "react";

export default class QuoteGenerator extends Component {
  state = {
    randomQuote: "",
    quotes: [],
    indexNum: 0,
    clicked: false
  };

  componentDidMount() {
    fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(response => {
        const { content } = response;
        const quotesCache = this.state.quotes.slice();
        quotesCache.push(content);
        this.setState({ randomQuote: content, quotes: quotesCache });
      });
  }

  handleGenerate = () => {
    fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(response => {
        const { content } = response;
        let quotesCache = this.state.quotes.slice();
        if (this.state.clicked) {
          quotesCache = quotesCache.slice(0, this.state.indexNum + 1);
        }
        quotesCache.push(content);
        this.setState({
          randomQuote: content,
          quotes: quotesCache,
          indexNum: quotesCache.length - 1
        });
        this.state.clicked
          ? this.setState({ clicked: !this.state.clicked })
          : this.setState({ clicked: this.state.clicked });
      });
  };

  handlePrev = () => {
    if (this.state.indexNum > 0) {
      const clickedPrev = true;
      const prevQuote = this.state.quotes[this.state.indexNum - 1].slice();
      const newIndexNumPrev = this.state.indexNum - 1;
      this.setState({
        randomQuote: prevQuote,
        indexNum: newIndexNumPrev,
        clicked: clickedPrev
      });
    }
  };

  handleNext = () => {
    if (
      this.state.quotes.length > 1 &&
      this.state.indexNum + 1 !== this.state.quotes.length
    ) {
      const clickedNext = true;
      const nextQuote = this.state.quotes[this.state.indexNum + 1].slice();
      const newIndexNumNext = this.state.indexNum + 1;
      this.setState({
        randomQuote: nextQuote,
        indexNum: newIndexNumNext,
        clicked: clickedNext
      });
    }
  };

  render() {
    return (
      <div>
        <div id="theQuote">
          <p>{this.state.randomQuote}</p>
        </div>
        <div id="prevAndNext">
          <div id="prevDiv">
            <button
              className="btn btn-primary btn-lg"
              id="prev"
              onClick={this.handlePrev}
            >
              Prev
            </button>
          </div>
          <div id="nextDiv">
            <button
              id="next"
              className="btn btn-primary btn-lg"
              onClick={this.handleNext}
            >
              Next
            </button>
          </div>
        </div>
        <div id="gen">
          <button
            id="genButton"
            className="btn btn-warning btn-lg"
            onClick={this.handleGenerate}
          >
            Generate
          </button>
        </div>
      </div>
    );
  }
}
