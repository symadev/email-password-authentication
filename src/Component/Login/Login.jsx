import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";

const Login = () => {
  const [error, setError] = useState(null);
const[success,setSuccess] = useState(false);
//this is for showing the success masssage


  const handleLogin = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log("Name:", name);





    setError('');
    setSuccess(false);


    if(password.length<6){
        setError('the password should be 6 character or more longer');
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






  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 border rounded-lg shadow-lg space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" name="name" className="grow p-2 border rounded" placeholder="Name" required />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="email" name="email" className="grow p-2 border rounded" placeholder="Email" required />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input type="password" name="password" className="grow p-2 border rounded" placeholder="Password" required />
        </label>



        {error && <p className="text-red-500">{error}</p>}
        
        {success && <p className="text-green-500">Sign up is Successfull</p>}



        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Login;
