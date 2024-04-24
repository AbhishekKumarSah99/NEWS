import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date } = props;
  return (
    <div>
      <div className="card">
        <img
          src={
            !imageUrl
              ? "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202404/indian-embassy-dubai-rain-reschedule-travel-plans-indian-passengers-192829294-16x9_0.png?VersionId=SiXqX9o5396DTr18f8JFC4l3syrg7tlW"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <b>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
          </b>
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};
export default NewsItem;
