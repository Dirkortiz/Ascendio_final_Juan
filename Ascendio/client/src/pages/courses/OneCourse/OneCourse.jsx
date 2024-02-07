import React, { useContext, useEffect, useState } from "react";
import { AscendioContext } from "../../../context/AscendioContext";
import axios from "axios";
import "./OneCourse.scss";
import { Accordion, Card} from "react-bootstrap";
import { EditOneCourse } from "../../../components/ModalEditOneCourse/EditOneCourse";
import { useNavigate, useParams } from "react-router-dom";
import { FormAddSection } from "../../../components/FormAddSection/FormAddSection";
import { CardSection } from "../../../components/CardSection/CardSection";
import { ModalDelOneCourse } from "../../../components/ModalDelOneCourse/ModalDelOneCourse";
import { CardRatingsOneCourse } from "../../../components/Courses/CardRatingsOneCourse/CardRatingsoneCourse";
import { ratesAverage } from "../../../helpers/utils";
import { CardRates } from "../../../components/CardRates/CardRates";

export const OneCourse = () => {
  const { user, setUser, userCourse, setUserCourse } =
    useContext(AscendioContext);
  const [oneCoursePpal, setOneCoursePpal] = useState();
  const [showModal, setShowModal] = useState(false);
  const course_id = useParams().course_id;
  const [courseToEdit, setCourseToEdit] = useState();
  const [addSection, setAddSection] = useState(false);
  const [sections, setSections] = useState([]);
  const [topics, setTopics] = useState([]);
  const [resetCourse, setResetCourse] = useState(false);
  const [isIntoWishes, setIsIntoWishes] = useState(false);
  const [isIntoPurchase, setIsIntoPurchase] = useState(false);
  const [isIntoValidate, setIsIntoValidate] = useState(false);
  const [courseTags, setCourseTags] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [creator, setCreator] = useState();
  const [orderedSections, setOrderedSections] = useState([]);
  const [rates, setRates] = useState();
  const [ratingAverage, setRatingAverage] = useState();
  const [resource, setResource] = useState([]);
  const [changeFollowers, setChangeFollowers] = useState();
  const [showCardRate, setShowCardRate] = useState(true);
  const [resetrate, setResetrate] = useState();
  const [peopleVotesCourse, setPeopleVotesCourse] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  

  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
    setCourseToEdit(); 
  };

  const openModalDelete = () => {
    setShowModalDelete(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/onecourse/${course_id}`)
      .then((res) => {
        console.log(res.data)
        setOneCoursePpal(res.data);
        setCourseToEdit(res.data);
        setSections(res.data.sections);
        // setTopics(res.data.topics);
        setResource(res.data.resource);
        if (res.data.is_completed === 1) {
          setIsIntoValidate(true);
        }
        if(res.data.is_disabled === 0){
          setIsConfirmed(true)
        }
        setUserCourse(res.data.user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showModal, resetCourse, isIntoWishes, isIntoPurchase]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/getalltagsonecourse/${course_id}`)
      .then((res) => {
        setCourseTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showModal, resetCourse]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/getcreatoruser/${course_id}`)
      .then((res) => {
        setCreator(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `http://localhost:3000/courses/getwishcourse/${course_id}/${user.user_id}`
        )
        .then((res) => {
          if (res.data.length) {
            setIsIntoWishes(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `http://localhost:3000/courses/getpurchasedcourse/${course_id}/${user.user_id}`
        )
        .then((res) => {
          if (res.data.length) {
            setIsIntoPurchase(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    const sortedSections = sections.slice().sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });

    const sectionsWithIndex = sortedSections.map((section, index) => ({
      ...section,
      index: index + 1,
    }));

    setOrderedSections(sectionsWithIndex);
  }, [sections, resetCourse, addSection]);

  let userId = user.user_id;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/courses/getallratesonecourse/${course_id}`)
      .then((res) => {
        if (res.data[0].course_rates) {
          setRates(res.data);
          ratesAverage(res.data);
          setRatingAverage(ratesAverage(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showCardRate]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/courses/getonerateonecourseoneuser/${course_id}/${user.user_id}`
      )
      .then((res) => {
        if (res.data.length) {
          setShowCardRate(false);
          setIsIntoPurchase(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatearFecha = (date) => {
    return date.split("T")[0].split("-").reverse().join("-");
  };

  const addToWishes = () => {
    axios
      .put(`http://localhost:3000/courses/addwishescourse/${course_id}`, {
        usuario: user.user_id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const delFromWishes = () => {
    axios
      .post(`http://localhost:3000/courses/delfromwishes/${course_id}`, {
        usuario: user.user_id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const addToPurchase = () => {
    axios
      .put(`http://localhost:3000/courses/addtopurchasecourse/${course_id}`, {
        usuario: user.user_id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .put(`http://localhost:3000/courses/getpeoplevotescourses/${course_id}`)
      .then((res) => {
        setPeopleVotesCourse(res.data[0].numero)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToValidate = () => {
    axios
      .put(`http://localhost:3000/courses/addtovalidatecourse/${course_id}`)
      .then((res) => {
        setIsIntoValidate(true);
      })
      .catch((err) => console.log(err));
  };

  const handleWishes = () => {
    if (isIntoWishes) {
      delFromWishes();
      setIsIntoWishes(false);
    } else {
      addToWishes();
      setIsIntoWishes(true);
    }
  };

  const handlePurchase = () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    addToPurchase();
    setShowCardRate(true);
    setIsIntoPurchase(true);
    localStorage.setItem('isFirstVisit', 'true');

    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  };

  useEffect(() => {
    const isFirstVisit = localStorage.getItem('isFirstVisit');

    if (isFirstVisit === 'false' && showCardRate && isIntoPurchase) {
      window.scrollTo(0, 0);
    }

    if (isFirstVisit === null) {
      localStorage.setItem('isFirstVisit', 'true');
    } else {
      localStorage.setItem('isFirstVisit', 'false');
    }
  }, [showCardRate, isIntoPurchase]);

  const handleValidate = () => {
    if (isIntoValidate) {
      setIsIntoValidate(false);
    } else {
      addToValidate();
      setIsIntoValidate(true);
    }
  };

  const addNewSection = () => {
    setAddSection(true);
  };

  const deleteCourse = () => {
    axios
      .put(`http://localhost:3000/courses/deletecourse/${course_id}`)
      .then((res) => {
        navigate(`/oneusercourses/${user.user_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSection = (section_id) => {
    axios
      .delete(
        `http://localhost:3000/courses/deletesection/${course_id}/${section_id}`
      )
      .then((res) => {
        console.log(res.data);
        setResetCourse(!resetCourse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTopic = (section_id, topic_id) => {
    axios
      .delete(
        `http://localhost:3000/courses/deletetopic/${course_id}/${section_id}/${topic_id}`
      )
      .then((res) => {
        console.log(res);
        setResetCourse(!resetCourse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteResource = (section_id, topic_id, resource_id) => {
    axios
      .delete(
        `http://localhost:3000/courses/deleteresource/${course_id}/${section_id}/${topic_id}/${resource_id}`
      )
      .then((res) => {
        console.log(res);
        setResetCourse(!resetCourse);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(section_id, topic_id, resource_id);
  };

  return (
    <>
      <section className="oneCourse d-flex flex-column align-items-center justify-content-center p-5">
        <Card className="CardCourse d-flex flex-column align-items-center justify-content-center mb-4">
          <Card.Img
            className={oneCoursePpal?.img === 'default.png' ? 'imgOneCourse imgScale' : 'imgOneCourse'}
            variant="top"
            src={`http://localhost:3000/images/cursos/${oneCoursePpal?.img}`}
          />
          <Card.Body    className="oneCourseBody d-flex flex-column align-items-center justify-content-center">
            <div className="oneCourseP1 d-flex  align-items-center gap-2">
              {userId === userCourse && (
                <button
                  variant="outline-success"
                  className="editIcon"
                  onClick={openModal}
                  disabled={isIntoValidate && !isConfirmed ? true : false}
                  
                >
                  <span class="material-symbols-outlined">stylus</span>
                </button>
              )}
              <Card.Title className="courseTitle">
                {" "}
                {oneCoursePpal?.title}{" "}
              </Card.Title>
            </div>

            <Card.Text className="tagCourse mb-4">
              {courseTags?.map((e, index) => {
                return e.tag_name + " ";
              })}
            </Card.Text>

            <div className="dataCourse">
              <div>
                <Card.Subtitle className="dataCourseText">
                  Autor: {creator?.nickname}
                </Card.Subtitle>
                <Card.Subtitle className="dataCourseText">
                  {oneCoursePpal && formatearFecha(oneCoursePpal.date)}
                </Card.Subtitle>
              </div>
            </div>

            <div className="optionsCourse">

                {userId !== userCourse && (
                  <button
                    className={isIntoPurchase ? "Button1 comprado" : "Button1"}
                    onClick={handlePurchase}
                    disabled={isIntoPurchase || isIntoValidate && !isConfirmed ? true : false}
                  >
                    {isIntoPurchase ? "Comprado" : "Comprar"}
                  </button>
                )}
                <Card.Text className="priceCourse px-3 my-2">
                  {Number(oneCoursePpal?.price) === 0
                    ? "GRATIS"
                    : `${oneCoursePpal?.price}€`}
                </Card.Text>


                <div className="icons">
                  <a href="#rate"> <span  class="material-symbols-outlined bubbleCourse">
                    chat_bubble
                  </span></a>
                  {userId !== userCourse && (
                    <button className="likeBoton" onClick={handleWishes}>
                      {isIntoWishes ? (
                        <span class="material-symbols-outlined 1 deleteLike"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        >
                        {isHovered ? 'heart_minus' : 'favorite'}
                        </span>
                      ) : (
                        <span class="material-symbols-outlined 0 addLike">
                          heart_plus
                        </span>
                      )}
                    </button>
                  )}
                </div>
            </div>
            <Card.Text className="descriptionCourse m-4">
              {oneCoursePpal?.description}
            </Card.Text>
            
            <Accordion defaultActiveKey="1">
              {orderedSections.map((elem, index) => {
                return (
                  <CardSection
                    userId={userId}
                    userCourse={userCourse}
                    elem={elem}
                    key={elem.section_id}
                    deleteSection={deleteSection}
                    course_id={course_id}
                    sections={sections}
                    topics={topics}
                    setTopics={setTopics}
                    setResetCourse={setResetCourse}
                    resetCourse={resetCourse}
                    deleteTopic={deleteTopic}
                    index={index + 1}
                    setResource={setResource}
                    resource={resource}
                    deleteResource={deleteResource}
                    isIntoValidate={isIntoValidate}
                    isConfirmed={isConfirmed}
                  />
                );
              })}
            </Accordion>

            {addSection && (
              <FormAddSection
                sections={sections}
                setSections={setSections}
                addSection={addSection}
                setAddSection={setAddSection}
                course_id={course_id}
                setResetCourse={setResetCourse}
                resetCourse={resetCourse}
              />
            )}


            {userId === userCourse && !addSection &&(

              <button
                className="Button1 d-flex m-3"
                onClick={addNewSection}
                disabled={isIntoValidate && !isConfirmed ? true : false}
              >
                Añadir Sección
              </button>
            )}

            <div className="courseCardEnd gap-3 mt-5">
              {userId === userCourse && (
                <button
                  className={`validarButton ${isIntoValidate && 'isdisabled'}`}
                  onClick={handleValidate}
                  disabled={isIntoValidate ? true : false}
                >
                  {isIntoValidate ? "ENVIADO" : "VALIDAR"}
                </button>
              )}
              {userId === userCourse && (
                <button

                disabled={isIntoValidate && !isConfirmed ? true : false}
                  // onClick={() => deleteCourse(course_id)}
                  onClick={openModalDelete}
                  variant="outline-danger"
                  className="Button2"
                >
                  Eliminar curso
                </button>
              )}
            </div>
          </Card.Body>
        </Card>

        {showModal &&<EditOneCourse
          showModal={showModal}
          setShowModal={setShowModal}
          setOneCoursePpal={setOneCoursePpal}
          oneCoursePpal={oneCoursePpal}
          userId={userId}
          course_id
        />}

        {showModalDelete &&<ModalDelOneCourse
          showModalDelete={showModalDelete}
          setShowModalDelete={setShowModalDelete}
          deleteCourse={deleteCourse}
          course_id={course_id}
        />}

        {isIntoPurchase && showCardRate && (
          <CardRates
            resetCourse={resetCourse}
            setResetCourse={setResetCourse}
            setShowCardRate={setShowCardRate}
            rates={rates}
            setPeopleVotesCourse={setPeopleVotesCourse}
            peopleVotesCourse={peopleVotesCourse}
          />
        )}

        {ratingAverage && (
          <div id="rate" className="mt-3">
            <h5 className="pt-3 text-center"> Valoración: {ratingAverage} <span style={{ color: '#FFD800' }}>★</span> · {peopleVotesCourse} {peopleVotesCourse === 1 ? "voto" : "votos"}</h5>
            <h5 className="py-3 text-center">¿Qué opina la gente?</h5>

            <div className="d-flex flex-wrap justify-content-center gap-2 pb-3">
              {rates?.map((elem) => (
                <CardRatingsOneCourse
                  key={elem.user_rater_user_id}
                  rates={elem}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};
