exports.handler = async (event, context) => {
        if (event.httpMethod === 'POST') {
                const body = JSON.parse(event.body);  // Mengambil data yang dikirim melalui formulir
                        const { name, message } = body;

                                // Proses pengiriman pesan, misalnya menyimpannya ke Firebase atau mengirim email (opsional)
                                        // Di sini, kita hanya mengirimkan respons sukses

                                                return {
                                                            statusCode: 200,
                                                                        body: JSON.stringify({ message: 'Pesan berhasil dikirim!' }),  // Mengirim respons ke frontend
                                                                                };
                                                                                    }

                                                                                        return {
                                                                                                statusCode: 405,  // Method Not Allowed jika bukan POST
                                                                                                        body: JSON.stringify({ message: 'Metode tidak diizinkan' }),
                                                                                                            };
                                                                                                            };
}