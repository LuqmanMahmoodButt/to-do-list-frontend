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
                <div className='title'>"They Say"</div>
                <div>
                  <p>"Organizing isn't about perfection; it's about efficiency, reducing stress and clutter, saving time and money, and improving your overall quality of life. When you get organized, you reclaim control over your environment and your time, which allows you to focus on what truly matters."</p>

                </div>
              </div>
            </div>
            <div className="columns is-vcentered">
              <div className="column">
                <div className="title">"They Say"</div>
                <p>
                  The best way to get something done is to begin.
                  Start by getting yourself organized. Establish a sense of order and structure. Create a plan,
                  set goals, and prioritize your tasks. When your environment and mind are clear,
                  he path to achieving your objectives becomes much smoother and more manageable."
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