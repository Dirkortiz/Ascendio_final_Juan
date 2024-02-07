import React, { useContext } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AllGeneralPosts.scss";
import "../../../../../public/stylesheets/ButtonsApp.scss";
import "../../../../../public/stylesheets/ESTILOCARDGENERAL.scss";
import { AscendioContext } from "../../../../context/AscendioContext";

export const AllGeneralPosts = ({
  posts,
  markACorrect,
  markAIncorrect,
  markAPending,
}) => {
  const { user } = useContext(AscendioContext);
  const navigate = useNavigate();

  return (
    <div className="ALLGeneralPostsScss d-flex flex-wrap ">
      {posts
        ?.filter((post) => post.type === 1)
        .map((elem) => {
          return (
            <Card className="ESTILOCARDGENERAL" key={elem.post_id}>
              <Card.Text className="UserCARD">
            <div className="avatarCard">
              {user?.img ? (
                <img src={`http://localhost:3000/images/users/${user.img}`} />
              ) : (
                <p className="letteruser">
                  {user?.nickname.charAt(0).toUpperCase()}
                </p>
              )}
            </div>
              <p>{user.nickname}</p></Card.Text>
              <div className="DivImagenCard">
                {elem.resource_text !== null ? (
                  <Card.Img
                    variant="top"
                    src={`http://localhost:3000/images/generalPost/${elem.resource_text}`}
                  />
                ) : (
                  <Card.Img
                    className="CardSinFoto"
                    variant="top"
                    src={"../../../../public/images/iconos/logoascendio.png"}
                  />
                )}
              </div>
              <Card.Body>
                <Card.Title>
                  <h3>{elem.category_name} Post</h3>
                </Card.Title>
                <Card.Text>
                  <p>Nickname: {user?.nickname}</p>
                  <p>Descripción: {elem.description}</p>
                </Card.Text>
                <Button
                  className="Button3"
                  onClick={() => {
                    navigate(`/oneGeneralPost/${elem.post_id}`);
                  }}
                >
                  COMENTARIOS
                </Button>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};
