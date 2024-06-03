import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: "general"
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHub`;
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this); // Binding the method
  }

  async componentDidMount() {
    this.updateNews(this.state.page);
  }

  updateNews = async (pageNo) => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f16fc82d22b4e3b994ac73df5bdd77e&page=${pageNo}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      await this.setState((prevState) => ({ page: prevState.page + 1 }));
      this.updateNews(this.state.page + 1);
    }
  };

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      await this.setState((prevState) => ({ page: prevState.page - 1 }));
      this.updateNews(this.state.page - 1);
    }
  };

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsHub - top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className='col-md-4' key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ''}
                    description={element.description ? element.description : ''}
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}/>
                </div>
              );
            })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button
            disabled={this.state.page <= 1}
            type='button'
            className='btn btn-dark'
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type='button'
            className='btn btn-dark'
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
