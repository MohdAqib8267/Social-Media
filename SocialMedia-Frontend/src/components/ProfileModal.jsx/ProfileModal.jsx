import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();

  // console.log(data);
  const {password, ...others} = data;
// console.log(others);
  const [formData,setFormData] = useState(others);
  const [profileImage,setProfileImage] = useState(null);
  const [coverImage ,setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state)=>state.user.currentUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onImageChange =(e)=>{
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0];

      e.target.name === "profileImage"? setProfileImage(img) : setCoverImage(img);
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    let UserData = formData;
   

  }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            value={formData.firstname}
            onChange={handleChange}
            className="infoInput"
            name="firstName"
            placeholder="First Name"
          />

          <input
            type="text"
            value={formData.lastname}
            onChange={handleChange}
            className="infoInput"
            name="lastName"
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            type="text"
            value={formData.worksAt}
            onChange={handleChange}
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
          />
        </div>

        <div>
          <input
            type="text"
            value={formData.livesIn}
            onChange={handleChange}
            className="infoInput"
            name="livesin"
            placeholder="LIves in"
          />

          <input
            type="text"
            value={formData.country}
            onChange={handleChange}
            className="infoInput"
            name="country"
            placeholder="Country"
          />
        </div>

        <div>
          <input
            type="text"
            value={formData.relationship}
            onChange={handleChange}
            className="infoInput"
            placeholder="RelationShip Status"
            name="relationship"
          />
        </div>


        <div>
            Profile Image 
            <input type="file" name='profileImage' onChange={onImageChange}/>
            Cover Image
            <input type="file" name="coverImage"  onChange={onImageChange}/>
        </div>

        <button className="button infoButton" onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
