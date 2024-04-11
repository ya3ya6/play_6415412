import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import "./CompanyDetail.css";


const CompanyDetail = ()=>{
    const {handle} = useParams();

    const [company, setCompany]= useState(null);

    useEffect(function getCompanyAndJobsForUser(){
        async function getCompany(){
            setCompany(await JoblyApi.getCompany(handle))
        }
        getCompany();

    },[handle]);

    if(!company) return <p>No company found!</p>

    return(
        <div className="CompanyDetail">
            <div className="CompanyDetail-top">
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            </div>

            <JobCardList jobs={company.jobs} />
        </div>
    );

}

export default CompanyDetail;