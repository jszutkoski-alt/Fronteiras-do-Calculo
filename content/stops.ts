export const skills = ['Funções','Limites','Continuidade','Derivadas','Aplicações de derivadas','Integrais'] as const;
export type Skill = typeof skills[number];
export type Stop = {id:string;name:string;concept:string;region:number;x:number;y:number;prerequisites:string[];ready:boolean;character?:string};
const entries:[string,string,number,number,number][] = [
['Cidade das Funções','Conceito de função, domínio e imagem',0,10,32],
['Rancho das Transformações','Translações, reflexões e escala',0,8.8,41.5],
['Ponte dos Limites','Limites e limites laterais',0,12,70],
['Cânion dos Limites','Propriedades e indeterminações',0,22,61.5],
['Rio da Continuidade','Continuidade e descontinuidades',0,24,41.4],
['Posto da Continuidade','Teorema do valor intermediário',0,26.5,20.5],
['Mirante da Taxa de Variação','Da reta secante à reta tangente',1,59.5,18.4],
['Mina da Derivada','Definição e interpretação geométrica',1,41.8,25.2],
['Saloon das Regras','Potências e funções básicas',1,33,39.5],
['Estação do Produto','Regra do produto',1,55.1,39.9],
['Passagem do Quociente','Regra do quociente',1,64,46.2],
['Desfiladeiro da Cadeia','Regra da cadeia',1,60,49.5],
['Cidade das Derivadas','Trigonométricas, exponenciais e logaritmos',1,43.5,52.2],
['Vale das Aplicações','Crescimento, extremos e otimização',1,55,65],
['Forte da Análise de Gráficos','Pontos críticos, concavidade e gráficos',1,66.5,57],
['Acampamento das Somas','Áreas e somas de Riemann',2,72.3,79.8],
['Rio das Integrais','Integral definida e área líquida',2,85,65.1],
['Forte Fundamental','Teorema Fundamental do Cálculo',2,80.8,52],
['Vila das Primitivas','Antiderivadas e integrais indefinidas',2,87.5,40.4],
['Floresta da Substituição','Substituição simples',2,81,28.5],
['Cânion das Áreas','Áreas entre curvas',2,87.2,21.6],
['Estação Final','Funções, derivadas e integrais',2,83.4,12.1]
];
export const stops:Stop[]=entries.map(([name,concept,region,x,y],i)=>({id:i===6?'mirante':`stop-${i}`,name,concept,region,x,y,prerequisites:i===0?[]:[i===7?'mirante':`stop-${i-1}`],ready:true,character:i===6?'Elena, engenheira da ferrovia':undefined}));
export const regions=[{name:'Vale das Funções',subtitle:'Funções e continuidade',short:'O vale',goal:'Encontre o caminho e atravesse o rio.',count:6},{name:'Território das Derivadas',subtitle:'Derivadas e suas aplicações',short:'As montanhas',goal:'Leia o relevo e alcance a ferrovia.',count:9},{name:'Fronteira das Integrais',subtitle:'Integrais e acumulação',short:'A fronteira',goal:'Siga o grande rio até a fronteira final.',count:7}];
export function stopStatus(stop:Stop,completed:string[]){if(completed.includes(stop.id))return 'completed';if(stop.prerequisites.every(p=>completed.includes(p)))return 'available';return 'locked'}
