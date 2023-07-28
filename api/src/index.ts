import { HandleRequest, HttpRequest, HttpResponse, Sqlite} from "@fermyon/spin-sdk"


const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {
    let store = spinSdk.kv.openDefault()
    const conn = Sqlite.openDefault();
    let data = conn.execute("SELECT * FROM gh_repo_stats",[]);

    return {
      status: 200,
        headers: { "content-type": "application/json" },
        // @ts-ignore
        body: JSON.stringify(data)
    }
}