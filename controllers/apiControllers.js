import { application } from 'express';
import Image from '../models/apiModels.js';


// List all items

var hits = 0;
const index = (req, res, next) =>{
    hits++;

    // Capture EndPoint, request payload, request count
    console.log("\nEndpoint Details\n");
    console.log(`http://127.0.0.1:3000/api/image${req.url},` + " method : GET");

    console.log("\nRequest Body\n");
    console.log("GET: received request");
    console.log(`http://127.0.0.1:3000/api/image${req.url}`);
    
    console.log("\nRequest Count\n")
    console.log(`Get: Request Count--> Get: ${hits}`);

    let logGetResponse = res.send;
    res.send = function (ndata) {
    
    // Capture response payload
    console.log("\nResponse Body\n")
    console.log("GET: sending response\n");
    console.log(ndata)

    logGetResponse.apply(res, arguments);
    }
    find()
    .then(response => {
        if (response == '') {
            res.json({status: '404', message: 'Not Found'})
        }
        else {
            res.json({
                response
            })
        }
    })
    .catch(error =>{
        res.json({
            message: 'Error, try again'
        })
    })
}


// Post New Item

var postHits = 0;
const store = (req, res, next) =>{
    postHits++;

    // Capture endpoint, request payload, request count
    console.log("\nEndpoints Details\n");
    console.log(`http://127.0.0.1:3000/api/image${req.url},` + " method : POST");
    console.log("\nRequest Body\n");
    console.log(req.body);
    console.log("\nRequest Count\n")
    console.log(`Post Request Count--> Post: ${postHits}`);

    let logPostResponse = res.send;
    res.send = function (data) {
    
    // Capture response payload
    console.log("\nResponse Body\n")
    console.log(data)
    logPostResponse.apply(res, arguments);
}
    let image = new Image({
        imageId: req.body.imageId,
        name: req.body.name,
        url: req.body.url,
        size: req.body.size
    })
    image.save()
    .then(response => {
        res.json({
            message: 'Item added successfully'
        })
    })
    .catch(error =>{
        res.json({
            message: 'Error, failed to upload item.'
        })
    })
}

// Delete item

const destroy = (req, res, next) =>{

    // Capture endpoint and payload
    console.log("\nEndpoints Details\n");
    console.log(`http://127.0.0.1:3000/api/image${req.url},` + " method : DELETE");
    console.log("\nRequest Body\n");
    console.log(req.body);

    let logDeleteResponse = res.send;
    res.send = function (data) {
    
        //logs to capture response payload
        console.log("\nResponse Body\n")
        console.log(data)
        logDeleteResponse.apply(res, arguments);
    }
    let imageId = req.body.imageId
    deleteMany()
    .then(() => {
        res.json({
            message: 'Item deleted successfully'
        })
    })
    .catch(error =>{
        res.json({
            message: 'Error, can not delete item'
        })
    })
}

export {
    index, store, destroy
}