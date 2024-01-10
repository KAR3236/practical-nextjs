"use client";
import Box from "@mui/material/Box";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Button, CircularProgress, Grid, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoader,
  listOfBlog,
  showLoader,
  viewBlog,
} from "../Redux/Slice/blogSlice";
import { deleteBlogAPI, listOfBlogAPI } from "../APIs/blogAPIs";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { viewUserAPI } from "../APIs/userAPIs";
import { viewUser } from "../Redux/Slice/userSlice";
import { constant } from "../Utils/constants";

export default function Dashboard() {
  const navigate = useRouter();
  //Redux
  const dispatch = useDispatch();
  const { loader, datas } = useSelector((state: any) => state?.blog);
  const { data } = useSelector((state: any) => state?.user);

  const fetchDataFromApi = () => {
    viewUserAPI()
      .then((viewUserData: any) => {
        if (viewUserData?.data?.statusCode === 200) {
          dispatch(viewUser(viewUserData?.data?.data));
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const fetchBlogDataFromApi = () => {
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

  useEffect(() => {
    // window.location.reload();
    fetchDataFromApi();
    dispatch(showLoader());
    fetchBlogDataFromApi();
  }, []);

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
      dispatch(viewUser({}));
      dispatch(listOfBlog([]));
      dispatch(viewBlog({}));
      Cookies.remove("loginToken");
      navigate.push("/");
    }
  };

  let columns: GridColDef[];

  if (data.role === constant.USER) {
    columns = [
      {
        field: constant.TITLE.toLowerCase(),
        headerName: constant.TITLE,
        width: 70,
      },
      {
        field: constant.DESCRIPTION.toLowerCase(),
        headerName: constant.DESCRIPTION,
        width: 120,
      },
      {
        field: "publised_date",
        headerName: constant.PUBLISED_DATE,
        width: 120,
      },
      { field: "modify_date", headerName: constant.MODIFY_DATE, width: 120 },
      {
        field: constant.STATUS.toLowerCase(),
        headerName: constant.STATUS,
        width: 70,
      },
      {
        field: constant.CATEGORY.toLowerCase(),
        headerName: constant.CATEGORY,
        width: 120,
      },
      {
        field: constant.AUTHOR.toLowerCase(),
        headerName: constant.AUTHOR,
        width: 120,
      },
      {
        field: constant.ACTIONS.toLowerCase(),
        type: constant.ACTIONS.toLowerCase(),
        headerName: constant.ACTIONS,
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
  } else {
    columns = [
      {
        field: "user.full_name",
        headerName: constant.USER,
        width: 130,
        valueGetter: (params) => params.row.user.full_name,
      },
      {
        field: constant.TITLE.toLowerCase(),
        headerName: constant.TITLE,
        width: 90,
      },
      {
        field: constant.DESCRIPTION.toLowerCase(),
        headerName: constant.DESCRIPTION,
        width: 150,
      },
      {
        field: "publised_date",
        headerName: constant.PUBLISED_DATE,
        width: 120,
      },
      { field: "modify_date", headerName: constant.MODIFY_DATE, width: 120 },
      {
        field: constant.STATUS.toLowerCase(),
        headerName: constant.STATUS,
        width: 100,
      },
      {
        field: constant.CATEGORY.toLowerCase(),
        headerName: constant.CATEGORY,
        width: 130,
      },
      {
        field: constant.AUTHOR.toLowerCase(),
        headerName: constant.AUTHOR,
        width: 120,
      },
    ];
  }

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
          <h1
            style={{
              padding: 20,
              textAlign: "center",
              fontSize: 20,
              backgroundColor: "lightgreen",
            }}
          >
            Logged In:{" "}
            {data.first_name ? (
              `${data.first_name} ${data.last_name}`
            ) : (
              <CircularProgress size={16} />
            )}
          </h1>
        </Grid>
        <Grid item xs={12}>
          <h1 style={{ padding: 20, textAlign: "center", fontSize: 25 }}>
            Blog Manager
          </h1>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: 20 }}>
          {data.role === constant.USER ? (
            <Link
              href="/addBlog"
              className="bg-sky-500 hover:bg-sky-700"
              style={{ padding: 8 }}
            >
              {constant.CREATE_BLOG}
            </Link>
          ) : (
            <></>
          )}
          <Button
            variant="contained"
            style={{
              color: "black",
              marginLeft: data.role === constant.USER ? 725 : 435,
            }}
            onClick={handleLogout}
            type="button"
          >
            Logout
          </Button>
        </Grid>
        <Grid item xs={12}>
          {loader ? (
            <Box
              sx={{ height: 400, width: "100%" }}
              style={{ textAlign: "center" }}
            >
              <CircularProgress size={25} />
            </Box>
          ) : (
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={datas}
                columns={columns}
                getRowId={(row) => {
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
