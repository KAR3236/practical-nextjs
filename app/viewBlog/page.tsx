"use client";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { hideLoader, showLoader, viewBlog } from "../Redux/Slice/blogSlice";
import { viewBlogAPI } from "../APIs/blogAPIs";
import { toast } from "react-toastify";

export default function ViewBlog() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state?.blog?.loader);
  const viewBlogData = useSelector((state: any) => state?.blog?.data);

  useEffect(() => {
    dispatch(showLoader());
    viewBlogAPI(id)
      .then((listOfBlogData: any) => {
        if (listOfBlogData?.data?.statusCode === 200) {
          dispatch(hideLoader());
          dispatch(viewBlog(listOfBlogData?.data?.data));
        }
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  }, []);

  let data;

  if (isLoading) {
    data = <CircularProgress size={25} />;
  } else {
    data = (
      <div>
        <p>
          <b>Title:</b> {viewBlogData.title}
        </p>
        <p>
          <b>Description:</b> {viewBlogData.description}
        </p>
        <p>
          <b>Publised Date:</b> {viewBlogData.publised_date}
        </p>
        <p>
          <b>Modify Date:</b> {viewBlogData.modify_date}
        </p>
        <p>
          <b>Status:</b> {viewBlogData.status}
        </p>
        <p>
          <b>Category:</b> {viewBlogData.category}
        </p>
        <p>
          <b>Author:</b> {viewBlogData.author}
        </p>
      </div>
    );
  }

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <h1 style={{ padding: 20, textAlign: "center", fontSize: 25 }}>
            View Blog
          </h1>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: 20, textAlign: "center" }}>
          <Link
            href="/dashboard"
            className="bg-sky-500 hover:bg-sky-700"
            style={{ padding: 8 }}
          >
            View All Projects
          </Link>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Box sx={{ height: 200 }}>{data}</Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
