import config from '../config';

export function doPostRequest({ url, data } ) {
    return new Promise (resolve => {
        fetch(`${config.port}${url}`,{
            method:'POST',
            body:JSON.stringify({bodyData:data}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(success => {
            
            console.log("success after post: "+success);
            resolve(success)
        })
        .catch(err => {
            console.log({ err });
        });
    });
}


export function doGetRequest(url){
 return new Promise (resolve =>{
    fetch(`${config.port}${url}`)
    .then(res => res.json())
    .then(success => {
        console.log('success after get : '+success);
        resolve(success);
    })
    .catch(err =>{
        console.log({ err });
    });
});
}
// function downloadAllTask(){
//     return dispatch =>{
//         doGetRequest("/todo").then(success => {
//             dispatch ({ type:types.SET_ALLSEVERTASKS , payload:success.data })
//         });
//     }
// }
export function downloadAllTask(){
    return new Promise (
        resolve =>{
            doGetRequest('/todo') // here changes required when you working on serve for the app
            .then(success =>{
                console.log('sucess after get: '+success);
                resolve(success);
            })
            .catch(err =>{
                console.log({ err });
            });     
        }
    )
       }















