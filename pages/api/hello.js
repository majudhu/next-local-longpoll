let messages = [];

export default async function (req, res) {
  switch (req.method) {
    case "GET":
      const start = new Date();
      while (
        messages.length <= parseInt(req.query.q) &&
        new Date() - start < 25000
      ) {
        await new Promise((r) => setTimeout(r, 100));
      }
      return res.json(messages);

    case "POST":
      messages.push(req.body.message);
      return res.status(204).send();
  }
}
