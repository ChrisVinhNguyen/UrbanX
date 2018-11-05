require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should get Reviews" do
    get user_Reviews_url
    assert_response :success
  end

end
