/* eslint-disable quotes, indent */
'use-strict';

let apiKey = "tQFwEF92GMVDBfFAyJCldzAorreCTsHfxiVzNpOd";

const URL = "https://developer.nps.gov/api/v1/parks?";

function findParkClick() {
    //let stateString = "TX,NY,OK,NM";
    // let states = [];
    // for(let i=0; i < stateString.length; i+=3){
    //     states.push(stateString.substring(i, i+2));
    // }
    //console.log(states);
    let states = $(`#state-search`).val();
    if(states.length > 2 && states.includes(" ")){
        alert("Please separate States by a ',' and remove any spaces!"); 
    } else {
        let params = {
            stateCode: states, 
            api_key: apiKey,
            limit: $(`#resultsMax`).val(),
        };
        let paramsString = $.param(params);
        console.log(paramsString);
        let urlWithParams = URL + paramsString;
        fetch(urlWithParams)
        .then(function(myRequest){
            if(myRequest.ok){
                return myRequest.json();
            } else {
                throw new Error("bad error");
            }
        }).then(function(jsonData){
            console.log(jsonData);
            makeParkList(jsonData.data);
        });
    }
}

function makeParkList(parks){
    let parksList = [];
    for(let i = 0; i < parks.length; i++){
        let parkName = parks[i].fullName;
        let parkDescription = parks[i].description;
        let parkURL = parks[i].url;
        // console.log(`
        //     This is the state park name: ${parkName}\n
        //     This is the url for it: ${parkURL}\n
        //     Description: ${parkDescription}
        // `);
        parksList.push(makeParkString(parkName,parkDescription, parkURL));
    }
    $('.park-section').html(parksList);
}

function makeParkString(name, description, url ){
    return `
    <h2>${name}</h2>
    <p>${description}</p>
    <h3>Find more <a href="${url}">here!</a></h3>
    `;
}


function handleFindParks(){
    $(`#find-park`).on('click', function(event){
        event.preventDefault();
        findParkClick();
    });
}

function main() {
    handleFindParks();
}
$(main);


//let stateString = Tx,NY
/**
 * for(let i = 0, i < stateString.length, i+=3){
 *
 *
 * }
 */