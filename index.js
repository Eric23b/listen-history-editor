import {
    showInputDialog,
    showYesNoDialog,
} from './dialogs.js';

// import {
//     formatDateToCA,
// } from './date-utilities.js';

import {
    getTableHeaderRow,
    getTableDataWithText,
    getTableDataWithDeleteButton,
} from './table-utilities.js';

let history = [];

// const mainContainer = document.querySelector('.main');
const dataTable = document.querySelector("#data-table");

const loadBtn = document.querySelector('#load-button');
loadBtn.onchange = (event) => {
    loadHistoryJSON(event);
}

const saveBtn = document.querySelector('#save-button');
saveBtn.onclick = () => {
    const date = (new Date()).toLocaleDateString('ca-en');
    saveTextFile(JSON.stringify(history, null, 1), `Listen History ${date}`, "json");
}

function loadHistoryJSON(event) {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);

    async function onReaderLoad(event){
        const jsonFileDate = JSON.parse(event.target.result);

        history = [];

        for (const property of jsonFileDate) {
            const listened_at = property.listened_at || "Unknown";
            const track_name = property.track_metadata.track_name || "Unknown";
            const release_name = property.track_metadata.release_name || "Unknown";
            const artist_name = property.track_metadata.artist_name || "Unknown";
            const duration_ms = property.track_metadata.duration_ms || 0;
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
            if (history.length === 0) history.push(newEntry);
            
            // Find entry index if it has been added
            let foundIndex = -1;
            history.forEach((entry, index) => {
                if (entry.hash == newEntryHash) {
                    foundIndex = index;
                }
            });

            // Add entry if it has been yet added
            if (foundIndex == -1) {
                history.push(newEntry);
            }
            // Added listen time to listen_at array
            else {
                history[foundIndex].listened_at.push(listened_at);
            }
        }

        // Remove hash
        for (const entry of history) delete entry.hash;

        // Add timesPlayed
        for (const entry of history) entry.times_played = entry.listened_at.length;

        // Add totalPlayTime_ms
        for (const entry of history) entry.total_time_played_ms = entry.listened_at.length * entry.track_metadata.duration_ms;

        // Add totalPlayTime
        for (const entry of history) entry.total_time_played = msToTime(entry.total_time_played_ms);

        // console.log(history);

        loadTable();
   }
}

function loadTable() {
    history.sort((a, b) => {
        const nameA = String(a.track_name).toUpperCase();
        const nameB = String(b.track_name).toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    dataTable.innerHTML = "";
    dataTable.appendChild(getTableHeaderRow(["Track", "Artist", "Duration", "Total played", "Delete"]));

    // for (const entry of history) {
    history.forEach((entry, index) => {
        const row = document.createElement('tr');

        const trackName = getTableDataWithText(entry.track_metadata.track_name);
        trackName.onclick = () => {
            showInputDialog("Change track name?",
                            entry.track_metadata.track_name,
                            (newName) => {
                                entry.track_metadata.track_name = newName;
                                loadTable();
                            },
                            null,
                            'text',
                            "New name",
                            null);
        }
        trackName.style.cursor = "pointer";

        const artistName = getTableDataWithText(entry.track_metadata.artist_name);
        artistName.onclick = () => {
            showInputDialog("Change artist name?",
                            entry.track_metadata.artist_name,
                            (newName) => {
                                entry.track_metadata.artist_name = newName;
                                loadTable();
                            },
                            null,
                            'text',
                            "New name",
                            null);}
        artistName.style.cursor = "pointer";

        const duration = getTableDataWithText(msToTime(entry.track_metadata.duration_ms));
        duration.style.textAlign = "center";

        const totalPlayTime = getTableDataWithText(msToTime(entry.total_time_played_ms));
        totalPlayTime.style.textAlign = "center";

        const deleteTD = getTableDataWithDeleteButton(
            async () => {
                showYesNoDialog(`Delete ${entry.track_metadata.track_name}?`,
                                () => {
                                    history.splice(index, 1);
                                    loadTable();
                                },
                                null);
            }
        );

        row.append(trackName, artistName, duration, totalPlayTime, deleteTD);
        dataTable.appendChild(row);
    });
}

function msToTime(s) {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    secs = (secs <= 9) ? `0${secs}` : secs;
    s = (s - secs) / 60;
    let mins = s % 60;
    mins = (mins <= 9) ? `0${mins}` : mins;
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