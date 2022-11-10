import { connect } from 'react-redux';
import { useLayoutEffect } from 'react';
import './App.css';
import { Navigate, Route, BrowserRouter as Router,Routes } from 'react-router-dom'
import ChatContainer from './components/chatContainer/chatContainer.component';
import SignIn from './components/signIn/signIn.component';
import SignUp from './components/signUp/signUp.component'
import LoadingIndicator from './components/loadingIndicator/loadingIndicator';
function App({ currentUser }) {

  console.log(currentUser)
  return (
    <Router>

      <div className="App">
        <Routes>

       <Route exact path='/' element={currentUser?<ChatContainer/>:<Navigate to='/signin'/>}/>
       <Route exact path='/signin' element={!currentUser?<SignIn/>:<Navigate to='/'/>}/>
       <Route exact path='/signup' element={!currentUser?<SignUp/>:<Navigate to='/'/>}/>
       <Route exact path='/li' element={<LoadingIndicator/>} />
        </Routes> 
      </div>
    </Router>
  ); 
}



const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})



export default connect(mapStateToProps, null)(App);