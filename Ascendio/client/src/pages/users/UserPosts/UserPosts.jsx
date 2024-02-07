import React, { Children, useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, ListGroup } from "react-bootstrap";
import { AllPosts } from "./AllPosts/AllPosts";
import { AllGeneralPosts } from "./AllGeneralPosts/AllGeneralPosts";
import { AllTradePosts } from "./AllTradePosts/AllTradePosts";
import './userPosts.scss';

export const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();
  const [markTrade, setMarkTrade] = useState(false);
  const [showFilter, setShowFilter] = useState(0);

  console.log(user);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/users/postsuser/${user.user_id}`)
        .then((res) => {
          console.log(res.data);
          setPosts(res.data.datos);
          if (markTrade) {
            setMarkTrade(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, markTrade]);

    console.log(posts);

  const markACorrect = (post_id, correct) => {
    if (posts) {
      axios
        .put(`http://localhost:3000/posts/markatrade/${post_id}`, {
          correct,
          mark: 1,
        })
        .then((res) => {
          setMarkTrade(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const markAIncorrect = (post_id, correct) => {
    if (posts) {
      axios
        .put(`http://localhost:3000/posts/markatrade/${post_id}`, {
          correct,
          mark: 0,
        })
        .then((res) => {
          setMarkTrade(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const markAPending = (post_id, correct) => {
    if (posts) {
      axios
        .put(`http://localhost:3000/posts/markatrade/${post_id}`, {
          correct,
          mark: null,
        })
        .then((res) => {
          console.log(res);
          setMarkTrade(true);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="userPosts">
      <div>
      <Button 
          className="Button1"
          onClick={() => navigate("/profile")}
        >
          VOLVER
        </Button>
        <h2>MIS POSTS</h2>
      </div>
      <div className="d-flex DivGrisParaBotones">
        <Button
          className="Button2"
          variant={showFilter === 0 ? "danger" : "primary"}
          onClick={() => {
            setShowFilter(0);
          }}
        >
          TODOS
        </Button>
        <Button
          className="Button2"
          variant={showFilter === 2 ? "danger" : "primary"}
          onClick={() => setShowFilter(2)}
        >
          TRADE POSTS
        </Button>
        <Button
          className="Button2"
          variant={showFilter === 1 ? "danger" : "primary"}
          onClick={() => setShowFilter(1)}
        >
          GENERAL POSTS
        </Button>
      </div>
      {showFilter === 0 && (
        <AllPosts
          posts={posts}
          markACorrect={markACorrect}
          markAIncorrect={markAIncorrect}
          markAPending={markAPending}
        />
      )}
      {showFilter === 1 && (
        <AllGeneralPosts
          posts={posts}
          markACorrect={markACorrect}
          markAIncorrect={markAIncorrect}
          markAPending={markAPending}
        />
      )}
      {showFilter === 2 && (
        <AllTradePosts
          posts={posts}
          markACorrect={markACorrect}
          markAIncorrect={markAIncorrect}
          markAPending={markAPending}
        />
      )}
    </div>
  );
};
