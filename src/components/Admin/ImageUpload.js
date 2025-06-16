"use client";
import { useState } from "react";
import { Upload, Button, message, Image } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

export default function ImageUpload({ value, onChange, listType = "picture", maxCount = 1 }) {
  const [fileList, setFileList] = useState(value ? [{ uid: "1", url: value, status: "done" }] : []);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Get the URL of the uploaded file
    if (newFileList.length > 0) {
      const file = newFileList[newFileList.length - 1];
      if (file.status === "done" && file.response) {
        onChange(file.response.url);
      } else if (file.url) {
        onChange(file.url);
      }
    } else {
      onChange(null);
    }
  };

  const handleRemove = () => {
    setFileList([]);
    onChange(null);
  };

  const uploadProps = {
    listType,
    fileList,
    maxCount,
    multiple: false,
    beforeUpload: (file) => {
      // Check file type
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ được tải lên file ảnh!");
        return false;
      }

      // Check file size (max 5MB)
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Ảnh phải nhỏ hơn 5MB!");
        return false;
      }

      // For demo purposes, we'll create a blob URL
      // In production, you would upload to a real server or cloud storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile = {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: e.target.result,
          response: { url: e.target.result },
        };
        setFileList([newFile]);
        onChange(e.target.result);
      };
      reader.readAsDataURL(file);

      return false; // Prevent default upload
    },
    onChange: handleChange,
    onRemove: handleRemove,
  };

  return (
    <div>
      <Upload {...uploadProps}>{fileList.length < maxCount && <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>}</Upload>

      {value && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Ảnh hiện tại:</span>
            <Button type="text" icon={<DeleteOutlined />} size="small" onClick={handleRemove} danger>
              Xóa
            </Button>
          </div>
          <Image src={value} alt="Preview" width={200} height={120} style={{ objectFit: "cover" }} className="rounded border" />
        </div>
      )}
    </div>
  );
}
