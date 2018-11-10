import axios from 'axios';

const FIELDS = 'email,name,picture,first_name,last_name';

const BASE_URL = `https://graph.facebook.com/me?fields=${FIELDS}`;

const authAsync = async token => {
    try {
        const res = await axios.get(`${BASE_URL}&access_token=${token}`);

        if (res.status === 200) {
            const user = {
                email: res.data.email,
                firstname: res.data.first_name,
                lastname: res.data.last_name,
                avatar: `https://graph.facebook.com/${res.data.id}/picture?type=large`,
                provider: {
                    uid: res.data.id,
                    type: 'FACEBOOK',
                },
            };
            return user;
        }

        throw new Error('No success with Facebook');
    } catch (error) {
        throw error;
    }
};

export default { authAsync };
