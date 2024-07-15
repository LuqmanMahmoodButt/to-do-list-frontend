import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'



const UserHome = () => {
    const token = localStorage.getItem('token');

    const getpayload = () => {
        const parts = token.split('.')
        return JSON.parse(atob(parts[1]))
    }

    
    function capitalise(str) {
       if (str.length === 0) {
        return str         
       } 
        return str.charAt(0).toUpperCase() + str.slice(1)
       }

       const username = capitalise(getpayload().user)

       return (
        <section className="hero is-fullheight is-light">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-1">
                Welcome to the Todo App, {username}!
              </h1>
              <h2 className="subtitle is-4">
                Start managing your tasks effectively
              </h2>
              <div className="buttons is-centered">
                <Link to="/lists" className="button is-large is-primary">View Your Todo Lists</Link>
              </div>
              <div className="content">
                <div className="columns is-vcentered">
                  <div className="column">
                    <figure className="image is-4by3">
                      <img src="https://img.freepik.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg" alt="Todo List Illustration" />
                    </figure>
                  </div>
                  <div className="column">
                    <div className='title'>Features</div>
                    <ul>
                      <li>Create and manage multiple todo lists</li>
                      <li>Add, edit, and delete items with priority levels</li>
                      <li>Organize tasks efficiently</li>
                      <li>Track your productivity</li>
                    </ul>
                  </div>
                </div>
                <div className="columns is-vcentered">
                  <div className="column">
                    <div className="title">How It Works</div>
                    <p>
                      Our Todo App helps you keep track of your tasks with ease. 
                      Simply create a list, add your tasks, and set their priorities. 
                      You can edit or delete tasks as you progress.
                    </p>
                  </div>
                  <div className="column">
                    <figure className="image is-4by3">
                      <img src="https://www.highgear.com/wp-content/uploads/2022/12/why-is-task-management-important-1.jpg" alt="Todo List Workflow" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    };
    
export default UserHome