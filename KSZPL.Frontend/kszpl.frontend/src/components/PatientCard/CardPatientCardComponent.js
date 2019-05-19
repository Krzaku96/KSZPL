import React, { Component } from "react";
import { Card } from "react-bootstrap";


class CardPatientCardComponent extends Component{

    render(){
        return(    
            <Card bg="light" style={{ width: '35rem'}}>
                <Card.Body>
                <Card.Title >{this.props.dateVisit}</Card.Title>
                <Card.Subtitle>{this.props.status}</Card.Subtitle>
                <Card.Text>{this.props.description}</Card.Text>
                </Card.Body>
            </Card>  
        );  
    }
}

export default CardPatientCardComponent;
