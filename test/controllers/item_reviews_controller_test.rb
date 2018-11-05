require 'test_helper'

class ItemReviewsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get item_reviews_create_url
    assert_response :success
  end

  test "should get destroy" do
    get item_reviews_destroy_url
    assert_response :success
  end

  test "should get index" do
    get item_reviews_index_url
    assert_response :success
  end

  test "should get new" do
    get item_reviews_new_url
    assert_response :success
  end

  test "should get show" do
    get item_reviews_show_url
    assert_response :success
  end

  test "should get update" do
    get item_reviews_update_url
    assert_response :success
  end

end
