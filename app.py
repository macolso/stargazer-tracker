from spin_http import Request, Response, http_send
from spin_config import config_get
from spin_key_value import kv_open_default
from datetime import date
import json


def handle_request(request):

    gh_auth_token = config_get("gh_auth_token")
    owner=config_get("owner")
    repo=config_get("repo")

    print("https://api.github.com/repos/"+owner+"/"+repo)

    response = http_send(
    Request("GET", "https://api.github.com/repos/"+owner+"/"+repo, 
    {"authorization": 'Bearer '+ gh_auth_token, "User-agent": "curl/7.88.1"}, None))

    repo_stats = json.loads(str(response.body, 'utf-8'))
    num_stargazers = repo_stats["stargazers_count"]

    store = kv_open_default()

    print("Num of stargazers: "+str(num_stargazers))
    print("Date: " + (str(date.today())))

    store.set(str(date.today()), bytes(str(num_stargazers),"utf-8"))

    return Response(200,
            {"content-type": "text/plain"},
            bytes(f"Here is the stargazer data: {num_stargazers}", "utf-8"))

