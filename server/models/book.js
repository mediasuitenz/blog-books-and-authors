module.exports = function(Book) {

  /**
   * Returns all books by a provided author.
   * A contrived function for demonstration purposes
   * @param {number}    authorId
   * @param {Function}  cb
   */
  Book.findByAuthor = function (authorId, cb) {
    const connector = Book.app.dataSources.db.connector
    const sql = `
        select b.*, a.* from book b
          inner join author a on
             a.author_id = b.author_id
          where a.author_id = ${authorId};
    `
    connector.execute(sql, null, (err, resultObjects) => {
      if (err) return cb(err)
      if (!resultObjects.length) return cb()

      const books = resultObjects.map(resultRaw => {
        const bookRaw = connector.fromRow('book', resultRaw)
        const authorRaw = connector.fromRow('author', resultRaw)
        const book = new Book.app.models.book(bookRaw)
        const author = new Book.app.models.author(authorRaw)

        // Set the author on the book object
        book.author(author)
        return book
      })

      cb(null, books)
    })
  }

  /**
   * This method constructs the `ctx.result` object as we'd like it sent to our user
   * This is necessary because Loopback doesn't know we'd like to serialize the author object into the
   * book json response.
   */
  Book.afterRemote('findByAuthor', function (ctx, _results, cb) {
    ctx.result = ctx.result.map(result => {
      const resultObj = result.toJSON()
      resultObj.author = result.__cachedRelations.author.toJSON()
      return resultObj
    })
    cb()
  })

  Book.remoteMethod('findByAuthor', {
    accepts: [
      {arg: 'authorId', type: 'number', required: true},
    ],
    returns: {type: 'Book', root: true},
    http: {path: '/find-by-author/:authorId', verb: 'get', status: 200}
  })
}
