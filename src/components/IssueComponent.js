import React,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Col,Row } from 'reactstrap';
import Loading from './LoadingComponent';


class Issue extends Component {

    constructor(props){
        super(props);
        this.state={
        isbn: '',
        studentID: '',
        usersList: []
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({usersList: this.props.users.filter((user)=>(!user.admin))})
      }


render(){
    if (this.state.usersList.length === 0) {
        return(<div style={{marginTop: 70}}> no users are registered </div>)
    } else if (this.props.booksLoading||this.props.usersLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.booksErrMess) {
        return(
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12">
                        <br/><br/><br/><br/>
                        <h3>{this.props.booksErrMess}</h3>
                    </div>
                </div>
            </div>
        );
    }
    else if (this.props.usersErrMess) {
        return(
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12">
                        <br/><br/><br/><br/>
                        <h3>{this.props.usersErrMess}</h3>
                    </div>
                </div>
            </div>
        );
    }
    else
   {
    const bookoptions= this.props.books.map((book,index)=>(<option 
    key={book.isbn}>{book.isbn}</option>));
    const defaultBook=this.props.books[0];
    
    this.state.usersList.map((user,index)=>(
    <option key={user.studentID}>
        {user.studentID}
    </option>))
    if(this.state.isbn==='') {
        this.setState({isbn: defaultBook.isbn,studentID: this.state.usersList[0].studentID  });
    }
    return (
    <div className="container full">
    <div className="row justify-content-center heading">
    <div className="col-12">
  <h3 align="center">  Issue book</h3>
  </div>
    </div>
    <div className="row row-content justify-content-center">
    <Form onSubmit={(e) => {
        let bookid=this.props.books.filter((book)=>(book.isbn===this.state.isbn))[0]._id
        let studentId=this.props.users.filter((user)=>(user.studentID===this.state.studentID))[0]._id;
        this.props.postIssue(bookid,studentId);
        e.preventDefault();
    }}>

        <FormGroup row>
          <Label htmlFor="isbn"> ISBN No. of book</Label>
            <Input type="select" defaultValue={defaultBook.name} name="isbn" id="isbn" className="form-control" onInput={(e)=>{this.setState({isbn: e.target.value})}}>
                  {bookoptions}
            </Input>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="studentID"> Student ID </Label>
            <Input type="select" id="studentID" 
                   className="form-control" onInput={(e)=>{this.setState({studentID: e.target.value})}}>
                   {this.state.usersList}
            </Input>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="name"> Name of book </Label>
             <Input type="text" id="name" name="name"
                    placeholder="Name of Book" defaultValue={defaultBook.name}
                    value={!this.state.isbn?''
                    :this.props.books.filter((book)=>(book.isbn===this.state.isbn))[0].name}
                    className="form-control" disabled/>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="author"> Authors </Label>
            <Input type="text" id="author" name="author"
                   placeholder="Name of authors" 
                   defaultValue={defaultBook.author}
                   value={!this.state.isbn?''
                   :this.props.books.filter((book)=>(book.isbn===this.state.isbn))[0].author}
                    className="form-control" disabled/>
         </FormGroup>
         <FormGroup row>
          <Label htmlFor="name_student"> Name of student </Label>
            <Input type="text" id="name_student" name="name_student"
                   placeholder="Name of student" 
                   defaultValue={this.state.usersList[0]?.firstname+' '+this.state.usersList[0]?.lastname}
                   value={!this.state.studentID?''
                   :this.props.users.filter((user)=>(user.studentID===this.state.studentID))[0].firstname+' '+
                   this.props.users.filter((user)=>(user.studentID===this.state.studentID))[0].lastname}
                    className="form-control" disabled/>
         </FormGroup>
         <FormGroup row>
          <Label htmlFor="username"> Username of student </Label>
            <Input type="text" id="username" name="username"
                   placeholder="Username of student" 
                   defaultValue={this.state.usersList[0]?.username}
                   value={!this.state.studentID?''
                   :this.props.users.filter((user)=>(user.studentID===this.state.studentID))[0].username}
                    className="form-control" disabled/>
         </FormGroup>
         <Row className="align-self-center">
            <Col className="text-center">
              <Button type="submit" className="bg-primary">
                            Submit
               </Button>
            </Col>
        </Row>
      </Form>
     </div>
     <br/>
    </div>
 );

}
}
}

export default Issue;
