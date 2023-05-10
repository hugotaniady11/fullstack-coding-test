import React from 'react'
import { axiosInstance } from '../../lib/axios';
import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../../utils/auth';
import { videoData } from '../../utils/data/data.video';

function Home() {
  const [userData, setUserData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    const user = await getCurrentUser();
    setUserData(user);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const postsRes = await axiosInstance.get("/posts");
        setPosts(postsRes.data);
        setIsLoading(false);
      }, 1000);
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  const renderPosts = () => {
    return posts.map((post) => {
      return (
        <tr key={post.id}>
          <td>{post.slug}</td>
          <td>{post.title}</td>
          <td>{post.body}</td>
        </tr>
      )
    })
  }

  const renderVideos = () => {
    return videoData.map((video) => (
      <div className="col" key={video.id}>
        <div className="card mb-4">
          <div className="card-body">
            <iframe key={video.url} controls src={video.url}> 
            
            </iframe>
            <p>
            {video.name}
            </p>
          </div>
        </div>
      </div>
    ))
  }

  const logOut = () => {
    logout();
    window.location.reload();
  }


  return (
    <>
      <main>
        <div className='container text-center'>
          <h1>Post Blog</h1>
          <table className="table my-4">
            <thead className="thead-light">
              <tr>
                <th scope="col">Slug</th>
                <th scope="col">Title</th>
                <th scope="col">Body</th>
              </tr>
            </thead>
            <tbody>
              {userData.type === 'A'
                ?
                (renderPosts().slice(0, 3))
                :
                (userData.type === 'B'
                  ?
                  (renderPosts().slice(0, 10))
                  :
                  renderPosts())
              }
              {isLoading ? <div className="spinner-border" role="status"></div> : null}
            </tbody>
          </table>
        </div>
      </main>

      <div className="container text-center">
      <h1>Video Blog</h1>
        <div className="row row-cols-2">
          {userData.type === 'A'
            ?
            (renderVideos().slice(0, 3))
            :
            (userData.type === 'B'
              ?
              (renderVideos().slice(0, 10))
              :
              renderVideos())
          }
        </div>
      </div>
      <div className='text-center'>
      <button type="submit" onClick={logOut} className="btn btn-primary text-center">Log Out</button>
      </div>
    </>
  );
}

export default Home
