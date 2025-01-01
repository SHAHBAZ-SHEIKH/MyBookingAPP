import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Imimport { ToastContainer, toast } from "react-toastify"; // Import Toastify

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path);
  const [list, setList] = useState([]); // Initialize as empty array

  const { data, loading, error } = useFetch(`http://localhost:3003/api/${path}`);
  console.log("data",data)

  useEffect(() => {
    if (data) {
      setList(data); // Only set if data is available
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/api/${path}/${id}`,
        { withCredentials: true }
      );
      setList(list.filter((item) => item._id !== id)); 
      toast.success("User deleted successfully!");// Filter out the deleted item
    } catch (err) {
      toast.error("Failed to delete user. Please try again.");
      console.log(err); // You may want to add error handling here
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div> // Optional loading state
      ) : error ? (
        <div>Error loading data.</div> // Optional error state
      ) : (
        <DataGrid
          className="datagrid"
          rows={list || []} // Ensure rows is never undefined
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};

export default Datatable;
