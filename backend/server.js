const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const {errorHandler} = require("./middleware/error.middleware");
const connectDB = require("./config/db");
const path = require("path");
const port = process.env.PORT || 8000;

connectDB().then(() => {

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use(helmet());

    app.use('/api/products', require("./routes/product.routes"));
    app.use('/api/orders', require("./routes/order.routes"));
    app.use('/api/basket', require("./routes/basket.routes"));
    app.use('/api/users', require("./routes/user.routes"));
    app.use('/api/wishlist', require("./routes/wishlist.routes"));
    app.use('/api/points', require("./routes/points.routes"));
    app.use('/api/upload', require("./routes/upload.routes"));

    const __dirname = path.resolve()
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

    app.use(errorHandler);

    app.listen(port, () => console.log(`Server started on port ${port}`));
}).catch((e) => {
    console.log(e)
});
