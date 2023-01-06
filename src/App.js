import React, { createContext, useState, useEffect } from "react";
import Profile from "./Pages/Profile"
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
// import {USER_PER_PAGE} from "./components/USER_PER_PAGE"
// import Repo from "./components/Repo";
import Error404Page from "./Pages/Error404Page";
import Github from "./Pages/Github";
import Navbar from "./components/Navbar";
import axios from "axios";
import ErrorFallback from "./components/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import ReactSwitch from "react-switch";
import { FaHome } from "react-icons/fa";
// import Users from "./components/Users";
// import User from "./components/User";
import Hero from "./components/Hero";





export const ThemeContext = createContext("null");

function App() {
  
  const [theme, setTheme] = useState("dark");
  const [portfolio, setPortFolio] = useState([]);
  const [totalPages, setTotalPages] = useState(7);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [profiledata, setProfileData] = useState([]);
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    const repoPromise = axios.get(
      "https://api.github.com/users/jeweleni/repos"
    );
    const profilePromise = axios.get("https://api.github.com/users/jeweleni");
    Promise.all([repoPromise, profilePromise])
      .then(([repoResponse, profileResponse]) => {
        setPortFolio(repoResponse.data);
        // setTotalPages(Math.ceil(repoResponse.data.length / USER_PER_PAGE));
        setLoading(false);
        setProfileData(profileResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  
  return (
    <HelmetProvider>
      <title>Developer Portfolio</title>
      <meta name="description" content="Frontend Developer" />
      <link rel="canonical" href="/Portfolio" />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <section style={{ height: "100%" }}>
        <div className="switch">
            <label>{theme=== "light" ? "Light Mode" : "Dark Mode"}</label>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
          </div>
        
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "100vh",
              
            }}
            className="Hero"
            id={theme}
          >
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => setExplode(false)}
              {...{ explode }}
            >

              {/* <Navbar/>
              <Hero/> */}
              
              <Profile
                alt="fetched data"
                imgSrc={profiledata.avatar_url}
                name={profiledata.name}
                bio={profiledata.bio}
                location={profiledata.location}
                followers={profiledata.followers}
                following={profiledata.following}
                public_repos={profiledata.public_repos}
                html_url={profiledata.html_url}
                twitter_username={profiledata.twitter_username}
                medium_username={profiledata.medium_username}
              />
              <Github/>
              
              <div
                style={{
                  minHeight: "100%",
                  flexGrow: "1",
                  flexDirection: "column",
                }}
              >
                 
             
                <Routes>
                  <Route path="/Profile" element={<Profile />}/>
                  <Route path="/Github" element={<Github/>} />
                  {/* <Route path="*" element={<Error404Page />} /> */}
                </Routes>
              </div>
            </ErrorBoundary>
          </div>
        </section>
      </ThemeContext.Provider>
    </HelmetProvider>
  );
}

export default App