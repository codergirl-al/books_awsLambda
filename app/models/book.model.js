module.exports = (mongoose) => {
  const Schema = mongoose.Schema;

  const bookSchema = mongoose.Schema(
    {
      title: String,
      author: String,
      rating: Number,
      pages: Number,
      language: String,
      description: String,
      published: Boolean,
      publisher: [
        { type: mongoose.Schema.Types.ObjectId, ref: "publishers!!" },
      ],
    },
    { timestamps: true }
  );

  bookSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Book = mongoose.model("books", bookSchema);
  return Book;
};
