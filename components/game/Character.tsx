import type {LessonData} from '@/content/catalog';
import {characterPortraits} from '@/content/characters';
export default function Character({lesson,compact=false}:{lesson:LessonData;compact?:boolean}){
 return <div className={compact?'guide-mini':'character'}><img src={characterPortraits[lesson.character]} alt={`${lesson.character}, ${lesson.role.toLocaleLowerCase('pt-BR')}`} width={compact?52:112} height={compact?52:128}/><div>{!compact&&<p className="eyebrow">QUEM VOCÊ ENCONTRA</p>}{compact?<strong>Encontre {lesson.character}</strong>:<h3>{lesson.character}</h3>}{compact?<span>{lesson.role}</span>:<p>{lesson.role}</p>}</div></div>;
}
