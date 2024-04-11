import React,{useState, useEffect} from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import JobCardList from "./JobCardList";
const JobList = ()=>{
    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {
      search();
    }, []);

      /** Triggered by search form submit; reloads jobs. */
  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) return <p>No jobs were found...</p>;
    return(
        <div className="JobList" >
        <SearchForm searchFor={search} />
        {jobs.length
            ? <JobCardList jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
    )
}

export default JobList;
