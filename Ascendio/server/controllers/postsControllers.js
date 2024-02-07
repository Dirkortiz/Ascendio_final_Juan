const connection = require("../config/db");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const mailer = require("../utils/nodemailer");
require("dotenv").config();

class postsControllers {
  createTrade = (req, res) => {
    try {
      const {
        currency,
        description,
        entryPrice,
        stopLoss,
        takeProfit,
        category_id,
        user_id,
      } = JSON.parse(req.body.crearTrade);

      let sql = `INSERT INTO post (currency, description, entry_price, stop_loss, take_profit, category_id, user_id, type) VALUES ('${currency}', '${description}', ${entryPrice}, ${stopLoss}, ${takeProfit}, ${category_id}, ${user_id}, 2)`;

      connection.query(sql, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: "Hay un error en la SQL" });
        } else {
          let post_id = result.insertId;
          if (req.file !== undefined) {
            let img = req.file.filename;
            let sql2 = `INSERT INTO post_resource (post_id, resource_type, text) VALUES (${post_id}, 1, '${img}')`;
            connection.query(sql2, (err2, result2) => {
              if (err2) {
                console.log(err2);
                res.status(500).json({ message: "Hay un error en la SQL2" });
              } else {
                res.status(200).json({ message: "todo OK" });
              }
            });
          } else {
            res
              .status(200)
              .json({ message: "Post creado correctamente", result });
          }
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error del Catch",
      });
    }
  };

  callCategorys = (req, res) => {
    let sql = `SELECT * FROM category`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  createPostGeneral = (req, res) => {
    const { description, user_id } = JSON.parse(req.body.crearPostGeneral);
    let sql = `INSERT INTO post (description, user_id, type, category_id) VALUES ('${description}', '${user_id}', 1, 4)`;
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(500).json({ message: "Hay un error en la SQL", error });
      } else {
        let post_id = result.insertId;
        if (req.file !== undefined) {
          let img = req.file.filename;
          let sql2 = `INSERT INTO post_resource (post_id, resource_type, text) VALUES (${post_id}, 1, '${img}')`;
          connection.query(sql2, (err2, result2) => {
            if (err2) {
              console.log(err2);
              res.status(500).json({ message: "Hay un error en la SQL2" });
            } else {
              res.status(200).json({ message: "todo OK" });
            }
          });
        } else {
          res
            .status(200)
            .json({ message: "Post creado correctamente", result });
        }
      }
    });
  };

  showLastTrades = (req, res) => {
    let sql = `
    SELECT 
      post.*,
      user.nickname,
      user.user_id,
      post_resource.text AS image_name,
      (SELECT COUNT(*) FROM user_follows_user WHERE followed_user_id = user.user_id) AS num_followers
    FROM 
      user
    INNER JOIN 
      post ON user.user_id = post.user_id
    LEFT JOIN 
      post_resource ON post.post_id = post_resource.post_id
    ORDER BY 
      post.date DESC;
  `;

    let sql2 = `
  SELECT 
    post.*,
    user.nickname,
    user.user_id,
    post_resource.text AS image_name,
    category.category_name, -- Agregamos el nombre de la categoría
    (SELECT COUNT(*) FROM user_follows_user WHERE followed_user_id = user.user_id) AS num_followers
  FROM 
    user
  INNER JOIN 
    post ON user.user_id = post.user_id
  LEFT JOIN 
    post_resource ON post.post_id = post_resource.post_id
  LEFT JOIN 
    category ON post.category_id = category.category_id -- Agregamos el JOIN con la tabla category
  ORDER BY 
    post.date DESC;
`;

    connection.query(sql2, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  markATrade = (req, res) => {
    try {
      const { id } = req.params;
      const { correct, mark } = req.body;
      if ((correct === 0 || correct === null) && mark === 1) {
        let sql = `UPDATE post SET correct = 1 WHERE post_id = ${id};`;
        connection.query(sql, (error, result) => {
          if (error) {
            res
              .status(500)
              .json({ message: "Hay un error en la SQ al marcar TRUE" });
          } else {
            res.status(200).json({ message: "Correct cambiado" });
          }
        });
      } else if ((correct === 1 || correct === null) && mark === 0) {
        let sql = ` UPDATE post SET correct = 0 WHERE post_id = ${id};`;
        connection.query(sql, (error, result) => {
          if (error) {
            res
              .status(500)
              .json({ message: "Hay un error en la SQL al marcar FALSE" });
          } else {
            res.status(200).json({ message: "Correct cambiado" });
          }
        });
      } else if ((correct === 1 || correct === 0) && mark === null) {
        let sql = `UPDATE post SET correct = null WHERE post_id = ${id};`;
        connection.query(sql, (error, result) => {
          if (error) {
            res
              .status(500)
              .json({ message: "Hay un error en la SQL al marcar NULL" });
          } else {
            res.status(200).json({ message: "Correct cambiado" });
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error del Catch",
      });
    }
  };

  OneTradePost = (req, res) => {
    try {
      const post_id = req.params.id;

      // let sql2 = `SELECT post.*, user.nickname AS post_user_nickname, post_resource.text AS resource_text
      //             FROM post
      //             LEFT JOIN user ON post.user_id = user.user_id
      //             LEFT JOIN post_resource ON post.post_id = post_resource.post_id
      //             WHERE post.post_id = ${post_id};`;

      let sql2 = `SELECT post.*, user.nickname AS post_user_nickname,post_resource.text AS resource_text, category.category_name AS category_name FROM post LEFT JOIN user ON post.user_id = user.user_id LEFT JOIN post_resource ON post.post_id = post_resource.post_id LEFT JOIN category ON post.category_id = category.category_id WHERE post.post_id = ${post_id};`;

      connection.query(sql2, (error, result) => {
        if (error) {
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error del Catch",
      });
    }
  };

  getAllPostGeneral = (req, res) => {
    console.log(req.body);
    let sql = `SELECT *, user.nickname FROM post, user WHERE post.type = 1 AND post.user_id = user.user_id`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json(result);
      }
    });
  };

  getAllPostTrades = (req, res) => {
    console.log(req.body);
    let sql = `SELECT *, user.nickname FROM post, user WHERE post.type = 2 AND post.user_id = user.user_id`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ err });
      } else {
        res.status(200).json(result);
      }
    });
  };

  getCategories = (req, res) => {
    let sql = `SELECT * FROM category`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };
}

module.exports = new postsControllers();
