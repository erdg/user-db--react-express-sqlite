import React, { Component } from 'react';
import './App.css';

class App extends Component {
   state = {
      email: "",
      passw: "",
      users: []
   }

   componentDidMount () {
      this.getUsers();
   }

   render() {
      return (
         <div className="App">
            <form
               onSubmit={this.onSubmit}
            >
               <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.onChange}
               />
               <input 
                  type="password"
                  name="passw"
                  placeholder="password"
                  value={this.state.passw}
                  onChange={this.onChange}
               />
               <button
                  type="submit"
                  onClick={this.onSubmit}
               > Add User
               </button>
            </form>
            {this.state.users.length !== 0 ?
               <ul>
                  {this.state.users.map(user => (
                     <li>{user.email} - {user.passw}</li>
                  ))}
               </ul>
                  :
               <p>There are no users</p>
            }
         </div>
      );
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   onSubmit = (e) => {
      e.preventDefault();
      console.log(this.state.email, this.state.passw);
      fetch("http://localhost:3001/new-user", {
         method: "POST",
         headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
         },
         body: JSON.stringify({
            email: this.state.email,
            passw: this.state.passw
         })
      })
         .then(() => {
            this.getUsers();
         })
   }

   getUsers = () => {
      fetch("http://localhost:3001/get-users")
         .then(res => res.json())
         .then(json => {
            this.setState({
               users: json.users
            })
         })
   }


}

export default App;
