import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <section className="hero is-fullheight is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            Welcome to the Ultimate Todo App
          </h1>
          <h2 className="subtitle">
            Organize your tasks efficiently and stay productive
          </h2>
          <div className="buttons is-centered">
            <Link to="/signup" className="button is-large is-info">Get Started</Link>
          </div>
          <div className="content">
            <div className="columns is-vcentered">
              <div className="column">
                <figure className="image">
                  <img src="https://images.fastcompany.com/image/upload/f_auto,c_fit,w_3840,q_auto/wp-cms/uploads/2023/05/p-1-90890188-your-to-do-list-is-sabotaging-your-true-productivity-heres-what-to-do-instead.jpg" alt="Todo List Illustration" />
                </figure>
              </div>
              <div className="column">
                <h2 className="title">Features</h2>
                <ul>
                  <li>Create and manage multiple todo lists</li>
                  <li>Add, edit, and delete items with priority levels</li>
                  <li>Organize tasks efficiently</li>
                </ul>
              </div>
            </div>
            <div className="columns is-vcentered">
              <div className="column">
                <h2 className="title is-3">How It Works</h2>
                <p>
                  Our Todo App helps you keep track of your tasks with ease. 
                  Simply create a list, add your tasks, and set their priorities. 
                  You can edit or delete tasks as you progress.
                </p>
              </div>
              <div className="column">
                <figure className="image">
                  <img src="https://media.npr.org/assets/img/2022/12/22/lk_harlan_to-do-list_final_slide-3afb79b27d7f583bc41eb4f3ba1c50c9d17877ae.jpg" alt="Todo List Workflow" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;