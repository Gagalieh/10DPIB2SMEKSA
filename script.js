// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDHdq8NtG03ZON3ND6qWaHCuoOzFr7PIsU",
    authDomain: "confessdata-a824c.firebaseapp.com",
    projectId: "confessdata-a824c",
    storageBucket: "confessdata-a824c.firebasestorage.app",
    messagingSenderId: "1084283671185",
    appId: "1:1084283671185:web:96223afcaad4b8175f2530",
    measurementId: "G-7NHZ5GDTNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Toggle Section Function
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = (section.style.display === "none" || section.style.display === "") ? "block" : "none";
}

// Confess Form Submit Function
const confessForm = document.getElementById('confessForm');
const confessMessages = document.getElementById('confessMessages');

confessForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const sender = document.getElementById('sender').value;
    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;

    try {
        // Add new message to Firestore
        await addDoc(collection(db, "confessMessages"), {
            sender: sender,
            recipient: recipient,
            message: message,
            timestamp: new Date()
        });

        // Clear form fields
        confessForm.reset();
        loadMessages();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

// Load and Display Confess Messages from Firestore
async function loadMessages() {
    const q = query(collection(db, "confessMessages"), orderBy("timestamp"));
    const querySnapshot = await getDocs(q);
    
    confessMessages.innerHTML = ""; // Clear current messages

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const messageElement = document.createElement("div");
        messageElement.classList.add("confess-message");

        messageElement.innerHTML = `
            <strong>Pengirim:</strong> ${data.sender} <br>
            <strong>Tujuan:</strong> ${data.recipient} <br>
            <strong>Pesan:</strong> ${data.message} <br>
            <hr>
        `;
        
        confessMessages.appendChild(messageElement);
    });
}

// Initial Load of Confess Messages
loadMessages();

// Gallery Toggle Functions
const albumToggles = document.querySelectorAll('.toggle-btn');
albumToggles.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const albumId = e.target.getAttribute('data-album');
        const album = document.getElementById(albumId);
        album.style.display = (album.style.display === "none" || album.style.display === "") ? "block" : "none";
    });
});

// Initialize the gallery section (if necessary)
function initializeGallery() {
    const albums = document.querySelectorAll('.album');
    albums.forEach((album) => {
        album.style.display = "none";  // Hide albums initially
    });
}

// Call initialize gallery on page load
initializeGallery();