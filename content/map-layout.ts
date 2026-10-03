import {stops} from './stops';

const basePath=process.env.NEXT_PUBLIC_BASE_PATH??'';

/** Percent coordinates share one 3:2 image coordinate system with the markers. */
export const mapArtwork=`${basePath}/frontier-map-aligned.webp`;
export const mapViewBox='0 0 1536 1024';
type Point=readonly [number,number];
// Waypoints follow valley floors, bridge approaches and the riverside, not straight chords.
const via:Point[][]=[
 [[5,34],[4,37],[6,40]],
 [[13,47],[13,51],[21,55],[24,59],[24,64],[20,67]],
 [[19,67],[23,62]],
 [[25,57],[27,51],[28,47]],
 [[29,38],[25,34],[26,28],[34,23],[32,21]],
 [[33,22],[37,20],[39,21],[45,22],[50,23],[55,23],[57,21]],
 [[54,23],[49,25],[45,27]],
 [[39,28],[36,31]],
 [[34,42],[38,44],[42,45],[48,44],[51,42]],
 [[59,42],[63,45]],
 [[65,48],[63,49]],
 [[56,51],[52,54],[48,55]],
 [[39,57],[42,61],[47,60],[47,62],[50,64]],
 [[62,68],[69,63],[73,61],[69,59]],
 [[72,61],[72,64],[65,68],[58,71],[53,75],[61,78],[68,80]],
 [[77,79],[79,74],[82,72],[84,68]],
 [[83,62],[79,61],[77,58],[79,54]],
 [[77,49],[79,45],[83,43],[86,43]],
 [[89,36],[88,33],[84,32],[81,31]],
 [[79,25],[82,23],[85,23]],
 [[86,18],[85,15]]
];
function xy([x,y]:Point){return `${(x*15.36).toFixed(2)} ${(y*10.24).toFixed(2)}`}
function smooth(points:Point[]){
  let d=`M ${xy(points[0])}`;
  for(let i=1;i<points.length-1;i++){
    const p=points[i],n=points[i+1];
    d+=` Q ${xy(p)} ${xy([(p[0]+n[0])/2,(p[1]+n[1])/2])}`;
  }
  return d+` L ${xy(points.at(-1)!)}`;
}
export const mapTrails=stops.slice(1).map((to,i)=>({from:stops[i].id,to:to.id,d:smooth([[stops[i].x,stops[i].y],...via[i],[to.x,to.y]])}));
export const landmarkDescriptions=[
 'A rua principal do povoado, junto às fachadas de madeira.',
 'A casa do rancho, dentro do cercado dos cavalos.',
 'A ponte de madeira que cruza o cânion do vale.',
 'A borda leste do cânion, acima do rio estreito.',
 'O pequeno curso de água que passa ao lado do rancho.',
 'O posto de suprimentos no caminho das montanhas.',
 'A torre de observação no alto da montanha.',
 'A estrutura de extração e a entrada da mina.',
 'O saloon isolado ao pé das montanhas.',
 'A estação junto à caixa-d’água e à ferrovia.',
 'A curva da ferrovia na passagem entre as encostas.',
 'O corredor de terreno baixo entre as formações rochosas.',
 'O povoado no vale central, ao sul das minas.',
 'Os campos e cercados do vale agrícola.',
 'O forte de paliçada na saída do vale.',
 'As barracas na clareira junto à floresta.',
 'A margem do grande rio, antes da curva para o sul.',
 'O forte de pedra na margem ocidental do rio.',
 'As casas da vila ribeirinha.',
 'A trilha por dentro do bosque de coníferas.',
 'O desfiladeiro acima das grandes quedas-d’água.',
 'O terminal ferroviário sob as montanhas nevadas.'
];
