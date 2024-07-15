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
                <h2 className="title">Quote of the day</h2>
                <div>
                  <p>"An organized space creates an organized mind. When you take the time to declutter and arrange your surroundings, you are investing in your own peace of mind and productivity. It's about creating a space where you can thrive, where creativity flows, and where you can accomplish your goals with clarity and ease."</p>
                </div>
              </div>
            </div>
          <div className="buttons">
            <Link to="/Login" className="button is-large is-info">Log In</Link>
          </div>
            <div className="columns is-vcentered">
              <div className="column">
                <h2 className="title is-3">How It Works</h2>
                <h3>
                Create the List
                </h3>
                <p>Write Down Tasks: Start by listing all the tasks you need to accomplish. These can range from daily chores to long-term projects.</p>
                <h3>
                Set Deadlines
                </h3>
                <p>Assign Due Dates: Allocate specific deadlines for each task to create a sense of urgency and help with time management.</p>
                <h3>
                Take Action
                </h3>
                <p>Check Off Completed Tasks: As you finish each task, mark it as completed. This provides a sense of accomplishment and motivates you to keep going.</p>
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