import {
    showCalendarPreviewDialog,
} from './dialogs.js';

import {
    formatDateToCA,
} from './date-utilities.js';

let history = [];

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

        for (const property of jsonFileDate) {
            const date = formatDateToCA(property.listened_at);
            const time = (new Date(1291495980)).toLocaleTimeString('us-en', {hour12: true});

            const trackName = property.track_metadata.track_name || "Unknown";
            const releaseName = property.track_metadata.release_name || "Unknown";
            const artistName = property.track_metadata.artist_name || "Unknown";
            const duration = msToTime(property.track_metadata.duration_ms || 0);

            const player = property.track_metadata.additional_info.media_player || "Unknown";
            const playerVersion = property.track_metadata.additional_info.media_player_version || "Unknown";
            const tooltip = `Artist: ${artistName}\nDate: ${date}\nTime: ${time}\nDuration: ${duration}\nPlayer: ${player}\nPlayer version: ${playerVersion}`;
            history.push({name: trackName, tooltip, date, time, player, playerVersion, trackName, releaseName, artistName, duration})
        }

        showCalendarPreviewDialog("Calendar", history, false, true);
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

// console.log((new Date()).getTime());
// console.log((new Date(1291495980)).toLocaleDateString('CA-EN'));
// console.log(formatDateToCA(1291842056));
// 1680100270
// 1680097553322