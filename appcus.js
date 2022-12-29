
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
    increment,

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
        
      // window.location.href = "customer.html"
        // location.href= "restaurants.html"
        //   alert("oplirhuj")
        // ...
    } else {
        location.href = "index.html"
        // User is signed out
        // ...
    }
    let signout = document.getElementById("signout");
    signout.addEventListener("click",()=>{
      event.preventDefault()
      signOut(auth).then(() => {
        window.location.href = "index.html"
      }).catch((error) => {
        // An error happened.
      });
    })
    

    const q = query(collection(db, "FoodItemsAdd"), where("UserUID", "!=", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //   const cities = [];
        let FoodCardsListCustomer = document.getElementById("FoodCardsListCustomer");
let compulsarecustomer =`

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content container">
<div class="modal-header">
  <h1 class="modal-title fs-5" id="exampleModalLabel">Order Now </h1>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<h4 id="OrderTittle"><span id="orderFoodName"></span><span id="orderFoodPrice"></span></h4>
<label>Qnty = </label><input type="number" placeholder="Qnty" class="madalinput" value="1" id="OrderFoodQnty" irequired>
  <label>Recipient name</label>
  <input type="text" placeholder="Recipient name" class="madalinput" id="Recipientname" required>
  <br />
  <label>Phone no</label>
    <input type="number" placeholder="Phone no" class="madalinput" id="Recipientphone" required>

  <label>Email</label>
    <input type="email" placeholder="Email" class="madalinput" id="RecipientID" required>
  
  <p>Address  <textarea name="" id="destext" rows="3"   required  placeholder="Address"></textarea> </p>
  
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  <button type="button" class="btn btn-danger"  id="orderButton" onclick="ordern('${doc.id}')">Order Now</button>
</div>
</div>
</div>
</div>


<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirm Order</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <h4 id="OrderTittle"><span id="orderFoodNameRes"></span><span id="orderFoodPriceRes"></span></h4>
      <div><p>Recipient name = <span id="RecipientnameSpan"></span><p/> 
       <p>Phone no = <span id="PhonenoSpan"></span><p/> 
       <p>Email = <span id="EmailSpan"></span><p/> 
       <p>Address = <span id="AddressSpan"></span><p/></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#exampleModal">Back</button>
        <button type="button" class="btn btn-danger">Confirm Order</button>
      </div>
    </div>
  </div>
</div>
`
FoodCardsListCustomer.innerHTML = compulsarecustomer
  querySnapshot.forEach((doc) => {
    //   cities.push(doc.data().name);
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
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="ordernow('${doc.id}')" >Order Now</button>
            </div>
            </div>
            </div>

            `

            // alert("polo")
            FoodCardsListCustomer.innerHTML += FoodCards;
  });
//   console.log("Current cities in CA: ", cities.join(", "));
});

    // console.log(user)
    console.log(user)
  })
  
  // onclick="DeleteFoodItem('${doc.id}')"
  const ordernow = async(id)=>{
    let orderFoodName = document.getElementById("orderFoodName");
    let orderFoodPrice = document.getElementById("orderFoodPrice");
    let orderFoodNameRes = document.getElementById("orderFoodNameRes");
    let orderFoodPriceRes = document.getElementById("orderFoodPriceRes");
    
    
    const docRef = doc(db, "FoodItemsAdd", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  orderFoodName.innerHTML=docSnap.data().FoodName;
  orderFoodPrice.innerHTML=docSnap.data().FoodPrice;
  
  orderFoodNameRes.innerHTML=docSnap.data().FoodName;
  orderFoodPriceRes.innerHTML=docSnap.data().FoodPrice;
  
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
  
}
}
window.ordernow = ordernow;




var emailregix = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
var phoneregex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/;
const ordern = async(id)=>{
  // let orderFoodName = document.getElementById("orderFoodName");
  // let orderFoodPrice = document.getElementById("orderFoodPrice");
  // let orderFoodNameRes = document.getElementById("orderFoodNameRes");
  // let orderFoodPriceRes = document.getElementById("orderFoodPriceRes");
  let orderFoodPriceRes = document.getElementById("orderFoodPriceRes");
  // console.log(user)
    let OrderFoodQnty = +document.getElementById("OrderFoodQnty").value;
    let Recipientname = document.getElementById("Recipientname");
    let Recipientphone = document.getElementById("Recipientphone");
    let RecipientID = document.getElementById("RecipientID");
    let destext = document.getElementById("destext");
    let orderButton = document.getElementById("orderButton");
    
    
    if (orderButton.getAttribute("data-bs-toggle")&& orderButton.getAttribute("data-bs-target")){

      orderFoodPriceRes.innerHTML = (+orderFoodPriceRes.innerHTML.split("R")[0])+(+orderFoodPriceRes.innerHTML.split("R")[0]);
    }
    if (Recipientname.value.trim() === "" ){
      
      Swal.fire(
        'Error',
        'Enter Recipient name',
        'error'
        )
      }
    else if (RecipientID.value === "" || !RecipientID.value.match(emailregix)){
      Swal.fire(
        'Error',
        'Invalid Email',
        'error'
        )
      }else if (Recipientphone.value === "" || !Recipientphone.value.match(phoneregex)){
        
        Swal.fire(
        'Error',
        'Invalid phone number',
        'error'
        )
     }
     else if (destext.value.trim() === ""){
       Swal.fire(
         'Error',
         'Enter address',
         'error'
         )
        }
        else{
         console.log(OrderFoodQnty , +orderFoodPriceRes.innerHTML.split("R")[0])
         orderButton.setAttribute("data-bs-toggle","modal");
         orderButton.setAttribute("data-bs-target","#staticBackdrop");
         
         let RecipientnameSpan =document.getElementById ("RecipientnameSpan");
          let PhonenoSpan =document.getElementById ("PhonenoSpan");
          let EmailSpan =document.getElementById ("EmailSpan");
          let AddressSpan =document.getElementById ("AddressSpan");
          RecipientnameSpan.innerHTML = Recipientname.value;
          PhonenoSpan.innerHTML = Recipientphone.value;
          EmailSpan.innerHTML = RecipientID.value;
          AddressSpan.innerHTML = destext.value;
          
          
          
          
        }
        
      }
      // }
      
      window.ordern = ordern;