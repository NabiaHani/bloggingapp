import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getDownloadURL, getStorage, ref } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAAvCtrHrZ9Axf00FsbV55pWhAdIhxgHnQ",
    authDomain: "hackathon-39d98.firebaseapp.com",
    projectId: "hackathon-39d98",
    storageBucket: "hackathon-39d98.appspot.com",
    messagingSenderId: "712651049178",
    appId: "1:712651049178:web:ef9d4e7218e29a55327de3",
    measurementId: "G-PZVZ8N3ZE9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
var storage = getStorage()

var q = localStorage.getItem("id")
const querySnapshot = await getDocs(collection(db, "blogs"), where("email", "==", q));
console.log(q);
querySnapshot.forEach((doc) => {
    if (doc.data().email == q) {
        document.getElementById("user").innerHTML = doc.data().name
        document.getElementById("usertt").innerHTML = doc.data().name
        document.getElementById("useree").innerHTML = doc.data().email
        getDownloadURL(ref(storage, doc.data().email))
            .then((url) => {
                document.getElementById("container").innerHTML += `<div class="container" style="width: 100%; padding: 0; margin: 0">
                          <div class="container-fluid" style="width: 100%; padding: 0; margin: 0">
                              <div class="row" style="width: 100%; padding: 0; margin: 0">
                                  <div class="col-md-12 border border-1 bg-body rounded">
                                      <div class="blog p-3">
                                          <div class="profile d-flex">
                                              <div class="imgbox">
                                                  <img src="${(url) || "https://www.thecakepalace.com.au/wp-content/uploads/2022/10/dummy-user.png"}" class="rounded"
                                                      height="100px" width="100px" style="object-fit: cover" onclick="goTo('${doc.data().email}')">
                                              </div>
                                              <div class="userbox ms-4">
                                                  <h3 id="blog-title" style="word-break: break-all">${doc.data().title}</h3>
                                                  <p class="fw-bold text-muted">${(doc.data().name) || "User"} - ${doc.data().timeOfPost ? moment(doc.data().timeOfPost.toDate()).fromNow():moment().fromNow()}</p>
                                              </div>
                                          </div>
                                          <br>
                                          <div class="description">
                                              <p class="text-muted" style="word-break: break-all">${doc.data().description}</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <br>
                          </div>
                          <br>
                        </div>`
            })
    }
});
document.getElementById("u").src = localStorage.getItem('url')

onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById("log").innerHTML = "Go To Dashboard"
        document.getElementById("log").href = "../pages/dashboard/dashboard.html"
    }
    else{
        document.getElementById("log").innerHTML = "Logout"
    }
})