import React from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import AddForm from './addform.js';
import UpdatForm from './form.js';
// import "./styles/BestBooks.css";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm:false,
      showFlag : false,
      currentbook : {},
      books : [],
      bookChosen: [],
    }
  }
  openAddform = () =>{
    this.setState({
      showAddForm : true,
    })
    
  }

  handleCloseAdd = () =>{
    this.setState({
      showAddForm : false
    })
  }
  openForm = (item) =>{
    this.setState({
      showFlag : true,
      currentbook: item
    })
    
  }

  handleClose = () =>{
    this.setState({
      showFlag : false
    })
  }
  deleteBook = (id) => {
    const { user } = this.props.auth0;
    axios
      .delete(`${process.env.REACT_APP_URL}deleteBook/${id}/${user.email}`)
      .then((result) => {
        this.setState({
          BooksArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  updatebook=(event)=>{

    event.preventDefault();
    let obj = {
      title : event.target.title.value,
      des : event.target.description.value,
      status:event.target.status.value,
    }

    const id = this.state.currentbook._id;
axios 
// .put(`https://book-system1.herokuapp.com/update/${id}`,obj)
 .put(`${process.env.REACT_APP}update/${id}`,obj)

.then(result=>{
  return this.setState({
    books: result.data,
  });
  // this.props.onbooksChange(result)
})
.catch(err=>{
  console.log(err);
})
  }
  addBook=(event)=>{
    event.preventDefault();
    let obj={
      title : event.target.title.value,
          des : event.target.description.value,
          status:event.target.status.value,
    
    
    }
    
    axios
       
        .post(`${process.env.REACT_APP}addbook`, obj)
    
        .then(result =>{
          
            // this.props.onbooksChange(result.data)
            return this.setState({
              books: result.data,
            });
          
        })
        .catch(err=>{
          console.log(err);
        })
      }
    
    


  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount = () => {
    axios
      .get(`${process.env.REACT_APP}books`)
      .then((result) => {
        this.setState({
          books: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div  id="CarouselDiv">
         <button onClick={this.openAddform}>Add Book</button>
        {this.state.books.length ? (
          <div id="secondaryDiv" style={{ width: "400px" }}>
            <Carousel fade>
              {this.state.books.map((item) => {
                return(
                <Carousel.Item>
                 <img
                        className="d-block w-100"
                        src={require("./img 2.jpg")}
                        alt="Slide"
                      />
                  
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.status}</p>
                   
                    <button onClick={() => this.openForm(item)}>Update</button>
                    <button onClick={() => this.deleteBook(item._id)}>
                      Delete Book
                    </button>
                  </Carousel.Caption>
                </Carousel.Item>
                )
              })}
            </Carousel>
       
          </div>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <UpdatForm
        show = {this.state.showFlag}
        handleClose = {this.handleClose}
         Updatebook= {this.updatebook}
        currentbooks = {this.state.currentbook}
        />
             <AddForm show = {this.state.showAddForm}

        handleClose = {this.handleCloseAdd}
         addBook= {this.addBook}
        />
      </div>
    );
  }
}

export default BestBooks;