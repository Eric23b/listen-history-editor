const mainContainer = document.querySelector('.main');


const loadBtn = document.
                querySelector('#load-button').
                addEventListener('change', loadHistoryJSON);

function loadHistoryJSON(event) {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);

    async function onReaderLoad(event){
        const jsonFileDate = JSON.parse(event.target.result);

        for (const property of jsonFileDate) {
            const trackName = property.track_metadata.track_name || "NO TRACK NAME";
            const releaseName = property.track_metadata.release_name || "NO RELEASE NAME";
            const artistName = property.track_metadata.artist_name || "NO ARTIST NAME";
            const duration = property.track_metadata.duration_ms || 0;
            console.log(trackName, releaseName, artistName, duration);
        }
    }
}