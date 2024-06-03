import React, { Component } from 'react';

export default class NewsItem extends Component {
  formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toGMTString();
    } else {
      return "Invalid Date";
    }
  };

  render() {
    let { title, description, imgurl, newsurl, author,source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <img
            src={!imgurl ? "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-492188484.jpg?c=16x9&q=w_800,c_fill" : imgurl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
          <h5 className="card-title">{title} <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}> {source} </span></h5>
            <p className="card-text">{description}</p>

            <p className="card-text"><small class="text-muted">By {!author?"Unknown": author} </small></p>
            
            <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
