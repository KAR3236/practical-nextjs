"use client";
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Form } from "../Components/Form";
import { activeUserValidation } from "../Validations/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";
import { activeUserAPI } from "../APIs/userAPIs";
import { constant } from "../Utils/constants";

export default function ActiveUser() {
  const navigate = useRouter();

  //Redux
  const dispatch = useDispatch();
  const { loader } = useSelector((state: any) => state?.loader);

  // Formik for validation and handle event by user
  const formik = useFormik({
    initialValues: {
      email: "",
      status: "true",
    },
    validationSchema: activeUserValidation,
    onSubmit: (values) => {
      dispatch(showLoader());
      activeUserAPI(values)
        .then((activeUserData: any) => {
          if (activeUserData?.data?.statusCode === 202) {
            toast.success(activeUserData?.data?.message);
            navigate.push("/");
          } else {
            toast.error(activeUserData?.data?.message);
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
              {constant.ACTIVE_ACCOUNT}
            </h1>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id={constant.EMAIL}
              label={constant.EMAIL}
              type={constant.EMAIL.toLowerCase()}
              name={constant.EMAIL.toLowerCase()}
              placeholder="name@example.com"
              style={{ padding: 10 }}
              value={formik?.values?.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik?.touched?.email && formik?.errors?.email ? (
              <div style={{ color: "red", paddingLeft: 10, paddingBottom: 10 }}>
                {formik?.errors?.email}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              id={constant.STATUS}
              label={constant.STATUS}
              name={constant.STATUS.toLowerCase()}
              helperText="Please select your status"
              style={{ padding: 10 }}
              value={formik?.values?.status}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <MenuItem value="true">{constant.ACTIVE}</MenuItem>
              <MenuItem value="false">{constant.DEACTIVE}</MenuItem>
            </TextField>
            {formik?.touched?.status && formik?.errors?.status ? (
              <div style={{ color: "red", paddingBottom: 10 }}>
                {formik?.errors?.status}
              </div>
            ) : null}
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              style={{ color: "black" }}
            >
              {loader ? <CircularProgress size={25} /> : constant.SUBMIT}
            </Button>
          </Grid>
          <hr className="my-4"></hr>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Link
              className="bg-sky-500 hover:bg-sky-700"
              style={{ padding: 8 }}
              href="/"
            >
              {constant.LOGIN}
            </Link>
          </Grid>
        </Form>
      </Grid>
    </Paper>
  );
}
