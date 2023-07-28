import { HandleRequest, HttpRequest, HttpResponse, Sqlite} from "@fermyon/spin-sdk"

const encoder = new TextEncoder()

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {
  const conn = Sqlite.openDefault();
  let output = conn.execute("SELECT * FROM gh_repo_stats",[])

  // @ts-ignore
  let result = [] 
  output.rows.forEach(row=>{
     // print(JSON.stringify(row))
    result.push({date:row[0],stargazer_count:row[1],fork_count:row[2],open_issues_count:row[3]})
  })
  

  return {
    status: 200,
      headers: { "content-type": "application/json" },
      // @ts-ignore
      body: JSON.stringify(result)
  }
}
