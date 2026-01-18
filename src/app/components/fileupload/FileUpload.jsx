import axios from "axios";
import React, { useState } from "react";
import { generateSignedUrl } from "../../../constants";
import "./fileupload.css";
import { useTheme } from "../../context/ThemeProvider";

export default function FileUpload({ value, onChange, id }) {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const { isDayMode } = useTheme;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const token = sessionStorage.getItem("token");
    if (!file) return alert("Select a file first");
    const isImage = /^image\/(png|jpe?g|gif|webp|bmp|svg\+xml|tiff?)$/i.test(
      file.type,
    );
    // Step 1: get signed URL from backend
    const res = await axios.post(
      generateSignedUrl,
      {
        FileName: file.name,
        folderprefix: isImage ? "Images/" : "Documents/",
        ContentType: file.type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-amz-acl": "public-read",
        },
      },
    );
    const { uploadUrl, fileUrl } = res.data;
    const uploadRes = await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
        Authorization: `Bearer ${token}`,
        "x-amz-acl": "public-read",
      },
    });
    if (uploadRes.status == 200) {
      onChange(fileUrl, id);
      if (isImage) setImgUrl(fileUrl);
    }
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        className="block w-full text-sm text-gray-600
         file:mr-4 file:py-1 file:px-4
        file:border-0
         file:bg-gray-600 file:text-white
         file:font-small file:mt-2
         hover:file:bg-gray-700"
        onChange={handleFileChange}
      />
      <button className="bg-orange-600 px-4" onClick={handleUpload}>
        Upload
      </button>

      {imgUrl && (
        <div>
          <img className="img-preview" src={imgUrl} alt="Uploaded" width="50" />
        </div>
      )}
    </div>
  );
}
