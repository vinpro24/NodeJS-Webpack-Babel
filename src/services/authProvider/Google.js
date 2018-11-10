import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/userinfo/v2/me';

const authAsync = async token => {
    try {
        const res = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200) {
            const user = {
                email: res.data.email,
                firstname: res.data.given_name,
                lastname: res.data.family_name,
                avatar: `https://pikmail.herokuapp.com/${res.data.email}?size=500`,
                provider: {
                    uid: res.data.id,
                    type: 'GOOGLE',
                },
            };
            return user;
        }

        throw new Error('No success with Google');
    } catch (error) {
        throw error;
    }
};

export default { authAsync };
