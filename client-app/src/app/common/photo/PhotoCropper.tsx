import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { observer } from "mobx-react-lite";

interface Props {
    imagePreview: string;
    setCropper: (cropper : Cropper) => void;
    props?: {}
}

export default observer(function PhotoCropper({imagePreview, setCropper, props}: Props) {
    return (
        <Cropper
            src={imagePreview}
            style={{height: "100%", width: "100%"}}
            zoomable
            preview=".img-preview"
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            {...props}
            onInitialized={cropper => setCropper(cropper)}
        />
    );
})