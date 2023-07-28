from spin_http import Request, Response, http_send
from spin_config import config_get
from spin_sqlite import sqlite_open_default
from datetime import date
import json


def handle_request(request):

    gh_auth_token = config_get("gh_auth_token")
    owner=config_get("owner")
    repo=config_get("repo")

    print("https://api.github.com/repos/"+owner+"/"+repo)

    # Open DB connection
    conn = sqlite_open_default()
    conn.execute("CREATE TABLE IF NOT EXISTS gh_repo_stats (date DATE PRIMARY KEY,stargazer_count INTEGER,fork_count INTEGER,open_issues_count INTEGER);",[])

    # Call GitHub API
    response = http_send(
    Request("GET", "https://api.github.com/repos/"+owner+"/"+repo, 
    {"authorization": 'Bearer '+ gh_auth_token, "User-agent": "curl/7.88.1"}, None))

    repo_stats = json.loads(str(response.body, 'utf-8'))

    # Get stargazer_count
    num_stargazers = repo_stats["stargazers_count"]
    print("Num of stargazers: "+str(num_stargazers))

    # Get fork_count
    num_forks_count = repo_stats["forks_count"]
    print("Num of stargazers: "+str(num_forks_count))

    # Get issues_count
    num_open_issues_count = repo_stats["open_issues_count"]
    print("Num of stargazers: "+str(num_open_issues_count))
    print("Date: " + (str(date.today())))

    # bytes(str(num_stargazers))
    conn.execute("INSERT or REPLACE into gh_repo_stats (date, stargazer_count,fork_count,open_issues_count) VALUES(?,?,?,?)", (str(date.today()),num_stargazers,num_forks_count,num_open_issues_count))
    result = conn.execute("SELECT * FROM gh_repo_stats",[])
    rows = result.rows()
    print(rows)

    return Response(200,
                {"content-type": "application/json"},
                bytes(f"Here are the stats for the " + str(repo) + " repo today ("+str(date.today())+"): "+str(num_stargazers), "utf-8"))