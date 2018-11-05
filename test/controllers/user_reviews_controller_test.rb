require 'test_helper'

class UserReviewsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get user_reviews_create_url
    assert_response :success
  end

  test "should get destroy" do
    get user_reviews_destroy_url
    assert_response :success
  end

  test "should get index" do
    get user_reviews_index_url
    assert_response :success
  end

  test "should get new" do
    get user_reviews_new_url
    assert_response :success
  end

  test "should get show" do
    get user_reviews_show_url
    assert_response :success
  end

  test "should get update" do
    get user_reviews_update_url
    assert_response :success
  end

end
