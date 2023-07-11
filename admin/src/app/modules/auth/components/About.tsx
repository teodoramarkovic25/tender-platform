import React from "react";

function About() {
    return (
        <div className="container">
            <h1 className="mt-4">About Tender Pro</h1>

            <p className="lead">
                Tender Pro is a comprehensive tender management application designed to streamline the tendering process. With its user-friendly interface and powerful features, Tender Pro helps organizations effectively manage and track tenders from start to finish.
            </p>

            <h2 className="mt-4">Key Features:</h2>

            <ul className="list-group">
                <li className="list-group-item">Centralized Tender Repository: Easily store, organize, and access all tender-related documents and information in one place.</li>
                <li className="list-group-item">Automated Workflow: Simplify the tender process with automated notifications, reminders, and task assignments.</li>
                <li className="list-group-item">Collaborative Platform: Enable seamless collaboration among team members, departments, and stakeholders involved in the tendering process.</li>
                <li className="list-group-item">Document Versioning: Keep track of document revisions and maintain a history of changes for easy reference.</li>
                <li className="list-group-item">Bid Evaluation: Facilitate fair and transparent bid evaluation processes, ensuring adherence to predefined criteria.</li>
                <li className="list-group-item">Reporting and Analytics: Generate insightful reports and analytics to gain valuable insights into tender performance and trends.</li>
            </ul>

            <p className="mt-4">
                Whether you are a government agency, private organization, or nonprofit, Tender Pro offers the tools and functionality to enhance efficiency, save time, and improve overall tender management. Take control of your tendering process with Tender Pro today!
            </p>
        </div>
    );
}

export default About;
