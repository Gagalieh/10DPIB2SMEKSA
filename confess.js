// netlify/functions/confess.js
exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        const { name, message } = body;
        // Tambahkan logika untuk menyimpan data atau memproses pesan di sini
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Pesan berhasil dikirim!' }),
        };
    }
    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
};