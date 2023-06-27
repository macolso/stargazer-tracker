# Stargazer app

This Spin application pulls the stargazer count of a repo of your choosing for the current day. It then stores the {`date`: `stargazer_count`} pair in a [Spin key-value store](https://developer.fermyon.com/spin/kv-store-tutorial).

_Spin features used_
* [Spin KV Store](https://developer.fermyon.com/spin/kv-store-tutorial)
* [Variable config](https://developer.fermyon.com/cloud/variables)

### Prerequisites
* [Spin version 1.3 or newer](https://developer.fermyon.com/spin/install)
* [Spin Python SDK](https://developer.fermyon.com/spin/python-components)
* [Fermyon Cloud account](https://cloud.fermyon.com)
* [Cron-job account](https://console.cron-job.org/signup)
* [GitHub Personal Access Toke](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

#### Let's get started
