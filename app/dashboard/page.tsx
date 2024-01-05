"use client";
import Box from "@mui/material/Box";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Button, CircularProgress, Grid, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, listOfBlog, showLoader } from "../Redux/Slice/blogSlice";
import { deleteBlogAPI, listOfBlogAPI } from "../APIs/blogAPIs";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useRouter();

  function handleDelete(id: number) {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      deleteBlogAPI(id)
        .then((blogData: any) => {
          if (blogData?.data?.statusCode === 200) {
            dispatch(hideLoader());
            toast.success(blogData?.data?.message);
            listOfBlogAPI().then((listOfBlogData: any) => {
              if (listOfBlogData?.data?.statusCode === 200) {
                dispatch(listOfBlog(listOfBlogData?.data?.data));
              }
            });
            navigate.push("/dashboard");
          } else {
            toast.error(blogData?.data?.message);
          }
        })
        .catch((error: any) => {
          if (error) {
            toast.error(error?.response?.data?.message);
          }
        })
        .finally(() => {
          dispatch(hideLoader());
        });
    }
  }

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      Cookies.remove("loginToken");
      navigate.push("/");
    }
  };

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state?.blog?.loader);
  const blogList = useSelector((state: any) => state?.blog?.datas);

  useEffect(() => {
    dispatch(showLoader());
    const fetchDataFromApi = () => {
      listOfBlogAPI()
        .then((listOfBlogData: any) => {
          if (listOfBlogData?.data?.statusCode === 200) {
            dispatch(listOfBlog(listOfBlogData?.data?.data));
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        })
        .finally(() => {
          dispatch(hideLoader());
        });
    };
    fetchDataFromApi();
    // window.location.reload();
  }, []);

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 70 },
    { field: "description", headerName: "Description", width: 120 },
    { field: "publised_date", headerName: "Publised Date", width: 120 },
    { field: "modify_date", headerName: "Modify Date", width: 120 },
    { field: "status", headerName: "Status", width: 70 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "author", headerName: "Author", width: 120 },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      width: 200,
      renderCell: (params: GridCellParams) => [
        <>
          <Link
            className="bg-sky-500 hover:bg-sky-700"
            style={{ padding: 8 }}
            href={{
              pathname: `/viewBlog`,
              query: {
                id: params.row.id,
              },
            }}
          >
            View
          </Link>
          <Link
            className="bg-orange-500 hover:bg-orange-700"
            style={{ padding: 8, margin: 8 }}
            href={{
              pathname: `/editBlog`,
              query: {
                id: params.row.id,
              },
            }}
          >
            Edit
          </Link>
          <Button
            className="bg-red-500 hover:bg-red-700"
            style={{ color: "black" }}
            onClick={() => handleDelete(params.row.id)}
            type="button"
          >
            Delete
          </Button>
        </>,
      ],
    },
  ];

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 1000,
        flexGrow: 1,
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <h1 style={{ padding: 20, textAlign: "center", fontSize: 25 }}>
            Blog Manager
          </h1>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: 20 }}>
          <Link
            href="/addBlog"
            className="bg-sky-500 hover:bg-sky-700"
            style={{ padding: 8, marginRight: 725 }}
          >
            Create New Blog
          </Link>
          <Button
            variant="contained"
            style={{ color: "black" }}
            onClick={handleLogout}
            type="button"
          >
            Logout
          </Button>
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <Box
              sx={{ height: 400, width: "100%" }}
              style={{ textAlign: "center" }}
            >
              <CircularProgress size={25} />
            </Box>
          ) : (
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={blogList}
                columns={columns}
                getRowId={(row) => {
                  console.log("row", row);
                  return row.id;
                }}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
