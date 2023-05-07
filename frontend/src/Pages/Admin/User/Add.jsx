import React, { useContext } from 'react'
import { MainContext } from '../../../Context/ContextHolder';
import { addUser } from '../../../Apis/user';

export default function Add() {
  const { notify } = useContext(MainContext)

  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.user_name.value);
    formData.append("email", event.target.user_email.value);
    formData.append("age", event.target.user_age.value);
    formData.append("image", event.target.image.files[0]);
    addUser(formData)
      .then(
        (success) => {
          notify(success.data.msg, success.data.status);
          if (success.data.status == 1) event.target.reset();
        }
      )
      .catch(
        (error) => {
          notify(error.data.msg, error.data.status);
        }
      )
  }
  return (
    <div className='container mt-5'>
      <div className="card p-2 rounded-1">
        <div className='card-heading h4 ps-2 mb-0'>
          Add User
        </div>
        <hr />
        <div className="card-body">
          <form action="" onSubmit={submitForm} encType='multipart/form-data'>
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">User Name</label>
                <input type="text" name="user_name" className="form-control" placeholder="User name" />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">User Email</label>
                <input type="email" name="user_email" className="form-control" placeholder="User email" />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">User Age</label>
                <input type="text" name="user_age" className="form-control" placeholder="User age" />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">User Profile</label>
                <input type="file" name="image" className='form-control' />
              </div>
              <div>
                <button className='btn btn-primary'>Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
