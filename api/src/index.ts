import { HandleRequest, HttpRequest, HttpResponse} from "@fermyon/spin-sdk"

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {
    let store = spinSdk.kv.openDefault()
    let keys = store.getKeys()

    // @ts-ignore
    let result = [] 
    keys.map(k=>{
      if(k != "credentials")
        result.push({date:k,value:decoder.decode(store.get(k))})
    })

    return {
      status: 200,
        headers: { "content-type": "application/json" },
        // @ts-ignore
        body: JSON.stringify(result)
    }
}