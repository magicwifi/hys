class Hr_doctor < ActiveRecord::Base
  attr_accessible :sex, :picture, :introduction, :birthday, :telephone, :hospital, :department, :rank,:speciality,:symptom

end
