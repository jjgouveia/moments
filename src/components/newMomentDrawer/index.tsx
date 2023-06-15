import { Button, Drawer, Input, Space, notification } from "antd";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ToastHands from "../../assets/toast-hands.svg";
import { MomentFornData } from "../../types/MomentFormData";

import "./styles.css";

const NewMomentDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [title, setTitle] = useState("");
  const [caption, setcaption] = useState("");

  const { handleSubmit, reset, setValue } =
    useForm<MomentFornData>();

  const showDrawer = () => {
    setOpen(true);
    setLoading(true);
  };

  const clearInputs = () => {
    reset();
    setTitle("");
    setcaption("");
    setPreviewImage(undefined);
  };

  const onClose = () => {
    clearInputs();
    setOpen(false);
    setLoading(false);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
      setValue("title", value, { shouldValidate: true });
    };
    if (name === "caption") {
      setcaption(value);
      setValue("caption", value, { shouldValidate: true });
    };
  };

  const openNotification = () => {
    api.open({
      message: "Cheers!",
      description: "Momento registrado com sucesso!",
      icon: (
        <img src={ToastHands} alt="Toast Hands" style={{ width: "28px" }} />
      ),
      placement: "topRight",
      style: {
        color: "#000000",
        boxShadow: "0px 0px 5px 0px #000000",
        height: "fit-content",
        width: "fit-content",
      },
    });
  };

  const onSubmit: SubmitHandler<MomentFornData> = async (data) => {
    // const { token } = JSON.parse(localStorage.getItem("token") || "{}");
    // const { status } = await createMoment(token, data);

    // if (status === 201) {
    //   openNotification();
    // }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = React.useState<string | undefined>(
    undefined
  );

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      setValue("photo", file);
    }
  };

  return (
    <>
      <Button
      className="header-button-wrapper"
      onClick={showDrawer}
      loading={loading}
      >
        <i className="fa-solid fa-champagne-glasses" />
        <span>Postar</span>
      </Button>
      <Drawer
        title="Compartilhe um momento"
        width={600}


        onClose={onClose}
        visible={open}
        bodyStyle={{ paddingBottom: 80 }}
        style={
          {
            background: "#F0F2F5",
          }
        }
        footer={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSubmit(onSubmit)} type="primary">
              Compartilhar
            </Button>
          </Space>
        }
      >
        {contextHolder}
        <div className="preview-image-container">
          {previewImage && (
            <img src={previewImage} alt="Preview" className="preview-image" />
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="form-entries">
            <div className="form-group">
              <Input
                placeholder="Título"
                name="title"
                id="title"
                allowClear
                maxLength={52}
                showCount
                required
                onChange={(e) => inputHandler(e)}
                value={title}

              />
            </div>
            <div className="form-group">
              <label>Descreva o momento</label>
              <Input.TextArea
                showCount
                allowClear
                maxLength={512}
                style={{ height: 120, resize: "none" }}
                name="caption"
                onChange={(e) => inputHandler(e)}
                value={caption}
              />
            </div>
            <div className="form-group">
              <label>Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default NewMomentDrawer;
