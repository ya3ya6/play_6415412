import React, { useState} from "react";
import "./JobCard.css"
import {Button} from 'reactstrap';
const JobCard = ({id, title, salary, equity, companyName})=>{
    // const { currentUser} = useContext(UserContext);
    const [applied, setApplied] = useState(false);

    // useEffect(function updatedAppliedStatus(){
    //     setApplied(true);
    // },[id]);

 
    // Apply for a job
    async function handleApply(e){
        if(false) return;
        //await JoblyApi.applyToJob(currentUser.username,id);
        setApplied(true);
    }
    return(
        <div className="JobCard">
            {applied}
       
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p>{companyName}</p>
                {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
                {equity ?  <div><small>Equity: {equity}</small></div>: <p><small>Equity: Not Specified / None</small></p>}
        
        

          </div>
          <div className='btn-container'>
          <Button
              color="danger"
              className="apply-btn"
              onClick={handleApply}
              disabled={applied}
          >{applied ? "Applied" : "Apply"}
          </Button>
          </div>

        </div>
    )
}



function formatSalary(salary) {
  const digitsRev = [];
  const salaryStr = salary.toString();

  for (let i = salaryStr.length - 1; i >= 0; i--) {
    digitsRev.push(salaryStr[i]);
    if (i > 0 && i % 3 === 0) digitsRev.push(",");
  }

  return digitsRev.reverse().join("");
}
export default JobCard;