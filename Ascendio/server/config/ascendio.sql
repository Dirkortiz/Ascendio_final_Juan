CREATE DATABASE ascendio;

USE ascendio;

-- drop database ascendio;

CREATE TABLE user (
  user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  nickname VARCHAR(50) UNIQUE,
  name VARCHAR(50) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  phonenumber VARCHAR (20) UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  img VARCHAR (150),
  type TINYINT NOT NULL DEFAULT 2, -- 1 admin, 2 user
  is_confirmed BOOLEAN NOT NULL DEFAULT false, -- user
  is_disabled BOOLEAN NOT NULL DEFAULT  false, -- admin
  is_deleted BOOLEAN NOT NULL DEFAULT false -- user
);

CREATE TABLE category (
  category_id TINYINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT, -- tipo 1 -> bolsa, tipo 2->  crypto, tipo 3 ->Forex, tipo 4 -> General ( necesiario para post general )
  category_name VARCHAR(50) NOT NULL UNIQUE -- Crypto, Bolsa, Forex, General
  -- IMPORTANTE HAY QUE CREAR LAS CATEGORIAS TAL CUAL: 1 CRYPTO, 2 BOLSA, 3 FOREX Y 4 GENERAL.
);
    
CREATE TABLE post (
  post_id BIGINT UNSIGNED PRIMARY KEY auto_increment,
  user_id INT UNSIGNED NOT NULL, -- creador del post
  category_id TINYINT UNSIGNED NOT NULL,
  currency CHAR(10) NULL,
  description VARCHAR(255) NOT NULL,
  entry_price DECIMAL(7,2) UNSIGNED NULL,
  stop_loss DECIMAL(7,2) UNSIGNED NULL,
  take_profit DECIMAL(7,2) UNSIGNED NULL,
  correct BOOLEAN, -- POR DEFECTO ES NULL, QUE QUIERE DECIR PENDIENTE, 1 ES ACERTADO Y 2 ES ERRADO.
  date DATETIME not null default CURRENT_TIMESTAMP,
  type TINYINT NOT NULL, -- tipo 1: trade, tipo 2: regular post
  is_deleted BOOLEAN NOT NULL DEFAULT false, -- el usuario "borra" el post
  is_disabled BOOLEAN NOT NULL DEFAULT false,  -- el admin deshabilita el post
  CONSTRAINT fk_user_1 FOREIGN KEY (user_id)
  REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_category_1 FOREIGN KEY (category_id)
  REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comments (
  post_id BIGINT UNSIGNED NOT NULL,
  comment_id SMALLINT UNSIGNED NOT NULL,
  primary key(post_id, comment_id),
  user_id INT UNSIGNED NOT NULL, -- autor del comentario
  date DATETIME not null default CURRENT_TIMESTAMP,
  message VARCHAR(250) NOT NULL,
  CONSTRAINT fk_post_1 FOREIGN KEY (post_id)
  REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_user_2 FOREIGN KEY (user_id)
  REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_category (  -- un user va a poder hablar de varias categorias
  user_id INT UNSIGNED NOT NULL ,
  category_id TINYINT UNSIGNED NOT NULL,
  primary key(user_id, category_id),
  CONSTRAINT fk_user_3 FOREIGN KEY (user_id)
  REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_category_2 FOREIGN KEY (category_id)
  REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_follows_user (
  user_id INT UNSIGNED NOT NULL,
  followed_user_id INT UNSIGNED NOT NULL,
  primary key(user_id, followed_user_id),
  CONSTRAINT fk_user_4 FOREIGN KEY (user_id)
  REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_user_5 FOREIGN KEY (followed_user_id)
  REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_likes_post (
  user_id INT UNSIGNED NOT NULL ,
  post_id BIGINT UNSIGNED NOT NULL,
  primary key(user_id, post_id),
  CONSTRAINT fk_user_6 FOREIGN KEY (user_id)
  REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_post_2 FOREIGN KEY (post_id)
  REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE post_resource(
  resource_id BIGINT UNSIGNED PRIMARY KEY NOT NULL auto_increment,
  post_id BIGINT UNSIGNED NOT NULL,
  resource_type TINYINT NOT NULL, -- tipo 1 -> imagen, tipo 2 -> URL,
  text VARCHAR(250) NOT NULL,
		-- /server/resources/img.jpg   		-- 1
        -- youtube.com/az45u_i7g  			-- 2
  CONSTRAINT fk_post_3 FOREIGN KEY (post_id)
  REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);

/*
CREATE TABLE graphic(
  graphic_id SMALLINT UNSIGNED PRIMARY KEY NOT NULL,
  graphic_name VARCHAR(250), -- ¿DENTRO DEL JSON?
  graphic_category VARCHAR(250), -- ¿DENTRO DEL JSON?
  graphic_type CHAR(1),  -- ¿DENTRO DEL JSON? ¿PUEDE SER LO MISMO QUE CATEGORY?
  graphic_json VARCHAR(250),
  graphic_isdisabled BOOLEAN NOT NULL DEFAULT false,
  grapgic_isdeleted BOOLEAN NOT NULL DEFAULT false
);
*/

CREATE TABLE course (
  course_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,  -- creador
  followers INT,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(250) NOT NULL,
  img VARCHAR (150),
  date DATETIME not null default CURRENT_TIMESTAMP,
  price DECIMAL(7,2) UNSIGNED NOT NULL,  -- 99999,99
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  is_disabled BOOLEAN NOT NULL DEFAULT true,
  is_completed BOOLEAN NOT NULL DEFAULT	true,
  CONSTRAINT fk_user_7 FOREIGN KEY (user_id)
  references user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_enrolls_course(
  user_id INT UNSIGNED NOT NULL,
  course_id INT UNSIGNED NOT NULL,
  primary key(user_id, course_id),
  CONSTRAINT fk_user_8 FOREIGN KEY (user_id)
  REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_course_1 FOREIGN KEY (course_id)
  REFERENCES course(course_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_wishes_course(
  user_id INT UNSIGNED NOT NULL,
  course_id INT UNSIGNEd NOT NULL,
  primary key(user_id, course_id),
  CONSTRAINT fk_user_9 FOREIGN KEY (user_id)
  REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_course_2 FOREIGN KEY (course_id)
  REFERENCES course(course_id) ON DELETE CASCADE ON UPDATE CASCADE
);
-- Borrado total!

CREATE TABLE user_rates_course(
  user_id INT UNSIGNED NOT NULL,
  course_id INT UNSIGNEd NOT NULL,
  primary key(user_id, course_id),
  course_rates TINYINT UNSIGNED NOT NULL, -- 1 á 5 stars?
  commentary VARCHAR(250),
  CONSTRAINT fk_user_10 FOREIGN KEY (user_id)
  REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_course_3 FOREIGN KEY (course_id)
  REFERENCES course(course_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE section (
  course_id INT UNSIGNED NOT NULL,
  section_id TINYINT UNSIGNED NOT NULL,
  section_title VARCHAR(50) NOT NULL,
  PRIMARY KEY (course_id, section_id),
  CONSTRAINT fk_course_4 FOREIGN KEY(course_id)
  REFERENCES course (course_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE topic (
  course_id INT UNSIGNED NOT NULL,
  section_id TINYINT UNSIGNED NOT NULL,
  topic_id TINYINT UNSIGNED NOT NULL,
  topic_title VARCHAR(50),
  topic_content TEXT,
  PRIMARY KEY (course_id, section_id, topic_id),
  CONSTRAINT fk_section_1 FOREIGN KEY(course_id, section_id)
  REFERENCES section (course_id, section_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table user_completes_topic(
	user_id INT UNSIGNED NOT NULL,
  course_id INT UNSIGNED NOT NULL,
	section_id TINYINT UNSIGNED NOT NULL,
	topic_id TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (user_id, course_id, section_id, topic_id),
  CONSTRAINT fk_user_11 FOREIGN KEY (user_id)
	REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_topic_1 FOREIGN KEY(course_id, section_id, topic_id)
	REFERENCES topic (course_id, section_id, topic_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE resource (
  resource_id INT UNSIGNED NOT NULL PRIMARY KEY auto_increment,
  course_id INT UNSIGNED NOT NULL,
  section_id TINYINT UNSIGNED NOT NULL,
  topic_id TINYINT UNSIGNED NOT NULL,
  resource_type TINYINT NOT NULL, -- tipo 1 -> imagen, tipo 2 -> pdf , tipo 3 -> link,
  text VARCHAR(250),
		-- /server/resources/img.jpg   		-- 1
        -- /server/resources/algo.pfg   	-- 2category
        -- youtube.com/az45u_i7g  			-- 3
  CONSTRAINT fk_topic_2 FOREIGN KEY(course_id, section_id, topic_id)
  REFERENCES topic(course_id, section_id, topic_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tag (
  tag_id BIGINT UNSIGNED NOT NULL PRIMARY KEY,
  tag_name VARCHAR(20) NOT NULL UNIQUE
);
 
CREATE TABLE course_tag (
	tag_id BIGINT UNSIGNED NOT NULL,
	course_id INT UNSIGNED NOT NULL,
	CONSTRAINT fk_tag_1 FOREIGN KEY(tag_id)
	REFERENCES tag(tag_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_course_6 FOREIGN KEY(course_id)
	REFERENCES course(course_id) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from category;

select * from course; 

select * from user; 

select * from post;

-- TAGS NECESARIOS PARA LA CREACIÓN DE CURSOS

INSERT INTO `ascendio`.`tag` (`tag_id`, `tag_name`) VALUES ('1', '#Crypto');
INSERT INTO `ascendio`.`tag` (`tag_id`, `tag_name`) VALUES ('2', '#Forex');
INSERT INTO `ascendio`.`tag` (`tag_id`, `tag_name`) VALUES ('3', '#Acciones');
INSERT INTO `ascendio`.`tag` (`tag_id`, `tag_name`) VALUES ('4', '#Metales');
INSERT INTO `ascendio`.`tag` (`tag_id`, `tag_name`) VALUES ('5', '#RSI');
INSERT INTO `ascendio`.`tag` (`tag_id`, `tag_name`) VALUES ('6', '#Fibonacci');
INSERT INTO `ascendio`.`tag` (`tag_id`, `tag_name`) VALUES ('7', '#SmartMoney');
INSERT INTO `ascendio`.`tag` (`tag_id`, `tag_name`) VALUES ('8', '#EMA');
INSERT INTO `ascendio`.`tag` (`tag_id`, `tag_name`) VALUES ('9', '#SwingTrading');
INSERT INTO `ascendio`.`tag` (`tag_id`, `tag_name`) VALUES ('10', '#Scalping');
INSERT INTO `ascendio`.`tag` (`tag_id`, `tag_name`) VALUES ('11', '#AccionPrecio');

-- CATEGORIAS NECESARIAS PARA LA CREACIÓN DE POSTS

INSERT INTO category (category_name) VALUES
  ('Bolsa'),
  ('Crypto'),
  ('Forex'),
  ('General');