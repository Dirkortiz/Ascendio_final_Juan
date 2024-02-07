const connection = require("../config/db");

class coursesControllers {

  createCourse = (req, res) => {
    const tags = JSON.parse(req.body.tags);
    const { title, description, price, user_id } = JSON.parse(
      req.body.crearCurso
    );
    //posible validación en el back con reg.ex https://medium.com/codex/using-regular-expressions-in-javascript-edcd5942de89
    let sql = `INSERT INTO course (title, description, price, user_id, img) VALUES ('${title}', '${description}', ${price}, ${user_id}, 'default.png')`;
    if (req.file !== undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO course (title, description, price, user_id, img) VALUES ('${title}', '${description}', ${price}, ${user_id}, '${img}')`;
    }
    connection.query(sql, (err, result) => {
      err && res.status(500).json(err);
      if (err) {
        console.log(err);
      }
      let course_id = result.insertId;
      tags.forEach((elem) => {
        let sql2 = `INSERT INTO course_tag (course_id, tag_id) VALUES (${course_id}, ${elem.value})`;
        connection.query(sql2, (errtag, restag) => {
          errtag && res.status(500).json(errtag);
          if (errtag) {
            console.log(errtag);
          }
        });
      });
      res.status(200).json(result);
    });
  };

  callTags = (req, res) => {
    let sql = `SELECT * FROM tag`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  callCourses = (req, res) => {
    let sql = `SELECT course.course_id, course.followers, course.title, course.description, course.price, course.is_disabled, course.img, course.date, REPLACE(GROUP_CONCAT(tag.tag_name), ',', ' ') AS tags, AVG(user_rates_course.course_rates) AS average_rating FROM course
    LEFT JOIN course_tag ON course.course_id = course_tag.course_id
    LEFT JOIN tag ON course_tag.tag_id = tag.tag_id
    LEFT JOIN user_rates_course ON course.course_id = user_rates_course.course_id
    WHERE course.is_disabled = 0 AND course.is_deleted = 0
    GROUP BY course.course_id, course.title, course.description, course.price, course.is_disabled, course.img ORDER BY
    average_rating DESC`;
    
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  callCoursesDates = (req, res) => {
    let sql = `SELECT
    course.course_id,
    course.followers,
    course.title,
    course.description,
    course.price,
    course.is_disabled,
    course.img,
    course.date,
    REPLACE(GROUP_CONCAT(tag.tag_name), ',', ' ') AS tags,
    AVG(user_rates_course.course_rates) AS average_rating
FROM
    course
    LEFT JOIN course_tag ON course.course_id = course_tag.course_id
    LEFT JOIN tag ON course_tag.tag_id = tag.tag_id
    LEFT JOIN user_rates_course ON course.course_id = user_rates_course.course_id
WHERE
    course.is_disabled = 0 AND course.is_deleted = 0
GROUP BY
    course.course_id, course.title, course.description, course.price, course.is_disabled, course.img
ORDER BY course.date DESC`;
    
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  oneCourse = (req, res) => {
    const { course_id } = req.params; //añadir el usuario que está logueado
    // console.log(course_id);
    let sql = `SELECT course.title, course.followers, course.user_id, course.img, course.date, course.is_completed,course.is_disabled, course.description, course.price , section.section_id, section.section_title, topic.topic_id, topic.topic_title, resource.resource_id, resource.resource_type, resource.text
    FROM course
    left join section on course.course_id = section.course_id
    left join topic  on topic.course_id = section.course_id and topic.section_id = section.section_id
    LEFT JOIN resource on resource.topic_id = topic.topic_id and resource.section_id = section.section_id and resource.course_id = course.course_id
    WHERE  course.course_id = ${course_id} AND is_deleted = 0 ;`;

    connection.query(sql, (err, result) => {
      console.log("++++++++++++", result);
      if (err) {
        res.status(500).json(err);
      }

      const { title, user_id, description, followers, img, date, price, is_completed, is_disabled } =
        result[0];
      let sections = [];
      let topics = [];
      let resource = [];
      let last_section_id = null;
      let last_topic_id = null;
      let last_resource_id = null;
      for (let row of result) {
        if (last_section_id != row.section_id && last_section_id != null) {
          topics = [];
        }
        if(last_resource_id != row.resource_id && last_resource_id != null){
          resource = [];
        }
        if(last_resource_id != row.resource_id && row.resource_id != null){
          last_resource_id = row.resource_id
          resource.push({
            resource_id: row.resource_id,
            resource_type: row.resource_type,
            resource_text: row.text
          })
        }
        if (last_topic_id != row.topic_id && row.topic_id != null) {
          //console.log(row.topic_id);
          last_topic_id = row.topic_id;
          topics.push({
            topic_id: row.topic_id,
            topic_title: row.topic_title,
            topic_resource: resource
          });
        }
        if (last_section_id != row.section_id && row.section_id != null) {
          last_section_id = row.section_id;
          sections.push({
            section_id: row.section_id,
            section_title: row.section_title,
            section_topics: topics,
          });
        }
      }

      let data = {
        title,
        img,
        date,
        followers,
        user_id,
        is_completed,
        is_disabled,
        price,
        description,
        sections,
      };
   
      res.status(200).json(data);
    });
  };

  getCreatorUser = (req, res) => {
    const { course_id } = req.params;

    let creatorUser = {};

    let sql = `SELECT user.nickname 
    FROM user 
    INNER JOIN course ON user.user_id = course.user_id 
    WHERE course.course_id = ${course_id};`;
    connection.query(sql, (err, result) => {
      console.log("----------------", result);
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json(result);
      console.log(result);
    });
  };

  editOneCourse = (req, res) => {
    const { title, description, price, user_id } = JSON.parse(
      req.body.editarCurso
    );
    const { course_id } = req.params;
    let sql = `UPDATE course SET title = '${title}', description = '${description}', price = ${price} WHERE course_id = ${course_id} AND user_id = ${user_id} AND is_deleted = 0`;
    let img;
    if (req.file) {
      img = req.file.filename;
      sql = `UPDATE course SET title = '${title}', description = '${description}', price = ${price}, img = '${img}' WHERE course_id = ${course_id} AND user_id = ${user_id} AND is_deleted = 0`;
    }
    connection.query(sql, (err, result) => {
      if (err) {
        console.log("Error en la consulta SQL:", err);
        return res.status(500).json(err);
      }
      res
        .status(200)
        .json({ result, img: req.file ? req.file.filename : null });
    });
  };

  addSection = (req, res) => {
    const { course_id, newSection } = req.body;
    let sql_cont = `SELECT max(section_id) as id FROM section WHERE course_id = ${course_id}`;
    connection.query(sql_cont, (err1, result) => {
      console.log("...........", err1);
      if (err1) {
        return res.status(500).json(err1);
      }
      let section_id = result[0].id;
      if (section_id == null) {
        section_id = 1;
      } else {
        section_id++;
      }
      //console.log(section_id);
      let sql_insert = `INSERT INTO section (course_id, section_id, section_title) VALUES (${course_id} , ${section_id} , "${newSection}")`;
      connection.query(sql_insert, (err2, result_insert) => {
        console.log("...........", err2);
        if (err2) {
          return res.status(500).json(err2);
        }
        res.status(201).json({ result_insert, section_id });
      });
    });
  };

  viewPurchasedCourse = (req, res) => {
    let sql = `SELECT * FROM course WHERE is_completed = 1 AND is_deleted = 0`;
    
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  deleteSection = (req, res) => {
    const { course_id, section_id } = req.params;
    let sql = `DELETE FROM section WHERE course_id = ${course_id} and section_id =${section_id}`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  addTopic = (req, res) => {
    const { course_id, newTopic, section_id } = req.body;
    let sql_cont = `SELECT max(topic_id) as id FROM topic WHERE section_id = ${section_id} AND course_id = ${course_id}`;
    connection.query(sql_cont, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      let topic_id = result[0].id;
      if (topic_id == null) {
        topic_id = 1;
      } else {
        topic_id++;
      }
      let sql_insert = `INSERT INTO topic (course_id, section_id, topic_id, topic_title) VALUES (${course_id}, ${section_id}, ${topic_id}, "${newTopic}")`;
      connection.query(sql_insert, (err2, result_insert) => {
        if (err2) {
          return res.status(500).json(err2);
        }
        res.status(201).json({ result_insert, topic_id });
      });
    });
  };

  oneUserCourses = (req, res) => {
    const { user_id } = req.params;
    
    let sql = `SELECT course.course_id, course.followers, course.title, course.description, course.price, course.is_disabled, course.img, REPLACE(GROUP_CONCAT(tag.tag_name), ',', ' ') AS tags FROM course
    LEFT JOIN course_tag ON course.course_id = course_tag.course_id
    LEFT JOIN tag ON course_tag.tag_id = tag.tag_id
    WHERE course.user_id = ${user_id} AND course.is_deleted = 0 GROUP BY course.course_id, course.title, course.description, course.price, course.is_disabled, course.img;`
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  deleteCourse = (req, res) => {
    const { course_id } = req.params;
    let sql = `UPDATE course
      LEFT JOIN  section ON course.course_id = section.course_id
      LEFT JOIN course_tag ON course.course_id = course_tag.course_id
      LEFT JOIN tag ON course_tag.tag_id = tag.tag_id
      LEFT JOIN topic ON course.course_id = topic.course_id
        SET course.is_deleted = 1
          WHERE course.course_id = ${course_id};`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  deleteTopic = (req, res) => {
    const { course_id, section_id, topic_id } = req.params;
    let sql = `DELETE FROM topic WHERE course_id = ${course_id} and section_id =${section_id} AND topic_id = ${topic_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  getWishCourse = (req, res) => {
    const { course_id, user_id } = req.params;
    let sql = `SELECT * FROM user_wishes_course WHERE user_id = ${user_id} and course_id = ${course_id}`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  addWishesCourse = (req, res) => {
    const { course_id } = req.params;
    const { usuario } = req.body;
    let sql = `INSERT INTO user_wishes_course (user_id, course_id) VALUES (${usuario}, ${course_id})`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  delFromWishes = (req, res) => {
    const { course_id } = req.params;
    const { usuario } = req.body;
    let sql = `DELETE FROM user_wishes_course WHERE course_id = ${course_id} and user_id = ${usuario}`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  getAllTagsOneCourse = (req, res) => {
    const { course_id } = req.params;
    let sql = `SELECT tag.tag_id, tag.tag_name
    FROM tag
      LEFT JOIN  course_tag ON course_tag.tag_id = tag.tag_id
        WHERE course_tag.course_id = ${course_id}`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  addToPurchaseCourse = (req, res) => {
    const { course_id } = req.params;
    const { usuario } = req.body;
    let sql = `INSERT INTO user_enrolls_course (user_id, course_id) VALUES (${usuario}, ${course_id})`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  getPurchaseCourse = (req, res) => {
    const { course_id, user_id } = req.params;
    let sql = `SELECT * FROM user_enrolls_course WHERE user_id = ${user_id} and course_id = ${course_id}`;
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  addResourcePdf = (req, res) =>{
    
    const { course_id, section_id, topic_id, url} = JSON.parse(req.body.crearContenido);
    console.log('REEEEQ', req.file);
    let pdf = ''

    let sql

    if(req.file !== undefined){
      pdf = req.file.filename
      sql = `INSERT INTO resource (course_id, section_id, topic_id, resource_type, text) VALUES (${course_id}, ${section_id}, ${topic_id}, 1 , '${pdf}')`
    }else{
      let temp = url.split('watch?v=')[1]
      console.log('AAAAA', temp);
      //url = url.split('watch?v=')[1]
      sql = `INSERT INTO resource (course_id, section_id, topic_id, resource_type, text) VALUES (${course_id}, ${section_id}, ${topic_id}, 2 , '${temp}')`;
    }
    console.log('EEEE', sql);
    connection.query(sql, (err, result) => {
      if (err) {
        console.log('ERRRRR', err);
        return res.status(500).json(err);
      }
      res.status(201).json(result)
    })
  }

  
    deleteResource = (req, res) =>{
    const { course_id, section_id, topic_id, resource_id } = req.params;
    let sql = `DELETE FROM resource WHERE course_id = ${course_id} AND section_id =${section_id} AND topic_id = ${topic_id} AND resource_id = ${resource_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  }


  getPurchaseCourse = (req, res) => {
    const { course_id, user_id } = req.params;
    let sql = `SELECT * FROM user_enrolls_course WHERE user_id = ${user_id} and course_id = ${course_id}`;
    
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  addToValidateCourse = (req, res) => {
    const { course_id } = req.params;

    let sql = `UPDATE course SET is_completed = 1
    WHERE course_id = ${course_id}`;

    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  };

  getAllRatesOneCourse = (req,res) =>{
    const {course_id} = req.params;

    let sql = `SELECT course.user_id AS course_creator_user_id, user_rates_course.course_rates, user_rates_course.commentary, user.user_id AS user_rater_user_id, user.nickname FROM course
    LEFT JOIN user_rates_course ON course.course_id = user_rates_course.course_id
    LEFT JOIN user ON user_rates_course.user_id = user.user_id
    WHERE course.course_id = ${course_id} AND user.is_deleted = 0 AND course.is_deleted = 0`
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    
    });
  }

  getOneResource =(req, res) =>{
    const {course_id, section_id, topic_id} = req.params;

    let sql = `SELECT * FROM resource 
    WHERE course_id = ${course_id} and section_id = ${section_id} and topic_id = ${topic_id}`

    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    
    });
  }

  getTypeResource =(req, res) =>{
    const {course_id, section_id, topic_id} = req.params;

    let sql = `SELECT * FROM resource 
    WHERE course_id = ${course_id} and section_id = ${section_id} and topic_id = ${topic_id}`

    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    
    });
  }


  getOneBreadCrumbs = (req,res) => {
    const {course_id, section_id} = req.params;
    let sql = `SELECT course.title, section.section_title FROM course 
    LEFT JOIN section ON course.course_id = section.course_id
    WHERE section.section_id = ${section_id} AND course.course_id = ${course_id}`

    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
      });
  }

  // este se usa pero no se pinta, se podrá borrar en futuro
  getPeopleVotesCourses = (req, res) =>{
    const {course_id} = req.params

    let sql = `SELECT COUNT(*) as numero
    FROM course
    LEFT JOIN user_rates_course ON course.course_id = user_rates_course.course_id
    LEFT JOIN user ON user_rates_course.user_id = user.user_id
    WHERE course.course_id = ${course_id} AND user.is_deleted = 0 AND course.is_deleted = 0`

    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);

    });
  }

  userRateOneCourse = (req, res) =>{
    const {course_id} = req.params
    const {usuario, course_rates, commentary} = req.body

    let sql = `INSERT INTO user_rates_course (user_id, course_id, course_rates, commentary) VALUES (${usuario}, ${course_id}, ${course_rates}, '${commentary}')`
    
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json({result, course_rates});
    });
  }

  getOneRateOneCourseOneUser = (req, res) =>{
    const {course_id, user_id} = req.params

    let sql = `SELECT * FROM user_rates_course WHERE user_id = ${user_id} AND course_id = ${course_id};`
    
    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
  }

  getOneWishedCourse = (req, res) =>{
    const { user_id } = req.params
    
    let sql = `SELECT
    course.course_id,
    course.followers,
    course.title,
    course.description,
    course.price,
    course.is_disabled,
    course.img,
    course.date,
    REPLACE(GROUP_CONCAT(tag.tag_name), ',', ' ') AS tags,
    AVG(user_rates_course.course_rates) AS average_rating
FROM
    course
LEFT JOIN
    course_tag ON course.course_id = course_tag.course_id
LEFT JOIN
    tag ON course_tag.tag_id = tag.tag_id
LEFT JOIN
    user_rates_course ON course.course_id = user_rates_course.course_id
LEFT JOIN
    user_wishes_course ON course.course_id = user_wishes_course.course_id
WHERE
    course.is_disabled = 0
    AND course.is_deleted = 0
    AND user_wishes_course.user_id = ${user_id}
GROUP BY
    course.course_id,
    course.title,
    course.description,
    course.price,
    course.is_disabled,
    course.img
ORDER BY
    average_rating DESC`

    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });
    
  }

  getOnePurchasedCourse = (req, res) =>{
    const { user_id } = req.params
    console.log("paramsssss", req.params)
    
    let sql = `SELECT
    course.course_id,
    course.followers,
    course.title,
    course.description,
    course.price,
    course.is_disabled,
    course.img,
    course.date,
    REPLACE(GROUP_CONCAT(tag.tag_name), ',', ' ') AS tags,
    AVG(user_rates_course.course_rates) AS average_rating
FROM
    course
LEFT JOIN
    course_tag ON course.course_id = course_tag.course_id
LEFT JOIN
    tag ON course_tag.tag_id = tag.tag_id
LEFT JOIN
    user_rates_course ON course.course_id = user_rates_course.course_id
LEFT JOIN
    user_enrolls_course ON course.course_id = user_enrolls_course.course_id
WHERE
    course.is_disabled = 0
    AND course.is_deleted = 0
    AND user_enrolls_course.user_id = ${user_id}
GROUP BY
    course.course_id,
    course.title,
    course.description,
    course.price,
    course.is_disabled,
    course.img
ORDER BY
    average_rating DESC`

    connection.query(sql, (err, result) => {
      err ? res.status(500).json(err) : res.status(200).json(result);
    });

  }
}

module.exports = new coursesControllers();
