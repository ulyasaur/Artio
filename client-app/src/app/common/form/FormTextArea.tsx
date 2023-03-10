import { TextareaAutosize, Typography } from "@mui/material";
import { useField } from "formik";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
    required?: boolean;
}

export default function FormTextArea(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <>
            <TextareaAutosize
                style={{
                    width: "100%",
                    resize: "none"
                }}
                minRows={6}
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
                <Typography color='red'>{meta.error}</Typography>
            ) : null}
        </>
    );
}