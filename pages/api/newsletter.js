const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://nextjsbackend:Janeal0y@cluster0.ynstvll.mongodb.net/events?retryWrites=true&w=majority";

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const client = await MongoClient.connect(uri);
    const db = client.db();
    await db.collection("newsletter").insertOne({ email: email });
    client.close()

    console.log(email);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
