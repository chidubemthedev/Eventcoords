const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://nextjsbackend:Janeal0y@cluster0.ynstvll.mongodb.net/events?retryWrites=true&w=majority";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(uri);

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const response = await db.collection("comments").insertOne(newComment);
    newComment.id = response.insertedId;

    console.log(response);

    res.status(201).json({ message: "Comment added!", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db()
    const documents = await db.collection("comments").find().sort({_id: -1}).toArray()

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
