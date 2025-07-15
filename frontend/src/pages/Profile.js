import React, { useState } from 'react';
import '../styles/profile.css';
import ImageCropper from '../components/ImageCropper';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: 'Prachi Talavanekar',
    address: 'Pinguli Dhuri Temb Nagar',
    email: 'prachitalavanekar29@gmail.com',
    phone: '9422509340',
    photo:
      'https://randomuser.me/api/portraits/women/44.jpg', // default image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };



  const toggleEdit = () => {
    if (isEditing) {
      console.log('Saved profile data:', profileData);
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
  setProfileData((prev) => ({ ...prev, photo: croppedImage }));
  setIsCropping(false);
  setTempImage(null);
};

const handleCropCancel = () => {
  setIsCropping(false);
  setTempImage(null);
};


return (
  <>
    {isCropping && (
      <ImageCropper
        image={tempImage}
        onCropDone={handleCropDone}
        onCancel={handleCropCancel}
      />
    )}

    <div className="profile-container">
      <div className="profile-header">
        <div>
          <h2>Welcome, {profileData.fullName}</h2>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-info-header">
          <div className="profile-photo-wrapper">
            <img
              src={profileData.photo}
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
            <h3>{profileData.fullName}</h3>
            <p>{profileData.email}</p>
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
              name="fullName"
              value={profileData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={profileData.address}
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
              value={profileData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
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
