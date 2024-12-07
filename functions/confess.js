let messages = []; // Array untuk menyimpan pesan

exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
        // Menampilkan pesan yang sudah ada
        return {
            statusCode: 200,
            body: JSON.stringify({ messages })
        };
    }

    if (event.httpMethod === 'POST') {
        const { sender, recipient, message } = JSON.parse(event.body);

        if (sender && recipient && message) {
            messages.push({ sender, recipient, message });
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true })
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false })
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' })
    };
};
