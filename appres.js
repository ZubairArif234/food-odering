
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendSignInLinkToEmail,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import {
    doc,
    setDoc,
    getDoc,
    getFirestore,
    getDocFromCache,
    collection,
    getDocs,
    query,
    addDoc,
    onSnapshot,
    where,
    updateDoc,
    arrayUnion,
    arrayRemove,
    deleteDoc,
    orderBy,

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






// onauthstatechange start
onAuthStateChanged(auth, async (user) => {
    event.preventDefault()
    if (user) {
        
        // location.href= "restaurants.html"
        //   alert("oplirhuj")
        // ...
    } else {
        location.href = "index.html"
        // User is signed out
        // ...
    }
    
    // console.log(user)
    console.log(user)
    // add itme modal validation start
    let itemSaveButton = document.getElementById("itemSaveButton");
    
    const addfunc = async()=>{
        let itemName = document.getElementById("itemName");
        let itemPrice = document.getElementById("itemPrice");
        let itemDescription = document.getElementById("destext");
        let fileimg = document.getElementById("fileimg");
        if (itemName.value.trim() == "") {
            Swal.fire(
                'Error',
                'Add food item name ',
                'error'
                )
            } else if (!itemPrice.value) {
                
                Swal.fire(
                    'Error',
                    'Add price',
                    'error'
                    )
                } else if (!fileimg.value) {
                    Swal.fire(
                    'Error',
                    'Upload food item image',
                    'error'
                    )
                
                } else {
                    // get data of user from firebase start
                    const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                console.log(itemDescription.value)
                
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    // add item in firebase start
                    const docRef2 = await addDoc(collection(db, "FoodItemsAdd"), {
                        FoodName: itemName.value.trim(),
                        FoodPrice: itemPrice.value + "Rs",
                        Description: itemDescription.value.trim(),
                        time: new Date().toDateString(),
                        UserUID: user.uid,
                        UserName: docSnap.data().name,
                        UserProfileImage: docSnap.data().profile,
                        count:[]
                        
                    });
                    console.log("Document written with ID: ", docRef2.id);
// images food ki start
const uploadFiles = (file) => {
        return new Promise((resolve, reject) => {
      const storage = getStorage();
    //   const auth = getAuth();
    //   let uid = auth.currentUser.uid;
      const storageRef = ref(storage, `FoodItemsAdd/${docRef2.id}.png`);
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
    
    //   let myFile = document.getElementById("file");
      let file = fileimg.files[0];
  const auth = getAuth();
  let uid = auth.currentUser.uid;
  let url = await uploadFiles(file);
  console.log(url)
  const washingtonRef = doc(db, "FoodItemsAdd", docRef2.id);
  await updateDoc(washingtonRef, {
      profileFood: url,
      // profile.src= ur;
    });
    // images food ki end
    
    // add item in firebase end
    Swal.fire(
        'Success',
        'Food item added',
        'success'
        )
        
        location.reload()    
                        
    
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
                    }
                    
                    // get data of user from firebase end 
                    console.log(itemName.value, itemPrice.value)
                }
        }

        // itemSaveButton.addEventListener("click",addfunc)
        window.addfunc = addfunc;
        
        // add itme modal validation end
        // console.log("Current cities in CA: ", cities.join(", "));
        
        
        let FoodCardsList = document.getElementById("FoodCardsList");
    
    const q = query(collection(db, "FoodItemsAdd"), where("UserUID", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        // const cities = [];
        FoodCardsList.innerHTML = "";
        let compulsare =`<div class="card col-6 col-sm-6 col-md-4 col-lg-4" style="width: 18rem;">
        <!-- <img src="assets/pizza-slider.avif" class="card-img-top" alt="..."> -->
        <p class=" addp " data-bs-toggle="modal" data-bs-target="#exampleModal">

            <i class="fa-solid fa-plus"></i>
        </p>
        <div class="card-body">
            <h5 class="card-title">ADD</h5>
            <h6 class="card-subtitle mb-2 text-muted">ADD ITEM </h6>
            <p class="card-text">Add items along with catogaries and  price.</p>
        </div>
    </div>
    
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content container">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add item </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label>Item name</label>
          <input type="text" placeholder="Food name" class="madalinput" id="itemName" required>
          <br />
          <label>Price</label>
            <input type="number" placeholder="Price" class="madalinput" id="itemPrice" required>
          
          <p>Discription  <textarea name="" id="destext" rows="5"   required  placeholder="Discription"></textarea> </p>
          <label for="fileimg" id="file">Upload image</label>
          <input type="file" id="fileimg" accept="image/*">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" id="itemSaveButton" onclick="addfunc()">Save changes</button>
        </div>
      </div>
    </div>
  </div>

    `
    FoodCardsList.innerHTML = compulsare
        querySnapshot.forEach((doc) => {
            // cities.push(doc.data().name);
            console.log(doc.data())
            let FoodCards = `



            <div class="card col-6 col-sm-6 col-md-4 col-lg-4" style="width: 18rem;">
            <img src="${doc.data().profileFood}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${doc.data().FoodName}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${doc.data().UserName}</h6>
            <p class="card-text">${doc.data().Description}</p>
            <h5 class="card-title">${doc.data().FoodPrice}</h5>
            <div class="d-grid gap-2">
            <button type="button" class="btn btn-outline-danger" onclick="DeleteFoodItem('${doc.id}')">Delete Item</button>
            </div>
            </div>
            </div>`

            // alert("polo")
            FoodCardsList.innerHTML += FoodCards;
            
        });
    });


    })
    // onauthstatechange end



    // delete start
    const DeleteFoodItem = async (id) => {
        await deleteDoc(doc(db, "FoodItemsAdd", id));
        Swal.fire(
          'success',
          'Blog deleted',
          'success'
        )
      }
      window.DeleteFoodItem = DeleteFoodItem;
    // delete end
    
    
let adminpage = document.getElementById("adminpage");
let admin = document.getElementById("admin");
let home = document.getElementById("home");
let homepage = document.getElementById("homepage");

adminpage.addEventListener("click",()=>{

    admin.style.display = "block";
    home.style.display = "none";
});
homepage.addEventListener("click",()=>{
    admin.style.display = "none";
    home.style.display = "block";

})