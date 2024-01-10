"use client";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { hideLoader, showLoader, viewBlog } from "../Redux/Slice/blogSlice";
import { viewBlogAPI } from "../APIs/blogAPIs";
import { toast } from "react-toastify";
import { constant } from "../Utils/constants";

export default function ViewBlog() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  //Redux
  const dispatch = useDispatch();
  const { loader, data } = useSelector((state: any) => state?.blog);

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

  let rows;

  if (loader) {
    rows = <CircularProgress size={25} />;
  } else {
    rows = (
      <div>
        <p>
          <b>{constant.TITLE}:</b> {data?.title}
        </p>
        <p>
          <b>{constant.DESCRIPTION}:</b> {data?.description}
        </p>
        <p>
          <b>Publised Date:</b> {data?.publised_date}
        </p>
        <p>
          <b>Modify Date:</b> {data?.modify_date}
        </p>
        <p>
          <b>{constant.STATUS}:</b> {data?.status}
        </p>
        <p>
          <b>{constant.CATEGORY}:</b> {data?.category}
        </p>
        <p>
          <b>{constant.AUTHOR}:</b> {data?.author}
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
          <Box sx={{ height: 200 }}>{rows}</Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
