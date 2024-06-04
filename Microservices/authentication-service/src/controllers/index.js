// controllers/home.c.js
class Controller {
  getHomePage = async (req, res, next) => {
    try {
      res.status(200).json({ message: "Hello world dasdsa!" });
    } catch (error) {
      next(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = new Controller();
