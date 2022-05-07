import React, { useState,  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const EditContact = () => {

    const{id}= useParams();

    const dispatch= useDispatch();
    const history = useHistory();

    const [name, setName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [number, setNumber] = useState(" ");
    const contacts = useSelector(state=> state)

    const currentContact = contacts.find(contact=> contact.id === parseInt(id))


        useEffect(()=> {
        if(currentContact){
            setName(currentContact.name)
            setEmail(currentContact.email)
            setNumber(currentContact.number)
        }

    }, [currentContact]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(contact=> contact.id !== parseInt(id) && contact.email === email);
        const checkNumber = contacts.find(contact=> contact.id !== parseInt(id) && contact.number === number && number);

        if (!email || !number || !name) {
            return toast.warning("Please fill all fields!")
        }
        if(checkEmail) {
            return toast.error("This Email already exists!")
        }
        if(checkNumber){
            return toast.error("This Number already exists!")
        }

        const data ={
            id: parseInt(id),
            name,
            email,
            number
        };
    
        dispatch({type: "UPDATE_CONTACT", payload: data});
        toast.success("Student update successfully")
        history.push("/")
    };

   

  return (
    <div className='container'>
    {currentContact ? (
    <>
    <div className='row'>
        <h1 className=' display-3 my-5 text-center'>
            Edit Student {id}
        </h1>
        <div className='col-md-6 shadow mx-auto p-5'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input type="text" placeholder="Name" className='form-control'
                    value={name} onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <input type="email" placeholder="Email" className='form-control my-3'
                    value={email} onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <input type="number" placeholder="Phone Number" className='form-control my-3' 
                    value={number} onChange={e => setNumber(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <input type="submit" value="Update Student" className='btn btn-dark' />
                    <Link to="/" className='btn btn-danger ml-3'>Cancel</Link>
                </div>
            </form>
        </div>
    </div>
    </>
  ):(  <h1 className=' display-3 my-5 text-center'>
   Student Contact with id {id} does not exist 
</h1>)}
</div>
  )
}

export default EditContact