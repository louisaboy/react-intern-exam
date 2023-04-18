import "./CreateInvoice.css";
import "./General.css";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

function CreateInvoice() {
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({
        num: 0,
        date: new Date().toLocaleDateString("en-CA"),
        customerName: "",
        productName: "",
        productQty: 0,
        productPrice: 0,
        total: 0,
    });
    const [invoices, setInvoices] = useState([])

    // Error Checking Invoice Num 
    const [arrValues, setArrValues] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios   
            .get("http://localhost:3001/invoices")
            .then((res) => {
                
                setInvoices(res.data);
                console.log("length: " + res.data.length)
                var arr = []
                for (var i = 0; i < res.data.length; i++) {
                    arr.push(res.data[i].num);
                }
                console.log("Array contents: " + arr);
                setArrValues(arr);
                console.log("Check Arr Values: " + (arrValues.includes(Number(1))));
                console.log("went here " + res.data);
            })
            .catch((err) => console.log(err));
    }, []); 
    // takes an event
    // SAMPLE: event.target = <input name="customerName" class="form-control" value>
    const handleChange = (event) => {
        const { name, value } = event.target;

        // remove leading 0's from number input fields
        if (event.target.type === "number" && value[0] === "0") {
            event.target.value = parseInt(value, 10);
        }

        // what we are typing is being stored to the useState
        setInvoice((prevInput) => {
            return {
                ...prevInput,
                [name]: value,
            };
        });
    };

    // when the value or invoice value changes the useEffect executes
    // to check if the invoice values are reflecting
    // useEffect(() => {
    //     console.log(invoice);
    // }, [invoice]);

    const createInvoice = (e) => {
        e.preventDefault();
        console.log(invoice)
        
        console.log("Updated Invoice Number: " + invoice.num);
        // setErrorMessage("")

        if (arrValues.includes(Number(invoice.num))) {
            setErrorMessage("The Invoice Number already exists in the Database");
            console.log("True");
        }
        else {
            axios
                .post('http://localhost:3001/create', invoice)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            
            navigate(-1);
        }
    };
    
    return (
        <div className="invoice-container">
            <div className="title">
                <h1>Create an Invoice</h1>
            </div>
            
            <div className="form-container">
            <Form>
                <Form.Group>
                    <Form.Label>Invoice Number Field</Form.Label>
                    <Form.Control name="num" type="number" value={invoice.num} onChange={handleChange} onFocus={(event) => event.target.value = ''} />

                    <Form.Label>Invoice Date</Form.Label>
                    <Form.Control name="date" type="date" value={invoice.date} onChange={handleChange} placeholder={new Date().toLocaleDateString("en-CA")} />

                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control name="customerName" value={invoice.customerName} onChange={handleChange} placeholder="Customer Name"/>

                    <Form.Label>Product Name</Form.Label>
                    <Form.Control name="productName" value={invoice.productName} onChange={handleChange} placeholder="Product Name"/>

                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control name="productQty" type="number" value={invoice.productQty} onChange={handleChange} onFocus={(event) => event.target.value = ''}/>

                    <Form.Label>Product Price</Form.Label>
                    <Form.Control name="productPrice" type="number" value={invoice.productPrice} onChange={handleChange} onFocus={(event) => event.target.value = ''}/>

                    <Form.Label>Total Invoice Amount</Form.Label>
                    <Form.Control name="total" type="number" value={invoice.total} onChange={handleChange} onFocus={(event) => event.target.value = ''}/>

                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </Form.Group>
                
            </Form>
            </div>
            <Button onClick={createInvoice} className="createBtn">CREATE INVOICE</Button>
            <Button 
                variant="outline-dark" 
                className="back-button"
                onClick={() => navigate(-1)}>BACK</Button>
        </div>
    )
}

export default CreateInvoice;