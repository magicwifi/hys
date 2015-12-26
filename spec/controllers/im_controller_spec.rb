require 'rails_helper'

RSpec.describe ImController, type: :controller do

  describe "GET #client" do
    it "returns http success" do
      get :client
      expect(response).to have_http_status(:success)
    end
  end

end
