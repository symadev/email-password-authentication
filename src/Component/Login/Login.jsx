import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {


  const [error, setError] = useState(null);
const[success,setSuccess] = useState(false);
const[showPassword,setshowPassword] = useState(false);

const emailRef = useRef();
//this is for showing the success masssage


  const handleLogin = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const terms=  event.target.terms.checked;
    const password = event.target.password.value;

    console.log("Name:", name,terms,email,password,photo);











    setError('');
    setSuccess(false);

    
    if(!terms){
        setError('Please Accept our terms and Condition');
        return;
    }


    if(password.length<6){
        setError('the password should be 6 character or more longer');
        return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (passwordRegex.test(password)){
    setError('must have uppercase,one lowercase nad one number at least and also one special character');
    return;
}


    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log( result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setSuccess(false);
      });
  };

//forgot password/reset password issuses
   const handleForgotPassword=()=>{
console.log('get an email address',emailRef .current.value);
const email= emailRef .current.value
if(!email){
    console.log('please provide a valid email address')
}
else{
    sendPasswordResetEmail(auth, email)
  .then(() => {
   alert('reset email sent!please check your mail');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
  }




   //Send a user a verification email
  
    sendEmailVerification(auth.currentUser)
    .then(() => {
    console.log("Email verification sent!");
      // ...
    });



    //update profile name and photourl
    updateProfile(auth.currentUser, {
        displayName: "Jane Q. User", photoURL: "https://i.ibb.co.com/3YQPKzBB/download-12.jpg"
      }).then(() => {
        console.log("user profile updated!");
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
  






  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 border rounded-lg shadow-lg space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" name="name" className="grow p-2 border rounded" placeholder="Name" />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input type="text" name="photo" className="grow p-2 border rounded" placeholder="photoUrl" />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input type="email" name="email" className="grow p-2 border rounded" placeholder="Email" ref={emailRef} required />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input type={showPassword ? 'text':'password'} 
          name='password'
           className="grow p-2 border rounded"
           placeholder="Password" 
           required />

        <button  onClick ={()=>setshowPassword(!showPassword)}className="btn btn-xs">


        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}

</button>

        </label>


        <label onClick={handleForgotPassword} className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>






        {error && <p className="text-red-500">{error}</p>}

        {success && <p className="text-green-500">Sign up is Successfull</p>}





        <div className="form-control">
  <label className="label cursor-pointer">
  <input type="checkbox" name='terms' className="checkbox checkbox-primary" />
    <span className="label-text">Accept Our Terms</span>
   
  </label>
</div>



        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Login;
