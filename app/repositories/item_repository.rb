class ItemRepository
  def all
    Item.all
  end

  def new_item(attributes)
    Item.new(attributes)
  end

  def update(item, updated_attributes)
    item.update(updated_attributes)
  end

  def save(item)
    item.save
  end

  def delete(item)
    item.destroy
  end

  def search(search_value, status)
    Item.where("name ilike ? AND status = ?", "%#{search_value}%", "#{status}")
  end

  def search_with_category(search_value, status, category)
    Item.where("name ilike ? AND status = ? and category = ?", "%#{search_value}%", "#{status}", "#{category}")
  end

  def find_all_user_items(user_id)
    Item.where(user_id: user_id)
  end

  def find_by_id(id)
    Item.find(id)
  end
end
