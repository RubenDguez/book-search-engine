import { useMutation, useQuery } from '@apollo/client';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import type { Book } from '../models/Book';
import type { GoogleAPIBook } from '../models/GoogleAPIBook';
import { searchGoogleBooks } from '../utils/API';
import { SAVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedBooks, setSavedBooks] = useState<Array<string>>([]);

  const { loggedIn } = useAuth();
  const { data, loading } = useQuery(GET_ME, { fetchPolicy: 'no-cache' });
  const [saveBook] = useMutation(SAVE_BOOK);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) return false;

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) throw new Error('something went wrong!');

      const { items } = await response.json();

      const bookData = items.map((book: GoogleAPIBook) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.id,
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId: string) => {
    const bookToSave: Book = searchedBooks.find((book) => book.bookId === bookId)!;

    try {
      await saveBook({ variables: { input: { ...bookToSave } } });
      setSavedBooks((curr) => [...curr, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!loading && loggedIn()) {
      const bookLinks = data.me.savedBooks.map((book: any) => book.link);
      setSavedBooks(bookLinks);
    }
  }, [loading]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control name="searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" size="lg" placeholder="Search for a book" />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">{searchedBooks.length ? `Viewing ${searchedBooks.length} results:` : 'Search for a book to begin'}</h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border="dark">
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {loggedIn() && (
                      <Button disabled={savedBooks.includes(book.bookId)} className="btn-block btn-info" onClick={() => handleSaveBook(book.bookId)}>
                        {savedBooks.includes(book.bookId) ? 'This book has already been saved!' : 'Save this Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
