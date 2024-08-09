function getSongs() {
	return [
		{
			id: 1,
			title: 'Dance Monkey',
			artist: 'Tones and I',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/dance-monkey_dht1uv.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986803/GitHub/Projects/Musicont/mock/audios/dance-monkey_disxa8.mp3',
		},
	];

	return [
		{
			id: 1,
			title: 'Heartless',
			artist: 'The Weeknd',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/heartless_du9yxe.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623987046/GitHub/Projects/Musicont/mock/audios/heartless_u7exot.mp3',
		},
		{
			id: 2,
			title: 'Peaches',
			artist: 'Justin Bieber',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623987767/GitHub/Projects/Musicont/mock/images/peaches_sm4qvm.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986838/GitHub/Projects/Musicont/mock/audios/peaches_dzluia.mp3',
		},
		{
			id: 3,
			title: 'Therefore I Am',
			artist: 'Billie Eilish',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623987985/GitHub/Projects/Musicont/mock/images/therefore-i-am_t9xxfs.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623988277/GitHub/Projects/Musicont/mock/audios/therefore-i-am_sea49g.mp3',
		},
		{
			id: 4,
			title: 'This Girl',
			artist: "Kungs vs Cookin' on 3 Burners",
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/kungs-vs-cookin_yhuqv3.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986820/GitHub/Projects/Musicont/mock/audios/kungs-vs-cookin_gbvmhs.mp3',
		},
		{
			id: 5,
			title: 'Dance Monkey',
			artist: 'Tones and I',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/dance-monkey_dht1uv.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986803/GitHub/Projects/Musicont/mock/audios/dance-monkey_disxa8.mp3',
		},
		{
			id: 6,
			title: 'HOLIDAY',
			artist: 'Lil Nas X',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/holiday_vzyzke.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986852/GitHub/Projects/Musicont/mock/audios/holiday_tbcj06.mp3',
		},
		{
			id: 7,
			title: 'Cogulândia',
			artist: 'Matuê',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895066/GitHub/Projects/Musicont/mock/images/cogulandia_h09ike.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895062/GitHub/Projects/Musicont/mock/audios/cogulandia_kyq4tb.mp3',
		},
		{
			id: 8,
			title: 'Bank Account',
			artist: '21 Savage',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895067/GitHub/Projects/Musicont/mock/images/bank_account_s7vfq5.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895057/GitHub/Projects/Musicont/mock/audios/bank_account_ivbmrg.mp3',
		},
		{
			id: 9,
			title: 'Butterfly Effect',
			artist: 'Travis Scott',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895065/GitHub/Projects/Musicont/mock/images/butterfly_effect_oimlry.png',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895068/GitHub/Projects/Musicont/mock/audios/butterfly_effect_yti55d.mp3',
		},
		{
			id: 10,
			title: 'Check',
			artist: 'Young Thug',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895063/GitHub/Projects/Musicont/mock/images/check_vwxgvl.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895098/GitHub/Projects/Musicont/mock/audios/check_mmwzqi.mp3',
		},
		{
			id: 11,
			title: 'Máquina do Tempo',
			artist: 'Matuê',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895066/GitHub/Projects/Musicont/mock/images/maquina_do_tempo_gc3j68.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895071/GitHub/Projects/Musicont/mock/audios/maquina_do_tempo_k2bqrz.mp3',
		},
		{
			id: 12,
			title: 'Pecado Capital',
			artist: 'Xamã',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895064/GitHub/Projects/Musicont/mock/images/luxurla_kr7c1r.png',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895070/GitHub/Projects/Musicont/mock/audios/luxurla_nnp3ou.mp3',
		},
	]
}
//const musicData = async () => {
const musicData = {
	currentSong: {
		playback: {},
		soundObj: {},
		detail: {
			id: 1,
			title: 'Dance Monkey',
			artist: 'Tones and I',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/dance-monkey_dht1uv.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986803/GitHub/Projects/Musicont/mock/audios/dance-monkey_disxa8.mp3',
		},
		playbackStatus: {},
	},
	songs: getSongs()
};

