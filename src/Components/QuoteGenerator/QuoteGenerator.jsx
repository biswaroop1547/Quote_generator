import React, { Component } from "react";

export default class QuoteGenerator extends Component {
  state = {
    randomQuote: "",
    quotes: [],
    indexNum: 0,
    clickedPrev: false
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

  handleNext = () => {
    fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(response => {
        const { content } = response;
        let quotesCache = this.state.quotes.slice();
        if (this.state.clickedPrev) {
          quotesCache = quotesCache.slice(0, this.state.indexNum + 1);
        }
        quotesCache.push(content);
        this.setState({
          randomQuote: content,
          quotes: quotesCache,
          indexNum: quotesCache.length - 1
        });
        this.state.clickedPrev
          ? this.setState({ clickedPrev: !this.state.clickedPrev })
          : this.setState({ clickedPrev: this.state.clickedPrev });
      });
  };

  handlePrev = () => {
    if (this.state.indexNum > 0) {
      const clickedPrev = true;
      const prevQuote = this.state.quotes[this.state.indexNum - 1].slice();
      const newIndexNum = this.state.indexNum - 1;
      this.setState({
        randomQuote: prevQuote,
        indexNum: newIndexNum,
        clickedPrev: clickedPrev
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
      </div>
    );
  }
}
