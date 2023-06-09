//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { Link ,useHistory } from 'react-router';
import Footer from '../Component/Footer';
import Nav from '../Component/Nav';
//import axios
import axios from 'axios';

import { Route } from 'react-router-dom/cjs/react-router-dom.min';
function Profile() {
    const [user, setUser] = useState({});
    const history = useHistory();

    const token = localStorage.getItem("token");

    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/user')
        .then((response) => {

            //set response user to state
            setUser(response.data);
        })
    }
    useEffect(() => {

        //check token
        if(localStorage.getItem('token')) {
            //redirect page dashboard
            history.push('/profile');
        }
        else{
            history.push('/login');
        }
    }, []);

    useEffect(() => {

        //check token empty
        if(!token) {

            //redirect login page
            history.push('/login');
        }
        
        //call function "fetchData"
        fetchData();
    }, []);
    const isHome = user.hometown
    const isImage = user.image
    const url ="localhost:8000/storage/img/"

return(
    <>
    <Nav/>
<section className='h-100' >
<div className='container py-5 h-100'>
<div className='row d-flex justify-content-center align-items-center h-100'>
<div className='col col-lg-9 col-xl-7'>
<div className='card'>
<div className='rounded-top text-white d-flex flex-row headerprofile' style={{height:"200px"}}> 
<div className='ms-4 mt-5 d-flex flex-column' style={{width:"150px"}}>
{isImage ? (
    <img src={"http://localhost:8000/storage/img/"+user.image} className='img-fluid img-thumbnail mt-4 mb-2' style={{width:"150px", zIndex:"1"}}/>
    
) : (
    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className='img-fluid img-thumbnail mt-4 mb-2' style={{width:"150px", zIndex:"1", borderRadius: "100px"}}/>
)}


<br/>



{/* <button type='button' className='btn btn-outline-dark' data-mdb-ripple-color="dark" style={{zIndex:"1"}}>Edit Profile</button> */}

</div>

<div className='ms-3' style={{marginTop:"50px"}}>
<a href={`/profile/edit/${user.id}`} className='button is-rounded mb-3' data-mdb-ripple-color="dark" style={{zIndex:"1"}}>Edit Profile</a>
<p className='lead fw-normal mb-1 fontprofile ml-2'>{user.name}</p>
{isHome ? (
<p className='lead fw-normal mb-2 ml-2 fontprofile'>{user.hometown}</p>
) : (
    <p className='lead fw-normal ml-2 mb-2 fontprofile'>(Isi asal kotamu)</p>
)}

            </div>
            
</div>
</div>
<div className='p-4 text-black bg-light' style={{height:"100px"}}>
<div className='card-body p-4 text-black'>
<div className='mb-5'>
<br/>
<br/>
<br/>
<h4 className='lead fw-bold mb-1' style={{fontWeight:"bold",marginTop:"-55px"}}>Tentang saya</h4>
<br/>
{/* <p className='lead fw-normal mb-1'>Nama: {user.name}</p>
<p className='lead fw-normal mb-1'>Asal Kota: {user.name}</p>
<br/> */}
<p className='lead fw-normal mb-1 fontprofile'>Motivasi</p>
<textarea className='form-control fontisi' style={{height:"100px"}} value={user.motivation} readOnly></textarea>
<br/>
<p className='lead fw-normal mb-1 fontprofile'>Pekerjaan</p>
<input className='form-control fontisi' value={user.job} readOnly />
</div>
<div className="d-flex justify-content-between align-items-center mb-4">
<h4 className='lead fw-bold mb-1' style={{fontWeight:"bold"}}>History Itinerary</h4>
            </div>
            <div className="row g-2">
              <div className="bg-image col mb-2">
                <img src="https://images.unsplash.com/photo-1629605924917-d2de56a40951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                   className="w-100 rounded-3 mb-2" />
                        <p className='lead fw-normal mb-1 fontprofile'>Yogyakarta planning</p>
                        <p className="mb-4">20/06/2023</p>
              </div>

              
              <div className="bg-image col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                   className="w-100 rounded-3 mb-2" />
                   <p className='lead fw-normal mb-1 fontprofile'>Sunrise in Yogyakarta</p>
                   <p className="mb-4">26/06/2023</p>
              </div>
            </div>
            
</div>
</div>
</div>
</div>
</div>



</section>
<Footer/>
</>

)
}

export default Profile;