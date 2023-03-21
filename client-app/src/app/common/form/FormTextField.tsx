import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
    placeholder: string;
    name: string;
    defaultValue?: string;
    label?: string;
    type?: string;
    required?: boolean;
    multiline?: boolean;
    minRows?: number;
}

export default function FormTextField(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <>
            <TextField
                fullWidth
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                {...field}
                {...props}
            />
        </>
    );
}