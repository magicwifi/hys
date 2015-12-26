class SickHist < ActiveRecord::Base
  attr_accessible :user_id, :title, :sub_title, :position, :desc,  :asset, :sick_date
  belongs_to :user, :touch => true
  acts_as_list scope: :user 

end
