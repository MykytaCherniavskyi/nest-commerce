const axios = require('axios');

(async () => {
    const { data: { token } } = await axios.post('http://localhost:3003/auth/login', {
        username: 'username',
        password: 'password',
    });

    try {
        const { data } = await axios.get('http://localhost:3003/auth', {
            headers: {authorization: `Bearer ${token}`},
        });

        console.log(data);
    } catch (err) {
        console.log(err)
    }
})();