# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'tetris'
set :repo_url, 'git@github.com:caseygitflynn/tetris.git'


namespace :assets do
  task :build do
    sh 'gulp'
  end

  task :upload => [:build] do
    on roles(:all) do |host|
      upload! "public/js/app.js", "#{release_path}/public/js/app.js"
    end
  end
end

namespace :deploy do
  before :publishing, :'assets:upload'
end