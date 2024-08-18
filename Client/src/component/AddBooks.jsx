import { useState, useRef } from "react";
import axios from "axios";

function AddBooks() {
    const bookNameRef = useRef(null);
    const authorNameRef = useRef(null);
    const priceRef = useRef(null);
    
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookName = bookNameRef.current.value;
        const authorName = authorNameRef.current.value;
        const price = priceRef.current.value;
        const data = {
            bookName,
            authorName,
            price
        };
        AddBookData(data);
        clearForm();
        setShowModal(true);
       
    };

    const AddBookData = async (data) => {
        try {
            await axios.post("http://localhost:8000/add", data)
            .then((response) => {
                console.log("Book added successfully:", response.data);
            })
        } catch (error) {
            console.error("Error adding book:", error)
    }};

    const clearForm = () => {
        bookNameRef.current.value = "";
        authorNameRef.current.value = "";
        priceRef.current.value = "";
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <form className="m-4 flex flex-col items-center" onSubmit={handleSubmit}>
                <label htmlFor="bookName" className="sm:text-lg text-base">Book Name</label>
                <input 
                    type="text" 
                    id="bookName" 
                    className="p-2 m-2 border-2 border-gray-400 rounded-md text-black bg-white" 
                    required 
                    pattern=".{3,}" 
                    title="Book name must be at least 3 characters long"
                    ref={bookNameRef}
                />
                <label htmlFor="authorName" className="sm:text-lg text-base">Author Name</label>
                <input 
                    type="text" 
                    id="authorName" 
                    className="p-2 m-2 border-2 border-gray-400 rounded-md text-black bg-white" 
                    required 
                    pattern=".{3,}" 
                    title="Author name must be at least 3 characters long"
                    ref={authorNameRef}
                />
                <label htmlFor="price" className="sm:text-lg text-base">Price</label>
                <input 
                    type="text" 
                    id="price" 
                    className="p-2 m-2 border-2 border-gray-400 rounded-md text-black bg-white" 
                    required 
                    pattern="^\d+(\.\d{1,2})?$" 
                    title="Price must be a number with up to two decimal places"
                    ref={priceRef}
                />
                <button type="submit" className="bg-blue-500 p-2 m-2 text-white rounded-md">Add Book</button>
            </form>
            {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md sm:w-full max-w-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-black font-bold">Success!</h2>
            <p className="text-black">Book added successfully!</p>
            <button onClick={closeModal} className="bg-blue-500 p-2 m-2 text-white rounded-md">Close</button>
        </div>
    </div>
)}

        </div>
    );
}

export { AddBooks };
