import React, { Component } from "react";
import axios from "axios";
import "./Form.css";
import "./Table.css";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cust_id:"",
            name:"",
            dob:'',
            mob:'',
            mail:'',
            address:'',
            points:'',    
            Data: [], 
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/getDetails").then((response) => {
            this.setState({ Data: response.data });
        });
    }

    handlecust_idChange = (event) =>{
        this.setState({ cust_id : event.target.value});
    };
    handlename = (event) =>{
        this.setState({ name : event.target.value});
    };
    handledob = (event) =>{
        this.setState({ dob : event.target.value});
    };
    handlemob = (event) =>{
        this.setState({ mob : event.target.value});
    };
    handlemail = (event) =>{
        this.setState({ mail : event.target.value});
    };
    handleaddress = (event) =>{
        this.setState({ address : event.target.value});
    };
    handlepoints = (event) =>{
        this.setState({ points : event.target.value});
    };


    handleSubmit = (event) => {
        event.preventDefault();
        const data ={
            cust_id: this.state.cust_id,
            name: this.state.name,
            dob: this.state.dob,
            mob: this.state.mob,
            mail: this.state.mail,
            address: this.state.address,
            points: this.state.points,
        };

        console.log(data);
        axios.post("http://localhost:8080/addDetails", data).then((response) => {
            this.setState({
                Data: [...this.state.Data, response.data],
                cust_id:"",
                name:"",
                dob:'',
                mob:'',
                mail:'',
                address:'',
                points:'', 
            });
        });
    };

    handleUpdate = (cust_id, data) => {
        // Send PUT request to update fuel data with the given ID
        axios.put(`http://localhost:8080/update/${cust_id}`, data).then((response) => {
            // Update the state to reflect the updated fuel data
            const updatedData = this.state.Data.map((details) => {
                if (details.cust_id === response.data.cust_id) {
                    return response.data;
                } else {
                    return details;
                }
            });
            this.setState({ Data: updatedData });
        });
    };

    handleDelete = (cust_id) => {
        // Send DELETE request to remove fuel data with the given ID
        axios.delete(`http://localhost:8080/delete/${cust_id}`)
        window.location.reload().then((response) => {
            // Update the state to remove the deleted fuel data
            const updatedData = this.state.Data.filter(
                (details) => details.cust_id !== cust_id
            );
            this.setState({ Data: updatedData });
        });
    };

    handleEdit = (data) => {
        this.setState({
            cust_id: data.cust_id,
            name: data.name,
            dob: data.dob,
            mob: data.mob,
            mail: data.mail,
            address: data.address,
            points: data.points,
            isEdit: true,
        });
        console.log(this.state.cust_id);
    };

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
        });
    };


    handleUpdate = (event) => {
        event.preventDefault();
        const data = {
            name: this.state.name,
            dob: this.state.dob,
            mob: this.state.mob,
            mail: this.state.mail,
            address: this.state.address,
            points: this.state.points,
        };
        const cust_id = this.state.cust_id;
        axios
            .put(`http://localhost:8080/update/${cust_id}`, data)
            window.location.reload()
            .then((res) => {
                console.log(res.data);
                this.setState({
                    cust_id:"",
                    name:"",
                    dob:'',
                    mob:'',
                    mail:'',
                    address:'',
                    points:'',

                });
                this.props.history.push("/");
            })
            .catch((err) => console.log(err));
    };






    render() {
        return (

            <div>
                <form onSubmit={this.handleSubmit} className="details" >
               <label className="login-label">Customer Id:</label>

               <input
               className="details"
               type="number"
               value={this.state.cust_id}
               onChange={this.handlecust_idChange}
               />

               <br></br><br></br>


               <label className="login-label">Customer Name:</label>

               <input
               className="details"
               type="text"
               value={this.state.name}
               onChange={this.handlename}
               />

               <br></br><br></br>


               <label className="login-label">DOB:</label>
               <input
               className="details"
               type="date"
               value={this.state.dob}
               onChange={this.handledob}
               />
                
                <br></br><br></br>

               <label className="login-label">Mobile Number:</label>
               <input
               className="details"
               type="text"
               value={this.state.mob}
               onChange={this.handlemob}
               />

<br></br><br></br>

               <label className="login-label">Mail Id:</label>
               <input
               className="details"
               type="text"
               value={this.state.mail}
               onChange={this.handlemail}
               />

<br></br><br></br>

               <label className="login-label">Address:</label>
               <input
               className="details"
               type="text"
               value={this.state.address}
               onChange={this.handleaddress}
               />

<br></br><br></br>

               <label className="login-label">Store Points:</label>
               <input
               className="details"
               type="number"
               value={this.state.points}
               onChange={this.handlepoints}
               />

<br></br><br></br>

               <button className="submitt" type="submit" id="asd">
Submit
               </button>
               <br></br><br></br>
               </form>

                <table className="output">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>DOB</th>
                            <th>Mobile Number</th>
                            <th>Mail ID</th>
                            <th>Address</th>
                            <th>Points</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Data.map((data) => (
                            <tr key={data.cust_id}>
                                <td>{data.cust_id}</td>
                                <td>{data.name}</td>
                                <td>{data.dob}</td>
                                <td>{data.mob}</td>
                                <td>{data.mail}</td>
                                <td>{data.address}</td>
                                <td>{data.points}</td>
                                <td>
                                    <button onClick={() => this.handleEdit(data)}>Edit</button>
                                </td>

                                <td>
                                    <button
                                        onClick={() => this.handleDelete(data.cust_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br><br></br><br></br><br></br>
                <form onSubmit={this.handleUpdate}>
                    <input type="hidden" name="id" value={this.state.cust_id} />
                    <label>Customer Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>DOB:</label>
                    <input
                        type="date"
                        name="dob"
                        value={this.state.dob}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="mob"
                        value={this.state.mob}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Mail Id:</label>
                    <input
                        type="text"
                        name="mail"
                        value={this.state.mail}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={this.state.address}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <label>Points:</label>
                    <input
                        type="number"
                        name="points"
                        value={this.state.points}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <button type="submit">Save</button>
                    <button onClick={this.handleCancel}>Cancel</button>
                </form>        </div>

        );
    }
}
export default Form;