const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodemailer");
const recoverMailer = require("../utils/nodemailerRecover");
const nodemailerDeleteUser = require("../utils/nodemailerDeleteUser");
require("dotenv").config();

class usersControllers {
  // ---------------------------------------------------------------
  // 1.-crear un usuario
  createUser = (req, res) => {
    try {
      const { nickname, name, lastname, email, password } = req.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Correo no valido" });
      } else {
        let saltRounds = 8; // 8 saltos
        bcrypt.genSalt(saltRounds, function (err, saltRounds) {
          bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
              console.log(err);
            } else {
              let sql = `INSERT INTO user (nickname, name, lastname, email, password) VALUES ('${nickname}','${name}', '${lastname}','${email}', '${hash}')`;
              connection.query(sql, (error, result) => {
                if (error) {
                  res.status(500).json({ message: "Error en sql" });
                } else {
                  let sql2 = `select * from user where email = '${email}'`;
                  connection.query(sql2, (error2, result2) => {
                    if (error2) {
                      console.log(error2);
                      res.status(500).json({ message: "Error en sql2" });
                    } else {
                      console.log(result2[0].email);
                      const token = jwt.sign(
                        result2[0].email,
                        process.env.T_PASS
                      );
                      let mess = `http://localhost:5173/confirmationuser/${token}`;
                      if (result != "") {
                        mailer(email, nickname, mess);
                        res.status(200).json({
                          message:
                            "Usuario registrado con exito, email de confirmación enviado",
                        });
                      } else {
                        res.status(400).json({
                          message:
                            "No se ha podido registrar el usuario por algun motivo",
                        });
                      }
                    }
                  });
                }
              });
            }
          });
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error al enviar el correo electrónico de registro",
      });
    }
  };

  confirmateUser = (req, res) => {
    const { token } = req.params;
    jwt.verify(token, process.env.T_PASS, (err, decoded) => {
      console.log(decoded);
      if (err) {
        res.status(401).json({ message: "Token no válido" });
      } else {
        const email = decoded;
        console.log(email);
        let sql = `SELECT * FROM user WHERE email = '${email}'`;
        connection.query(sql, (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({ message: "Error en sql" });
          } else if (result.length === 0) {
            res.status(404).json({ message: "Usuario no encontrado" });
          } else {
            let sql2 = `UPDATE user SET is_confirmed = true WHERE user_id = '${result[0].user_id}'`;
            connection.query(sql2, (error2, result2) => {
              if (error2) {
                console.log(error);
                res.status(400).json({ message: "Error en sql2" });
              } else {
                res
                  .status(200)
                  .json({ message: "Usuario confirmado con exito" });
              }
            });
          }
        });
      }
    });
  };

  loginUser = (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email= "${email}"`;
    connection.query(sql, (error, result) => {
      if (error) return res.status(500).json(error);
      console.log(result);
      //TODO: hay que poner el if COMENTANDO y eliminar el otro
      /* if (!result || result.length === 0 || result[0].is_deleted == 1 || result[0].is_confirmed == 0 || result[0].is_disabled == 1) { */
       if (
         !result ||
         result.length === 0 ||
         result[0].is_deleted == 1 ||
         result[0].is_confirmed == 1 ||
         result[0].is_disabled == 1
       ) {
        res.status(401).json("Usuario no autorizado");
      } else {
        const user = result[0];
        const hash = user.password;

        bcrypt.compare(password, hash, (error, response) => {
          if (error) return res.status(500).json(error);

          if (response == true) {
            const token = jwt.sign(
              {
                user: {
                  user_id: user.user_id,
                  type: user.type,
                },
              },
              process.env.SECRET,
              { expiresIn: "1d" }
            ); //consultar cuanto tiempo queremos que se guarde la contraseña

            res.status(200).json({ token, user });
          } else {
            res.status(401).json("Email o contraseña incorrecta");
          }
          console.log("responseeeeeeeeeee", response); //con esto probamos si la contraseña coincide(true/false)
        });
      }
    });
  };

  oneUser = (req, res) => {
    const user_id = req.params.id;
    let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND is_deleted = 0`;
    connection.query(sql, (err, result) => {
      err ? res.status(400).json({ err }) : res.status(200).json(result[0]);
    });
  };

  //-------------------------------------------------------------------
  mailRecoverPassword = (req, res) => {
    try {
      const { email } = req.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Aseguramos que llega un correo electrónico válido.
      if (!emailRegex.test(email)) {
        res
          .status(400)
          .json({ error: "Formato de correo electrónico inválido" });
      } else {
        let sql = `SELECT * FROM user WHERE email = '${email}'`;

        connection.query(sql, (error, result) => {
          if (error) {
            res.status(500).json({ error });
          } else {
            console.log(result[0]);
            if (result[0] === undefined) {
              res.status(400).json({ message: "Email no existe en la DB" });
            } else {
              const nickname = result[0].nickname;
              const token = jwt.sign(result[0].user_id, process.env.T_PASS);
              let mess = `http://localhost:5173/recoverpassword/${token}`;
              if (result != "") {
                recoverMailer(email, nickname, mess);
                res
                  .status(200)
                  .json({ message: "Email recibido correctamente" });
              } else {
                res.status(400).json({ message: "Email no existe en la DB" });
              }
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error al enviar el correo electrónico de recuperación",
      });
    }
  };

  recoverPassword = (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    jwt.verify(token, process.env.T_PASS, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token no válido" });
      } else {
        const user_id = decoded;
        let sql = `SELECT * FROM user WHERE user_id = '${user_id}'`;
        connection.query(sql, (err, result) => {
          if (err) {
            console.log(err);
          } else if (result.length === 0) {
            res.status(400).json({ message: "Usuario no existe en la DB" });
          } else {
            bcrypt.genSalt(8, (err, salt) => {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                  res.status(500).json({ error: err });
                } else {
                  let sql2 = `UPDATE user SET password = '${hash}' WHERE user_id = '${user_id}'`;
                  connection.query(sql2, (error, result) => {
                    if (error) {
                      res.status(500).json({ error });
                    } else {
                      res
                        .status(200)
                        .json({ mensaje: "Contraseña actualizada con éxito" });
                    }
                  });
                }
              });
            });
          }
        });
      }
    });
  };

  // ---------------------------------------------
  followUser = (req, res) => {
    const user_id = req.body[0];
    const id_followed = req.body[1];
    console.log(user_id, id_followed);

    let sql = `INSERT INTO user_follows_user (user_id, followed_user_id) VALUES (${user_id}, ${id_followed});`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  // comprobar con los console.log
  unfollowUser = (req, res) => {
    const user_id = req.body[0];
    const id_followed = req.body[1];

    let sql = `DELETE FROM user_follows_user WHERE user_id = ${user_id} and followed_user_id = ${id_followed}`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  getFollowUser = (req, res) => {
    // const user_id = req.body;
    const user_id = req.params.id;

    let sql = `SELECT * FROM user_follows_user WHERE user_id = ${user_id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  //4-editar info de un usuario:

  editUser = (req, res) => {
    const { nickname, name, lastname, phonenumber, user_id, email } =
      JSON.parse(req.body.editUser);
    let sql;
    let img;
    console.log("REQBODY!", req.body);
    console.log("TELEFONO", phonenumber);

    if (
      (phonenumber == "" || phonenumber == null || phonenumber == undefined) &&
      req.file
    ) {
      img = req.file.filename;
      sql = `UPDATE user SET nickname = "${nickname}", name = "${name}", lastname = "${lastname}", email = "${email}",phonenumber = null, img = "${img}" WHERE user_id = ${user_id}`;
      console.log("IF-1");
    } else if (phonenumber != "" && req.file) {
      img = req.file.filename;
      sql = `UPDATE user SET nickname = "${nickname}", name = "${name}", lastname = "${lastname}",email = "${email}", phonenumber = "${phonenumber}", img = "${img}" WHERE user_id = ${user_id}`;
      console.log("IF-2");
    } else if (
      (phonenumber == "" || phonenumber == null || phonenumber == undefined) &&
      !req.file
    ) {
      sql = `UPDATE user SET nickname = "${nickname}", name = "${name}", lastname = "${lastname}",email = "${email}",phonenumber = null WHERE user_id = ${user_id}`;
      console.log("IF-3");
    } else if (phonenumber != "" && !req.file) {
      sql = `UPDATE user SET nickname = "${nickname}", name = "${name}", lastname = "${lastname}",email = "${email}", phonenumber = "${phonenumber}" WHERE user_id = ${user_id}`;
      console.log("IF-4");
    }

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error, message: "Error en la SQL" });
      } else {
        console.log("TODO BIEN", result);
        res.status(200).json({ result, img });
      }
    });
  };

  // if (req.file) {
  //   img = req.file.filename;
  //   sql = `UPDATE user SET nickname = "${nickname}", name = "${name}", lastname = "${lastname}", email = "${email}", phonenumber = "${phonenumber}", img = "${img}" WHERE user_id = ${user_id}`;
  // } else {
  //   sql = `UPDATE user SET nickname = "${nickname}", name = "${name}", lastname = "${lastname}", email = "${email}", phonenumber = "${phonenumber}" WHERE user_id = ${user_id} AND (img IS NULL OR img = "")`;
  // }

  // -------------
  getStatisticsUser = (req, res) => {
    try {
      const { id } = req.params;
      const user_id = id;

      let sql2 = `SELECT
      (SELECT COUNT(*) FROM user_follows_user WHERE followed_user_id = '${user_id}') AS num_followers,
      (SELECT COUNT(*) FROM post WHERE user_id = '${user_id}') AS num_posts,
      (SELECT COUNT(*) FROM post WHERE user_id = '${user_id}' AND type = 2) AS num_trades,
      (SELECT COUNT(*) FROM course WHERE user_id = '${user_id}' AND is_deleted = 0) AS num_courses,
      (SELECT COUNT(*) FROM post WHERE user_id = '${user_id}' AND correct = true) AS num_correct_posts,
      (SELECT COUNT(*) FROM post WHERE user_id = '${user_id}' AND correct = false) AS num_incorrect_posts,
      (SELECT COUNT(DISTINCT followed_user_id) FROM user_follows_user WHERE user_id = '${user_id}') AS num_following_users,
      GROUP_CONCAT(c.category_name) AS user_categories
      FROM user_category uc
      LEFT JOIN category c ON uc.category_id = c.category_id
      WHERE uc.user_id = '${user_id}';`;

      connection.query(sql2, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json({ datos: result[0] });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).JSON({ message: "Error inesperado (CATCH)" });
    }
  };

  verifyPassword = (req, res) => {
    const { id } = req.params;
    const { currentPassword } = req.body;

    // Buscar el usuario por ID
    let sql = `SELECT * FROM user WHERE user_id = ${id}`;
    connection.query(sql, [id], (error, result) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Error en la verificación de la contraseña" });
      }

      // Verificar si el usuario existe
      if (result.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const user = result[0];
      const hash = user.password;

      // Verificar la contraseña
      bcrypt.compare(currentPassword, hash, (error, response) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ error: "Error en la verificación de la contraseña" });
        }

        if (response) {
          const token = jwt.sign(
            {
              user: {
                user_id: user.user_id,
                type: user.type,
              },
            },
            process.env.SECRET,
            { expiresIn: "1d" }
          );

          res.status(200).json({ token, user });
        } else {
          res.status(401).json({ message: "Contraseña actual incorrecta" });
        }
      });
    });
  };

  // Cambiar contraseña
  updatePassword = (req, res) => {
    const { id, password } = req.body;

    // Consultar el usuario por user_id
    let sql = `SELECT * FROM user WHERE user_id = ${id}`;
    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al consultar el usuario" });
      }

      // Verificar si el usuario existe
      if (result.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Generar el hash de la nueva contraseña
      bcrypt.genSalt(8, (err, salt) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          }

          // Actualizar la contraseña en la base de datos
          let sql2 = `UPDATE user SET password = '${hash}' WHERE user_id = ${id}`;
          connection.query(sql2, [hash, id], (error, result) => {
            if (error) {
              return res.status(500).json({ error });
            }

            res
              .status(200)
              .json({ mensaje: "Contraseña actualizada con éxito" });
          });
        });
      });
    });
  };

  getFollowersUser = (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT * FROM user WHERE user_id IN (SELECT user_id FROM user_follows_user WHERE followed_user_id = '${id}');`;
      connection.query(sql, (error, result) => {
        if (error) {
          console.log("Error en sql", error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json({ datos: result });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).JSON({ message: "Error inesperado (CATCH)" });
    }
  };

  getFollowingUser = (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT * FROM user WHERE user_id IN (SELECT followed_user_id FROM user_follows_user WHERE user_id = ${id});`;
      let sql2 = `SELECT * FROM user WHERE user_id IN (SELECT user_id FROM user_follows_user WHERE followed_user_id = ${id});`;
      connection.query(sql, (error, result) => {
        if (error) {
          console.log("Error en sql", error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json({ datos: result });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).JSON({ message: "Error inesperado (CATCH)" });
    }
  };

  getPostsUser = (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT post.*, post_resource.resource_type, post_resource.text as resource_text, category.category_name FROM post LEFT JOIN post_resource ON post.post_id = post_resource.post_id LEFT JOIN category ON post.category_id = category.category_id WHERE post.user_id = ${id};`;
      connection.query(sql, (error, result) => {
        if (error) {
          console.log("Error en sql", error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json({ datos: result });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).JSON({ message: "Error inesperado (CATCH)" });
    }
  };

  getTradesPostsUser = (req, res) => {
    try {
      const { id } = req.params;
      let sql = `
        SELECT 
          post.*, 
          post_resource.resource_type, 
          post_resource.text as resource_text, 
          category.category_name 
        FROM 
          post 
          LEFT JOIN post_resource ON post.post_id = post_resource.post_id 
          LEFT JOIN category ON post.category_id = category.category_id 
        WHERE 
          post.user_id = ${id} AND
          post.type = 1;
      `;
      connection.query(sql, (error, result) => {
        if (error) {
          console.log("Error en sql", error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json({ datos: result });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).JSON({ message: "Error inesperado (CATCH)" });
    }
  };

  getGeneralPostsUser = (req, res) => {
    try {
      const { id } = req.params;
      let sql = `
        SELECT 
          post.*, 
          post_resource.resource_type, 
          post_resource.text as resource_text, 
          category.category_name 
        FROM 
          post 
          LEFT JOIN post_resource ON post.post_id = post_resource.post_id 
          LEFT JOIN category ON post.category_id = category.category_id 
        WHERE 
          post.user_id = ${id} AND
          post.type = 2;
      `;
      connection.query(sql, (error, result) => {
        if (error) {
          console.log("Error en sql", error);
          res.status(400).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json({ datos: result });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).JSON({ message: "Error inesperado (CATCH)" });
    }
  };

  // muestra los usuarios ordenados de mayor a menor nº seguidores
  showAllUsers = (req, res) => {
    try {
      let sql = `SELECT user.*, (SELECT COUNT(*) FROM post WHERE user.user_id = post.user_id) AS total_posts, (SELECT COUNT(*) FROM post WHERE user.user_id = post.user_id AND post.correct = true) AS correct_posts, (SELECT COUNT(*) FROM post WHERE user.user_id = post.user_id AND post.correct = false) AS incorrect_posts, (SELECT COUNT(*) FROM user_follows_user WHERE user.user_id = user_follows_user.user_id) AS following_count, (SELECT COUNT(*) FROM user_follows_user WHERE user.user_id = user_follows_user.followed_user_id) AS followers_count, (SELECT COUNT(*) FROM course WHERE user.user_id = course.user_id ) AS total_courses FROM user where user.is_deleted = 0 ORDER BY followers_count DESC;`;

      connection.query(sql, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error al enviar el correo electrónico de registro",
      });
    }
  };

  // muestra los usuarios ordenados de mayor a menor nº aciertos
  showAllUsersSuccesses = (req, res) => {
    try {
      let sql = `SELECT user.*,
      (SELECT COUNT(*) FROM post WHERE user.user_id = post.user_id) AS total_posts,
      (SELECT COUNT(*) FROM post WHERE user.user_id = post.user_id AND correct = true) AS correct_posts,
      (SELECT COUNT(*) FROM post WHERE user.user_id = post.user_id AND correct = false) AS incorrect_posts,
      (SELECT COUNT(*) FROM user_follows_user WHERE user.user_id = user_follows_user.user_id) AS following_count,
      (SELECT COUNT(*) FROM user_follows_user WHERE user.user_id = user_follows_user.followed_user_id) AS followers_count,
      (SELECT COUNT(*) FROM course WHERE user.user_id = course.user_id) AS total_courses
      FROM user
      ORDER BY correct_posts DESC;`;
      connection.query(sql, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Error en la SQL" });
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error al enviar el correo electrónico de registro",
      });
    }
  };

  traderProfile = (req, res) => {
    const { id: user_id } = req.params;

    let sql2 = `SELECT 
    u.nickname,
    u.name,
    u.lastname,
    u.img AS user_image,
    COUNT(DISTINCT p.post_id) AS total_posts,
    COUNT(DISTINCT CASE WHEN p.correct = true THEN p.post_id END) AS correct_posts_count,
    COUNT(DISTINCT CASE WHEN p.correct = false THEN p.post_id END) AS incorrect_posts_count,
    COUNT(DISTINCT c.course_id) AS total_courses,
    COUNT(DISTINCT uf.followed_user_id) AS followers_count,
    COUNT(DISTINCT uf2.user_id) AS following_count,
    GROUP_CONCAT(DISTINCT cat.category_name ORDER BY cat.category_name ASC) AS category_names
    FROM user u
    LEFT JOIN post p ON u.user_id = p.user_id
    LEFT JOIN course c ON u.user_id = c.user_id
    LEFT JOIN user_follows_user uf ON u.user_id = uf.followed_user_id
    LEFT JOIN user_follows_user uf2 ON u.user_id = uf2.followed_user_id
    LEFT JOIN user_category uc ON u.user_id = uc.user_id
    LEFT JOIN category cat ON uc.category_id = cat.category_id
    WHERE u.user_id = ${user_id}
    GROUP BY u.user_id;`;

    connection.query(sql2, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };
  
  // ---------------------------------------------------------------
  deleteUser = (req, res) => {
    const { id: user_id } = req.params;
    const { email, nickname } = req.body;
    let sql = `UPDATE user SET is_deleted = 1, email = "${user_id}@deleteuser.com", nickname = "${user_id}deleteUser" WHERE user_id = ${user_id}`;

    connection.query(sql, (err, result) => {
      let mess = `http://localhost:5173/deleteuser/${user_id}`;
      if (err) {
        res.status(500).json(err);
      } else {
        nodemailerDeleteUser(email, nickname, mess);
        res
          .status(200)
          .json({ message: "Email recibido correctamente", result });
      }
    });
  };

  userSendCategory = (req, res) => {
    console.log(req.body);
    const categories = req.body.selectedValues;
    const user_id = req.body.user_id;

    // Elimina las categorías existentes para el usuario
    let deleteSql = `DELETE FROM user_category WHERE user_id = ${user_id}`;
    connection.query(deleteSql, (deleteErr, deleteResult) => {
      if (deleteErr) {
        res.status(500).json(deleteErr);
      } else {
        // Inserta las nuevas categorías para el usuario
        let insertSql = `INSERT INTO user_category (user_id, category_id) VALUES ?`;
        let values = categories.map((category) => [user_id, category]);
        connection.query(insertSql, [values], (insertErr, insertResult) => {
          if (insertErr) {
            res.status(500).json(insertErr);
          } else {
            // Devuelve las categorías actualizadas
            let selectSql = `SELECT * FROM user_category WHERE user_id = ${user_id}`;
            connection.query(selectSql, (selectErr, selectResult) => {
              if (selectErr) {
                res.status(500).json(selectErr);
              } else {
                res.status(200).json(selectResult);
              }
            });
          }
        });
      }
    });
  };

  getCategoriesUser = (req, res) => {
    try {
      const user_id = req.params.id;
      console.log(user_id);

      let sql = `SELECT uc.category_id,c.category_name FROM user u LEFT JOIN user_category uc ON u.user_id  = uc.user_id LEFT JOIN category c ON uc.category_id = c.category_id WHERE u.user_id = ${user_id};`;

      connection.query(sql, (error, result) => {
        if (error) {
          res.status(500).json({ message: "Error en la SQL" });
        } else {
          console.log(result);
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error en el CATCH",
      });
    }
  };
}

module.exports = new usersControllers();
