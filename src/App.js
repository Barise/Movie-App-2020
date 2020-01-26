import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Movie from "./components/Movie"
import "./App.css";
class App extends React.Component{
  state ={
    isLoading : true,
    movies : []
  };

  // axio로 url 가져올려면 느리니까 async await 걸어줘야함
  getMovies = async () =>{
    //json data형식마춰서 가져온거
    const {data : { data:{movies}}} = await  axios.get("https://yts-proxy.now.sh/list_movies.json");
    this.setState({movies,isLoading:false});
  }
  componentDidMount(){
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      //html에서는 상관없지만 react에서는 component class랑 헷갈려서 className로 해줘야함
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;


//---------------------------------
//setState 연습
// class App extends React.Component{
//   //state는 객체!
//   state = {
//     isLoading : true
//   };
//   componentDidMount(){
//     setTimeout(()=>
//     {this.setState({isLoading:false});
//   },6000);
//   }
//   render() {
//     const {isLoading} = this.state;
//     return <div>{isLoading ? "Loading" : "We are ready"}</div>
//   };
// }

// export default App;


//-----------------------------------------
//class component

//render 함수를 자동으로 실행

// class App extends React.Component{
//   //mounting시 가장먼저 호출
//   constructor(props){
//     super();
//     console.log("constructor");
//   }


//   //이 데이터는 변함!
//   //state는 Object임
//   state ={
//     count:0
//   }
// //javascript로 기능넣기
// add = () =>{
//   //이코드가 안먹는 이유는 react는 render function을 refresh하지 않기 때문
//   // this.state.count++;
//   //setState는 호출될떄마다 render함수를 호출함
//   //javascript 에서 ++ 안먹음
//   // this.setState({count:this.state.count+1});

//   //이렇게 쓰는방식에 익숙해지자(함수형으로) current 가 현재의 state를 계속가져옴
//   this.setState(current =>({
//     count:current.count+1}));
// };
// minus = () =>{
//   // this.state.count--;
//   this.setState(current =>({
//     count:current.count-1}));
// };

// //render 가 실행된 직후 바로 실행
// componentDidMount(){
//   console.log("component rendered");
// }
// //setState가 실행될때 렌더함수가 호출된후 실행
// componentDidUpdate(){
//   console.log("component is Update!")
// }
// //component가 사라질떄
// componentWillUnmount(){
//   console.log("Goodbye, cruel world")
// }

//   //class이기때문에 같은 class안에있으니 this. state 그리고 변수명
//   render(){
//     console.log("I'm rendering");
//     return(
//       <div>
//         <h1>I like React {this.state.count}</h1>
//         <button onClick={this.add}>Add</button>
//         <button onClick={this.minus}>Minus</button>
//       </div>
//     ) 
//   }
  
// }

// export default App;

// ---------------------------------------------
//이전에 한 function component 
// function Food({ id,name, picture,rating }) {
//   return (
//     <div>
//       <h1>Number is {id}</h1>
//       <h2>I like {name}</h2>
//       <h2>rating {rating}</h2>
//       <img src={picture} alt ={name}/>
//     </div>
//   );
// }
// //props의 타입이 맞나 확인하는거 
// Food.propTypes={
//   id : PropTypes.number.isRequired,
//   name : PropTypes.string.isRequired,
//   picture : PropTypes.string.isRequired,
//   rating : PropTypes.number.isRequired
// };
// const foodILike = [
//   {
//     id : 1,
//     name: "Kimchi",
//     image:
//       "http://aeriskitchen.com/wp-content/uploads/2008/09/kimchi_bokkeumbap_02-.jpg",
//     rating : 5
//   },
//   {
//     id : 2,
//     name: "Samgyeopsal",
//     image:
//       "https://3.bp.blogspot.com/-hKwIBxIVcQw/WfsewX3fhJI/AAAAAAAAALk/yHxnxFXcfx4ZKSfHS_RQNKjw3bAC03AnACLcBGAs/s400/DSC07624.jpg",
//       rating : 4.9
//   },
//   {
//     id : 3,
//     name: "Bibimbap",
//     image:
//       "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/recipes/ck/12/03/bibimbop-ck-x.jpg?itok=RoXlp6Xb",
//       rating : 4.7
//   },
//   {
//     id : 4,
//     name: "Doncasu",
//     image:
//       "https://s3-media3.fl.yelpcdn.com/bphoto/7F9eTTQ_yxaWIRytAu5feA/ls.jpg",
//       rating : 4.8
//   },
//   {
//     id : 5,
//     name: "Kimbap",
//     image:
//       "http://cdn2.koreanbapsang.com/wp-content/uploads/2012/05/DSC_1238r-e1454170512295.jpg",
//       rating : 4.5
//   }
// ];

// // key 를 준이유는 list에 유일성이 없기 때문
// function renderFood(dish){
//   return <Food id={dish.id} key={dish.id} name= {dish.name} picture={dish.image} rating={dish.rating}/>
// }

// //이런걸 function component 라고함
// //함수를 실행함
// function App() {
//   return (
//     <div>
//       {foodILike.map(renderFood)}
//     </div>
//   );
// }