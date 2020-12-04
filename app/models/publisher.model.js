module.exports = (mongoose) => {
  const Schema = mongoose.Schema;

  const publisherSchema = mongoose.Schema({
    name: String,
    founded: Number,
    location: String,
    publishedBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: "books",
      },
    ],
  });

  publisherSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Publisher = mongoose.model("publishers", publisherSchema);
  return Publisher;
};
