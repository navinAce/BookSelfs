import connection from '../../db/db.js';


const fetchBookDetails=(req,res)=>{
     connection.query('SELECT * FROM books', (error, results) => {
        if (error) {
            res.status(500).send('Internal Server Error');
        }
        res.send(results).status(201);
    });
}

const addBookDetails=(req,res)=>{
    const {bookName,authorName,price}=req.body;
    connection.query('INSERT INTO books (bookName,authorName,price) VALUES (?,?,?)',[bookName,authorName,price],(error,results)=>{
        if(error){
            res.status(500).send('Internal Server Error');
        }
        res.send('Book Added successfully').status(201);
    })
}

const updateBookDetails = (req, res) => {
    const { id } = req.params;
    const { bookName, authorName, price } = req.body;

    let query = 'UPDATE books SET ';
    const params = [];

    if (bookName) {
        query += 'bookName = ?, ';
        params.push(bookName);
    }
    if (authorName) {
        query += 'authorName = ?, ';
        params.push(authorName);
    }
    if (price) {
        query += 'price = ?, ';
        params.push(price);
    }

    // Remove the last comma and space
    query = query.slice(0, -2);
    query += ' WHERE id = ?';
    params.push(id);

    connection.query(query, params, (error, results) => {
        if (error) {
            res.status(500).send('Internal Server Error');
        }
        res.status(201).send('Book details updated successfully');
    });
};

const deleteBookDetails = (req, res) => {
    const{id} = req.params;
    connection.query('DELETE FROM books WHERE id = ?',[id],(error,results)=>{
        if(error){
            res.status(500).send('Internal Server Error');
        }
        res.status(201).send('Book details deleted successfully');
    })

}


export { fetchBookDetails,addBookDetails,updateBookDetails,deleteBookDetails }