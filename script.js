document.getElementById("confessForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Mencegah pengiriman formulir yang memuat ulang halaman

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    // Mengirim data ke fungsi serverless yang ada di Netlify Functions
    fetch('/.netlify/functions/confess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, message: message })
    })
    .then(response => response.json())  // Mengambil respons dari server
    .then(data => {
        alert(data.message);  // Menampilkan respons ke pengguna
        document.getElementById("name").value = "";  // Mengosongkan formulir
        document.getElementById("message").value = "";
    })
    .catch(error => alert('Terjadi kesalahan.'));
});