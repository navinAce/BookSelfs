import { useState, useEffect } from "react";
import axios from "axios";

function DeleteBooks() {
    const [showModal, setShowModal] = useState(false);
    const [books, setBooks] = useState([]);
    const [boookId, setBookId] = useState(null);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:8000/fetch");
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchBooks();
    }, [trigger]);

    const deleteIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
    const handleDeleteWhenPressed=async (id)=>{
        setShowModal(true)
        setBookId(id)
    }
    const closeModal = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/delete/${id}`)
            .then((response) => console.log(response.data));
            setTrigger(!trigger)
            setShowModal(false);
            
        } catch (error) {
            console.log("Error deleting data:", error);
            
        }
        
    };

    return (
        <div>
            <div>
                <h1 className="sm:text-4xl text-base text-center mt-4">Deleting Page</h1>
            </div>
            <div className="grid sm:grid-cols-3">
            {books && books.map((book) => (
                    <div key={book.id} className="bg-gray-300 p-4 m-4 text-black rounded flex justify-between items-center">
                        <div>
                            <h1 className="sm:text-2xl text-lg font-bold">{book.bookName.toUpperCase()}</h1>
                            <p className="sm:text-xl text-base">{book.authorName.toUpperCase()}</p>
                            <p className="sm:text-xl text-base">Price: ₹{book.price}</p>
                        </div>
                        <button className="text-red-500 bg-black" title="Delete" onClick={() => handleDeleteWhenPressed(book.id)}>
                            {deleteIcon}
                        </button>
                    </div>
                ))}
              
              
            </div>
            {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md sm:w-full max-w-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-red-600 font-bold">Warning!</h2>
            <p className="text-black">This book will be removed permanently!</p>
            <button onClick={()=>closeModal(boookId)} className="bg-red-500 p-2 m-2 text-white rounded-md">Delete</button>
        </div>
    </div>
)}
        </div>
    );
}

export { DeleteBooks };

