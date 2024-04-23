import React, { Component } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    console.log("hellow i am constructor from the news component");
    this.state = {
      articles: [   ],
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title=`${this.props.category}-NewsMonkey`;
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedata = await data.json();
    this.props.setProgress(60);
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    })
    this.props.setProgress(100);
  }
 


  async componentDidMount() {
    // console.log("component in mount");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=249d0878304f4c0abb26a1bb81df3624&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedata= await data.json();
    // console.log(parsedata);
    // this.setState({articles: parsedata.articles,totalResults:parsedata.totalResults,loading:false})
    this.updateNews();
  }

  handlePrevClick = async () => {
    //       console.log("previous");

    //       let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=249d0878304f4c0abb26a1bb81df3624&page=${this.state.page-1}&pageSize
    // =${this.props.pageSize} `;
    // this.setState({loading:true});
    //       let data= await fetch(url);
    //       let parsedata= await data.json();
    //       console.log(parsedata);

    //       this.setState({
    //         page:this.state.page-1,
    //         articles: parsedata.articles
    //        })
    window.scrollTo(0, 0); // Scroll to top
    this.setState({ loading: true });
    await this.setState({ page: this.state.page - 1 });
   
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log("Next");
    //       if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){

    //       let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=249d0878304f4c0abb26a1bb81df3624&page=${this.state.page+1}&pageSize
    // =${this.props.pageSize} `;
    //         this.setState({loading:true});
    //       let data= await fetch(url);
    //       let parsedata= await data.json();
    //       this.setState({loading:false})

    //       this.setState({
    //         page:this.state.page+1,
    //         articles: parsedata.articles
    //        })
    //     }
    window.scrollTo(0, 0); // Scroll to top
    this.setState({ loading: true });
    await this.setState({ page: this.state.page + 1 });
   
    this.updateNews();
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);

    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
    })
};
  render() {
    console.log("render");
    
    return (
      <>
      <div className="container  my-3">
        <h1 className="text-center">NewsMonkey-Top Headlines on {this.props.category}</h1>
        
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>
         <div className="container">
        <div className="row">
          { this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
     
      </div>
      </>
    );
  }
  
}


