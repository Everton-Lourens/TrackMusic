const mp3 = [{ id: 'a', name: 'a' }, { id: 'b', name: 'b' }, { id: 'c', name: 'c' }];
const newList = [{ id: 'a', name: 'a' }, { id: 'b', name: 'b' }, { id: 'c', name: 'c' }, { id: 'd', name: 'd' }];

const recentlyAddedSongs = newList.filter(music =>
    !mp3.some(m => m.id === music.id)
);

console.log(...mp3, ...recentlyAddedSongs);
