class InfoController < ApplicationController
  layout 'styleguide_css', :only => [:styleguide]
  respond_to :json
  def marketing
    @recent_messages = Message.all.limit(6).order('id desc')
    @star_messages = Message.all.limit(6).order('id desc')
    @user = User.new
    session[:return_to] = request.url
    #@doctors = Doctor.where(:recommended=>1).limit(5)
    @doctors = Doctor.all.limit(10)
    @count = User.all.count
    @users = User.order('id desc').page(params[:page]).per(60)
    @cur_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
    @userid=""
    @username=""
    if @cur_user
         @userid=@cur_user.id
         @username=@cur_user.name
    end
    @docs=nil
    begin
       #Net::HTTP.start('123.56.229.208', 80) {|http|
       #  response = http.get('/hryisheng/json/getNews.action')
       #  puts response.body
       #  @docs =  JSON.parse response.body
       #}
    rescue
    end
    if @docs.nil?
          @docs=JSON.parse "{}"
    end
  end
  
  def getdocs
    docs=nil
    path=""
    case params[:cid].to_i
    when 3
       path='/hryisheng/json/getCase.action'
    when 2
       path='/hryisheng/json/getAricle.action'
    when 1
       path='/hryisheng/json/getNews.action'
    end
    begin
       Net::HTTP.start('123.56.229.208', 80) {|http|
         response = http.get(path)
         puts response.body
         docs =  JSON.parse response.body
       }
    rescue
    end
    respond_to do |format|
        format.json {render :json => docs}
    end
  end

  def styleguide

    @styleguide = Kss::Parser.new("app/assets/stylesheets")
    if not params[:ref]
      render :template => "info/styleguide/css/index"
      return
    end

    case params[:ref].to_i
    when 1.0
      render :template => "info/styleguide/css/buttons"
    when 2.0
      render :template => "info/styleguide/css/colors"
    when 3.0
      render :template => "info/styleguide/css/comments"
    when 4.0
      render :template => "info/styleguide/css/menus"
    when 5.0
      render :template => "info/styleguide/css/course_cards"
    when 6.0
      render :template => "info/styleguide/css/tables"
    when 7.0
      render :template => "info/styleguide/css/boxed_groups"
    when 8.0
      render :template => "info/styleguide/css/forms"
    when 9.0
      render :template => "info/styleguide/css/member_list"
    end
  end

  def set_locale
    cookies.permanent[:locale] = params[:locale]
    redirect_to_target_or_default :root
  end
end

