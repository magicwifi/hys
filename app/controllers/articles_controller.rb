class ArticlesController < ApplicationController
  def new
  end
  
  def show
   @infotype=1
   if params["infotype"]
       @infotype=params["infotype"].to_i
   end
   @url=(params["url"]).gsub(/~/,"&")
   @bshow=false
   if @url.include? ".pdf"
     @bshow=true
   end
   if @url.include? ".jsp"
     @bshow=true
   end
   if @url.include? ".html"
     @bshow=true
   end
   @aricle_date=params["aricle_date"]  
   @author=(params["author"])
   @title=(params["title"])
  end
  
  def medicalinfo
    @docs=nil
    path=""
    type="1"
    if params[:type]
       type=params[:type]
    end
    case type.to_i
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
         @docs =  JSON.parse response.body
       }
    rescue
    end
  end
end
