# Welcome to the MongoGridFS Files Bucket

This is a simple implementation of a file storage system using MongoDB's GridFS. It allows you to store files in a MongoDB database and retrieve them later.

## Installation

To clone this repository, run the following command:

```bash
git clone https://github.com/vikashkrdeveloper/MongoGridFS-FilesBucket.git
```

Then check into the cloned repository:

```bash
cd MongoGridFS-FilesBucket
```

After that, install the required dependencies:

```bash
npm install
```

set the environment variables in a `.env` file in the root directory of the project. The following environment variables are required:

```bash
MONGO_URI=mongodb://localhost:27017/files-bucket
PORT=8000
```

And finally, start the server:

```bash
npm start
```

````
# Output
```bash
$ node ./bin/www

Connected to database: gridfs
Base URL:http://localhost:8000
```
````

## Usage

To upload a file, send a POST request to the `/upload/image` endpoint with the file you want to upload. The file should be sent as a form-data request with the key `file` and `caption` as a string.

```bash
curl -X POST -F "file=@/path/to/file.jpg" -F "caption=This is a caption" http://localhost:8000/upload/image
```

To retrieve a file, send a GET request to the `/get-image/:filename` endpoint with the filename of the file you want to retrieve.

## The server is running on port 8000. You can now test the API endpoints using Postman or any other API testing tool.

### API Endpoints

The following are the API endpoints available in the application:
| Method | Endpoint | Description |
| ------ | -------------------- | ---------------------- |
| POST | /upload/image | Upload an image file |
| GET | /get-image/:filename | Retrieve an image file |
| GET | /get-all-images | Retrieve all images |
| POST | /image/delete/:id | Delete an image |
| GET | /image/recent | Fetch most recent image|
| POST | /multiple/image/upload| Upload multiple files |
| GET | /get-image/:filename | Fetch a particular image and render on browser |
| DELETE | /file/del/:id | Delete a particular file by an ID |

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [GridFS](https://docs.mongodb.com/manual/core/gridfs/) - MongoDB's file storage system
- [Multer](https://www.npmjs.com/package/multer) - Middleware for handling `multipart/form-data`
- [Multer GridFS Storage](https://www.npmjs.com/package/multer-gridfs-storage) - Multer storage engine for GridFS
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
- [Dotenv](https://www.npmjs.com/package/dotenv) - Module that loads environment variables from a `.env` file into `process.env`
- [Cors](https://www.npmjs.com/package/cors) - Middleware for enabling CORS with various options
- [Body-parser](https://www.npmjs.com/package/body-parser) - Middleware for parsing incoming request bodies
- [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware
- [Method-override](https://www.npmjs.com/package/method-override) - Middleware for overriding HTTP methods
- [Debug](https://www.npmjs.com/package/debug) - Tiny debugging utility
- [Bluebird](https://www.npmjs.com/package/bluebird) - Promise library
- [Jade](https://www.npmjs.com/package/jade) - Template engine for Express
- [Http-errors](https://www.npmjs.com/package/http-errors) - Create HTTP errors
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser) - Parse cookie headers

## File Structure

The application is structured as follows:

```
MongoGridFS-FilesBucket/
├── bin/
│   └── www
├── public/
|   └── stylesheets/
|       └── style.css
├── routes/
|   └── image.js
├── views/
|   ├── error.jade
|   ├── index.jade
|   └── layout.jade
├── controllers/
|   └── imageController.js
├── helpers/
|   └── response-objects.js
├── models/
|   ├── image.js
|   ├── pdf.js
|   └── video.js
├── .env
├── .gitignore
├── app.js
├── config.js
├── package-lock.json
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Authors

- **Vikash Kumar** - [vikashkrdeveloper](https://www.linkedin.com/in/vikashkrdeveloper/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
