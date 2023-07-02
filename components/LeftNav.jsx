import React, { useState } from "react";
import { BiCheck, BiEdit } from "react-icons/bi";
import Avatar from "./Avatar";
import { useAuth } from "@/context/authContext";
import Icon from "./Icon";
import { FiPlus } from "react-icons/fi";
import { IoLogOutOutline, IoClose } from "react-icons/io5";
import { MdPhotoCamera, MdAddAPhoto, MdDeleteForever } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { profileColors } from "@/utils/constants";
import ToastMsg from "@/components/ToastMsg";
import { ToastContainer, toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "@/firebase/firebase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import UsersPopup from "./popups/UsersPopup";

const LeftNav = () => {
     const [usersPopup, setUsersPopup] = useState(false);
     const [editProfile, setEditProfile] = useState(false);
     const [nameEdited, setNameEdited] = useState(false);
     const { currentUser, signOut, setCurrentUser } = useAuth();

     const authUser = auth.currentUser;
     const uploadImageToFirestore = (file) => {
          try {
               if (file) {
                    const storageRef = ref(storage, currentUser.displayName);
                    const uploadTask = uploadBytesResumable(storageRef, file);
    
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100;
                            console.log("Upload is " + progress + "% done");
                            switch (snapshot.state) {
                                case "paused":
                                    console.log("Upload is paused");
                                    break;
                                case "running":
                                    console.log("Upload is running");
                                    break;
                            }
                        },
                        (error) => {
                            console.error(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(
                                async (downloadURL) => {
                                    console.log("File available at", downloadURL);
                                    handleUpdateProfile("photo", downloadURL);
                                    await updateProfile(authUser, {
                                        photoURL: downloadURL,
                                    });
                                }
                            );
                        }
                    );
                }
          } catch (error) {
               console.error(error)
          }
     }

     const handleUpdateProfile = (type, value) => {
          let obj = { ...currentUser };

          switch (type) {
               case "color":
                    obj.color = value;
                    break;
               case "name":
                    obj.displayName = value;
                    break;
               case "photo":
                    obj.photoURL = value;
                    break;
               case "photo-remove":
                    obj.photoURL = null;
                    break;
               default:
                    break;
          }

          try {
               toast.promise(
                    async () => {
                         const userDocRef = doc(db, "users", currentUser.uid);
                         await updateDoc(userDocRef, obj);
                         setCurrentUser(obj);

                         if (type === "photo-remove") {
                              await updateProfile(authUser);
                         }
                         if (type === "name") {
                              await updateProfile(authUser, {
                                   displayName: value,
                              });
                              setNameEdited(false);
                         }
                    },
                    {
                         pending: "Updating Your Profile",
                         success: "Profile Updated Successfully",
                         error: "Profile Update Failed",
                    },
                    {
                         autoClose: 3000,
                    }
               );
          } catch (err) {
               console.log(err);
          }
     };

     const onkeyup = (event) => {
          if (event.target.innerText.trim() !== currentUser.displayName) {
               setNameEdited(true);
          } else {
               setNameEdited(false);
          }
     };
     const onkeydown = (event) => {
          if (event.key === "Enter" && event.keyCode === 13) {
               event.preventDefault();
          }
     };

     const editProfileContainer = () => {
          return (
               <div className="relative flex flex-col items-center">
                    <ToastMsg />
                    <Icon
                         size="small"
                         className="absolute top-0 right-5 hover:bg-c2"
                         icon={<IoClose size={20} />}
                         onClick={() => setEditProfile(false)}
                    />

                    <div className="relative group cursor-pointer">
                         <Avatar size="xx-large" user={currentUser} />
                         <label htmlFor="fileUpload">
                              <div className="w-full h-full rounded-full bg-black/[0.5] absolute top-0 left-0 justify-center items-center hidden group-hover:flex">
                                   {currentUser.photoURL ? <MdPhotoCamera size={34} /> : <MdAddAPhoto size={34} />}
                              </div>
                         </label>
                         <input type="file" id="fileUpload" onChange={(e) => (uploadImageToFirestore(e.target.files[0]))} style={{ display: "none" }} />

                         {currentUser.photoURL && (
                              <div className="w-6 h-6 rounded-full bg-red-500 flex justify-center items-center absolute right-0 bottom-0"
                              onClick={() => handleUpdateProfile("photo-remove")}
                              >
                                   <MdDeleteForever size={14} />
                              </div>
                         )}
                    </div>

                    <div className="mt-5 flex flex-col items-center">
                         <div className="flex items-center gap-2">
                              {!nameEdited && <BiEdit className="text-c3" />}
                              {nameEdited && (
                                   <BsFillCheckCircleFill className="text-c4 cursor-pointer" onClick={() => {
                                        handleUpdateProfile("name", document.getElementById("displayNameEdit").innerText)
                                   }} />
                              )}
                              <div
                                   contentEditable
                                   className="bg-transparent outline-none border-none text-center"
                                   id="displayNameEdit"
                                   onKeyUp={onkeyup}
                                   onKeyDown={onkeydown}
                              >
                                   {currentUser.displayName}
                              </div>
                         </div>
                         <span className="text-c3 text-sm">{currentUser.email}</span>
                    </div>

                    <div className="grid grid-cols-5 gap-4 mt-5">
                         {profileColors.map((color, index) => (
                              <span
                                   key={index}
                                   className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-125"
                                   style={{ backgroundColor: color }}
                                   onClick={() => {
                                        handleUpdateProfile("color", color)
                                   }}
                              >
                                   {color === currentUser.color && <BiCheck size={24} />}
                              </span>
                         ))}
                    </div>
               </div>
          );
     };

     return (
          <div
               className={`${
                    editProfile ? "w-[350px]" : "w-[80px] items-center"
               }  flex flex-col h-full justify-between py-5 shrink-0 transition-all`}
          >
               {editProfile ? (
                    editProfileContainer()
               ) : (
                    <div className="relative group cursor-pointer" onClick={() => setEditProfile(true)}>
                         <Avatar size="x-large" user={currentUser} />
                         <div className="w-full h-full rounded-full bg-black/[0.5] absolute top-0 left-0 justify-center items-center hidden group-hover:flex">
                              <BiEdit size={14} />
                         </div>
                    </div>
               )}

               <div className={`flex gap-5 ${editProfile ? "ml-5" : "flex-col items-center"}`}>
                    <Icon
                         size="x-large"
                         className=" bg-green-500 hover:bg-c2"
                         icon={<FiPlus size={24} />}
                         onClick={() => setUsersPopup(!usersPopup)}
                    />
                    <Icon
                         size="x-large"
                         className=" hover:bg-c2"
                         icon={<IoLogOutOutline size={24} />}
                         onClick={signOut}
                    />
               </div>
               {usersPopup && (
                <UsersPopup
                    onHide={() => setUsersPopup(false)}
                    title="Find Users"
                />
            )}
          </div>
     );
};

export default LeftNav;
