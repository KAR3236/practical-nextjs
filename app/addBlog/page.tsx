"use client";
import { useRouter } from "next/navigation";
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { Form } from "../Components/Form";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addEditBlogValidation } from "../Validations/blogValidation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, listOfBlog, showLoader } from "../Redux/Slice/blogSlice";
import { addBlogAPI, listOfBlogAPI } from "../APIs/blogAPIs";

export default function AddBlog() {
  const navigate = useRouter();

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state?.loader?.loader);

  // Formik for validation and handle event by user
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      publised_date: "",
      modify_date: "",
      status: "",
      category: "",
      author: "",
    },
    validationSchema: addEditBlogValidation,
    onSubmit: (values) => {
      dispatch(showLoader());
      addBlogAPI(values)
        .then((blogData: any) => {
          if (blogData?.data?.statusCode === 201) {
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
          if (error.response?.data?.statusCode === 400) {
            toast.error(error?.response?.data?.message[0]);
          } else {
            toast.error(error?.response?.data?.message);
          }
        })
        .finally(() => {
          dispatch(hideLoader());
        });
    },
  });

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
        <Form onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
            <h1 style={{ padding: 20, textAlign: "center", fontSize: 25 }}>
              Create new blog
            </h1>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="title"
              name="title"
              type="title"
              label="Title"
              placeholder="Blog 1"
              style={{ padding: 10 }}
              value={formik?.values?.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik?.touched?.title && formik?.errors?.title ? (
              <div style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}>
                {formik?.errors?.title}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              type="description"
              label="Description"
              placeholder="Enter description"
              style={{ padding: 10 }}
              value={formik?.values?.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik?.touched?.description && formik?.errors?.description ? (
              <div style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}>
                {formik?.errors?.description}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              name="publised_date"
              id="publised_date"
              label="Publised Date"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ padding: 10 }}
              value={formik?.values?.publised_date}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik?.touched?.publised_date && formik?.errors?.publised_date ? (
              <div style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}>
                {formik?.errors?.publised_date}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              name="modify_date"
              id="modify_date"
              label="Publised Date"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ padding: 10 }}
              value={formik?.values?.modify_date}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik?.touched?.modify_date && formik?.errors?.modify_date ? (
              <div style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}>
                {formik?.errors?.modify_date}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              id="status"
              name="status"
              label="Status"
              helperText="Please select your status"
              style={{ padding: 10 }}
              value={formik?.values?.status}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <MenuItem value="Publish">Publish</MenuItem>
              <MenuItem value="Unpublish">Unpublish</MenuItem>
            </TextField>
            {formik?.touched?.status && formik?.errors?.status ? (
              <div style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}>
                {formik?.errors?.status}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="category"
              name="category"
              type="category"
              label="category"
              placeholder="Enter category"
              style={{ padding: 10 }}
              value={formik?.values?.category}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik?.touched?.category && formik?.errors?.category ? (
              <div style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}>
                {formik?.errors?.category}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="author"
              name="author"
              type="author"
              label="author"
              placeholder="Enter author"
              style={{ padding: 10 }}
              value={formik?.values?.author}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik?.touched?.author && formik?.errors?.author ? (
              <div style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}>
                {formik?.errors?.author}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              style={{ color: "black" }}
            >
              {isLoading ? <CircularProgress size={25} /> : "Add"}
            </Button>
          </Grid>
          <hr className="my-4"></hr>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Link
              href="/dashboard"
              className="bg-indigo-500 hover:bg-indigo-700"
              style={{ color: "white", padding: 8 }}
            >
              Back
            </Link>
          </Grid>
        </Form>
      </Grid>
    </Paper>
  );
}
