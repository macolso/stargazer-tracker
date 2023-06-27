# Stargazer app

This Spin application pulls the stargazer count of a repo of your choosing for the current day. It then stores the {`date`: `stargazer_count`} pair in a [Spin key-value store](https://developer.fermyon.com/spin/kv-store-tutorial).

_Spin features used_
* [Spin KV Store](https://developer.fermyon.com/spin/kv-store-tutorial)
* [Variable config](https://developer.fermyon.com/cloud/variables)
* [Fermyon Cloud Custom Subdomain](https://developer.fermyon.com/cloud/custom-fermyon-subdomain)

>> You can see an example running at <https://stargazer-counter.fermyon.app/>

### Prerequisites

* [Spin version 1.3 or newer](https://developer.fermyon.com/spin/install)
* [Spin Python SDK](https://developer.fermyon.com/spin/python-components)
* [Fermyon Cloud account](https://cloud.fermyon.com)
* [Cron-job account](https://console.cron-job.org/signup)
* [GitHub Personal Access Toke](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

#### Let's get started

1. Clone the repo, and modify `spin.toml` 

After cloning this repo, take a look at `spin.toml` and update the following values with your credentials and preferred target

```toml
[component.config]
# this is your GH PAT
gh_auth_token = "{{ gh_auth_token }}"
# this is the owner of the repo you want to pull stargazer count from
owner = "fermyon"
# this is the repo youi want to pull stargazer count from
repo = "spin"
```

2. Run application locally to ensure everything works as expected

Build and deploy Spin app locally:
```bash
SPIN_CONFIG_GH_AUTH_TOKEN="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" spin build --up    
```

Check to see stargazer count:
```terminal
curl localhost:3000
```

Optionally, this can be viewed on KV explorer as well at the following URL: <http://localhost:3000/internal/kv-explorer>.


3. Deploy to Fermyon Cloud
```
spin cloud deploy --variable gh_auth_token="{YOUR_PAT}"
```

4. Apply custom fermyon subdomain (optional)
Choose a friendly name of your choice following [this tutorial](https://developer.fermyon.com/cloud/custom-fermyon-subdomain).

5. Set up cron job at a daily reoccurance, pointing at our custom Fermyon subdomain (or default domain name if you skipped step 4):
![img of cron dash](/static/cron-dash.png)

Complete :) 