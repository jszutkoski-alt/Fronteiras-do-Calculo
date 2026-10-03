export const lesson={
 id:'mirante', character:'Elena', role:'Engenheira da ferrovia',
 intro:"Antes de levar a ferrovia pelas montanhas, precisamos entender a inclinação do terreno. Venha: deste mirante, a matemática fica à vista.",
 steps:[
 {title:'Quanto o terreno sobe?',text:"Imagine que o relevo segue $f(x) = x^{2}$. De $A$ até $B$, comparamos a mudança de altura com a distância horizontal. Essa razão é a taxa média de variação.",formula:'m_{AB}=\\frac{f(b)-f(a)}{b-a}'},
 {title:'Uma reta entre dois pontos',text:"A reta que passa por $A$ e $B$ é uma secante. Mova $B$ e observe: cada intervalo conta uma história diferente sobre a inclinação média.",formula:'a=1,\\quad b=1+h,\\quad m_{AB}=2+h'},
 {title:'Chegue cada vez mais perto',text:"Aproxime $B$ de $A$ pelos dois lados. Quanto menor a distância, melhor a secante descreve a inclinação perto de $A$. Em $h = 0$, exibimos a tangente, definida pelo limite.",formula:'\\lim_{h\\to0} (2+h)=2'},
 {title:'A inclinação naquele instante',text:"O limite das inclinações das secantes é a derivada, quando esse limite existe. Aqui, $f'(1) = 2$: perto de $x = 1$, cada pequena variação horizontal produz aproximadamente o dobro de variação vertical.",formula:"f'(1)=\\lim_{h\\to0}\\frac{(1+h)^2-1}{h}=2"}
 ],
 example:[
 {title:'Escolha os dois pontos',text:"No terreno $f(x) = x^{2}$, fixe $A$ em $x = 1$ e coloque $B$ em $x = 1 + h$, com $h \\ne 0$.",formula:'A=(1,1),\\quad B=(1+h,(1+h)^2)'},
 {title:'Calcule a taxa média',text:"Divida a variação vertical pela variação horizontal.",formula:'m=\\frac{(1+h)^2-1}{(1+h)-1}=\\frac{2h+h^2}{h}'},
 {title:'Simplifique antes do limite',text:"Como $h \\ne 0$, podemos cancelar $h$. Se $h = 0{,}1$, a inclinação da secante é $2{,}1$.",formula:'m=2+h'},
 {title:'Passe da média à instantânea',text:"Quando $h$ se aproxima de zero, pela direita ou pela esquerda, a inclinação tende a $2$. A tangente passa por $(1,1)$.",formula:"f'(1)=2,\\qquad y-1=2(x-1)"}
 ]
};
