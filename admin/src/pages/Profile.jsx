import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const firstname = useRef();
  const lastname = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();

  const { user } = useSelector((state) => state.auth);

  const [image, setImage] = useState(null);

  useEffect(() => {
    emailRef.current.value = user.email;
    firstname.current.value = user.firstname;
    lastname.current.value = user.lastname;
    mobileRef.current.value = user.mobile;
  }, [user]);
  return (
    <div className="p-4 rounded-3 bg-light">
      <form action="" className="w-50 mx-auto">
        <div className="profile-uploader mx-auto mb-5">
          <label
            htmlFor="profile"
            className="position-relative rounded-circle border-2 border border-primary"
          >
            <input
              onChange={(e) => setImage(e.target.files[0])}
              id="profile"
              className="d-none"
              type="file"
            />
            <img
              className="img-profile"
              src={image ? URL.createObjectURL(image) : user?.image?.secure_url}
              alt="profile-photo"
            />
          </label>
        </div>
        <div className="input-group gap-3 mb-3">
          <input
            placeholder="First Name"
            ref={firstname}
            type="text"
            className="form-control"
          />
          <input
            placeholder="Last Name"
            ref={lastname}
            type="text"
            className="form-control"
          />
        </div>
        <div className="input-group gap-3 ">
          <input
            placeholder="Mobile"
            ref={mobileRef}
            type="tel"
            className="form-control"
          />
          <input
            placeholder="Email"
            className="form-control"
            type="email"
            ref={emailRef}
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
