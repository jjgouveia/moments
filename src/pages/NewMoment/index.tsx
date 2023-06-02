import { notification } from "antd";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ToastHands from "../../assets/toast-hands.svg";
import SubmitButton from "../../components/SubmitButton";
import { createMoment } from "../../services/moment.service";
import { MomentFornData } from "../../types/MomentFormData";
import "./style.css";

const MomentForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<MomentFornData>();
  const [api, contextHolder] = notification.useNotification();

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
    <div className="new-moment-container">
          {contextHolder}
      <h1>Compartilhe um momento!</h1>
      <div className="form-data-container">
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
              <SubmitButton btnText="Compartilhar" />
            </div>
          </div>
        </form>
        <div>
          {previewImage && (
            <img src={previewImage} alt="Preview" className="preview-image" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MomentForm;
