import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="text-center p-10">
            <h2 className="text-4xl font-bold">Welcome to my simple login form</h2>
            <p className="mt-4 text-lg">
                Already have an account? Please <Link to="/login" className="text-blue-500 underline">Login</Link>
            </p>
            <p className="mt-2 text-lg">
                Don't have an account? <Link to="/register" className="text-blue-500 underline">Register</Link>
            </p>
        </div>
    );
};

export default Home;
