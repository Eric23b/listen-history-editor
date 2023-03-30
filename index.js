// import {
//     showCalendarPreviewDialog,
// } from './dialogs.js';

// import {
//     formatDateToCA,
// } from './date-utilities.js';

// let history = [];

const mainContainer = document.querySelector('.main');

const loadBtn = document.querySelector('#load-button');
loadBtn.onchange = (event) => {
    loadHistoryJSON(event);
}

function loadHistoryJSON(event) {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);

    async function onReaderLoad(event){
        const jsonFileDate = JSON.parse(event.target.result);

        const cleanData = [];
        const cleanerData = [];

        for (const property of jsonFileDate) {
            const listened_at = property.listened_at;
            const track_name = property.track_metadata.track_name;
            const release_name = property.track_metadata.release_name;
            const artist_name = property.track_metadata.artist_name;
            const duration_ms = property.track_metadata.duration_ms;
            const media_player = property.track_metadata.additional_info.media_player || "Unknown";
            const media_player_version = property.track_metadata.additional_info.media_player_version || "Unknown";

            const newEntryHash = String(
                                    track_name.toLowerCase() +
                                    release_name.toLowerCase() +
                                    artist_name.toLowerCase() +
                                    String(duration_ms).toLowerCase()
                                 ).replaceAll(" ", "");

            const newEntry = {
                              hash: newEntryHash,
                              listened_at: [listened_at],
                              track_metadata: {
                                  track_name: track_name,
                                  release_name: release_name,
                                  artist_name: artist_name,
                                  duration_ms: duration_ms,
                                  additional_info: {
                                      media_player: media_player,
                                      media_player_version: media_player_version,
                                  }
                              },
                            }

            // Add first entry
            if (cleanData.length === 0) cleanData.push(newEntry);
            
            // Find entry index if it has been added
            let foundIndex = -1;
            cleanData.forEach((entry, index) => {
                if (entry.hash == newEntryHash) {
                    foundIndex = index;
                }
            });

            // Add entry if it has been yet added
            if (foundIndex == -1) {
                cleanData.push(newEntry);
            }
            // Added listen time to listen_at array
            else {
                cleanData[foundIndex].listened_at.push(listened_at);
            }
        }

        // Remove hash
        for (const entry of cleanData) delete entry.hash;

        // Add timesPlayed
        for (const entry of cleanData) entry.timesPlayed = entry.listened_at.length;

        // Add totalPlayTime_ms
        for (const entry of cleanData) entry.totalPlayTime_ms = entry.listened_at.length * entry.track_metadata.duration_ms;

        // Add totalPlayTime
        for (const entry of cleanData) entry.totalPlayTime = msToTime(entry.totalPlayTime_ms);

        console.log(cleanData);

        const date = (new Date()).toLocaleDateString('ca-en');
        // saveTextFile(JSON.stringify(cleanData, null, 1), `Listen History ${date}`, "json");
   }
}

function msToTime(s) {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;
  
    return (hrs ? hrs + ":" : "") + mins + ":" + secs;
}


function saveTextFile(data, fileName, fileType) {
    let jsonData = new Blob([data], {type: `text/${fileType}`});  
    let jsonURL = URL.createObjectURL(jsonData);

    let hiddenElement = document.createElement('a');
    hiddenElement.href = jsonURL;
    hiddenElement.target = '_blank';
    hiddenElement.download = `${fileName}.${fileType}`;
    hiddenElement.click();
}