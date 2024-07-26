import { allSongs } from './storage';
import RNFS from 'react-native-fs';
import { get, store, clear } from '@/src/helpers/storage';
var uriImgValue: string = '';

export async function getAllSongs() {
  const mp3Files: Array<any> = [];
  try {
    const mp3IsStorage: Array<any> = await get('mp3FilesCXX', true);

    if (mp3IsStorage !== null) {
      console.log('mp3IsStorage !== null');
      return mp3IsStorage;
    } else {
      console.log('await store(mp3Files, mp3Files, true);');
      await getAllFiles();
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAA');
      await store('mp3FilesCXX', mp3Files, true);
      return mp3Files || [];
    }
  } catch (error) {
    console.error(error)
  }
  async function getAllFiles() {
    const files: Array<any> = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath);

    if (!files || !files?.length) return [];

    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.mp3')) {
        const isObjectInArray = mp3Files.some(obj =>
          obj.path === file.path
        );
        if (isObjectInArray) return;
        else mp3Files.push(file);
      }
      else if (file.isDirectory()) {
        // Recurre em diretórios
        await getMp3Files(file?.path);
      }
    }
  }

  async function getMp3Files(directoryPath: any) {
    const files: Array<any> = await RNFS.readDir(directoryPath);

    if (!files || !files?.length) return [];

    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.mp3')) {
        const isObjectInArray = mp3Files.some(obj =>
          obj.path === file.path
        );
        if (isObjectInArray) return;
        else mp3Files.push(file);
      } else if (file.isDirectory()) {
        //console.log(JSON.stringify(file, null, 2));
        await getMp3Files(file.path);
      }
    }
  }

}

export function getRandomImg() {
  return [
    'https://media.istockphoto.com/id/488580912/photo/cello-silhouette.jpg?s=612x612&w=0&k=20&c=xmmVc-mF_IROL5HlaIKxxV2-qZCWukC3liTa3jUd7v8=',
    'https://st3.depositphotos.com/29384342/34063/i/450/depositphotos_340632074-stock-photo-abstract-arrangement-violin-graphic-musical.jpg',
    'https://img.freepik.com/fotos-gratis/fundo-musical-volumetrico-com-uma-clave-de-sol-e-ia-geradora-de-notas_169016-29576.jpg',
    'https://static.vecteezy.com/system/resources/previews/029/573/477/non_2x/headphones-for-listening-to-music-and-enjoying-the-bass-and-beats-bright-arc-headphones-free-photo.jpg',
    'https://i.pinimg.com/736x/6c/02/ef/6c02efaed4ac7071868600b778ac4157.jpg',
    'https://img.freepik.com/premium-photo/headphones-music-background-generative-ai_1160-3253.jpg',
    'https://static.vecteezy.com/ti/fotos-gratis/p1/27446957-melodia-silhueta-conceito-gratis-foto.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Mpijl1GjibriNkXjUd95Fyr9icED3XjwGywJJVw0zeHum_4b3qyY3EqU8NzufL1NSXQ',
    'https://avatarfiles.alphacoders.com/645/thumb-1920-64575.jpg',
    'https://img.freepik.com/fotos-premium/abstrato-colorido-sobre-notas-musicais-e-temas-musicais_608068-24348.jpg',
    'https://img.freepik.com/fotos-premium/papel-de-parede-vibrante-abstrato-do-fundo-das-notas-musicais_800563-1829.jpg',
    'https://png.pngtree.com/thumb_back/fw800/background/20240302/pngtree-colorful-music-notes-background-abstract-image_15634799.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376244.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376245.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376246.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376247.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376248.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376249.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376250.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376251.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376252.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376253.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376254.jpg',
    'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376255.jpg',
    'https://img.freepik.com/fotos-gratis/guitarra-eletrica-com-luz-de-neon-natureza-morta_23-2151376202.jpg?t=st=1721447295~exp=1721447895~hmac=ec8fd57dc6442e1cf09347b9ec0cf0f0294ab126fac0f08ed9e7fc30a23ae7fe',
    'https://img.freepik.com/fotos-premium/uma-arte-digital-de-um-reprodutor-de-musica-com-notas-coloridas-e-um-fundo-preto_900370-14342.jpg'
  ][Math.floor(Math.random() * 23)]
}


export function setUriPicture(uri: string) {
  uriImgValue = uri;
}
export function getUriPicture() {
  return uriImgValue || '';
}

