import React from 'react';
import { Link } from 'react-router-dom';
import todo_img from '../assets/wepik-photo-mode-2022109-112758.png'
import note_img from '../assets/13719.jpg'
import team_img from '../assets/4380.jpg'
const Features = () => {
  return ( 
    <>
    <div className="container-fluid mb-5 py-5 features-hero bg-light">
      <p className='text-center display-2 fw-bold mt-5 pt-5'>Get ahead with Do-day</p>
      <p className="text-center fs-3 col-8 mx-auto">A simple but powerful task management system for productive and organized work.</p>
      <div className="mx-auto mt-5" style={{width:'fit-content'}}>
      <Link to='/register' className="btn btn-dark">Join free to get started</Link>
      </div>
      
    </div>
    <div className="container">
      <h1 className='text-center mt-4 pt-5'>Features</h1>
      <div className="row g-0 py-4 my-5">
        <div className="col-6 my-3 shadow rounded grid-item-center card">
          <dl>
            <dt className='mb-4 fs-3'><i className="fa-solid fa-rectangle-list"></i> Tasks</dt>
            <dd>Create task</dd>
            <dd>Set deadline</dd>
            <dd>Assign task</dd>
            <dd>Monitor progress</dd>
          </dl>
        </div>
        <div className="col-6">
          <img src={todo_img} alt="note_img" className="img-fluid" />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row g-0 py-4 my-5">
      <div className="col-6">
          <img src={note_img} alt="note_img" className="img-fluid" />
        </div>
        <div className="col-6 my-3 shadow rounded grid-item-center card">
          <dl>
            <dt className='mb-4 fs-3'><i className="fa-solid fa-book"></i> Notes</dt>
            <dd>Write note</dd>
            <dd>Edit note</dd>
            <dd>Attach file</dd>
            <dd>Share</dd>
          </dl>
        </div>
        
      </div>
    </div>
    <div className="container">
      <div className="row g-0 py-4 my-5">
      <div className="col-6 my-3 shadow rounded grid-item-center card">
          <dl>
            <dt className='mb-4 fs-3'><i className="fa-solid fa-people-group"></i> Team</dt>
            <dd>Create team</dd>
            <dd>Add members</dd>
            <dd>Assign task</dd>
            <dd>Monitor progress</dd>
          </dl>
        </div>
        <div className="col-6">
          <img src={team_img} alt="note_img" className="img-fluid" />
        </div>
      </div>
    </div>
    </>
   );
}
 
export default Features;