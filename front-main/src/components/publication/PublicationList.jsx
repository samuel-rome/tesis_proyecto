import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import  moment from 'moment'
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import avatar from "../../assets/img/user.png"

// eslint-disable-next-line react/prop-types
export const PublicationList = ({publications, getPublications, page, setPage, more, setMore}) => {


    const { auth } = useAuth();

    console.log(publications)
    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublications(next);
    }

    const deletePublication = async (publicationId) => {
        const request = await fetch(Global.url + "publication/remove/" + publicationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        setPage(1);
        setMore(true);
        getPublications(1, true);

    }
    return (
        <>
            <div className="content__posts">

                {publications.map(publication => {

                    return (

                        <article className="posts__post" key={publication._id}>

                            <div className="post__container">

                                <div className="post__image-user">

                                    <Link to={"/social/perfil/" + publication.user._id} className="post__image-link">
                                        {publication.user.image != "default.png" && <img src={Global.url + "user/avatar/" + publication.user.image} className="post__user-image" alt="Foto de perfil" />}
                                        {publication.user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                                    </Link>
                                </div>

                                <div className="post__body">
                                    <div className="post__user-info">
                                        <a href="#" className="user-info__name">
                                            {publication.user.name + "" + publication.user.surname}
                                        </a>
                                        <span className="user-info__divider"> | </span>
                                        <a href="#" className="user-info__create-date">
                                            {moment(publication.created_at).format('YYYY-MM-DD HH:mm:ss')}
                                        </a>
                                        <span className="user-info__divider"> | </span>
                                        <p>{publication.user.profession} </p>
                                        {
                                            publication.user.isteacher && <>
                                                <span className="user-info__divider"> | </span>
                                                <p>Puede Enseñar</p>
                                            </> 
                                        }
                                    </div>

                                    <h4 className="post__content">{publication.text}</h4>

                                    {/* PARA SUBIR IMAGENES A LA PUBLICACION FALTA  */}
                                    {/* {publication.file && <img src={Global.url + "publication/media/" + publication.file} />} */}

                                </div>
                            </div>


                            {auth._id == publication.user._id &&
                                <div className="post__buttons">
                                    <button onClick={() => deletePublication(publication._id)} className="post__button">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            }
                        </article>);

                })};

                {/* {publications.map((publication, index) => (
          <article className="posts__post" key={`${publication._id}-${index}`}>

            <div className="post__container">
              <div className="post__image-user">
                <Link to={"/social/perfil/" + publication.user._id} className="post__image-link">
                  {publication.user.image !== "default.png" && <img src={Global.url + "user/avatar/" + publication.user.image} className="post__user-image" alt="Foto de perfil" />}
                  {publication.user.image === "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                </Link>
              </div>

              <div className="post__body">
                <div className="post__user-info">
                  <a href="#" className="user-info__name">
                    {publication.user.name + " " + publication.user.surname}
                  </a>
                  <span className="user-info__divider"> | </span>
                  <a href="#" className="user-info__create-date">
                    {publication.created_at}
                  </a>
                </div>

                <h4 className="post__content">{publication.text}</h4>

                {publication.file && <img src={Global.url + "publication/media/" + publication.file} />}
              </div>
            </div>

            {auth._id === publication.user._id &&
              <div className="post__buttons">
                <button onClick={() => deletePublication(publication._id)} className="post__button">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            }

          </article>
        ))} */}



            </div>

            {
                more &&
                <div className='content__container-btn'>
                    <button className='content__btn-more-post' onClick={nextPage}>
                        ver mas publicaciones
                    </button>
                </div>
            }
        </>
    )
}
