import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

interface IBook {
  _id: string;
  description: string;
  image: string;
  link: string;
  title: string;
}

const SavedBooks = () => {
  const [savedBooks, setSavedBooks] = useState<Array<IBook>>([]);
  const { data, loading } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (_id: string) => {
    try {
      const { data } = await removeBook({ variables: { bookId: _id } });
      setSavedBooks(data.removeBook.savedBooks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!loading) setSavedBooks(data.me.savedBooks);
  }, [loading]);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>{data.me.username ? <h1>Viewing {data.me.username}'s saved books!</h1> : <h1>Viewing saved books!</h1>}</Container>
      </div>
      <Container>
        <h2 className="pt-5">{savedBooks.length ? `Viewing ${savedBooks.length} saved ${savedBooks.length === 1 ? 'book' : 'books'}:` : 'You have no saved books!'}</h2>
        <Row>
          {savedBooks.map((book: any) => (
            <Col key={book._id} md="4">
              <Card border="dark">
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className="btn-block btn-danger" onClick={() => handleDeleteBook(book._id)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
