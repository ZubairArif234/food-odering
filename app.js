import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendSignInLinkToEmail,
    onAuthStateChanged
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
 import { doc,
   setDoc,
   getDoc,
   getFirestore,
   getDocFromCache,
   collection, 
   getDocs,
   query,
   updateDoc,
    where,
    
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 


const firebaseConfig = {
  apiKey: "AIzaSyBKYcD_35A49akt0OitN62MQbMCwcKGvuU",
  authDomain: "saylani-project-assignment.firebaseapp.com",
  projectId: "saylani-project-assignment",
  storageBucket: "saylani-project-assignment.appspot.com",
  messagingSenderId: "677719458063",
  appId: "1:677719458063:web:11e29676238dbb299cfe7a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()















































// apna code
let registerForm = document.getElementById("registerForm");
let loginForm = document.getElementById("loginForm");
let loginLink = document.getElementById("liginLink");
let registerLink = document.getElementById("registerLink");


// let register = document.getElementById("regiterBtn")


var emailregix = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
var phoneregex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/;


let registerEmail = document.getElementById("registerEmail");
    let registerPassword = document.getElementById("registerPassword");
    let registerName = document.getElementById("registerName");
    let registerPhone = document.getElementById("registerPhone");
    let registerQuali = document.getElementById("registerQuali");
    let registerImage = document.getElementById("file");
    let loginBUTTON = document.getElementById("signBUTTON")
    let select = document.getElementById("select")
    // let dropdown = document.getElementsById("select")
    let getSelectedValue = document.querySelector( 'input[name="gender"]:checked');


    loginBUTTON.addEventListener("click", () => {
        event.preventDefault()
        if (registerName.value.trim() === "" ){
            
                    Swal.fire(
                      'Error',
                      'Enter your name',
                      'error'
                    )
                   }
                   else if (registerName.value.split("").length > 20){
                    Swal.fire(
                      'Error',
                      'user name should not br greater than 10 letters',
                      'error'
                    )
                   }
                   else if (registerEmail.value === "" || !registerEmail.value.match(emailregix)){
                    Swal.fire(
                      'Error',
                      'Invalid Email',
                      'error'
                    )
                   }else if (registerPhone.value === "" || !registerPhone.value.match(phoneregex)){
                    
                    Swal.fire(
                      'Error',
                      'Invalid phone number',
                      'error'
                    )
                   }else if (!select.value){
                    
                    Swal.fire(
                      'Error',
                      'Please select how you want to registered.',
                      'error'
                    )
                   }
                  
                   else if (registerPassword.value.trim() === ""  ){
                    
                    Swal.fire(
                      'Error',
                      'Invalid password ( It must contain 8 letters )',
                      'error'
                    )
                   }
                   else if (registerImage.value == "" ){
                    
                    Swal.fire(
                      'Error',
                      'upload profile image',
                      'error'
                    )
                   }
                   else{
                    // event.preventDefault()
                    // const auth = getAuth();
createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // window.localStorage.setItem("users", JSON.stringify(user))
    console.log(user)
    await setDoc(doc(db, "users", user.uid), {
        name: registerName.value,
        email: registerEmail.value,
        phone : registerPhone.value,
        password : registerPassword.value,
        registeredas : select.value

        
      }
      );

      // let uploadBtn = document.getElementById("upload-btn");

// uploadBtn.addEventListener("click", async () => {
  // let myFile = document.getElementById("file");
  // let file = myFile.files[0];
  // const auth = getAuth();
  // let uid = auth.currentUser.uid;
  // let url = await uploadFiles(file);
  // console.log(url)
  // const washingtonRef = doc(db, "users", uid);
  // await updateDoc(washingtonRef, {
  //   profile: url,
  //   // profile.src= ur;
  // });
// });
 
const uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const auth = getAuth();
    let uid = auth.currentUser.uid;
    const storageRef = ref(storage, `users/${uid}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
let myFile = document.getElementById("file");
  let file = myFile.files[0];
  const auth = getAuth();
  let uid = auth.currentUser.uid;
  let url = await uploadFiles(file);
  console.log(url)
  const washingtonRef = doc(db, "users", uid);
  await updateDoc(washingtonRef, {
    profile: url,
    // profile.src= ur;
  });
  })
  .catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
                    // console.log(registerImage.value)
                    Swal.fire(
                        'success',
                        'successfully registered',
                        'success'
                      )
                      // registerName.value="";
                      // registerEmail.value="";
                      // registerPhone.value="";
                      // registerPassword.value="";
                      
                      // window.localStorage.setItem("users", JSON.stringify(user))
    registerForm.style.display="none"
    loginForm.style.display="block"

    
}
    })
    
let signin = document.getElementById("loginBUTTON");
let loginEmail = document.getElementById("loginEmail");
let loginPass = document.getElementById("loginPass");
signin.addEventListener("click", () => {
    event.preventDefault()
    
    if (loginEmail.value === "" || !loginEmail.value.match(emailregix)){
            
        Swal.fire(
          'Error',
          'Invalid Email',
          'error'
        )
       }
       else if (loginPass.value.trim() === ""  ){
                    
        Swal.fire(
          'Error',
          'Invalid password ( It must contain 8 letters )',
          'error'
        )
       } else{
        // console.log(loginEmail)
    signInWithEmailAndPassword(auth, loginEmail.value,loginPass.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // window.localStorage.setItem("users", JSON.stringify(user))
      Swal.fire(
        'success',
        'successfully login',
        'success'
      )
      // ...
      
    
      
    })
    .catch((error) => {
        Swal.fire(
            'Error',
          'user not registered',
          'error'
          )
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  // loginEmail.value="";
  // loginPass.value=""
  onAuthStateChanged(auth, async(user) => {
    // event.preventDefault()
    console.log(user.uid)
    if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().registeredas);
            if(docSnap.data().registeredas == "restaurants"){
              window.location="restaurants.html"
              // alert("oplirhuj")

            }else{
              
              window.location="customer.html"
            }
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
          //   location.href= "home.html"
          
          // ...
        } else {
          window.location="index.html"

          // User is signed out
          // ...
        }
      });
}})






// window.onload=()=>{
//     onAuthStateChanged(auth, (users) => {
//       console.log(auth.userCredential)
//       console.log(users)

//         if (users) {
//           window.location= "home.html"
//           // getUserFromDataBase(user.uid);
//           console.log("login")
//           // loginfunc(auth.userCredential.uid)
//           // alert("oplirhuj")
//           // ...
//           // const uid = user.uid;
//         } else {
//           // User is signed out
//           // window.location= "index.html"
//           // ...
//           // console.log("logout")
//         }
      
//       });

      
// }

// let profName = document.getElementById("profName");
// let profEmail = document.getElementById("profEmail")
// let signoutBtn = document.getElementById("signout");
// const loginfunc = async(uid)=>{
//   const docRef = doc(db, "users", uid);
//   const docSnap = await getDoc(docRef);
//   let profimg = document.getElementById("profimg");
//   // const getUserFromDataBase = async () => {
  
  
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//     profName.innerHTML=(docSnap.data().name);
//     profEmail.innerHTML=(docSnap.data().email);
//     profimg.src = `${docSnap.data().profile}`
//   //   alert("olpik")
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }

const passwordField = document.querySelector("#loginPass");
const eyeIcon= document.querySelector("#eye");
eye.addEventListener("click", function(){
  this.classList.toggle("fa-eye-slash");
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
})
const passwordField2 = document.querySelector("#registerPassword");
const eyeIcon2= document.querySelector("#eye2");
eye2.addEventListener("click", function(){
  this.classList.toggle("fa-eye-slash");
  const type = passwordField2.getAttribute("type") === "password" ? "text" : "password";
  passwordField2.setAttribute("type", type);
})



registerLink.addEventListener("click", () => {
    event.preventDefault()
    registerForm.style.display="block"
    loginForm.style.display="none"
} )



loginLink.addEventListener("click", () => {
    event.preventDefault()
    registerForm.style.display="none"
    loginForm.style.display="block"
})