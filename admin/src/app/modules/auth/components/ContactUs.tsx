import React from "react";

export function ContactUs() {
    return (
        <div className="container mt-4">
            <h1 className="text-center">Contact Us</h1>

            <h2 className="text-center">Get in touch with Tender Pro</h2>

            <p className="text-center">
                If you have any questions, inquiries, or feedback regarding our tender management services, please feel free to contact us using the information below:
            </p>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h3>Contact Information</h3>

                    <ul className="list-group">
                        <li className="list-group-item"><strong>Address:</strong> 123 Tender Street, Cityville, Country</li>
                        <li className="list-group-item"><strong>Phone:</strong> +1 123-456-7890</li>
                        <li className="list-group-item"><strong>Email:</strong> info@tenderpro.com</li>
                    </ul>

                    <h3>Business Hours</h3>

                    <p>
                        Our office is open from Monday to Friday, 9:00 AM to 5:00 PM (local time). We are closed on weekends and public holidays.
                    </p>

                    <h3>Send us a message</h3>

                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" id="name" name="name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" name="email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea className="form-control" id="message" name="message" rows={4} required></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
