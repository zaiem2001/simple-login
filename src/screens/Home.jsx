import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./home.css";

import Message from "../components/Messanger";
import axios from "axios";
import Loader from "../components/Loader";

const Home = ({ user, setUser }) => {
  const [updateUser, setUpdateUser] = useState({
    success: false,
    error: null,
    loading: false,
  });

  const id = user?.user?._id;

  // useEffect(() => {
  //   if (updateUser.success) {
  //     window.location.reload();
  //     setUpdateUser((prev) => {
  //       return { ...prev, success: false };
  //     });
  //   }
  // }, [updateUser.success]);

  const navigate = useNavigate();

  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const mobileRef = useRef();
  const dobRef = useRef();

  useEffect(() => {
    if (!user?.user?.name) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userObj = {
      name: nameRef.current.value,
      gender: genderRef.current.value,
      age: ageRef.current.value,
      dob: dobRef.current.value,
      mobile: mobileRef.current.value,
    };

    setUpdateUser({ success: false, error: null, loading: true });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `http://localhost:5000/api/users/${id}/update`;

    try {
      const { data } = await axios.put(url, userObj, config);

      if (data) {
        setUser({ loading: false, user: data, error: null });
        localStorage.setItem("userData", JSON.stringify(data));

        setUpdateUser({
          loading: false,
          success: true,
          error: null,
        });
      }
    } catch (error) {
      setUpdateUser({
        loading: false,
        success: false,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  return (
    <div className="homepage">
      <div className="home__wrapper">
        <div className="left">
          <h2 className="left__title">User Info</h2>
          <div className="user__info">
            <div className="username user">
              <span>Name : </span>
              <span>{user?.user?.name}</span>
            </div>
            <div className="age user">
              <span>Age : </span>
              <span>{user?.user?.age || "Not Mentioned"}</span>
            </div>
            <div className="gender user">
              <span>Gender : </span>
              <span>{user?.user?.gender || "Not Mentioned"}</span>
            </div>
            <div className="dob user">
              <span>Date Of Birth : </span>
              <span>{user?.user?.dob || "Not Mentioned"}</span>
            </div>
            <div className="mobile user">
              <span>Mobile : </span>
              <span>{user?.user?.mobile || "Not Mentioned"}</span>
            </div>
          </div>
        </div>

        <div className="right">
          <h2 className="update__title">Update Profile (Zaiem)</h2>
          <form onSubmit={handleSubmit} className="update">
            <input type="text" placeholder="Name" ref={nameRef} />
            <input type="text" placeholder="Age" ref={ageRef} />
            <input type="text" placeholder="Gender" ref={genderRef} />
            <input type="text" placeholder="Mobile" ref={mobileRef} />
            <input type="text" placeholder="Date of Birth" ref={dobRef} />

            {updateUser.loading ? (
              <Loader size="30px" />
            ) : (
              <button type="submit">Update</button>
            )}
          </form>
        </div>
      </div>
      {updateUser.error && (
        <div className="update__error">
          <Message variant="danger">{updateUser.error}</Message>
        </div>
      )}
    </div>
  );
};

export default Home;
