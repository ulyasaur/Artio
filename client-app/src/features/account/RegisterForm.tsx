import { observer } from "mobx-react-lite";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../app/common/themes/theme";
import { ErrorMessage, Formik } from "formik";
import { useStore } from "../../app/stores/store";
import { LoadingButton } from "@mui/lab";
import FormTextField from "../../app/common/form/FormTextField";
import * as Yup from "yup";

interface Props {
  setValue: any;
}

export default observer(function RegisterForm({setValue}: Props) {
  const { userStore } = useStore();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          initialValues={{ displayName: "", username: "", email: "", password: "", error: null }}
          onSubmit={(values, { setErrors }) => userStore.register(values).catch(error =>
            setErrors({ error }))}
          validationSchema={Yup.object({
            displayName: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
          })}
        >
          {({ handleSubmit, isSubmitting, errors }) => (
            <form autoComplete="false" onSubmit={handleSubmit}>
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormTextField
                        required
                        label="Display name"
                        placeholder="Display name"
                        name="displayName"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        required
                        label="Username"
                        placeholder="Username"
                        name="username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        required
                        label="Email"
                        placeholder="Email"
                        name="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormTextField
                        required
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ErrorMessage
                        name="error"
                        render={() =>
                          <Typography color="error">
                            {errors.error}
                          </Typography>}
                      />
                    </Grid>
                  </Grid>
                  <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign up
                  </LoadingButton>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link onClick={() => setValue("1")} variant="body2">
                        Already have an account? Log in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </form>)}
        </Formik>
      </Container>
    </ThemeProvider>
  );
})