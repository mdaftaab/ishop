import React, { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../../Context/ContextHolder';
import { addCategory, getCategory, updateCategory } from '../../../Apis/category';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const { notify } = useContext(MainContext);
    const [oldData, setOldData] = useState({});
    const naviagte = useNavigate();
    const slugBox = useRef();
    const { id } = useParams();
    const getData = (event) => {
        const arr = event.target.value.toLowerCase().split(" ");
        slugBox.current.value = arr.length > 1 ? arr.join("-") : arr.toString();
    }

    const submitForm = (event) => {

        event.preventDefault();
        const formData = new FormData();
        formData.append("name", event.target.category_name.value);
        formData.append("slug", event.target.category_slug.value);
        formData.append("image", event.target.image.files[0]);
        formData.append("old_image_name", event.target.old_image_name.value);
        updateCategory(id, formData)
            .then(
                (success) => {
                    notify(success.data.msg, success.data.status);
                    naviagte("/admin/category");
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
            if (id !== undefined) {
                getCategory(id)
                    .then(
                        (success) => {
                            if (success.data.status == 1) {
                                setOldData({ path: success.data.path, ...success.data.category });
                            }
                        }
                    ).catch(
                        (error) => {
                        }
                    )

            }
        },
        []
    )
    return (
        <div className='container mt-5'>
            <div className="card p-2 rounded-1">
                <div className='card-heading h4 ps-2 mb-0'>
                    Update Category
                </div>
                <hr />
                <div className="card-body">
                    <form action="" onSubmit={submitForm} encType='multipart/form-data'>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label htmlFor="" className="form-label">Category Name</label>
                                <input type="text" name="category_name" className="form-control" placeholder="Category name" onKeyUp={getData} value={oldData?.name} onChange={
                                    (e) => {
                                        setOldData(
                                            {
                                                ...oldData,
                                                name: e.target.value
                                            }
                                        )
                                    }
                                } />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="" className="form-label">Category Slug</label>
                                <input type="text" name="category_slug" className="form-control" readOnly={true} ref={slugBox} placeholder="Category slug" value={oldData?.slug} />
                            </div>
                            <input type="hidden" value={oldData.image} name="old_image_name" />
                            <div className="col-12 mb-3">
                                <label htmlFor="" className="form-label">Category Image</label>
                                <input type="file" name="image" className='form-control' />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="">Old Image</label>
                                <img src={`${oldData?.path}/${oldData.image}`} className='d-block mt-2' />
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
