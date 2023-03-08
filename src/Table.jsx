import axios from "axios";
import React,{Component} from "react";
import "./Table.css";

class Table extends Component{
    state = {
        data:[]
    }

    componentDidMount(){
        axios.get('http://localhost:8080/getDetails')
        .then(response =>{
            this.setState({
                data:response.data
                
            });
            console.log(response)
        })
        .catch(error =>{
            console.log(error);
        });
    }

    render(){
        return(
            <table border={1}>
                <thead>
                    <tr>
                        <th>Customer Id</th>
                        <th>Customer Name</th>
                        <th>DOB</th>
                        <th>Mobile Number</th>
                        <th>Mail Id</th>
                        <th>Address</th>
                        <th>Store Points</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(user => (
                        <tr key={user.cust_id}>
                            <td>{user.cust_id}</td>
                            <td>{user.name}</td>
                            <td>{user.dob}</td>
                            <td>{user.mob}</td>
                            <td>{user.mail}</td>
                            <td>{user.address}</td>
                            <td>{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Table;