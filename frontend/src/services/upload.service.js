import axios from "axios";

export const uploadFile = (file, callback, errorCallback) => {
    const formData = new FormData();
    formData.append("image", file, file.name);

    axios
        .post("http://localhost:8000/api/upload", formData)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorCallback(error)
        })
}
