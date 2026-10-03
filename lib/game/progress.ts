'use client';
import {useState,useEffect,useRef} from 'react';
import {initial,migrate,applyRun,createRun,type ProgressData,type Mode} from './state';
import type {AnswerRecord} from './evaluation';
export type {ProgressData,Run,Mode} from './state';
const KEY='fronteiras-calculo-v1';
export const progressRepository={load():ProgressData{const raw=localStorage.getItem(KEY);return raw?migrate(JSON.parse(raw)):initial},save(data:ProgressData){localStorage.setItem(KEY,JSON.stringify(data))}};
export function useProgress(){const [data,setData]=useState<ProgressData>(initial);const [ready,setReady]=useState(false);const [error,setError]=useState('');const current=useRef(data);current.current=data;const writable=useRef(true);useEffect(()=>{try{setData(progressRepository.load())}catch{writable.current=false;setError('Não foi possível recuperar o progresso. Os dados anteriores foram preservados; esta sessão não será salva.')}setReady(true)},[]);useEffect(()=>{if(ready&&writable.current)try{progressRepository.save(data)}catch{setError('O navegador não permitiu salvar. O progresso permanece nesta sessão.')}},[data,ready]);function finish(records:AnswerRecord[],mode:Mode,stopId:string|null){const run=createRun(records,mode,stopId);if(mode!=='preview'){const next=applyRun(current.current,run);current.current=next;setData(next)}return run}function setLessonStep(id:string,step:number){setData(d=>({...d,lessonSteps:{...d.lessonSteps,[id]:step}}))}return {data,ready,error,finish,setLessonStep}}
