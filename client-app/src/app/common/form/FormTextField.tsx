import { TextField, Typography } from "@mui/material";
import { useField } from "formik";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
    required?: boolean;
}

export default function FormTextField(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <>
            <TextField
                fullWidth
                error={meta.touched} //&& meta.invalid
                helperText={meta.touched && meta.error}
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
                <Typography color='red'>{meta.error}</Typography>
            ) : null}
        </>
    );
}