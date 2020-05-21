import React, { useState, useEffect } from 'react';
import './style.css';
import { sendCode, auth } from './github';
import { connect, createGame } from './websocket';

const clientID = 'e6d8d57f54d0bbcda915';
const query = `client_id=${clientID}&scope=`;
const github = `https://github.com/login/oauth/authorize?${query}`;

function Options() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ login: '', name: '', avatar: '' });
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    sendCode(setLoading, setIsLogin, setUserInfo);
  });

  useEffect(() => {
    auth(setLoading, setIsLogin, setUserInfo);
  }, []);

  useEffect(() => {
    if (isLogin && !connected && !connecting) {
      setConnecting(true);
      connect(setConnected, setConnecting, setGameList);
    }
  }, [isLogin]);

  const { login, name, avatar } = userInfo;

  return (
    <div className="options">
      {loading && <div>loading ...</div>}
      {isLogin ? (
        <div>
          <img className="avatar" src={avatar} alt="avatar" />
          <div className="userName">{name || login}</div>
          <button type="button" className="new-game btn" onClick={createGame}>
            create new Game
          </button>
          or join a game
          <div>
            {connecting ? (
              'connecting ...'
            ) : (
              <div>
                <h2>game list</h2>
                <ul className="games">
                  {gameList.map((game, index) => (
                    <li>{`${index}: ${game}`}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* <button type="button" className="btn" onClick={connect}>
            connect
          </button> */}
        </div>
      ) : (
        <div>
          login using
          <button
            type="button"
            className="github btn"
            onClick={() => {
              window.location = github;
            }}
          >
            Github
          </button>
          to play online
        </div>
      )}
    </div>
  );
}

export default Options;
