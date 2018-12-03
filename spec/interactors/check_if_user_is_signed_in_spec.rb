require 'rails_helper'

describe CheckIfUserIsSignedIn do
  context 'validate context' do
    it 'is valid with valid context params' do
      result = CheckIfUserIsSignedIn.call({ is_user_signed_in: true })

      expect(result).to be_a_success
    end

    it 'is invalid with no is_user_signed_in' do
      result = CheckIfUserIsSignedIn.call({})

      expect(result).to be_a_failure
    end
  end
end
