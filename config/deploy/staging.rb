set :stage, :staging

set :deploy_to, -> { "/var/www/tetris" }

# Extended Server Syntax
# ======================
server 'caseyrflynn.com', user: 'root', roles: %w{web app db}

# you can set custom ssh options
# it's possible to pass any option but you need to keep in mind that net/ssh understand limited list of options
# you can see them in [net/ssh documentation](http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start)
# set it globally
set :ssh_options, {
    forward_agent: true
}