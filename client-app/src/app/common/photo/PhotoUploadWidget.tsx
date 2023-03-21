import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, Grid, ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { theme } from "../themes/theme";
import PhotoCropper from "./PhotoCropper";
import PhotoDropzone from "./PhotoDropzone";

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
    open: boolean;
    handleClose: (open: boolean) => void;
}

export default observer(function PhotoUploadWidget({ loading, uploadPhoto, open, handleClose }: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => {
                return URL.revokeObjectURL(file.preview);
            });
        }
    }, [files])

    return (
        <ThemeProvider theme={theme}>
            <Dialog fullWidth open={open} onClose={() => handleClose(false)} >
                <Card>
                    <CardHeader
                        sx={{
                            textAlign: "center",
                            backgroundColor: "hotpink",
                            color: "white"
                        }}
                        title="Upload image"
                        titleTypographyProps={{
                            display: "inline-block",
                            fontSize: "13pt",
                            fontWeight: "bold"
                        }}
                    />
                    <CardContent>
                        <Grid container>
                            <Grid xs={12} >
                                <Typography color="hotpink" sx={{ marginBottom: "2vh" }}>Add Photo</Typography>
                                <PhotoDropzone setFiles={setFiles} />
                            </Grid>
                            <Grid sx={{ mt: "5vh" }} xs={5.9}>
                                <Typography color="hotpink" sx={{ marginBottom: "2vh" }}>Resize image</Typography>
                                {files && files.length > 0 &&
                                    <PhotoCropper setCropper={setCropper} imagePreview={files[0].preview} />
                                }
                            </Grid>
                            <Grid xs={0.2} />
                            <Grid sx={{ mt: "5vh" }} xs={5.9}>
                                <Typography color="hotpink" sx={{ marginBottom: "2vh" }}>Preview</Typography>
                                {files && files.length > 0 &&
                                    <>
                                        <div className="img-preview" style={{ height: 200, overflow: "hidden" }} />
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                    <DialogActions>
                        {files && files.length > 0 &&
                            <Box>
                                <Button variant="contained" onClick={onCrop} >Ok</Button>
                                <Button disabled={loading} onClick={() => {
                                    setFiles([]);
                                    handleClose(false);
                                }}>
                                    Cancel
                                </Button>
                            </Box>
                        }
                    </DialogActions>
                </Card>
            </Dialog>

        </ThemeProvider>
    );
}) 