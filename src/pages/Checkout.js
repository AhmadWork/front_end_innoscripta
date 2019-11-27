import React,{useState,useEffect} from 'react'
import {useStateValue} from '../Context'
import { Table, Container,Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import Http from '../Http'
import {Redirect} from 'react-router-dom'
import axios from '../Http'
export default function Checkout() {
    const [{cart}, dispatch] = useStateValue();
    const [form,setForm]=useState({
        cart:cart,
        address:'',
        address2:'',
        city:'',
        state:'',
        zip:''
    })
    const [redirect,isRedirect]=useState(false)
const [error,SetError] =useState('');
    const onChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
            }
    const api = '/api/order';

            const onSubmit= (e) =>{
                e.preventDefault()
                console.log(form)
        
                axios.post(api,form)
                .then(function (response) {
                  isRedirect(true);
              
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });                 
               }
                 
                  

                  
                
    return (
        <Container>
        {cart.length>0?(
            <>
        <Table >
        
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>     
        <tbody>
        {cart.map(quantity=>(
         
       
              <tr>
                <th scope="row">{quantity.id}</th>
                <td>{quantity.title}</td>
                <td>{quantity.quantity}</td>
                <td>{quantity.price*quantity.quantity}</td>
              </tr>
              
           
        ))}
        </tbody>
        </Table>
        <div class="form-row">
        <div class="form-group col-md-6">
        <label for="Address">Address</label>
        <input type="text" name="address"value={form.adress} onChange={onChange} className="form-control" placeholder="1234 Main St"/>
      </div>
      <div class="form-group col-md-6">
        <label for="Address2">Address 2</label>
        <input type="text" name="address2" id="exampleAddress2" value={form.address2} onChange={onChange} className="form-control" placeholder="Apartment, studio, or floor"/>
    </div>
    </div>
    <div class="form-row">
    <div class="form-group col-md-6">
         <label for="inputCity">City</label>
            <input type="text" name="city" value={form.city} onChange={onChange} className="form-control"/>
         </div>
      
        <div class="form-group col-md-4">
        <label for="inputState">State</label>
            <Label for="State">State</Label>
            <input type="text" value={form.state} onChange={onChange} className="form-control" name="state" id="stat"/>
        </div>
 
        <div class="form-group col-md-2">
        <label for="Zip">Zip</label>
            <input type="text" value={form.zip} onChange={onChange} className="form-control" name="zip" id="zip"/>
           
        </div>
        <button className="btn btn-outline-success btn-lg btn-block"  onClick={onSubmit} >Order</button>
        </div>

    </>
        ):(
            <h2 className='col-6 offset-6'>Nothing in the cart</h2>
        )}
        
        {redirect?<Redirect to='/'/>:<div/>}
        </Container>
    )
}
