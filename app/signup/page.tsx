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
import Link from "next/link";
import { useFormik } from "formik";
import { registrationValidation } from "../Validations/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";
import { registrationAPI } from "../APIs/userAPIs";

const Registration = () => {
  const navigate = useRouter();

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state?.loader?.loader);

  // Formik for validation and handle event by user
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      dob: "",
      role: "",
    },
    validationSchema: registrationValidation,
    onSubmit: (values) => {
      dispatch(showLoader());
      registrationAPI(values)
        .then((registerData: any) => {
          if (registerData?.data?.statusCode === 201) {
            toast.success(registerData?.data?.message);
            navigate.push("/");
          } else {
            toast.error(registerData?.data?.message);
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
                Create new account
              </h1>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="email"
                placeholder="name@example.com"
                style={{ padding: 10 }}
                value={formik?.values?.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.email && formik?.errors?.email ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.email}
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                type="password"
                label="password"
                placeholder="Enter password"
                style={{ padding: 10 }}
                value={formik?.values?.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.password && formik?.errors?.password ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.password}
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="first_name"
                name="first_name"
                type="text"
                label="First Name"
                placeholder="Enter your first name"
                style={{ padding: 10 }}
                value={formik?.values?.first_name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.first_name && formik?.errors?.first_name ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.first_name}
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="last_name"
                name="last_name"
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                style={{ padding: 10 }}
                value={formik?.values?.last_name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.last_name && formik?.errors?.last_name ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.last_name}
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                name="dob"
                id="dob"
                label="DOB"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ padding: 10 }}
                value={formik?.values?.dob}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik?.touched?.dob && formik?.errors?.dob ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.dob}
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                id="role"
                name="role"
                label="Role"
                helperText="Please select your role"
                style={{ padding: 10 }}
                value={formik?.values?.role}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </TextField>
              {formik?.touched?.role && formik?.errors?.role ? (
                <div
                  style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}
                >
                  {formik?.errors?.role}
                </div>
              ) : null}
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                style={{ color: "black" }}
              >
                {isLoading ? <CircularProgress size={25} /> : "Sign Up"}
              </Button>
            </Grid>
            <hr className="my-4"></hr>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Link
                className="bg-sky-500 hover:bg-sky-700"
                style={{ padding: 8 }}
                href="/"
              >
                Log in
              </Link>
            </Grid>
          </Form>
        </Grid>
      </Paper>
  );
};

export default Registration;
