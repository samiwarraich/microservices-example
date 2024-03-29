const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/events", async (req, res) => {
  try {
    console.log("Event Received", req.body.type);
    const { type, data } = req.body;
    if (type === "CommentCreated") {
      const status = data.content.includes("orange") ? "rejected" : "approved";
      await axios.post("http://events-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      });
    }
    res.send({});
  } catch (error) {
    console.log(error);
  }
});

app.listen(4003, () => {
  console.log("Moderation service listening on port: 4003");
});
