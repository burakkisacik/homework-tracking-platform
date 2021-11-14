import React, { useEffect, useState, useRef } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useHistory } from "react-router";
import { db } from "../firebase";
import store from "../store/index";

const Login = () => {
  const emailRef = useRef(null);

  const [isUserExist, setIsUserExist] = useState(true);

  const history = useHistory();

  const usersRef = collection(db, "users");

  const findUserInDB = async (email, password) => {
    const foundedUser = [];

    const q = query(
      usersRef,
      where("email", "==", email),
      where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      foundedUser.push({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        role: doc.data().role,
        profilePic: doc.data().profilePic,
      });
    });

    if (foundedUser.length > 1) {
      return new Error("Multiple users found with same email and password");
    }

    return foundedUser;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    findUserInDB(email.value, password.value)
      .then((user) => {
        if (user.length > 0) {
          setIsUserExist(true);
          store.dispatch({
            type: "setCurrentUser",
            currentUser: user[0],
          });
          history.push(`/${user[0].role}/${user[0].id}`);
        } else {
          setIsUserExist(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center bg-mainBackgroundColor">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-96 h-96 px-8 py-4 space-y-4 shadow-2xl rounded-2xl"
      >
        <div className="flex flex-col  flex-grow">
          <label
            htmlFor="email"
            className="pl-2 font-bold text-xl tracking-wide mt-4"
          >
            Email
          </label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            id="email"
            placeholder="your_mail@something.com"
            className="h-8 rounded-2xl pl-4 outline-none mt-2"
          />
          <label
            htmlFor="password"
            className="pl-2 font-bold text-xl tracking-wide mt-8"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="your password"
            className="h-8 rounded-2xl pl-4 outline-none mt-2"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-buttonColor w-40 text-white font-bold p-4 rounded-full border-2 border-buttonBorder transform hover:scale-110 hover:shadow-xl transition duration-150"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div className="flex justify-center item  h-8">
          {!isUserExist && <p>No user found</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
