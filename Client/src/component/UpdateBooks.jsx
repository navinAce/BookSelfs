import { useState, useRef, useEffect } from "react";
import axios from "axios";

function UpdateBooks() {
    const [showModal, setShowModal] = useState(false);
    const bookNameRef = useRef(null);
    const authorNameRef = useRef(null);
    const priceRef = useRef(null);
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState(null);
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
        
    const tickIcon = (
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
                d="M5 13l4 4L19 7"
            />
        </svg>
    );
    
    const updateIcon = (
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
                d="M12 20v-4m0 0l-2 2m2-2l2 2m-2-2V8m0 0l-2 2m2-2l2 2m-2-2V4m0 0l-2 2m2-2l2 2"
            />
        </svg>
    );

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
    
    const handleUpdateWhenPressed = (id) => {
        setShowModal(true);
        setBookId(id);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleUpdate = async (id) => {
        const bookName = bookNameRef.current.value;
        const authorName = authorNameRef.current.value;
        const price = priceRef.current.value;
    
        const data = {};
    
        if (bookName.length >= 3) {
            data.bookName = bookName;
        } else if (bookName.length > 0) {
            alert("Book name must be at least 3 characters long");
            return;
        }
    
        if (authorName.length >= 3) {
            data.authorName = authorName;
        } else if (authorName.length > 0) {
            alert("Author name must be at least 3 characters long");
            return;
        }
    
        const pricePattern = /^\d+(\.\d{1,2})?$/;
        if (pricePattern.test(price)) {
            data.price = price;
        } else if (price.length > 0) {
            alert("Price must be a number with up to two decimal places");
            return;
        }
    
        if (Object.keys(data).length === 0) {
            alert("No valid data to update");
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:8000/update/${id}`, data);
            console.log(response.data);
            setShowModal(false); // Close the modal after successful update
            setTrigger(!trigger); // Trigger a re-fetch of the data
            alert("Book updated successfully");
        } catch (error) {
            console.log("Error updating book:", error);
        }
    };

    return (
        <div>
            <div>
                <h1 className="sm:text-4xl text-base text-center mt-4">Update Page</h1>
            </div>
            <div className="grid sm:grid-cols-3">
                {books && books.map((book) => (
                    <div key={book.id} className="bg-gray-300 p-4 m-4 text-black rounded flex justify-between items-center">
                        <div>
                            <h1 className="sm:text-2xl text-lg font-bold">{book.bookName.toUpperCase()}</h1>
                            <p className="sm:text-xl text-base">{book.authorName.toUpperCase()}</p>
                            <p className="sm:text-xl text-base">Price: ₹{book.price}</p>
                        </div>
                        <button className="text-green-500 bg-black" title="Update" onClick={() => handleUpdateWhenPressed(book.id)}>
                            {updateIcon}
                        </button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative m-4 flex flex-col items-center bg-white sm:w-full max-w-md md:max-w-lg lg:max-w-xl rounded">
                        <button onClick={handleClose} className="absolute top-2 right-2 text-red-400">
                            {deleteIcon}
                        </button>
                        <label htmlFor="bookName" className="sm:text-lg text-base text-black">Book Name</label>
                        <input 
                            type="text" 
                            id="bookName" 
                            className="p-2 m-2 border-2 border-gray-400 rounded-md text-black bg-white"  
                            pattern=".{3,}" 
                            title="Book name must be at least 3 characters long"
                            ref={bookNameRef}
                        />                
                        <label htmlFor="authorName" className="sm:text-lg text-base text-black">Author Name</label>
                        <input 
                            type="text" 
                            id="authorName" 
                            className="p-2 m-2 border-2 border-gray-400 rounded-md text-black bg-white" 
                            pattern=".{3,}" 
                            title="Author name must be at least 3 characters long"
                            ref={authorNameRef}
                        />
                        <label htmlFor="price" className="sm:text-lg text-base text-black">Price</label>
                        <input 
                            type="text" 
                            id="price" 
                            className="p-2 m-2 border-2 border-gray-400 rounded-md text-black bg-white" 
                            pattern="^\d+(\.\d{1,2})?$" 
                            title="Price must be a number with up to two decimal places"
                            ref={priceRef}
                        />
                        <button className="text-green-400 bg-black rounded-full" onClick={() => handleUpdate(bookId)}>{tickIcon}</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export { UpdateBooks };
