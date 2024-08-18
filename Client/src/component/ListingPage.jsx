import { useState, useEffect } from "react";
import axios from "axios";

const ListOfBook = () => {
    const [books, setBooks] = useState([]);

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
    }, []);

    return (
        <>
            {books && books.map((book) => (
                <div key={book.id} className="bg-gray-300 p-4 m-4 text-black rounded">
                    <h1 className="sm:text-2xl text-lg font-bold">{book.bookName.toUpperCase()}</h1>
                    <p className="sm:text-xl text-base">{book.authorName.toUpperCase()}</p>
                    <p className="sm:text-xl text-base">Price: ₹{book.price}</p>
                </div>
            ))}
        </>
    );
};

function List() {
    return (
        <div>
            <div>
                <h1 className="sm:text-4xl text-base text-center mt-4">Listing Page</h1>
            </div>
            <div className="grid sm:grid-cols-3">
                {ListOfBook()}
            </div>
        </div>
    );
}

export  {List,ListOfBook};
