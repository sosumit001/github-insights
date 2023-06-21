import React from "react"
import { useEffect, useState } from "react"
import client from "../client"
import { GET_USER_INFO } from "./query/userprofile"
import "./styles/GithubProfile.css"
import ProfileHeader from "./components/Profile"

// link svg
import link_right_up from './assets/link-right-up.svg'


const GithubProfileCard = ({username,width,theme}) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [after, setAfter] = useState(null)
  const [before, setBefore] = useState(null)
  const [prevCursorHistory, setPrevCursorHistory] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const repositoriesPerPage = 10
  const [dataLoaded, setDataLoaded] = useState(false) // Track if data has been loaded
  const [clickedRepoIndex,setClickedRepoIndex] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true) // Set loading to true before fetching data
        const { data } = await client.query({
          query: GET_USER_INFO,
          variables: {username, after, before }
        })
        setData(data.user)
        setLoading(false)
        setDataLoaded(true) // Set dataLoaded to true after data is loaded
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }

    fetchData()
  }, [username,after, before])

  const handleNextRepos = async (e) => {
    e.preventDefault()
    setLoading(true) // Set loading to true before fetching data
    setPrevCursorHistory((prevHistory) => [...prevHistory, { before, after }])
    setBefore(null)
    setAfter(data.repositories.pageInfo.endCursor)
    setPageIndex((pageIndex) => pageIndex + 1)
  }

  const handlePrevRepos = async () => {
    setLoading(true) // Set loading to true before fetching data
    const lastCursor = prevCursorHistory.pop()
    setBefore(lastCursor.before)
    setAfter(lastCursor.after)
    setPrevCursorHistory([...prevCursorHistory])
    setPageIndex((pageIndex) => pageIndex - 1)
  }

  const handleRepoClick = (index) => {
    if(clickedRepoIndex === index){
      setClickedRepoIndex(null)
    } else {
      setClickedRepoIndex(index)
    }
  }

  if (loading && !dataLoaded) {
    return (
      <div id="GithubWrapper">
        <div className="github-repositories">
          <div className="github-repo-collection"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const { repositories } = data
  const { totalCount } = repositories
  const currentPage = pageIndex + 1
  const currentFirst = pageIndex * repositoriesPerPage + 1
  const currentLast = Math.min(currentPage * repositoriesPerPage, totalCount)

  if (!repositories) {
    return <div>Repos not Available</div>
  }

  return (
    <div 
    className={"GithubWrapper " + theme +"-bg"}
    style={{
      width:width?width:'300px'
    }}
    >
      <ProfileHeader theme = {theme} avatarUrl={data.avatarUrl} name={data.name} link={data.url} />

      <div className="github-subs">
        <div>FOLLOWERS {data.followers.totalCount}</div>
        <div>FOLLOWING {data.following.totalCount}</div>
      </div>

      <div className="github-repositories">
        <div className="github-repo-collection">
          {repositories.nodes.map((repo,index) => {
            return (
              <div
              style={
                clickedRepoIndex === index?{
                  height:'120px'
                }:{
                  height:'50px'
                }
              }
               className={"github-repo-element " + theme + "-header"} key={repo.name}>
                <span
                className={theme + "-repo"}
                onClick={()=>{handleRepoClick(index)}}
                >
                  <a>{loading?'...':repo.name}</a>
                </span>
                <div
                style={
                clickedRepoIndex === index?{
                  height:'70px',
                  transition:'500ms'
                }:{
                  height:'0px',
                  overflow:'hidden'
                }
              }
                >
                  <ul
                style={
                clickedRepoIndex === index?{
                  height:'40px'
                }:{
                  height:'0px'
                }
              }
                  >
                    <li>fork {repo.forkCount}</li>
                    <li>stars {repo.stargazers.totalCount}</li>
                    <a href={repo.url}>
                      <img src={link_right_up} alt="visit-repo" />
                    </a>
                  </ul>

                </div> 
              </div>
            )
          })}
        </div>
      </div>

      <div className="github-pagination-btn">
        <button
          className={theme+'-repo'}
          onClick={handlePrevRepos}
          disabled={!repositories.pageInfo.hasPreviousPage || loading}
        >
          Prev
        </button>
        <button
          onClick={handleNextRepos}
          disabled={!repositories.pageInfo.hasNextPage || loading}
        >
          Next
        </button>

        <div>
          {currentFirst} / {currentLast}
        </div>
      </div>
    </div>
  )
}

export {GithubProfileCard}
