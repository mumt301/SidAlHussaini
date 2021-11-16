function queryArtist () {
    let params = (new.URL(document.location)).searchParams;
    if (params.has('artist')){
        let artistName = params.get('artist');
        console.log(artistName);

        let mbBaseURL = "https://musicbrainz.org/ws/2/";
        let mbResource = "artist?query=";
        let queryURL = mbBaseURL + mbResource + artistName;
        console.log(queryURL);

        httpGet(queryURL, getMBID);
    }
}