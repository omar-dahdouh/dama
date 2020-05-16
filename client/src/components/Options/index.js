import React, { useEffect } from 'react';
import axios from 'axios';
import './style.css';

const sendToken = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    axios
      .post(`/login/github`, { code })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        }
      })
      .catch(console.log);
  }
};

function Options() {
  const clientID = 'e6d8d57f54d0bbcda915';
  const query = `client_id=${clientID}&scope=`;
  const github = `https://github.com/login/oauth/authorize?${query}`;

  console.log('github');
  console.log(github);

  useEffect(sendToken);

  return (
    <div className="options">
      <button
        type="button"
        className="github"
        onClick={() => {
          window.location = github;
        }}
        href={github}
      >
        Github Login
      </button>
    </div>
  );
}

export default Options;
