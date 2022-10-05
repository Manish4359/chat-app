import logo from './logo.svg';
import './App.css';
import ContactsContainer from './components/contactsContainer/contactsContainer.component';
import SignInAndSignUp from './components/signInAndSignUp/signInAndSignUp.component';

function App() {
  let user='';
  return (
    <div className="App">
     {user?<ContactsContainer />:<SignInAndSignUp />}
    </div>
  );
}

export default App;
