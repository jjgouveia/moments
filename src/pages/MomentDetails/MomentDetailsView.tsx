import { HeartFilled } from "@ant-design/icons";
import { Card, Image, Rate } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PreviewComments from "../../components/previewComments";
import { Moment } from "../../interfaces/IMoment";
import { ProfileInfo } from "../../interfaces/IProfileInfo";
import { getMomentById } from "../../services/moment.service";
import { getProfileByUserId } from "../../services/profile.service";
import "./style.css";



export default function MomentDetailsView() {
  const [moment, setMoment] = useState({} as Moment);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({} as ProfileInfo);

  const handleHearts = (n: number) => {
    console.log("heart ", n);

  };


  const { id } = useParams();
  const { token } = JSON.parse(localStorage.getItem("token") || "");

  useEffect(() => {
    const t = async () => getMomentById(token, id!);
    t().then((res) => {
      setMoment(res);
    });
  }, [id, token]);

  useEffect(() => {
    try {
      const p = async () => getProfileByUserId(token, moment.userId);
      p().then((res) => {
        setProfileInfo(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [moment.userId, token]);

  return (
    <div className="moment-details-container">
      <Card
      hoverable
      style={{ maxWidth: 400 }}
      cover={<Image
        src={moment.imageUrl}
        fallback="https://via.placeholder.com/400"
        />}
      >
      <h2>{moment.title}</h2>
      <Rate
        character={
            <HeartFilled style={{ fontSize: "36px"}} />}
          onChange={handleHearts} style={{color: "#F5A524"}} />
      </Card>
      <div className="about-moment">
        <div className="moment-details-user-info-container">
          <div className="moment-details-user-info-wrapper">
          {
          profileInfo?.profilePicture ?
          (<img src={profileInfo.profilePicture} alt="" className=""/>)
          : (<SkeletonAvatar active size="small" />)}
            <p>{moment.username}</p>
          </div>
          <div className="moment-details-post-actions">
          <div>
          <i className="fa-solid fa-heart"></i> : {moment.likes?.length}
        </div>
        <div>
          <i className="fa-solid fa-comment"></i>: {moment.comments?.length}
        </div>
        <div>
          <i className="fa-solid fa-share"></i>
        </div>
          </div>
        </div>
        <h4>{moment.description}</h4>
      </div>
      <PreviewComments commentList={moment.comments} />
    </div>
  );
}
