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

function PhotoMetadata(photo) {
    // Do NOT change how the image URL is constructed. URL form for location of a flickr image:
    // http://farm{id}.static.flickr.com/{server-id}/{id}_{secret}_[mstb].jpg

    this.URL   = "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
    this.photo = photo;
    this.rating = 3; // default
    this.comment = "";
    this.tags = "";
}

PhotoMetadata.prototype.saveTagsFromString = function(str) {
    this.tags = str;
};

/*
 * This function runs when the flickr server responds with data. The data object is passed to
 * the parameter 'response', which we can process.
 *
 * For the assignment, modify this function so that instead of storing the URL for each picture in the
 * photosArrayGlobal, the function creates a PhotoMetadata object and stores that in photosArrayGlobal
 */
function receiveFlickrResponse(response) {
    photosArrayGlobal = [];
    photosIndexGlobal = 0;

    photosArrayGlobal = response.photos.photo.map(function (photo) { return new PhotoMetadata(photo); });

    return displayCurrentPhoto();
}

/*
 * Creates a new array of all of URL properties in photosArrayGlobal, called displayPhoto
 * Displays the photo at photosIndexGlobal in the displayPhoto array.
 */
function displayCurrentPhoto() {
    var photoMetaData = currentPhoto();
    document.getElementById("mainImage").src       = photoMetaData.URL;
    document.getElementById("commentsField").value = photoMetaData.comment;
    document.getElementById("tagField").value      = photoMetaData.tags;
    setRating(photoMetaData.rating);
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

function currentPhoto() {
    return photosArrayGlobal[photosIndexGlobal];
}

// returns the currently selected rating

function currentRating() {
    var rateButtons = document.getElementsByName("rate");
    for (var i = 0; i < rateButtons.length; i++)
        if (rateButtons[i].checked) // the checked property will either be true or false
            return i+1;             // the array is 0-indexed, but we start our ratings at 1, so add 1
}

function setRating(rating) {
    document.getElementsByName("rate")[rating-1].checked = true; // remember to convert a rating into a 0-indexed array index by subtracting 1
}

function onSaveChangesButtonClick() {
    var photoMetaData = currentPhoto();

    photoMetaData.saveTagsFromString(document.getElementById("tagField").value);
    photoMetaData.comment = document.getElementById("commentsField").value;
    photoMetaData.rating  = currentRating();
}

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
