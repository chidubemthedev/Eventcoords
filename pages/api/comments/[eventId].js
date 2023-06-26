import { connectDb, insertDocument, getAllDocuments } from "@/helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to db failed!" });
    return;
  }

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
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const response = await insertDocument(client, "comments", newComment);
      newComment._id = response.insertedId;
      res.status(201).json({ message: "Comment added!", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }
  client.close();
}

export default handler;
