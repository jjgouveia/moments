import {
  Button,
  Drawer,
  Empty,
  Input,
  Popconfirm,
  Space,
  message,
  notification,
} from "antd";

import React, { ChangeEvent, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ToastHands from "../../assets/toast-hands.svg";
import { MomentFornData } from "../../types/MomentFormData";

import { createMoment } from "../../services/moment.service";
import "./styles.css";

const NewMomentDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

  const { handleSubmit, reset, setValue } = useForm<MomentFornData>();

  const showDrawer = () => {
    setOpen(true);
    setLoading(true);
  };

  const clearInputs = () => {
    reset();
    setTitle("");
    setCaption("");
    setPreviewImage(undefined);
  };

  const onClose = () => {
    clearInputs();
    setOpen(false);
    setLoading(false);

  };


  type InputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  const inputHandler: InputHandler = useMemo(
    () => (event) => {
      const { name, value } = event.target;

      if (name === 'title') {
        setTitle(value);
      }
      if (name === 'caption') {
        setCaption(value);
      }
      setValue(name as "title" | "caption", value, { shouldValidate: true });
    },
    [setTitle, setCaption, setValue]
  );


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
      duration: 3,
    });
  };

  const onSubmit: SubmitHandler<MomentFornData> = async (data) => {
    const { token } = JSON.parse(localStorage.getItem("token") || "{}");
    const { status } = await createMoment(token, data);

    if (status === 201) {
      openNotification();
    }
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

  const confirm = () => {
    onClose();
  };

  const cancel = () => {
    message.success("Você fez uma ótima escolha!", 1.5);
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
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        style={{
          background: "#F0F2F5",
        }}
        closable={false}
        keyboard={false}
        footer={
          <Space>
            {title.length || caption.length || previewImage ? (
              <Popconfirm
                title="Cancelar compartilhamento?"
                description="Todos as informações serão perdidas."
                onConfirm={confirm}
                onCancel={cancel}
                okText="Sim"
                cancelText="Claro que não!"
              >
                <Button>Cancelar</Button>
              </Popconfirm>
            ) : (
              <Button onClick={onClose}>Cancelar</Button>
            )}
            <Button onClick={handleSubmit(onSubmit)} type="primary">
              Compartilhar
            </Button>
          </Space>
        }
      >
        {contextHolder}
        <div className="preview-image-container">
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="preview-image" />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Sem Foto"
            />
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
              <div className="file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                id="customFileInput"
              />
                <label htmlFor="customFileInput" className="custom-file-label">
                  Escolher arquivo
                </label>
              </div>
            </div>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default NewMomentDrawer;
