import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";

function Payment({dataF, setDataF, viewer, setViewer}){ // Input hooks so data from here can be used in App and sent to Summary
    const { register, handleSubmit, formState: { errors } } = useForm(); // Setup for the form to get users data with specific requirements

    const onSubmit = (data) => {
        console.log(data); // log all data
        console.log(data.fullName); // log only fullname
        setDataF(data); // Now set the data so it can be sent to sumary
        setViewer(1); // Now we want to display summary page instead
    }

    // Registering field names in the form with specific requirements
    return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
            <div className="form-group">
                <input {...register("fullName", { required: true })} placeholder="Full Name" className="form-control" />
                {errors.fullName && <p className="text-danger">Full Name is required.</p>}
            </div>
            <div className="form-group">
                <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control" /> {/* Inputs fullow specific requirements and display error if not, required means you must enter for example*/}
                {errors.email && <p className="text-danger">Email is required.</p>} {/* Should you not meet one of the requirements this is displayed */}
            </div>
            <div className="form-group">
                <input {...register("creditCard", { required: true })} placeholder="Credit Card" className="form-control" />
                {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
            </div>
            <div className="form-group">
                <input {...register("address", { required: true })} placeholder="Address" className="form-control" />
                {errors.address && <p className="text-danger">Address is required.</p>}
            </div>
            <div className="form-group">
                <input {...register("address2")} placeholder="Address 2" className="form-control" />
            </div>
            <div className="form-group">
                <input {...register("city", { required: true })} placeholder="City" className="form-control" />
                {errors.city && <p className="text-danger">City is required.</p>}
            </div>
            <div className="form-group">
                <input {...register("state", { required: true })} placeholder="State" className="form-control" />
                {errors.state && <p className="text-danger">State is required.</p>}
            </div>
            <div className="form-group">
                <input {...register("zip", { required: true })} placeholder="Zip" className="form-control" />
                {errors.zip && <p className="text-danger">Zip is required.</p>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>)
}

export default Payment;