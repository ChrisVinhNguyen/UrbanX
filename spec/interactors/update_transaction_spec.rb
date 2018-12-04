require 'rails_helper'

describe UpdateTransaction do
  before do
    @transaction = FactoryBot.create(:transaction)
  end

  context 'validate context' do
    it 'is valid with valid context params' do
      context_params = {
        item_id: @transaction.item.id,
        transaction_id: @transaction.id,
        transaction: {
          status: @transaction.status,
          expiry_date: @transaction.expiry_date
        },
        transaction_params: {}
      }

      result = UpdateTransaction.call(context_params)

      expect(result).to be_a_success
    end

    it 'is invalid with no transaction_id' do
      context_params = {
        item_id: @transaction.item.id,
        transaction: {
          status: @transaction.status,
          expiry_date: @transaction.expiry_date
        },
        transaction_params: {}
      }

      result = UpdateTransaction.call(context_params)

      expect(result).to be_a_failure
    end

    it 'is invalid with no transaction_params' do
      context_params = {
        item_id: @transaction.item.id,
        transaction_id: @transaction.id,
        transaction: {
          status: @transaction.status,
          expiry_date: @transaction.expiry_date
        }
      }

      result = UpdateTransaction.call(context_params)
      expect(result).to be_a_failure
    end
  end

  context 'call' do
    it 'update transactions successfully with valid transaction_params' do
      original_updated_at = @transaction.updated_at
      context_params = {
        item: @transaction.item,
        transaction_id: @transaction.id,
        transaction: {
          status: 'lent',
          expiry_date: @transaction.expiry_date
        }
      }

      result = UpdateTransaction.call(context_params)

      expect(result.transaction[:status]).to eq(context_params[:transaction][:status])
      expect(result.transaction[:expiry_date]).to eq(context_params[:transaction][:expiry_date])
      expect(result.transaction[:updated_at]).not_to eq(original_updated_at)
    end

    it 'calls methods successfully with params' do
      context_params = {
        item: @transaction.item,
        transaction_id: @transaction.id,
        transaction: {
          status: 'lent',
          expiry_date: @transaction.expiry_date
        }
      }

      transaction_repo = TransactionRepository.new

      expect(TransactionRepository).to receive(:new).and_return(transaction_repo)
      expect(transaction_repo).to receive(:find_by_id).with(context_params[:item], context_params[:transaction_id]).and_return(@transaction)
      expect(transaction_repo).to receive(:update).with(@transaction, context_params[:transaction])
      expect(DateTime).to receive(:now)

      result = UpdateTransaction.call(context_params)
      expect(result).to be_a_success
    end

    it 'update transaction fails with invalid transaction_id that does not exist' do
      context_params = {
        item: @transaction.item,
        transaction_id: @transaction.id + 1,
        transaction: {
          status: 'lent',
          expiry_date: @transaction.expiry_date
        }
      }

      transaction_repo = TransactionRepository.new

      expect(TransactionRepository).to receive(:new).and_return(transaction_repo)

      expect(transaction_repo).to receive(:find_by_id).with(context_params[:item], context_params[:transaction_id]).and_return("Couldn't find Transaction with 'id'=${context_params[:transaction_id] + 1}")
      expect(DateTime).not_to receive(:now)
      expect(transaction_repo).not_to receive(:update).with(@transaction, context_params[:transaction])

      result = UpdateTransaction.call(context_params)
    end

    it 'update transaction fail with invalid transaction status' do
      context_params = {
        item: @transaction.item,
        transaction_id: @transaction.id,
        transaction: {
          status: 3
        }
      }

      result = UpdateTransaction.call(context_params)
      expect(result.transaction[:status]).not_to eq(context_params[:transaction][:status])
    end
  end
end
