@app
scheduled-s3

@plugins
access
  src src/plugins/access.mjs # sets up secure bucket 

@scheduled
reads rate(5 minutes) # hits various APIs and yoinks data
writes rate(1 day) # writes a static HTML dashboard

@http
get / # lists reports
get /reports/:report # display a report
post /login
post /logout

@aws
profile brian
region us-west-2
architecture arm64
