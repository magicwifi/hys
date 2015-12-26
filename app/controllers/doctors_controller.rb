class DoctorsController < ApplicationController
skip_before_action :verify_authenticity_token
  def index
     @doctor_groups = []
     @doctors = Doctor.all
     @doctors.in_groups_of(3, false) { |group| @doctor_groups << group }
     @process = ""
  end
  def doctor_index
     @doctor_groups = Doctor.all
     #@doctor_groups = []
     #@doctors = Doctor.all
     #@doctors.in_groups_of(3, false) { |group| @doctor_groups << group }
     @process = "commit"
     render 'search'
  end

  def doctor_commit
     @doctor = Doctor.find(params[:id]);
  end


  def show
     @doctor = Doctor.find(params[:id]);
  end

  def create
     begin
     	Doctor.transaction do
     	doctor = Doctor.create!(:name=>params[:name],:main_desc=>params[:main_desc],:doctor_id=>params[:doctor_id],:url=>params[:url],:avatar=>params[:avatar],:hospital=>params[:hospital],:room=>params[:room],:rank=>params[:rank],:level=>params[:level],:sex=>params[:sex],:speciality=>params[:speciality])
	reservations = params[:reservations]
	if !params[:reservations].nil?
	reservations.each do |reservation|
		Reservation.create!(:doctor_id=>doctor.id,:support_number=> reservation[:support_number],:price_type=>reservation[:price_type],:price=>reservation[:price],:remark=>reservation[:remark])
	end
	end
     end
      rescue Exception => e
	logger.debug e
 	render :text => '{"result":400}'
	return;
      end
 	render :text => '{"result":200}'
     end

  def update_main_desc
     doctor_id = params[:doctor_id].to_i
     doctor = Doctor.find_by_doctor_id(doctor_id)
     if doctor.nil?
 	render :text => '{"result":400}'
	return
     end
     doctor.update(:main_desc=>params[:main_desc])
     if doctor.save
 	render :text => '{"result":200}'
     else
 	render :text => '{"result":400}'
     end
   end

  def update_doctor_reservation
     doctor_id = params[:doctor_id].to_i
     doctor = Doctor.find_by_doctor_id(doctor_id)
     if doctor.nil?
 	render :text => '{"result":400}'
	return
     end
     reservation = doctor.reservations.where(:price_type=>params[:price_type]).first
     if reservation.nil?
	reservation= Reservation.new(:doctor_id=>doctor.id,:support_number=> params[:support_number],:price_type=>params[:price_type],:price=>params[:price],:remark=>params[:remark])
     else
	reservation.update(:support_number=>params[:support_number],:price=>params[:price],:remark=>params[:remark])
     end
     if reservation.save
 	render :text => '{"result":200}'
     else
 	render :text => '{"result":400}'
     end
   end

  def update_doctor_url
     doctor_id = params[:doctor_id].to_i
     doctor = Doctor.find_by_doctor_id(doctor_id)
     if doctor.nil?
 	render :text => '{"result":400}'
	return
     end
     doctor.update(:url=>params[:url])
     if doctor.save
 	render :text => '{"result":200}'
     else
 	render :text => '{"result":400}'
     end
   end

  def update_doctor_avatar
     doctor_id = params[:doctor_id].to_i
     doctor = Doctor.find_by_doctor_id(doctor_id)
     if doctor.nil?
 	render :text => '{"result":400}'
	return
     end
     doctor.update(:avatar=>params[:avatar])
     if doctor.save
 	render :text => '{"result":200}'
     else
 	render :text => '{"result":400}'
     end
   end

   def search 
     @doctor_groups = Doctor.all
     @process = ""
     @user = current_user
   end
   
   def personal_website
   end
   
   def consult
   end
  
   def home_search
      @cur_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
      @userid=""
      @username=""
      if @cur_user
         @userid=@cur_user.id
         @username=@cur_user.name
      end
      #Stus = {"tom"=>"心肌病","Aaron"=>"冠心病","Lucy"=>"心律失常","Lucy"=>"先天性心脏病","Lucy"=>"心脏瓣膜病","Lucy"=>"心包疾病","Lucy"=>"心力衰竭"}
      st=Hash.new  
      st["myocardiosis"]="心肌病"
      st["coronary"]="冠心病"
      st["arhythmia"]="心律失常"
      st["chd"]="先天性心脏病"
      st["valvulopathy"]="心脏瓣膜病"
      st["pericardial"]="心包疾病"
      st["heart-failure"]="心力衰竭"
      sql=""
      for key,value in st 
        if params[key]
           if sql !=""
              sql+=" or speciality like '%" +value+"%' "
           else
              sql+=" speciality like '%" +value+"%' "
           end
        end
      end
      
      if params[:search_key]
           if sql !=""
              sql+=" and name like '%" +params[:search_key]+"%' "
           else
              sql+=" name like '%" +params[:search_key]+"%' "
           end
      end
      @neworsubmit=false
      if  params[:neworsubmit]
          @neworsubmit=true
      end
      #if params[:search_key]
      if sql !=""
         name=params[:search_key]
         #@doctors= Doctor.where(:name =>params[:search_key]).all
         # @doctors= Doctor.where("name like :kw ", :kw=>"%#{params[:search_key]}%")
         @doctors= Doctor.where(sql)
      else
         @doctors= Doctor.all
      end
   end
   
   def getdoclist
     render :text => Doctor.all.limit(5).to_json
   end

end
