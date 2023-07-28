import { HandleRequest, HttpRequest, HttpResponse, Sqlite} from "@fermyon/spin-sdk"

const encoder = new TextEncoder()

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {
  const conn = Sqlite.openDefault();
  let output = conn.execute("SELECT * FROM gh_repo_stats",[]).rows
  console.log(output.length)

   // @ts-ignore
  let result = [] 
  for (var row of output) {
    console.log(row)
    var values = JSON.stringify(row).split(",")
    var date = values[0].substring(2).slice(0,-1)
    var star_count = Number(values[1])
    var fork_count = Number(values[2])
    var issues_count = Number(values[3].slice(0,-1))
    result.push({date:date,stargazer_count:star_count,fork_count:fork_count,open_issues_count:issues_count})
  }
  
  return {
    status: 200,
      headers: { "content-type": "application/json" },
      // @ts-ignore
      body: JSON.stringify(result)
  }
}