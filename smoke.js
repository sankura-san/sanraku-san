/* Atmospheric smoke: low-resolution WebGL, theme-aware, disturbed by the pointer */
(()=>{
const root=document.documentElement,RM=matchMedia("(prefers-reduced-motion:reduce)").matches,cv=document.getElementById("smoke"),N=16;
let gl,mix=0,tgt=0,draw=()=>{};
window.Smoke={set(light,instant){tgt=light?1:0;if(instant||RM){mix=tgt;draw(RM?40:performance.now()/1000+20)}}};
try{gl=cv.getContext("webgl",{antialias:false,alpha:false,powerPreference:"low-power"})}catch(e){}
if(!gl){root.classList.add("nogl");return}
const vs="attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const fs=`precision mediump float;uniform vec2 r;uniform float t,m;uniform vec3 tr[${N}];
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return s;}
void main(){
vec2 uv=gl_FragCoord.xy/r;vec2 asp=vec2(r.x/r.y,1.);vec2 p=uv*asp*1.5;float T=t*.03;
vec2 disp=vec2(0.);float dens=0.;
for(int i=0;i<${N};i++){vec2 d=(uv-tr[i].xy)*asp;float k=exp(-dot(d,d)*26.)*tr[i].z;disp+=vec2(-d.y,d.x)*k*.9+d*k*.25;dens+=k;}
dens=min(dens,1.4);p+=disp;
vec2 q=vec2(fbm(p+T),fbm(p+vec2(5.2,1.3)-T*.8));
vec2 w=vec2(fbm(p+2.6*q+vec2(1.7,9.2)+T*.6),fbm(p+2.6*q+vec2(8.3,2.8)-T*.5));
float f=fbm(p+2.8*w);
float sm=clamp(smoothstep(.3,.85,f)+dens*.14,0.,1.);float hi=smoothstep(.55,.95,fbm(p*1.3+w*2.+T));
vec3 dB=mix(vec3(.067,.098,.137),vec3(.09,.129,.173),uv.y);
vec3 dS=mix(vec3(.251,.22,.227),vec3(.165,.224,.282),w.x);
vec3 d=mix(dB,dS,sm*.5)+vec3(.55,.62,.7)*(hi*.035+dens*.03);
vec3 lB=mix(vec3(.918,.902,.878),vec3(.961,.949,.933),uv.y);
vec3 lS=mix(vec3(.725,.69,.647),vec3(.62,.6,.58),w.y);
vec3 l=mix(lB,lS,sm*.42);l=mix(l,vec3(1.),hi*.35);
vec2 g=(uv-vec2(.66,.52))*vec2(1.1,1.25);float gg=exp(-dot(g,g)*4.5);
d+=vec3(.2,.3,.4)*gg*.22;l+=vec3(1.,.95,.86)*gg*.22;
vec3 c=mix(d,l,m);
c*=mix(.72,1.,smoothstep(1.15,.3,length(uv-.5)));
c+=(h(gl_FragCoord.xy)-.5)/255.;
gl_FragColor=vec4(c,1.);}`;
const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o};
const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);
if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){root.classList.add("nogl");return}
gl.useProgram(pr);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
const lp=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(lp);gl.vertexAttribPointer(lp,2,gl.FLOAT,false,0,0);
const ur=gl.getUniformLocation(pr,"r"),ut=gl.getUniformLocation(pr,"t"),um=gl.getUniformLocation(pr,"m"),utr=gl.getUniformLocation(pr,"tr");
const tr=new Float32Array(N*3);
const size=()=>{const k=Math.min(devicePixelRatio||1,1)*.5;cv.width=Math.max(2,innerWidth*k|0);cv.height=Math.max(2,innerHeight*k|0);gl.viewport(0,0,cv.width,cv.height);if(RM)draw(40)};
draw=t=>{gl.uniform2f(ur,cv.width,cv.height);gl.uniform1f(ut,t);gl.uniform1f(um,mix);gl.uniform3fv(utr,tr);gl.drawArrays(gl.TRIANGLES,0,3)};
size();addEventListener("resize",size);
if(RM){draw(40);return}
/* pointer wake: a short trail of points that stir the smoke and fade away */
let head=0,tx=.5,ty=.5,mx=.5,my=.5,px=.5,py=.5,moved=false,last=0,raf;
addEventListener("pointermove",e=>{tx=e.clientX/innerWidth;ty=1-e.clientY/innerHeight;moved=true},{passive:true});
const frame=now=>{raf=requestAnimationFrame(frame);if(now-last<33)return;const dt=Math.min((now-last)/1000,.1);last=now;
mix+=(tgt-mix)*(1-Math.exp(-dt*2.6));
mx+=(tx-mx)*.3;my+=(ty-my)*.3;const sp=Math.hypot((mx-px)*innerWidth/innerHeight,my-py)*60;px=mx;py=my;
const k=Math.exp(-dt*1.5);for(let i=0;i<N;i++)tr[i*3+2]*=k;
if(moved&&sp>.02){tr[head*3]=mx;tr[head*3+1]=my;tr[head*3+2]=Math.min(1,sp);head=(head+1)%N}
draw(now/1000+20)};
document.addEventListener("visibilitychange",()=>{cancelAnimationFrame(raf);if(!document.hidden)raf=requestAnimationFrame(frame)});
raf=requestAnimationFrame(frame);
})();
