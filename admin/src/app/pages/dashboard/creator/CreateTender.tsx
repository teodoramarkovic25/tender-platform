import React from "react";

export function CreateTender() {
    return (
      <div>  
        <h1>Create Tender</h1> 
        <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title"required/>
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" required/>
        <label htmlFor="deadline">Title:</label>
        <input type="date" id="deadline" required/>
        <label htmlFor="documents">Associated Documents::</label>
        <input type="file" id="documents" required/>
        </form>
        </div>
    )
}
