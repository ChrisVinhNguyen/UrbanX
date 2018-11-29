class UserMailer < ApplicationMailer

  	def notify_lender
  		@transaction = params[:transaction]
  		@borrower = @transaction.borrower
  		@lender = @transaction.lender
  		mail(to: @lender.email, subject: 'You have a new transaction request!')
	end

	def notify_lender_cancelled_request
		@transaction = params[:transaction]
  		@borrower = @transaction.borrower
  		@lender = @transaction.lender
  		mail(to: @lender.email, subject: 'Transaction request cancelled.')
	end

	def notify_borrower_declined_request
		@transaction = params[:transaction]
  		@borrower = @transaction.borrower
  		@lender = @transaction.lender
  		mail(to: @borrower.email, subject: 'Transaction request declined.')
	end


end
