"use strict";(self.webpackChunkrainbow=self.webpackChunkrainbow||[]).push([[9254,8716],{69254:(e,t,r)=>{r.r(t),r.d(t,{FileHandle:()=>s});var n=r(8716);const{GONE:i}=n.errors,a=/constructor/i.test(window.HTMLElement)||window.safari||window.WebKitPoint;class s{constructor(e="unknown"){this.kind="file",this.writable=!0,this.name=e}async getFile(){throw new DOMException(...i)}async createWritable(e={}){var t;if(e.keepExistingData)throw new TypeError("Option keepExistingData is not implemented");const n=globalThis.TransformStream||(await r.e(9673).then(r.bind(r,29673))).TransformStream,i=globalThis.WritableStream||(await r.e(9673).then(r.bind(r,29673))).WritableStream,s=await(null===(t=navigator.serviceWorker)||void 0===t?void 0:t.getRegistration()),o=document.createElement("a"),d=new n,c=d.writable;if(o.download=this.name,a||!s){let e=[];d.readable.pipeTo(new i({write(t){e.push(new Blob([t]))},close(){const t=new Blob(e,{type:"application/octet-stream; charset=utf-8"});e=[],o.href=URL.createObjectURL(t),o.click(),setTimeout((()=>URL.revokeObjectURL(o.href)),1e4)}}))}else{const{writable:t,readablePort:r}=new l(i),a=encodeURIComponent(this.name).replace(/['()]/g,escape).replace(/\*/g,"%2A"),o={"content-disposition":"attachment; filename*=UTF-8''"+a,"content-type":"application/octet-stream; charset=utf-8",...e.size?{"content-length":e.size}:{}},c=setTimeout((()=>s.active.postMessage(0)),1e4);d.readable.pipeThrough(new n({transform(e,t){if(e instanceof Uint8Array)return t.enqueue(e);const r=new Response(e).body.getReader(),n=e=>r.read().then((e=>e.done?0:n(t.enqueue(e.value))));return n()}})).pipeTo(t).finally((()=>{clearInterval(c)})),s.active.postMessage({url:s.scope+a,headers:o,readablePort:r},[r]);const h=document.createElement("iframe");h.hidden=!0,h.src=s.scope+a,document.body.appendChild(h)}return c.getWriter()}async isSameEntry(e){return this===e}}class o{constructor(e){this._readyPending=!1,this._port=e,this._resetReady(),this._port.onmessage=e=>this._onMessage(e.data)}start(e){return this._controller=e,this._readyPromise}write(e){const t={type:0,chunk:e};return this._port.postMessage(t,[e.buffer]),this._resetReady(),this._readyPromise}close(){this._port.postMessage({type:2}),this._port.close()}abort(e){this._port.postMessage({type:1,reason:e}),this._port.close()}_onMessage(e){0===e.type&&this._resolveReady(),1===e.type&&this._onError(e.reason)}_onError(e){this._controller.error(e),this._rejectReady(e),this._port.close()}_resetReady(){this._readyPromise=new Promise(((e,t)=>{this._readyResolve=e,this._readyReject=t})),this._readyPending=!0}_resolveReady(){this._readyResolve(),this._readyPending=!1}_rejectReady(e){this._readyPending||this._resetReady(),this._readyPromise.catch((()=>{})),this._readyReject(e),this._readyPending=!1}}class l{constructor(e){const t=new MessageChannel;this.readablePort=t.port1,this.writable=new e(new o(t.port2))}}},8716:(e,t,r)=>{r.r(t),r.d(t,{errors:()=>n,isChunkObject:()=>i,makeDirHandleFromFileList:()=>a,makeFileHandlesFromFileList:()=>s});const n={INVALID:["seeking position failed.","InvalidStateError"],GONE:["A requested file or directory could not be found at the time an operation was processed.","NotFoundError"],MISMATCH:["The path supplied exists, but was not an entry of requested type.","TypeMismatchError"],MOD_ERR:["The object can not be modified in this way.","InvalidModificationError"],SYNTAX:e=>[`Failed to execute 'write' on 'UnderlyingSinkBase': Invalid params passed. ${e}`,"SyntaxError"],ABORT:["The operation was aborted","AbortError"],SECURITY:["It was determined that certain files are unsafe for access within a Web application, or that too many calls are being made on file resources.","SecurityError"],DISALLOWED:["The request is not allowed by the user agent or the platform in the current context.","NotAllowedError"]},i=e=>"object"==typeof e&&void 0!==e.type;async function a(e){var t,n,i;const{FolderHandle:a,FileHandle:s}=await r.e(6016).then(r.bind(r,86016)),{FileSystemDirectoryHandle:o}=await Promise.resolve().then(r.bind(r,45193)),l=null!==(n=null===(t=e[0].webkitRelativePath)||void 0===t?void 0:t.split("/",1)[0])&&void 0!==n?n:"",d=new a(l,!1);for(let t=0;t<e.length;t++){const r=e[t],n=(null===(i=r.webkitRelativePath)||void 0===i?void 0:i.length)?r.webkitRelativePath.split("/"):["",r.name];n.shift();const o=n.pop();n.reduce(((e,t)=>(e._entries[t]||(e._entries[t]=new a(t,!1)),e._entries[t])),d)._entries[o]=new s(r.name,r,!1)}return new o(d)}async function s(e){const{FileHandle:t}=await r.e(6016).then(r.bind(r,86016)),{FileSystemFileHandle:n}=await Promise.resolve().then(r.bind(r,52190));return Array.from(e).map((e=>new n(new t(e.name,e,!1))))}}}]);