import { HandleRequest, HttpRequest, HttpResponse, Sqlite} from "@fermyon/spin-sdk"

const encoder = new TextEncoder()

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {
  const conn = Sqlite.openDefault();
  let data = conn.execute("SELECT * FROM gh_repo_stats",[]);

  return {
    status: 200,
      headers: { "content-type": "application/json" },
      // @ts-ignore
      body: JSON.stringify(data)
  }
}
