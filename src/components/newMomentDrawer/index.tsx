import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Drawer,
  Space,
  notification
} from "antd";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ToastHands from "../../assets/toast-hands.svg";
import { createMoment } from "../../services/moment.service";
import { MomentFornData } from "../../types/MomentFormData";

import "./styles.css";

// interface FormValues {
//   title: string;
//   description: string;
//   image: File | null;
// }

const NewMomentDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  // const { handleSubmit, control, reset, setValue } = useForm<MomentFornData>();
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [api, contextHolder] = notification.useNotification();

  // const openNotification = () => {
  //   api.open({
  //     message: 'Cheers!',
  //     description:
  //       'Momento registrado com sucesso!',
  //     icon: <img src={ToastHands} alt="Toast Hands" style={{width: "28px"}} />,
  //     placement: 'topRight',
  //     style: {
  //       color: "#000000",
  //       boxShadow: "0px 0px 5px 0px #000000",
  //       height: "fit-content",
  //       width: "fit-content",
  //     },
  //   });
  // };

  // const fileInputRef = React.useRef<HTMLInputElement>(null);

  // const readFile = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(file);
  //   });
  // };



  // const onChange: UploadProps["onChange"] = async ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  //   if (newFileList.length > 0) {
  //     const file = newFileList[0].originFileObj as File;
  //     const dataUrl = await readFile(file);
  //     const convertedFile = new File([dataUrl], file.name, { type: file.type });
  //     setValue("photo", convertedFile);
  //   } else {
  //     setValue("photo", null);
  //   }
  // };


  // const onPreview = async (file: UploadFile) => {
  //   let src = file.url as string;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj as RcFile);
  //       reader.onload = () => resolve(reader.result as string);
  //     });
  //   }

  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };



  // const onSubmit: SubmitHandler<MomentFornData> = async (data) => {
  //   const { token } = JSON.parse(localStorage.getItem("token") || "{}");
  //   const d = await createMoment(token, data);

  //   console.log(d.data);



  //   if(d.status === 201) {
  //     openNotification();
  //   }
  // };

  const { register, handleSubmit, control, reset, setValue } = useForm<MomentFornData>();
  const [api, contextHolder] = notification.useNotification();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    reset();
  };

  const openNotification = () => {
    api.open({
      message: 'Cheers!',
      description:
        'Momento registrado com sucesso!',
      icon: <img src={ToastHands} alt="Toast Hands" style={{width: "28px"}} />,
      placement: 'topRight',
      style: {
        color: "#000000",
        boxShadow: "0px 0px 5px 0px #000000",
        height: "fit-content",
        width: "fit-content",
      },
    });
  };

  const onSubmit: SubmitHandler<MomentFornData> = async (data) => {
    const { token } = JSON.parse(localStorage.getItem("token") || "{}");
    const { status } = await createMoment(token, data);

    if(status === 201) {
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

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        icon={<FontAwesomeIcon icon={faChampagneGlasses} />}
      >
        Compartilhar
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={open}
        bodyStyle={{ paddingBottom: 80 }}
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

                  <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="form-entries">
            <div className="form-group">
              <label>Título</label>
              <input {...register("title")} type="text" required />
            </div>
            <div className="form-group">
              <label>Legenda</label>
              <textarea
                {...register("caption")}
                placeholder="🗯️"
                maxLength={512}
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
            <div className="cta-share-moment-container">
              {/* <SubmitButton btnText="Compartilhar" /> */}
            </div>
          </div>
        </form>
        <div>
          {previewImage && (
            <img src={previewImage} alt="Preview" className="preview-image" />
          )}
        </div>


      </Drawer>
    </>
  );
};

export default NewMomentDrawer;
