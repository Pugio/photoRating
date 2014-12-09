// Global variables
var photosArrayGlobal; // this will be a global array of PhotoMetadata objects
var photosIndexGlobal; // global variable indicating index of currently displayed photo

/*
 * Called when the user wants to load a flickr gallery. For the assignment,
 * only change two lines:
 *  1. Add in your own API key (see assignment description)
 *  2. Once you have a textbox on the HTML page, extract the gallery id from the textbox
 *     and store that in galleryId
 */


function loadGallery() {  
    var apiKey = "9680bf8a4eec0bec89bc3ce62a0fd63e";
    //"4614318815763a761d681e7ca2e3847e";
    var galleryId = document.getElementById("galleryId").value;

    // The API call to flickr. For more info, visit: http://www.flickr.com/services/api/
    // When the flickr server responds, the "receiveFlickrResponse" function (below) will
    // be called automatically. 
    var url = "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=" + apiKey + "&format=json&gallery_id=" + galleryId + "&jsoncallback=receiveFlickrResponse";
    var script = document.createElement("script");
    script.src = url;

    document.body.appendChild(script);
}

function PhotoMetadata(URL) {
    this.URL = URL;
    this.rating = document.getElementById("three").checked = true; 
    this.comment = "";
    this.tags = [];
        this.saveTagsFromString = function(str) {
        return str.split("");
        }
}

/*
 * This function runs when the flickr server responds with data. The data object is passed to
 * the parameter 'response', which we can process.
 * 
 * For the assignment, modify this function so that instead of storing the URL for each picture in the
 * photosArrayGlobal, the function creates a PhotoMetadata object and stores that in photosArrayGlobal
 */
function receiveFlickrResponse(response) { 
    var parsedData = response;   
    var photo;
    var url;
    var i;
    photosArrayGlobal = [];

    // Build the location URL for each photo in the response
    for (i = 0; i < parsedData.photos.photo.length; i++) {
        photo = parsedData.photos.photo[i]; 
        
        // Do NOT change how the image URL is constructed. URL form for location of a flickr image:
        // http://farm{id}.static.flickr.com/{server-id}/{id}_{secret}_[mstb].jpg
        url = "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
        photosArrayGlobal[i] = new PhotoMetadata(url);
       
    }   

    photosIndexGlobal = 0;
    return displayCurrentPhoto();
    
}

/*
 * Creates a new array of all of URL properties in photosArrayGlobal, called displayPhoto
 * Displays the photo at photosIndexGlobal in the displayPhoto array. 
 */
function displayCurrentPhoto() {
    var displayPhoto = photosArrayGlobal.map (function (o) {return o.URL})
    document.getElementById("mainImage").src = displayPhoto[photosIndexGlobal];
}

/*
 * Click event handler for next button
 * You do not need to change this function
 */
function next() {
    if (photosIndexGlobal < photosArrayGlobal.length - 1) {
        photosIndexGlobal++;
    } else {
        photosIndexGlobal = 0;
    }
    displayCurrentPhoto();
}

/*
 * Click event handler for previous button
 * You do not need to change this function
 */
function previous() {
    if (photosIndexGlobal > 0) {
        photosIndexGlobal--;
    } else {
        photosIndexGlobal = photosArrayGlobal.length - 1;
    }
    displayCurrentPhoto();
}

function onSaveChangesButtonClick() {
    var tagArray = document.getElementById("tagField").value
    var tagArrayShow = photosArrayGlobal.map (function (t) {return t.tags});
    tagArrayShow[photosIndexGlobal] = tagArray;
    //photosArrayGlobal[photosIndexGlobal].tags = tagArray;
//above saves the tags and keeps the same one for each photo, does not change back to blank
    var commentsString = document.getElementsByName("commentsField").value
    var commentsStringShow = photosArrayGlobal.map (function(c) {return c.comment});
    commentsStringShow[photosIndexGlobal] = commentsString;
    //photosArrayGlobal[photosIndexGlobal].comment = commentsString;
    var rateShow = photosArrayGlobal.map (function (r) {return r.rating});
    if (document.getElementById("one").checked === true) {
        rateShow[photosIndexGlobal] = document.getElementById("one").checked = true
    }
    else if (document.getElementById("two").check === true) {
        rateShow[photosIndexGlobal] = document.getElementById("two").checked = true
    }
    else if (document.getElementById("three").check === true) {
        rateShow[photosIndexGlobal] = document.getElementById("three").checked = true
    }
    else if (document.getElementById("four").check === true) {
        rateShow[photosIndexGlobal] = document.getElementById("four").checked = true
    }
    else if (document.getElementById("five").check === true) {
        rateShow[photosIndexGlobal] = document.getElementById("five").checked = true
    }
}
    //test to see which radio button is clicked, then set the new value to the object
    //get value of getElementByName("commentsField")and getElementById("tagField")

/*
 * Initialization code
 */
window.onload = function() {
    
    // Set up event handlers
    document.getElementById("next").onclick = next;
    document.getElementById("previous").onclick = previous;
    document.getElementById("loadGallery").onclick = loadGallery;
    document.getElementById("saveChanges").onclick = onSaveChangesButtonClick;
};
