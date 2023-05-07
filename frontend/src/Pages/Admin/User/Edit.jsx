import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../Context/ContextHolder';
import { getUser, updateUser } from '../../../Apis/user';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const { notify } = useContext(MainContext);
    const [oldData, setOldData] = useState({});
    const naviagte = useNavigate();
    const { id } = useParams();

    const submitForm = (event) => {

        event.preventDefault();
        const formData = new FormData();
        formData.append("name", event.target.user_name.value);
        formData.append("email", event.target.user_email.value);
        formData.append("age", event.target.user_age.value);
        formData.append("image", event.target.image.files[0]);
        formData.append("old_image_name", event.target.old_image_name.value);
        updateUser(id, formData)
            .then(
                (success) => {
                    notify(success.data.msg, success.data.status);
                    naviagte("/admin/user");
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
                getUser(id)
                    .then(
                        (success) => {
                            if (success.data.status == 1) {
                                setOldData({ path: success.data.path, ...success.data.user });
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
                    Update User
                </div>
                <hr />
                <div className="card-body">
                    <form action="" onSubmit={submitForm} encType='multipart/form-data'>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label htmlFor="" className="form-label">User Name</label>
                                <input type="text" name="user_name" className="form-control" placeholder="User name" onKeyUp={getData} value={oldData?.name} onChange={
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
                                <label htmlFor="" className="form-label">User Email</label>
                                <input type="email" name="user_email" className="form-control" placeholder="User email" value={oldData?.email} />
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="" className="form-label">User Age</label>
                                <input type="text" name="user_age" className="form-control" placeholder="User age" value={oldData?.age} />
                            </div>
                            <input type="hidden" value={oldData.image} name="old_image_name" />
                            <div className="col-12 mb-3">
                                <label htmlFor="" className="form-label">User Profile</label>
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
