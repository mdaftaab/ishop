import React, { useContext, useEffect, useState } from 'react'
import { getCategory, deleteCategory } from '../../../Apis/category';
import { MainContext } from '../../../Context/ContextHolder';
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
export default function View() {
  const [categoryData, setCategoryData] = useState([]);
  const { toggleLoader } = useContext(MainContext);
  const { notify } = useContext(MainContext)
  const [imagePath, setPath] = useState("");
  let sr = 0;


  const deleteHandler = (id, imgName) => {
    deleteCategory(id, imgName)
      .then(
        (success) => {
          notify(success.data.msg, success.data.status);
          if (success.data.status) {
            getCategory()
              .then(
                (success) => {
                  setCategoryData(success.data.category);
                  setPath(success.data.path);
                  toggleLoader(false);
                }
              )
              .catch(
                (error) => {
                  // console.log(error);
                  setCategoryData([]);
                  toggleLoader(false);
                }
              )
          }
        }
      ).catch(
        (error) => {
          // notify(success.data.msg, success.data.status);
        }
      )
  }

  useEffect(
    () => {
      toggleLoader(true);
      getCategory()
        .then(
          (success) => {
            setCategoryData(success.data.category);
            setPath(success.data.path);
            toggleLoader(false);
          }
        )
        .catch(
          (error) => {
            // console.log(error);
            setCategoryData([]);
            toggleLoader(false);
          }
        )
    },
    []
  )

  return (
    <div class="p-3 table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Sr</th>
            <th scope="col">Name</th>
            <th scope="col">Slug</th>
            <th>Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            categoryData.map(
              (d) => {
                sr++;
                return <TableRow key={d._id} data={{ sr, ...d, imagePath }} del={() => deleteHandler(d._id, d.image)} />
              }
            )
          }
        </tbody>
      </table>
    </div>

  )
}

const TableRow = ({ data, del }) => {
  return <tr>
    <td>{data.sr}</td>
    <td>{data.name}</td>
    <td>{data.slug}</td>
    <td>
      <img src={data.imagePath + data.image} alt="" width={"100px"} />
    </td>
    <td>
      <AiFillDelete style={{ color: "red" }} onClick={del} />
      {"    "}
      <Link to={`/admin/category/edit/${data._id}`}>
        <BsFillPencilFill />
      </Link>
    </td>
  </tr>
}