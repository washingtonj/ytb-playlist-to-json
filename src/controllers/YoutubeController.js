import { getPlaylistInfo } from '../models/YoutubeModel.js'

export async function playlist(req, res) {
    const playlistID = req.params.id
    res.json(await getPlaylistInfo(playlistID)) 
}
