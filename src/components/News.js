import React, { useEffect ,useState} from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const  News=(props)=> {
 const [articles,setArticles]=useState([])
 const [loading,setLoading]=useState(true)
 const [page,setPage]=useState(1)
 const [totalResults,setTotalResult]=useState(0)
 
 
  const updateNews=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${ page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedata = await data.json();
    props.setProgress(60);
    console.log(parsedata);
    setArticles(parsedata.articles)
    setTotalResult(parsedata.totalResults)
    setLoading(false)
    
    props.setProgress(100);
  }
 


 useEffect(()=>{
   updateNews();
 },[])

 
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${ page+1}&pageSize=${props.pageSize}`;
 
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    setArticles(articles.concat(parsedata.articles));
    setTotalResult(parsedata.totalResults);
    setPage(page+1);
     
};

    console.log("render");
    
    return (
      <>
      <div className="container  my-3">
        <h1 className="text-center" style={{ margin: '35px 0px' ,marginTop:'90px' }}>NewsMonkey-Top Headlines on {props.category}</h1>
        
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={ articles.length}
          next={ fetchMoreData}
          hasMore={ articles.length !==  totalResults}
          loader={<Spinner/>}>
         <div className="container">
        <div className="row">
          {  articles.map((element) => {
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
    
    )
        }
  News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  }
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


export default News



