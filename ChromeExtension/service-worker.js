const CLIENT_ID = "af78655285d7400d8349580c2c70c292";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "OCR_IMAGE") {
        handleOCR(msg.dataUrl).then(sendResponse);
        return true;
    }
    if (msg.type === "SPOTIFY_LOGIN") {
        const redirect = chrome.identity.getRedirectURL();
        // FIXED: Added '$' before brackets and fixed the URL to the official Spotify Accounts service
        const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(redirect)}&scope=playlist-modify-public%20playlist-modify-private%20user-read-private`;
        
        chrome.identity.launchWebAuthFlow({ url, interactive: true }, (responseUrl) => {
            if (chrome.runtime.lastError || !responseUrl) {
                console.error("Auth Error:", chrome.runtime.lastError);
                return sendResponse({ ok: false });
            }
            const token = new URLSearchParams(new URL(responseUrl).hash.substring(1)).get("access_token");
            chrome.storage.local.set({ spotifyToken: token }, () => sendResponse({ ok: !!token }));
        });
        return true;
    }
    if (msg.type === "SYNC_TO_SPOTIFY") {
        syncTracks(msg.tracks).then(sendResponse);
        return true;
    }
});

async function handleOCR(dataUrl) {
    const existing = await chrome.offscreen.hasDocument();
    if (!existing) await chrome.offscreen.createDocument({ url: "offscreen.html", reasons: ["DOM_SCRAPING"], justification: "OCR" });
    return chrome.runtime.sendMessage({ target: "offscreen", type: "process-ocr", data: dataUrl });
}

async function syncTracks(tracks) {
    const { spotifyToken: token } = await chrome.storage.local.get("spotifyToken");
    if (!token) return { ok: false, error: "No Token" };

    try {
        const user = await fetch("https://api.spotify.com/v1/me", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
        
        const uris = [];
        for (const t of tracks) {
            const q = encodeURIComponent(`track:${t.title} artist:${t.artist}`);
            const s = await fetch(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=1`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
            if (s.tracks?.items?.[0]) uris.push(s.tracks.items[0].uri);
        }

        if (uris.length > 0) {
            const pl = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
                method: "POST", 
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ name: "Audiolens Import" })
            }).then(r => r.json());
            
            await fetch(`https://api.spotify.com/v1/playlists/${pl.id}/tracks`, {
                method: "POST", 
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ uris })
            });
            return { ok: true, count: uris.length };
        }
        return { ok: false, error: "Zero tracks matched." };
    } catch (e) {
        return { ok: false, error: e.message };
    }
}