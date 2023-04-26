import axios from 'axios';
import React from 'react'

export default function Add() {
  const submitHandler = (event) => {
    event.preventDefault();
    const image = event.target.image.files[0];
    const formData = new FormData();
    formData.append("name", "Testing");
    formData.append("image", image);
    axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/upload`, formData
    ).then(
      () => {

      }
    ).catch(
      () => {

      }
    )
  }
  return (
    <div className='container mt-5'>
      <div className="card p-2 rounded-1">
        <div className='card-heading h4 ps-2 mb-0'>
          Add Category
        </div>
        <hr />
        <div className="card-body">
          <form encType='multipart/form-data' onSubmit={submitHandler}>
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">Product Image</label>
                <input type="file" name="image" className="form-control" />
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
