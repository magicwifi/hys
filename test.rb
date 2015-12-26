require 'net/http'
Net::HTTP.version_1_2   # 设定对象的运作方式
Net::HTTP.start('123.56.109.236', 80) {|http|
  response = http.get('/hryisheng/json/getCase.action')
  puts response.body
}
