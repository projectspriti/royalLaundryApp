import React, { useState } from 'react';
import '../styles/profile.css';
// import ImageCropper from '../components/ImageCropper';
import profileplaceholder from '../assets/profile.webp'

const Profile = ({user, setUser}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };



  const toggleEdit = () => {
    if (isEditing) {
      console.log('Saved profile data:', user);
    }
    setIsEditing(!isEditing);
  };

const [isCropping, setIsCropping] = useState(false);
const [tempImage, setTempImage] = useState(null);

const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    setTempImage(imageURL);
    setIsCropping(true);
  }
};

const handleCropDone = (croppedImage) => {
  setUser((prev) => ({ ...prev, photo: croppedImage }));
  setIsCropping(false);
  setTempImage(null);
};

const handleCropCancel = () => {
  setIsCropping(false);
  setTempImage(null);
};


return (
  <>
    {/* {isCropping && (
      <ImageCropper
        image={tempImage}
        onCropDone={handleCropDone}
        onCancel={handleCropCancel}
      />
    )} */}

    <div className="profile-container">
      <div className="profile-header">
        <div>
          <h2>Welcome, {user.full_name}</h2>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-info-header">
          <div className="profile-photo-wrapper">
            <img
              src={profileplaceholder}
              alt="Profile"
              className="profile-avatar"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="upload-input"
              />
            )}
          </div>

          <div className="profile-name-email">
            <h3>{user.full_name}</h3>
            <p>{user.email}</p>
          </div>

          <button className="edit-btn" onClick={toggleEdit}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={user.full_name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={user.address??"Not Available"}
              onChange={handleChange}
              disabled={!isEditing}
              rows={3}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

};

export default Profile;