export default musicData;

/////////////////////////////////////////////////
/*
async function getSongs() {
	return [
		{
			id: 1,
			title: 'Heartless',
			artist: 'The Weeknd',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/heartless_du9yxe.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623987046/GitHub/Projects/Musicont/mock/audios/heartless_u7exot.mp3',
		},
		{
			id: 2,
			title: 'Peaches',
			artist: 'Justin Bieber',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623987767/GitHub/Projects/Musicont/mock/images/peaches_sm4qvm.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986838/GitHub/Projects/Musicont/mock/audios/peaches_dzluia.mp3',
		},
		{
			id: 3,
			title: 'Therefore I Am',
			artist: 'Billie Eilish',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623987985/GitHub/Projects/Musicont/mock/images/therefore-i-am_t9xxfs.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623988277/GitHub/Projects/Musicont/mock/audios/therefore-i-am_sea49g.mp3',
		},
		{
			id: 4,
			title: 'This Girl',
			artist: "Kungs vs Cookin' on 3 Burners",
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/kungs-vs-cookin_yhuqv3.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986820/GitHub/Projects/Musicont/mock/audios/kungs-vs-cookin_gbvmhs.mp3',
		},
		{
			id: 5,
			title: 'Dance Monkey',
			artist: 'Tones and I',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/dance-monkey_dht1uv.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986803/GitHub/Projects/Musicont/mock/audios/dance-monkey_disxa8.mp3',
		},
		{
			id: 6,
			title: 'HOLIDAY',
			artist: 'Lil Nas X',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/holiday_vzyzke.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986852/GitHub/Projects/Musicont/mock/audios/holiday_tbcj06.mp3',
		},
		{
			id: 7,
			title: 'Cogulândia',
			artist: 'Matuê',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895066/GitHub/Projects/Musicont/mock/images/cogulandia_h09ike.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895062/GitHub/Projects/Musicont/mock/audios/cogulandia_kyq4tb.mp3',
		},
		{
			id: 8,
			title: 'Bank Account',
			artist: '21 Savage',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895067/GitHub/Projects/Musicont/mock/images/bank_account_s7vfq5.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895057/GitHub/Projects/Musicont/mock/audios/bank_account_ivbmrg.mp3',
		},
		{
			id: 9,
			title: 'Butterfly Effect',
			artist: 'Travis Scott',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895065/GitHub/Projects/Musicont/mock/images/butterfly_effect_oimlry.png',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895068/GitHub/Projects/Musicont/mock/audios/butterfly_effect_yti55d.mp3',
		},
		{
			id: 10,
			title: 'Check',
			artist: 'Young Thug',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895063/GitHub/Projects/Musicont/mock/images/check_vwxgvl.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895098/GitHub/Projects/Musicont/mock/audios/check_mmwzqi.mp3',
		},
		{
			id: 11,
			title: 'Máquina do Tempo',
			artist: 'Matuê',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895066/GitHub/Projects/Musicont/mock/images/maquina_do_tempo_gc3j68.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895071/GitHub/Projects/Musicont/mock/audios/maquina_do_tempo_k2bqrz.mp3',
		},
		{
			id: 12,
			title: 'Pecado Capital',
			artist: 'Xamã',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895064/GitHub/Projects/Musicont/mock/images/luxurla_kr7c1r.png',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895070/GitHub/Projects/Musicont/mock/audios/luxurla_nnp3ou.mp3',
		},
	]
}
//const musicData = async () => {
const musicData = {
	currentSong: {
		playback: {},
		soundObj: {},
		detail: {
			id: 1,
			title: 'Heartless',
			artist: 'The Weeknd',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/heartless_du9yxe.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623987046/GitHub/Projects/Musicont/mock/audios/heartless_u7exot.mp3',
		},
		playbackStatus: {},
	},
	songs: async () => await getSongs()
};

export default musicData;
*/
/////////////////////////////////////////////////
/*
export default {
	currentSong: {
		playback: {},
		soundObj: {},
		detail: {
			id: 1,
			title: 'Heartless',
			artist: 'The Weeknd',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/heartless_du9yxe.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623987046/GitHub/Projects/Musicont/mock/audios/heartless_u7exot.mp3',
		},
		playbackStatus: {},
	},
	songs: [
		{
			id: 1,
			title: 'Heartless',
			artist: 'The Weeknd',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/heartless_du9yxe.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623987046/GitHub/Projects/Musicont/mock/audios/heartless_u7exot.mp3',
		},
		{
			id: 2,
			title: 'Peaches',
			artist: 'Justin Bieber',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623987767/GitHub/Projects/Musicont/mock/images/peaches_sm4qvm.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986838/GitHub/Projects/Musicont/mock/audios/peaches_dzluia.mp3',
		},
		{
			id: 3,
			title: 'Therefore I Am',
			artist: 'Billie Eilish',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623987985/GitHub/Projects/Musicont/mock/images/therefore-i-am_t9xxfs.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623988277/GitHub/Projects/Musicont/mock/audios/therefore-i-am_sea49g.mp3',
		},
		{
			id: 4,
			title: 'This Girl',
			artist: "Kungs vs Cookin' on 3 Burners",
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/kungs-vs-cookin_yhuqv3.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986820/GitHub/Projects/Musicont/mock/audios/kungs-vs-cookin_gbvmhs.mp3',
		},
		{
			id: 5,
			title: 'Dance Monkey',
			artist: 'Tones and I',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/dance-monkey_dht1uv.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986803/GitHub/Projects/Musicont/mock/audios/dance-monkey_disxa8.mp3',
		},
		{
			id: 6,
			title: 'HOLIDAY',
			artist: 'Lil Nas X',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/holiday_vzyzke.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986852/GitHub/Projects/Musicont/mock/audios/holiday_tbcj06.mp3',
		},
		{
			id: 7,
			title: 'Cogulândia',
			artist: 'Matuê',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895066/GitHub/Projects/Musicont/mock/images/cogulandia_h09ike.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895062/GitHub/Projects/Musicont/mock/audios/cogulandia_kyq4tb.mp3',
		},
		{
			id: 8,
			title: 'Bank Account',
			artist: '21 Savage',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895067/GitHub/Projects/Musicont/mock/images/bank_account_s7vfq5.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895057/GitHub/Projects/Musicont/mock/audios/bank_account_ivbmrg.mp3',
		},
		{
			id: 9,
			title: 'Butterfly Effect',
			artist: 'Travis Scott',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895065/GitHub/Projects/Musicont/mock/images/butterfly_effect_oimlry.png',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895068/GitHub/Projects/Musicont/mock/audios/butterfly_effect_yti55d.mp3',
		},
		{
			id: 10,
			title: 'Check',
			artist: 'Young Thug',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895063/GitHub/Projects/Musicont/mock/images/check_vwxgvl.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895098/GitHub/Projects/Musicont/mock/audios/check_mmwzqi.mp3',
		},
		{
			id: 11,
			title: 'Máquina do Tempo',
			artist: 'Matuê',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895066/GitHub/Projects/Musicont/mock/images/maquina_do_tempo_gc3j68.jpg',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895071/GitHub/Projects/Musicont/mock/audios/maquina_do_tempo_k2bqrz.mp3',
		},
		{
			id: 12,
			title: 'Pecado Capital',
			artist: 'Xamã',
			artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895064/GitHub/Projects/Musicont/mock/images/luxurla_kr7c1r.png',
			url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623895070/GitHub/Projects/Musicont/mock/audios/luxurla_nnp3ou.mp3',
		},
	]
};
*/