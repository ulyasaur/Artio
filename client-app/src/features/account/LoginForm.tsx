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
import { ErrorMessage, Formik } from "formik";
import { useStore } from "../../app/stores/store";
import { theme } from "../../app/common/themes/theme";
import { LoadingButton } from "@mui/lab";
import FormTextField from "../../app/common/form/FormTextField";

export default observer(function LoginForm() {
  const { userStore } = useStore();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          initialValues={{ username: "", password: "", error: null }}
          onSubmit={(values, { setErrors }) => userStore.login(values).catch(error =>
            setErrors({ error: "Invalid email or password" }))}
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
                  Log in
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
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
                    Log in
                  </LoadingButton>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="#" variant="body2">
                        Don't have an account? Sign up
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