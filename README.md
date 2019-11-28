# Introduction
Completing the guardrails.io [challenge](https://github.com/guardrailsio/full-stack-engineer-challenge).

# Devops
Monorepo with a simple `Dockerfile` for the `api` and `dashboard`.  Environment variables are used to speciy which port on the host each service maps to.

# Server
## HTTP Endpoints
My thought process was to separate how we get a list and how we get the details on the results.  This way, there is a clearly defined API for retrieving all entries for a repo and updating individual results.
|----------------------+-----+------+-----+-------|
| Endpoint             | Get | Post | Put | Patch |
|----------------------+-----+------+-----+-------|
| api/scan/list/<repo> | Y   |      |     |       |
| api/scan/result      |     | Y    |     |       |
| api/scan/result/<id> | Y   |      | Y   | TODO  |
|----------------------+-----+------+-----+-------|
### Validation
Server side validation will leverage the Mongoose models.  I didn't think it was necessary to write additional logic since it will be harder to maintain if the validation of the request and model is decoupled from each other.  Also, by trusting that Mongoose has validated their validation logic, it puts less burden on us to unit test it.  Integreation tests will still be necessary
### TODO
* A patch operation using a package like `json-patch` would be nice.  The idea would be that the server running the scan would send a patch operation when it transitions to `In Progress`, and adds a findings as it detects security holes.  This would allow the user to see real time results.  It will also have lower bandwidth requirements.  But, for simplicity sake of this exercise, I'll only implement `Post`.