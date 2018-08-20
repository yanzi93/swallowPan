export default (state={},action) => {
	switch(action.type) {
		case 'updateHash':
			return {
				...state,
				hash: action.hash
			}
		case 'updateSongList': 
			return {
				...state,
				songList: action.songList
			}
		case 'updateHeaderTitle':
			return {
				...state,
				headerTitle: action.headerTitle
			}
		default:
			return state;
	}
}