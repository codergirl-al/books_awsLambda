module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      author: String,
      rating: Number,
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Book = mongoose.model("book", schema);
  return Book;
};