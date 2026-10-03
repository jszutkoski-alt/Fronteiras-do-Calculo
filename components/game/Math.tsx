import katex from 'katex';
import 'katex/dist/katex.min.css';
export default function MathText({tex,block=false}:{tex:string;block?:boolean}){return <span className={block?'math-block':'math-inline'} dangerouslySetInnerHTML={{__html:katex.renderToString(tex,{throwOnError:false,displayMode:block,output:'htmlAndMathml'})}}/>}
