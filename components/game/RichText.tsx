import {Fragment} from 'react';
import MathText from './Math';
/** Explicit $...$ and \\(...\\) inline TeX. Prose remains ordinary accessible text. */
export default function RichText({children}:{children:string}){
 const parts=children.split(/(\$[^$]+\$|\\\([\s\S]*?\\\))/g);
 return <>{parts.map((part,i)=>part.startsWith('$')&&part.endsWith('$')?<MathText key={i} tex={part.slice(1,-1)}/>:part.startsWith('\\(')&&part.endsWith('\\)')?<MathText key={i} tex={part.slice(2,-2)}/>:<Fragment key={i}>{part}</Fragment>)}</>;
}
