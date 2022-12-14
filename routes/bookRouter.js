const express = require("express");
const bookController = require("../controllers/bookControllers");

function router(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);
  bookRouter.route("/book").post(controller.post).get(controller.get);

  bookRouter.use("/book/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }

      return res.sendStatus(404);
    });
  });

  bookRouter
    .route("/book/:bookId")
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;

      const { title, author, genre, read } = req.body;
      book.title = title || book.title;
      book.author = author || book.author;
      book.genre = genre || book.genre;
      book.read = read || book.read;
      book.save((err) => {
        if (err) {
          return res.send(err);
        }

        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}

module.exports = router;
