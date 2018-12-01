class AddItemSummaryInfo
  include Interactor

  def validate_context(context)
    %i[items].all? {|key| context.instance_values["table"].key? key}
  end

  def call
    if validate_context(context)
      user_repo = UserRepository.new

      items_summary_array = []

      context.items.each do |item|
        user = user_repo.find_by_id(item[:user_id])
        full_name = user.user_profile[:first_name] + " " + user.user_profile[:last_name]
        item_hash = item.attributes
        item_hash[:owner] = full_name
        item_hash[:user_profile_id] = user.user_profile.id

        average_rating = calculate_item_reviews_average_rating(item.item_reviews)
        item_hash[:average_rating] = average_rating

        items_summary_array.push(item_hash)
      end

      context.items_summary_array = items_summary_array
    else
      context.fail!(message: "invalid context params")
    end
  end

  def calculate_item_reviews_average_rating(item_reviews)
    item_reviews_count = item_reviews.count
    item_reviews_total_rating = 0
    item_reviews.each do |item_review|
      item_reviews_total_rating += item_review.rating
    end

    average_rating = item_reviews_total_rating != 0 ? item_reviews_total_rating/item_reviews_count : 'no rating'
    return average_rating
  end
end