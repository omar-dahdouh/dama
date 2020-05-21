import axios from 'axios';

export const sendCode = async (setLoading, setIsLogin, setUserInfo) => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    axios
      .post(`/login/github`, { code })
      .then((res) => {
        if (res.status === 200) {
          setIsLogin(true);
          setUserInfo(res.data);
        } else {
          setIsLogin(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }
};

export const auth = async (setLoading, setIsLogin, setUserInfo) => {
  try {
    const res = await axios.get('/auth');
    if (res.status === 200) {
      setIsLogin(true);
      setUserInfo(res.data);
    } else {
      setIsLogin(false);
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};
