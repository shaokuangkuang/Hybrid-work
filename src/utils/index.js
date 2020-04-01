import querString from 'query-string'
let rootUrl='https://www.fastmock.site/mock/afe15e7a06ced2a28a4349cff024b576/HomeWork'

let myFetch={
    get(url,queryParams){
        url=rootUrl+url
        if(queryParams){
            url+='?'+querString.stringify(queryParams)
        }
        console.log(url)
        return fetch(url)
            .then(res=>res.json())
    },
    post(url,body){
        return fetch(rootUrl+url,{
            method:'POST',
            headers:{
              "Accept":'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
          })
          .then(res=>res.json())
          }
}
export {myFetch};
