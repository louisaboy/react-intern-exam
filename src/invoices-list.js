import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axios from "axios";
import "./General.css";
import "./invoices-list.css"

function Invoices () {
    // For Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    
    // For Lists
    const [invoices, setInvoices] = useState([])
    const navigate = useNavigate();

    // For Updated Invoice
    const [updatedInvoice, setUpdatedInvoice] = useState({})

    useEffect(() => {
        axios   
            .get("http://localhost:3001/invoices")
            .then((res) => {
                console.log(res);
                setInvoices(res.data);
                


            })
            .catch((err) => console.log(err));
    }, []); 

    const deleteInvoice = (num) => {
        console.log(num)

        axios
            .delete(`http://localhost:3001/delete/${num}`)
            .then(res => console.log(res))
            .catch((err) => console.log(err));
        
        window.location.reload();
    }

    const updateInvoice = (invoice) => {
        console.log(invoice.num)
        
        setUpdatedInvoice(invoice)
        handleShow()

        // axios
        //     .post(`http://localhost:3001/update/${num}`)
        //     .then(res => console.log(res))
        //     .catch((err) => console.log(err));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        // what we are typing is being stored to the useState
        setUpdatedInvoice((prevInput) => {
            return {
                ...prevInput,
                [name]: value,
            };
        });
    };

    const saveUpdatedInvoice = () => {
        console.log(updatedInvoice)
        
            axios.put(`http://localhost:3001/update/${updatedInvoice.num}`, updatedInvoice)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            handleClose();
            window.location.reload();
        
        
        
    }
    return (
        <div className="invoices-list-container">
            <h1 className="titleText">Invoices Page</h1>
            <Modal
                show={show}
                onHide={handleClose}
                >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                    <Form.Label>Invoice Number Field</Form.Label>
                    <Form.Control name="num" type="number" value={updatedInvoice.num ? updatedInvoice.num: 0} onChange={handleChange} disabled/>

                    <Form.Label>Invoice Date</Form.Label>
                    <Form.Control name="date" type="date" value={new Date(updatedInvoice.date).toLocaleDateString("en-CA")} onChange={handleChange} />

                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control name="customerName" value={updatedInvoice.customerName ? updatedInvoice.customerName: ""} onChange={handleChange} required/>

                    <Form.Label>Product Name</Form.Label>
                    <Form.Control name="productName" value={updatedInvoice.productName ? updatedInvoice.productName: ""} onChange={handleChange} required/>

                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control name="productQty" type="number" value={updatedInvoice.productQty ? updatedInvoice.productQty: 0} onChange={handleChange}/>

                    <Form.Label>Product Price</Form.Label>
                    <Form.Control name="productPrice" type="number" value={updatedInvoice.productPrice ? updatedInvoice.productPrice: 0} onChange={handleChange}/>

                    <Form.Label>Total Invoice Amount</Form.Label>
                    <Form.Control name="total" type="number" value={updatedInvoice.total ? updatedInvoice.total: 0} onChange={handleChange}/>

                    
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={saveUpdatedInvoice}>Save Changes</Button>
            </Modal.Footer>
            </Modal>
            
            <Button 
                variant="outline-dark" 
                className="back-button"
                onClick={() => navigate("create")}>Create Invoice</Button>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Invoice Date</th>
                        <th>Customer Name</th>
                        <th>Product Name</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Total Invoice Amount</th>
                        <th>Action</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr>
                            <td>{invoice.num}</td>
                            <td>{new Date(invoice.date).toLocaleDateString("en-GB").replaceAll("-","/")}</td>
                            <td>{invoice.customerName}</td>
                            <td>{invoice.productName}</td>
                            <td>{invoice.productQty}</td>
                            <td>{invoice.productPrice}</td>
                            <td>{invoice.total}</td>
                            <td className="button-styles">
                                <Button variant="outline-info" className="updateBtn" onClick={() => updateInvoice(invoice)}>Update</Button>
                                <Button variant="outline-danger" className="deleteBtn" onClick={() => deleteInvoice(invoice.num)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Invoices;