[
  {
    "url": "https://audio.jukehost.co.uk/vTRYaTEbpaYRCxiWGgL2S91mnOuMKfLw",
    "title": "Guess I'll Never Know",
    "artist": "TrackTribe",
    "artwork": "https://f4.bcbits.com/img/a3736661212_65",
    "rating": 1,
    "playlist": ["Chill 🌱"]
  },
  {
    "url": "https://audio.jukehost.co.uk/priWy2vYsWODmQiM6KevNYVLpPJGPZGd",
    "title": "Memories",
    "playlist": ["Instrumental 🎵"]
  },
  {
    "url": "https://audio.jukehost.co.uk/rSmGXxf0OJLipPwFRyvoFKodDOj5VuWf",
    "title": "Anxiety",
    "artist": "NEFFEX",
    "artwork": "https://i1.sndcdn.com/artworks-iCqupgQNLXSjKspS-0CGreg-t500x500.jpg",
    "playlist": ["Chill 🌱", "Instrumental 🎵", "Rap 🎤"]
  },
  {
    "url": "https://audio.jukehost.co.uk/ZLdoXNocDAcsgeq6QKtPRHyvlqslNbke",
    "title": "As You Fade Away",
    "artist": "NEFFEX",
    "artwork": "https://i.ytimg.com/vi/JhUFfaArYk8/maxresdefault.jpg",
    "rating": 1,
    "playlist": ["Rap 🎤"]
  },
  {
    "url": "https://audio.jukehost.co.uk/rZ9sshicVlki8Dnm95ps1eWhK95dYgKF",
    "title": "Cattle",
    "artist": "Telecasted",
    "artwork": "https://i.ytimg.com/vi/rxmWdkluHJ0/maxresdefault.jpg",
    "playlist": ["Chill 🌱"]
  },
  {
    "url": "https://audio.jukehost.co.uk/ZufGK11EtwQWXge8xYo5EQ02RuJqtr4s",
    "title": "Desert Brawl",
    "artist": "Vans in Japan",
    "artwork": "https://i.ytimg.com/vi/Kk0xLSNMPeQ/maxresdefault.jpg"
  },
  {
    "url": "https://audio.jukehost.co.uk/Tn0JjUOFnQXt94p3CQCA4AkB3weF51Yf",
    "title": "Changing",
    "artist": "NEFFEX",
    "artwork": "https://i1.sndcdn.com/artworks-ZaFhh1AQdO4hqdYb-ssYmcA-t500x500.jpg",
    "rating": 1,
    "playlist": ["Rap 🎤"]
  },
  {
    "url": "https://audio.jukehost.co.uk/yA5v0HqEX7pRLKDkjp3XeFDcksZVv7lr",
    "title": "El Secreto",
    "artist": "Yung Logos",
    "artwork": "https://i.ytimg.com/vi/VMfrx6lbsEQ/maxresdefault.jpg"
  },
  {
    "url": "https://audio.jukehost.co.uk/BTIDaoKPirPWaPpHl8SOsIU8Ge9Zx9Mb",
    "title": "Go Down Swinging (Instrumental)",
    "artist": "NEFFEX",
    "playlist": ["Instrumental 🎵", "Rap 🎤"]
  },
  {
    "url": "https://audio.jukehost.co.uk/nXa6f08Ojlz1V2SYJ3axYmSa7ot0hblZ",
    "title": "Hotlanta",
    "artist": "TrackTribe",
    "artwork": "https://i.ytimg.com/vi/fwuW0HpXA30/maxresdefault.jpg",
    "rating": 1
  },
  {
    "url": "https://audio.jukehost.co.uk/cbMVQp4JGHhSNEeCqRjvieiigYpUaE0s",
    "title": "Take Me Back",
    "artist": "NEFFEX",
    "artwork": "https://i1.sndcdn.com/artworks-yaXBlJOtjWvRcNnA-W6spcw-t500x500.jpg",
    "playlist": ["Rap 🎤"]
  },
  {
    "url": "https://audio.jukehost.co.uk/Ge9fdTsk6Y9SWoOnC7QJH0n8pprU7rev",
    "title": "mellow-future-bass-bounce-on-it",
    "playlist": ["Chill 🌱", "Instrumental 🎵"]
  },
  {
    "url": "https://audio.jukehost.co.uk/KDOr4agGwHHvikLtk9zukiiDpYNzIp8w",
    "title": "Outside the Box",
    "artist": "Patrick Patrikios",
    "artwork": "https://i.ytimg.com/vi/nAXO_-eGmGY/maxresdefault.jpg",
    "rating": 1
  },
  {
    "url": "https://audio.jukehost.co.uk/K4PdyskIIfRrRotZtwF0EfHkJGjTs9Dy",
    "title": "Smokey's Lounge",
    "artist": "TrackTribe",
    "artwork": "https://i.scdn.co/image/ab67616d0000b2730efb49aab6109fe4c74d6b04"
  },
  {
    "url": "https://audio.jukehost.co.uk/5MLu9yZCOGOCpf9yhdK4uitEv2CZ9fwx",
    "title": "Sunny Days",
    "artist": "Anno Domini Beats",
    "artwork": "https://i1.sndcdn.com/artworks-fJ47RvWYE7weOhay-V5Qjyw-t500x500.jpg",
    "playlist": ["Chill 🌱"]
  },
  {
    "url": "https://audio.jukehost.co.uk/bnvYr6BoqfoZjrx72rvq3hGXyE6b7Qyz",
    "title": "Hidden Frozen Lake - Go By Ocean",
    "artist": "Ryan McCaffrey",
    "playlist": ["Chill 🌱"]
  }
]

import { Storage } from "@/src/helpers"


export async function getLibrary() {
  const mp3Music: any = await Storage.get('mp3Files', true);
  if (mp3Music != null) {
    console.log('mp3Music != null')
    const newMp3Music: any = mp3Music.map((item: any) => {
      return {
        url: item.uri,
        title: item.title,
        artist: '',
        artwork: item.img,
        rating: 1,
        playlist: ['Chill 🌱'],
      }
    })
    return newMp3Music;
  } else {
    console.log('return null;')
    return null;
  }
}