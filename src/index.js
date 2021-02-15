import {fromEvent} from 'rxjs'
import {ajax} from 'rxjs/ajax'
import {debounceTime,map,distinctUntilChanged,switchMap,mergeMap,tap} from 'rxjs/operators'
const url="https://api.github.com/search/users?q="
const search=document.getElementById("search")
const response=document.getElementById("search")


const stream$=fromEvent(search,'input').pipe(
    map(e=>e.target.value),
    debounceTime(1000),
    distinctUntilChanged(),
    tap(()=>result.innerHTML=''),
    filter(v=>v.trim())
    switchMap(v=>ajax.getJSON(url+v).pipe(
        catchError(err=>EMPTY)
    )),
    map(response=>response.items),
    mergeMap(items=>items)
)
stream$.subscribe((user)=>{
    const html=`
    <div class="card">
    <div class="card-image">
      <img src="${user.avatar_url}">
      <span class="card-title">${user.login}</span>
    </div>
    <div class="card-action">
      <a href="${user.html_url}" target="_blank">открыть github</a>
    </div>
  </div>
    `
    result.insertAdjacentHTML('beforeend',html)
})