import axios from 'axios';
import React, { useRef, useState, useEffect, useContext } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MainContext } from '../../../Context/ContextHolder';

import { getCategory } from '../../../Apis/category';
import { addProduct } from '../../../Apis/product';
export default function Add() {
  const { notify } = useContext(MainContext)

  const descBox = useRef();
  const [category, setCategory] = useState([]);
  const submitHandler = (event) => {
    event.preventDefault();
    const image = event.target.image.files[0];
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("description", event.target.description.value);
    formData.append("category", event.target.category.value);
    formData.append("o_price", event.target.o_price.value);
    formData.append("d_price", event.target.d_price.value);
    formData.append("image", image);
    addProduct(formData)
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

  useEffect(
    () => {
      getCategory()
        .then(
          (success) => {
            setCategory(success.data.category);
          }
        )
        .catch(
          (error) => {
            setCategory([]);
          }
        )
    },
    []
  )

  return (
    <div className='container mt-5'>
      <div className="card p-2 rounded-1">
        <div className='card-heading h4 ps-2 mb-0'>
          Add Product
        </div>
        <hr />
        <div className="card-body">
          <form encType='multipart/form-data' onSubmit={submitHandler}>
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">Name</label>
                <input type="text" name='name' className="form-control" />
              </div>
              <div className="col-4 mb-3">
                <label htmlFor="" className="form-label">Category</label>
                <select name="category" id="" className='form-control'>
                  <option value={null}>Select a category</option>
                  {
                    category.map(
                      (cat, index) => {
                        return <option key={index} value={cat._id}>{cat.name}</option>
                      }
                    )
                  }
                </select>
              </div>
              <div className="col-4 mb-3">
                <label htmlFor="" className="form-label">Original Price</label>
                <input type="number" name='o_price' min={1} className='form-control' />
              </div>
              <div className="col-4 mb-3">
                <label htmlFor="" className="form-label">Discounted Price</label>
                <input type="number" name='d_price' className='form-control' />
              </div>
              <div className="col-4 mb-3"></div>
              <div className="col-12 mb-3">
                <label className="form-label">Description</label>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    descBox.current.value = data;
                  }}
                />
              </div>
              <textarea name="description" id="" ref={descBox} cols="30" rows="10" hidden></textarea>
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
