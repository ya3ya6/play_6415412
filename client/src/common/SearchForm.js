import React, {useState} from "react";
import {Row,Col, Button,Form,Input} from 'reactstrap';
import './searchForm.css'


const SearchForm = ({searchFor})=>{
    const [searchTerm, setSearchTerm] = useState("");


    const handleSubmit = (e)=>{
        e.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    const handleChange = (e)=>{
        setSearchTerm(e.target.value);
    }


    return(
        <div className="searchForm">
    <Form className="form" onSubmit={handleSubmit}>
    <Row className="row-cols-lg-auto g-6 align-items-center">
           <Col style={{ width: '80%' }}>
            
            
            <Input
              type="text"
              name="searchTerm"
              id="searchTerm"
              placeholder="Enter search term..."
              value= {searchTerm}
              onChange= {handleChange}
              
            />
          
          </Col>



        {/* <p>username: {formData.lastName}</p> */}

        <Col>
        <Button color="primary" type="submit" onSubmit={handleSubmit}>Search</Button>
        </Col>
      </Row>
      </Form>
        </div>
    )
}

export default SearchForm;